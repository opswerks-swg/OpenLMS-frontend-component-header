import { useEffect, useState } from 'react';

import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

/**
 * Fetches the logged in learner's first and last name (Django `auth_user`, as shown in the
 * LMS admin) from the openlms-apis endpoint:
 *   GET {LMS_BASE_URL}/api/openlms/me/name/  ->  { firstName, lastName }
 *
 * `authenticatedUser` only carries JWT claims; first/last name are not among them.
 *
 * @param {string} username - only used to (re)trigger the fetch; the endpoint always
 *   returns the requesting user's own names.
 * @returns {string|null} "First Last" (trimmed), or null when unset, still loading, or the
 *   request failed - callers fall back to the username.
 */
const useAccountName = (username) => {
  const [accountName, setAccountName] = useState(null);

  useEffect(() => {
    if (!username) {
      setAccountName(null);
      return undefined;
    }

    let isMounted = true;

    getAuthenticatedHttpClient()
      .get(`${getConfig().LMS_BASE_URL}/api/openlms/me/name/`)
      .then(({ data }) => {
        if (!isMounted) {
          return;
        }
        const fullName = [data?.firstName, data?.lastName]
          .filter((part) => typeof part === 'string')
          .join(' ')
          .replace(/\s+/g, ' ')
          .trim();
        setAccountName(fullName || null);
      })
      .catch(() => {
        // Fail silently - the caller falls back to the username.
        if (isMounted) {
          setAccountName(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [username]);

  return accountName;
};

export default useAccountName;

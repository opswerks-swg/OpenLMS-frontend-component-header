import { useEffect, useState } from 'react';

import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

/**
 * Fetches the learner's uploaded profile image (if any) from the LMS account API.
 *
 * `authenticatedUser` (from `@edx/frontend-platform/react`'s `AppContext`) only carries the
 * JWT claims (`username`, `userId`, `roles`, `administrator`) - it does not include profile
 * data like an avatar. The account image has to be fetched separately from:
 *   GET {LMS_BASE_URL}/api/user/v1/accounts/{username}
 * which returns a `profile_image` object with `has_image` and several pre-sized image URLs.
 *
 * @param {string} username
 * @returns {string|null} the medium profile image URL, or null if the user has none
 *   (or hasn't loaded yet) - callers should fall back to a default avatar in that case.
 */
const useProfileImage = (username) => {
  const [profileImageUrl, setProfileImageUrl] = useState(null);

  useEffect(() => {
    if (!username) {
      setProfileImageUrl(null);
      return undefined;
    }

    let isMounted = true;

    getAuthenticatedHttpClient()
      .get(`${getConfig().LMS_BASE_URL}/api/user/v1/accounts/${username}`)
      .then(({ data }) => {
        if (!isMounted) {
          return;
        }
        const profileImage = data?.profile_image;
        setProfileImageUrl(profileImage?.has_image ? profileImage.image_url_medium : null);
      })
      .catch(() => {
        // Fail silently - the caller falls back to a default avatar.
        if (isMounted) {
          setProfileImageUrl(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [username]);

  return profileImageUrl;
};

export default useProfileImage;

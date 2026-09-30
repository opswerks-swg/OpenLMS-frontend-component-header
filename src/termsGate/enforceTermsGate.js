import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

const TERMS_STATUS_PATH = '/api/openlms/terms/v1/status/';

function isTermsPath(pathname) {
  const normalized = (pathname || '/').replace(/\/$/, '') || '/';
  return normalized === '/terms' || normalized.startsWith('/terms/');
}

export function isTermsMfeLocation() {
  return isTermsPath(window.location.pathname);
}

export function buildTermsGateRedirectUrl(nextPath) {
  const config = getConfig();
  const termsBase = (config.TERMS_MICROFRONTEND_URL || `${window.location.origin}/terms`).replace(/\/$/, '');
  const next = (nextPath || `${window.location.pathname}${window.location.search}${window.location.hash}`).trim();
  if (isTermsPath(next.split('?')[0].split('#')[0])) {
    return termsBase;
  }
  return `${termsBase}?${new URLSearchParams({ next }).toString()}`;
}

/**
 * Redirect learners who still owe terms acceptance before an MFE renders.
 * @returns {Promise<boolean>} true when a redirect was started
 */
export async function enforceTermsGateBeforeAppRender() {
  if (typeof window === 'undefined' || isTermsMfeLocation()) {
    return false;
  }

  const config = getConfig();
  if (!config.TERMS_MICROFRONTEND_URL || !config.LMS_BASE_URL) {
    return false;
  }

  try {
    const { data } = await getAuthenticatedHttpClient().get(
      `${config.LMS_BASE_URL}${TERMS_STATUS_PATH}`,
    );
    if (data?.mustAccept && !data?.bypassesGate) {
      window.location.assign(buildTermsGateRedirectUrl());
      return true;
    }
  } catch (error) {
    const status = error?.customAttributes?.httpErrorStatus ?? error?.response?.status;
    if (status === 401) {
      return false;
    }
  }

  return false;
}

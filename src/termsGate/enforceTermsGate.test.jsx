import { getConfig } from '@edx/frontend-platform';

import { buildTermsGateRedirectUrl } from './enforceTermsGate';

jest.mock('@edx/frontend-platform', () => ({
  getConfig: jest.fn(),
}));

describe('buildTermsGateRedirectUrl', () => {
  beforeEach(() => {
    getConfig.mockReturnValue({
      TERMS_MICROFRONTEND_URL: 'https://apps.local.openedx.io/terms',
    });
  });

  it('preserves the attempted destination in the terms redirect', () => {
    expect(buildTermsGateRedirectUrl('/learner-dashboard/')).toBe(
      'https://apps.local.openedx.io/terms?next=%2Flearner-dashboard%2F',
    );
  });

  it('does not loop when the destination is already /terms', () => {
    expect(buildTermsGateRedirectUrl('/terms/')).toBe('https://apps.local.openedx.io/terms');
  });
});

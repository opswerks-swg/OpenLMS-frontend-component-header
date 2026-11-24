import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';

import useAccountName from './useAccountName';
import useProfileImage from './useProfileImage';
import WelcomeBanner, { getGreetingName } from './WelcomeBanner';

jest.mock('./useProfileImage', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('./useAccountName', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const renderBanner = (authenticatedUser) => render(
  <IntlProvider locale="en">
    <AppContext.Provider value={{ authenticatedUser, config: {} }}>
      <WelcomeBanner />
    </AppContext.Provider>
  </IntlProvider>,
);

describe('<WelcomeBanner />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useAccountName.mockReturnValue(null);
  });

  it('greets the learner by account first and last name, not the username', () => {
    useProfileImage.mockReturnValue(null);
    useAccountName.mockReturnValue('Juan Dela Cruz');
    renderBanner({ username: 'Juan_Dela_Cruz_SSED-MNL', name: 'Johnny (SSED-MNL)' });
    expect(useAccountName).toHaveBeenCalledWith('Juan_Dela_Cruz_SSED-MNL');
    expect(screen.getByText('Welcome back, Juan Dela Cruz!')).toBeInTheDocument();
    expect(screen.getByAltText("Juan Dela Cruz's avatar")).toBeInTheDocument();
  });

  it('renders nothing for a logged out/anonymous visitor', () => {
    useProfileImage.mockReturnValue(null);
    const { container } = renderBanner(null);
    expect(container).toBeEmptyDOMElement();
  });

  it('falls back to the username when first and last name are empty, ignoring the profile name', () => {
    useProfileImage.mockReturnValue(null);
    renderBanner({ username: 'sazarias', name: 'Steph Azarias (SSED-MNL)' });
    expect(screen.getByText('Welcome back, sazarias!')).toBeInTheDocument();
    expect(screen.getByAltText("sazarias's avatar")).toBeInTheDocument();
  });

  it('falls back to the username when the learner has no name', () => {
    useProfileImage.mockReturnValue(null);
    renderBanner({ username: 'edX' });
    expect(screen.getByText('Welcome back, edX!')).toBeInTheDocument();
    expect(screen.getByText('Continue your learning journey')).toBeInTheDocument();
  });

  it('uses the fetched profile image as the avatar src when the learner has one', () => {
    useProfileImage.mockReturnValue('http://localhost:18000/media/profile-images/medium.jpg');
    renderBanner({ username: 'edX' });
    expect(screen.getByAltText("edX's avatar")).toHaveAttribute(
      'src',
      'http://localhost:18000/media/profile-images/medium.jpg',
    );
  });

  it('falls back to the default avatar when the learner has no profile image', () => {
    useProfileImage.mockReturnValue(null);
    renderBanner({ username: 'edX' });
    const avatar = screen.getByAltText("edX's avatar");
    expect(avatar).toHaveAttribute('src');
    expect(avatar.getAttribute('src')).not.toBe('');
  });
});

describe('getGreetingName', () => {
  const user = { name: 'Steph Azarias (SSED-MNL)', username: 'u' };

  it.each([
    ['Juan Dela Cruz', 'Juan Dela Cruz'],
    ['Juan', 'Juan'],
    ['Dela Cruz', 'Dela Cruz'],
    ['Juan Dela Cruz (SSED-MNL)', 'Juan Dela Cruz'],
    ['Jane Cruz [SSED-EXT-CEB]', 'Jane Cruz'],
    ['[EXT] Jane Cruz {CEB}', 'Jane Cruz'],
    ['Juan Dela Cruz (SSED-MNL', 'Juan Dela Cruz'],
    ['(SSED-MNL)', 'u'],
    ['   ', 'u'],
    ['', 'u'],
    [null, 'u'],
    [undefined, 'u'],
  ])('account name %o -> %s', (accountName, expected) => {
    expect(getGreetingName(user, accountName)).toBe(expected);
  });

  it.each([
    [null],
    [undefined],
  ])('returns undefined for user %o with no account name', (noUser) => {
    expect(getGreetingName(noUser, null)).toBeUndefined();
  });
});

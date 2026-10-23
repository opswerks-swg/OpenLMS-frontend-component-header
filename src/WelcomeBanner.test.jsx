import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';

import useProfileImage from './useProfileImage';
import WelcomeBanner, { getGreetingName } from './WelcomeBanner';

jest.mock('./useProfileImage', () => ({
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
  });

  it('renders nothing for a logged out/anonymous visitor', () => {
    useProfileImage.mockReturnValue(null);
    const { container } = renderBanner(null);
    expect(container).toBeEmptyDOMElement();
  });

  it('greets the learner by name without the org suffix', () => {
    useProfileImage.mockReturnValue(null);
    renderBanner({ username: 'sazarias', name: 'Steph Azarias (SSED-MNL)' });
    expect(screen.getByText('Welcome back, Steph Azarias!')).toBeInTheDocument();
    expect(screen.getByAltText("Steph Azarias's avatar")).toBeInTheDocument();
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
  it.each([
    [{ name: 'Steph Azarias (SSED-MNL)', username: 'u' }, 'Steph Azarias'],
    [{ name: 'Jane Cruz [SSED-EXT-CEB]', username: 'u' }, 'Jane Cruz'],
    [{ name: 'Jane Cruz', username: 'u' }, 'Jane Cruz'],
    [{ name: '(SSED-MNL) Steph Azarias', username: 'u' }, 'Steph Azarias'],
    [{ name: '[EXT] Jane Cruz {CEB}', username: 'u' }, 'Jane Cruz'],
    [{ name: 'Steph Azarias (SSED-MNL', username: 'u' }, 'Steph Azarias'],
    [{ name: '(SSED-MNL)', username: 'u' }, 'u'],
    [{ name: '   ', username: 'u' }, 'u'],
    [{ name: '', username: 'u' }, 'u'],
    [{ name: null, username: 'u' }, 'u'],
    [null, undefined],
    [undefined, undefined],
  ])('%o -> %s', (user, expected) => {
    expect(getGreetingName(user)).toBe(expected);
  });
});

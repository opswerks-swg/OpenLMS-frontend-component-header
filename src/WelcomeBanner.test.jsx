import React from 'react';
import { render, screen } from '@testing-library/react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';

import useProfileImage from './useProfileImage';
import WelcomeBanner from './WelcomeBanner';

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

  it('greets the learner by username', () => {
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

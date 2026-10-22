import React, { useContext } from 'react';

import { AppContext } from '@edx/frontend-platform/react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { Avatar, Container } from '@openedx/paragon';

import useProfileImage from './useProfileImage';
import messages from './WelcomeBanner.messages';

// Entra-provisioned names carry an org tag, e.g. "Steph Azarias (SSED-MNL)" or "[EXT] Jane Cruz".
// The greeting shows the name without it; the profile page keeps the full name (LMS 13.5).
export const getGreetingName = (user) => {
  const { name, username } = user || {};
  const [withoutTags] = (typeof name === 'string' ? name : '')
    .replace(/[([{][^)\]}]*[)\]}]/g, ' ')
    .split(/[([{]/);
  return withoutTags.replace(/\s+/g, ' ').trim() || username;
};

/**
 * Greeting banner meant to be rendered directly below the header, on any
 * consuming MFE (learner dashboard, learning, etc). Only ever renders for
 * logged in members - anonymous/logged out visitors see nothing.
 *
 * This is the single source of truth for the welcome banner UI so it only
 * needs to be maintained in one place; consuming apps just drop it into
 * their own plugin slot.
 */
const WelcomeBanner = () => {
  const { authenticatedUser } = useContext(AppContext);
  const { formatMessage } = useIntl();
  const username = authenticatedUser?.username;
  const name = getGreetingName(authenticatedUser);
  // `authenticatedUser` only carries JWT claims - the profile image has to be fetched
  // separately from the account API. Returns null (-> Paragon's default avatar) until
  // loaded, or if the learner hasn't uploaded an image.
  const avatarSrc = useProfileImage(username);

  if (!authenticatedUser) {
    return null;
  }

  return (
    <Container fluid>
      <div className="welcome-banner d-flex align-items-center py-3" data-testid="welcome-banner">
        <Avatar
          size="xl"
          src={avatarSrc}
          alt={formatMessage(messages['header.welcomeBanner.avatarAlt'], { name })}
          className="welcome-banner__avatar mr-3"
        />
        <div>
          <h2 className="welcome-banner__greeting mb-0">
            {formatMessage(messages['header.welcomeBanner.greeting'], { name })}
          </h2>
          <p className="welcome-banner__subtitle mb-0">
            {formatMessage(messages['header.welcomeBanner.subtitle'])}
          </p>
        </div>
      </div>
    </Container>
  );
};

WelcomeBanner.propTypes = {};

export default WelcomeBanner;

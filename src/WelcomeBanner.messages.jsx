import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  'header.welcomeBanner.greeting': {
    id: 'header.welcomeBanner.greeting',
    defaultMessage: 'Welcome back, {username}!',
    description: 'Greeting shown to a logged in member below the header',
  },
  'header.welcomeBanner.subtitle': {
    id: 'header.welcomeBanner.subtitle',
    defaultMessage: 'Continue your learning journey',
    description: 'Subtitle shown under the welcome banner greeting',
  },
  'header.welcomeBanner.avatarAlt': {
    id: 'header.welcomeBanner.avatarAlt',
    defaultMessage: '{username}\'s avatar',
    description: 'Alt text for the member avatar image in the welcome banner',
  },
});

export default messages;

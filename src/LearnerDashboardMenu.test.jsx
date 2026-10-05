import React from 'react';
import { mergeConfig } from '@edx/frontend-platform';
import { render, screen } from '@testing-library/react';

import getLearnerHeaderMenu from './LearnerDashboardMenu';

const formatMessage = (message) => message.defaultMessage;
const user = { username: 'edX' };

describe('getLearnerHeaderMenu', () => {
  beforeEach(() => {
    mergeConfig({
      LMS_BASE_URL: 'http://lms.test',
      SEARCH_CATALOG_URL: null,
      HEADER_NAV_LINKS: [
        { title: 'Dashboard', url: '/dashboard', icon: 'Home' },
        { title: 'Discover', url: '/courses', icon: 'Compass' },
        {
          title: 'Browse',
          icon: 'LibraryBooks',
          children: [
            { title: 'By provider', url: '/courses?f=provider' },
            { title: 'By topic', url: '/courses?f=topic' },
          ],
        },
      ],
      HEADER_HELP_LINKS: [
        { title: 'Help Center', url: '/help' },
        { title: 'Report an issue', url: '/report-issue' },
      ],
    });
  });

  it('builds items for plain links and a dropdown for links with children', () => {
    const { mainMenu } = getLearnerHeaderMenu(formatMessage, null, user);

    expect(mainMenu.map((item) => item.type)).toEqual(['item', 'item', 'menu']);
    expect(mainMenu[1].href).toBe('http://lms.test/courses');

    render(<div>{mainMenu[2].submenuContent}</div>);
    expect(screen.getByText('By provider')).toHaveAttribute('href', 'http://lms.test/courses?f=provider');
    expect(screen.getByText('By topic')).toHaveAttribute('href', 'http://lms.test/courses?f=topic');
  });

  it('puts HEADER_HELP_LINKS in a help dropdown in the secondary menu', () => {
    const { secondaryMenu } = getLearnerHeaderMenu(formatMessage, null, user);

    expect(secondaryMenu).toHaveLength(1);
    expect(secondaryMenu[0].type).toBe('menu');
    render(<div>{secondaryMenu[0].content}{secondaryMenu[0].submenuContent}</div>);
    expect(screen.getByText('Help')).toHaveClass('lw-help-label');
    expect(screen.getByText('Help Center')).toHaveAttribute('href', 'http://lms.test/help');
    expect(screen.getByText('Report an issue')).toHaveAttribute('href', 'http://lms.test/report-issue');
  });

  it('leaves the secondary menu empty without HEADER_HELP_LINKS', () => {
    mergeConfig({ HEADER_HELP_LINKS: null });
    const { secondaryMenu } = getLearnerHeaderMenu(formatMessage, null, user);

    expect(secondaryMenu).toEqual([]);
  });
});

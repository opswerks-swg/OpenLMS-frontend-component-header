import React from 'react';
import {
  IconHome,
  IconBook,
  IconCompass,
  IconClockHour3,
  IconSearch,
  IconHelpHexagon,
} from '@tabler/icons-react';
import { getConfig } from '@edx/frontend-platform';

import messages from './Header.messages';

// Icon map — allows HEADER_NAV_LINKS to reference icons by string name
const ICON_MAP = {
  Home: IconHome,
  Compass: IconCompass,
  LibraryBooks: IconBook,
  ClockHour3: IconClockHour3,
  Search: IconSearch,
  HelpHexagon: IconHelpHexagon,
};

// Icon + label rendered as direct children of .nav-link (matches LMS .lw-nav-item)
const NavItem = ({ icon: IconComponent, label }) => (
  <>
    <IconComponent size={18} className="lw-nav-icon" aria-hidden="true" />
    <span>{label}</span>
  </>
);

const getLearnerHeaderMenu = (
  formatMessage,
  courseSearchUrl,
  authenticatedUser,
  exploreCoursesClick,
) => {
  const BASE_URL = getConfig().LMS_BASE_URL;
  const toLmsUrl = (url) => (
    !url || url.startsWith('http') ? url : `${BASE_URL}${url}`
  );
  const searchCatalogUrl = getConfig().SEARCH_CATALOG_URL;

  // ─────────────────────────────────────────────────────────────────────────
  // Read nav links from MFE_CONFIG (set once in openlms_brand.py).
  // Each entry: { title, url, icon? } or { title, icon?, children: [{ title, url }] }.
  // HEADER_HELP_LINKS ([{ title, url }]) fills the help icon dropdown.
  // Falls back to the original hardcoded links if HEADER_NAV_LINKS is unset.
  // ─────────────────────────────────────────────────────────────────────────
  const configNavLinks = getConfig().HEADER_NAV_LINKS;
  const configHelpLinks = getConfig().HEADER_HELP_LINKS;

  // /dashboard redirects into this MFE, so mark it active by APP_ID.
  const isLinkActive = (link) => {
    if (!link.url) {
      return false;
    }
    if (link.url === '/dashboard' || link.url.endsWith('/dashboard')) {
      return getConfig().APP_ID === 'learner-dashboard';
    }
    const linkPath = link.url.startsWith('http')
      ? new URL(link.url).pathname
      : link.url;
    return window.location.pathname === linkPath;
  };

  // Entries with `children` render as a dropdown (e.g. Browse, Help).
  const toSubmenu = (children) => children.map((child) => (
    <a key={child.url} className="dropdown-item" href={toLmsUrl(child.url)}>
      {child.title}
    </a>
  ));

  const mainMenu = configNavLinks
    ? configNavLinks.map((link) => {
      const content = (
        <NavItem
          icon={ICON_MAP[link.icon] ?? IconHome}
          label={link.title}
        />
      );
      if (link.children?.length) {
        return {
          type: 'menu',
          content,
          submenuContent: toSubmenu(link.children),
        };
      }
      const active = isLinkActive(link);
      return {
        type: 'item',
        href: toLmsUrl(link.url),
        isActive: active,
        // Skip navigation when already on this page (avoids /dashboard redirect flicker)
        onClick: active ? (e) => e.preventDefault() : undefined,
        content,
      };
    })
    : [
      {
        type: 'item',
        href: `${BASE_URL}/dashboard`,
        content: formatMessage(messages['header.links.courses']),
        isActive: getConfig().APP_ID === 'learner-dashboard',
        onClick: getConfig().APP_ID === 'learner-dashboard'
          ? (e) => e.preventDefault()
          : undefined,
      },
      ...(getConfig().ENABLE_PROGRAMS ? [{
        type: 'item',
        href: `${BASE_URL}/dashboard/programs`,
        content: formatMessage(messages['header.links.programs']),
      }] : []),
      ...(!getConfig().NON_BROWSABLE_COURSES ? [{
        type: 'item',
        href: `${BASE_URL}/courses`,
        content: formatMessage(messages['header.links.content.search']),
        onClick: (e) => {
          if (exploreCoursesClick) { exploreCoursesClick(e); }
        },
      }] : []),
    ];

  const searchItem = searchCatalogUrl ? [{
    type: 'item',
    href: null,
    className: 'lw-search-item',
    content: (
      <div className="lw-search-wrapper">
        <IconSearch size={16} className="lw-search-icon" />
        <input
          className="lw-search-input"
          type="search"
          aria-label={formatMessage(messages['header.search.placeholder'])}
          placeholder={formatMessage(messages['header.search.placeholder'])}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const q = e.target.value.trim();
              window.location.href = toLmsUrl(searchCatalogUrl)
                + (q ? `?q=${encodeURIComponent(q)}` : '');
            }
          }}
        />
      </div>
    ),
  }] : [];

  // Help icon dropdown, rendered just before the notifications bell.
  const helpMenu = configHelpLinks?.length ? [{
    type: 'menu',
    className: 'lw-help-menu',
    content: (
      <>
        <IconHelpHexagon size={22} className="lw-help-icon" aria-hidden="true" />
        {/* Visually hidden on desktop (icon only); shown as text in the mobile menu */}
        <span className="lw-help-label">{formatMessage(messages['header.links.help'])}</span>
      </>
    ),
    submenuContent: toSubmenu(configHelpLinks),
  }] : [];

  return {
    mainMenu: [...mainMenu, ...searchItem],
    secondaryMenu: helpMenu,
    userMenu: [
      {
        heading: '',
        items: [
          {
            type: 'item',
            href: `${getConfig().ACCOUNT_PROFILE_URL}/u/${authenticatedUser?.username}`,
            content: formatMessage(messages['header.user.menu.profile']),
          },
          {
            type: 'item',
            href: `${getConfig().ACCOUNT_SETTINGS_URL}`,
            content: formatMessage(messages['header.user.menu.account.settings']),
          },
          ...(getConfig().ORDER_HISTORY_URL ? [{
            type: 'item',
            href: getConfig().ORDER_HISTORY_URL,
            content: formatMessage(messages['header.user.menu.order.history']),
          }] : []),
        ],
      },
      {
        heading: '',
        items: [
          {
            type: 'item',
            href: `${getConfig().LOGOUT_URL}`,
            content: formatMessage(messages['header.user.menu.logout']),
          },
        ],
      },
    ],
  };
};

export default getLearnerHeaderMenu;

import React from 'react';
import PropTypes from 'prop-types';

import { IconChevronDown } from '@tabler/icons-react';

import { Menu, MenuTrigger, MenuContent } from '../Menu/index.js';

const DesktopHeaderMainOrSecondaryMenu = ({ menu }) => {
  // Nodes are accepted as a prop
  if (!Array.isArray(menu)) {
    return menu;
  }

  return menu.map((menuItem, index) => {
    const {
      type,
      href,
      content,
      submenuContent,
      className,
      disabled,
      isActive,
      onClick,
    } = menuItem;

    if (type === 'item') {
      return (
        <a
          key={`${type}-${href}`}
          className={`nav-link${disabled ? ' disabled' : ''}${isActive ? ' active' : ''}`}
          href={href}
          onClick={onClick || null}
        >
          {content}
        </a>
      );
    }

    // Without an href the trigger only opens the dropdown, so use a button to keep it keyboard-focusable.
    const triggerProps = href
      ? { tag: 'a', href }
      : { tag: 'button', type: 'button', className: 'bg-transparent border-0' };

    return (
      <Menu key={`${type}-${href ?? index}`} tag="div" className={`nav-item${className ? ` ${className}` : ''}`}>
        <MenuTrigger
          onClick={onClick || null}
          {...triggerProps}
          className={`nav-link d-inline-flex align-items-center ${triggerProps.className || ''}`.trim()}
        >
          {content}
          <IconChevronDown size={12} stroke={2} className="lw-nav-chevron" aria-hidden="true" focusable="false" />
        </MenuTrigger>
        <MenuContent className="lw-nav-dropdown-menu pin-left">
          {submenuContent}
        </MenuContent>
      </Menu>
    );
  });
};

export const desktopHeaderMainOrSecondaryMenuDataShape = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.array,
]);

DesktopHeaderMainOrSecondaryMenu.propTypes = {
  menu: desktopHeaderMainOrSecondaryMenuDataShape,
};

export default DesktopHeaderMainOrSecondaryMenu;

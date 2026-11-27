import React from 'react';
import PropTypes from 'prop-types';
import { IconChevronDown } from '@tabler/icons-react';

import { Menu, MenuTrigger, MenuContent } from '../Menu';

const MobileHeaderMainMenu = ({ menu }) => {
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
      const itemClassName = `nav-link${disabled ? ' disabled' : ''}${isActive ? ' active' : ''}`;
      // Search has no href. An <a> around the input is invalid and drops focus.
      if (!href) {
        return (
          <div key={`${type}-${index}`} className={itemClassName}>
            {content}
          </div>
        );
      }
      return (
        <a
          key={`${type}-${href}`}
          className={itemClassName}
          href={href}
          onClick={onClick || null}
        >
          {content}
        </a>
      );
    }

    return (
      <Menu key={`${type}-${href ?? index}`} tag="div" className={`nav-item${className ? ` ${className}` : ''}`}>
        <MenuTrigger onClick={onClick || null} tag="button" type="button" className="nav-link bg-transparent border-0 text-left w-100">
          {content}
          <IconChevronDown size={16} stroke={2} className="lw-nav-chevron" aria-hidden="true" focusable="false" />
        </MenuTrigger>
        <MenuContent className="lw-mobile-submenu position-static">
          {submenuContent}
        </MenuContent>
      </Menu>
    );
  });
};

export const mobileHeaderMainMenuDataShape = PropTypes.oneOfType([
  PropTypes.node,
  PropTypes.array,
]);

MobileHeaderMainMenu.propTypes = {
  menu: mobileHeaderMainMenuDataShape,
};

export default MobileHeaderMainMenu;

import React from 'react';
import PropTypes from 'prop-types';

import { Menu, MenuTrigger, MenuContent } from '../Menu/index.js';

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
      disabled,
      isActive,
      onClick,
    } = menuItem;

    if (type === 'item') {
      return (
        <a
          key={`${type}-${href ?? index}`}
          className={`nav-link${disabled ? ' disabled' : ''}${isActive ? ' active' : ''}`}
          href={href}
          onClick={onClick || null}
        >
          {content}
        </a>
      );
    }

    return (
      <Menu key={`${type}-${href ?? index}`} tag="div" className="nav-item">
        <MenuTrigger onClick={onClick || null} tag="button" type="button" className="nav-link bg-transparent border-0 text-left w-100">
          {content}
        </MenuTrigger>
        <MenuContent className="position-static pin-left pin-right py-2">
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

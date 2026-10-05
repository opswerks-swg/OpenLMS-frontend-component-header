import React from 'react';
import PropTypes from 'prop-types';

import { Menu, MenuTrigger, MenuContent } from '../Menu/index.js';
import { CaretIcon } from '../Icons';

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
      <Menu key={`${type}-${href ?? index}`} tag="div" className={`nav-item${className ? ` ${className}` : ''}`} respondToPointerEvents>
        <MenuTrigger
          onClick={onClick || null}
          {...triggerProps}
          className={`nav-link d-inline-flex align-items-center ${triggerProps.className || ''}`.trim()}
        >
          {content} <CaretIcon role="img" aria-hidden focusable="false" />
        </MenuTrigger>
        <MenuContent className="pin-left pin-right shadow py-2">
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

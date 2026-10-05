import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { Menu, MenuTrigger, MenuContent } from './Menu';

const renderMenu = (props = {}) => render(
  <Menu tag="div" {...props}>
    <MenuTrigger tag="button" type="button">Browse</MenuTrigger>
    <MenuContent>
      <a href="/courses?f=topic">By topic</a>
    </MenuContent>
  </Menu>,
);

describe('Menu', () => {
  it('toggles open and closed on trigger click', () => {
    renderMenu();
    const trigger = screen.getByRole('button', { name: 'Browse' });

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('stays open when the trigger is clicked after a hover-open', () => {
    const { container } = renderMenu({ respondToPointerEvents: true });
    const trigger = screen.getByRole('button', { name: 'Browse' });

    fireEvent.mouseEnter(container.firstChild);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('By topic')).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes on one click after a hover-open menu was closed another way', () => {
    const { container } = renderMenu({ respondToPointerEvents: true });
    const trigger = screen.getByRole('button', { name: 'Browse' });

    fireEvent.mouseEnter(container.firstChild);
    trigger.focus();
    fireEvent.keyDown(container.firstChild, { key: 'Escape' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});

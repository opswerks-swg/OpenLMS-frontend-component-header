import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import SearchInput from './SearchInput';

const renderSearchInput = (extra = null) => render(
  <>
    {extra}
    <SearchInput label="Search courses" catalogUrl="https://apps.local.openedx.io/search" toLmsUrl={(url) => url} />
  </>,
);

describe('SearchInput Alt+/ shortcut', () => {
  it('focuses the search box when Alt+/ is pressed outside a text field', () => {
    renderSearchInput();

    fireEvent.keyDown(document.body, { key: '/', code: 'Slash', altKey: true });

    expect(screen.getByRole('searchbox', { name: 'Search courses' })).toHaveFocus();
  });

  it('focuses the search box when macOS reports Option+/ as "÷"', () => {
    renderSearchInput();

    fireEvent.keyDown(document.body, { key: '÷', code: 'Slash', altKey: true });

    expect(screen.getByRole('searchbox', { name: 'Search courses' })).toHaveFocus();
  });

  it('does not focus the search box for a bare "/"', () => {
    renderSearchInput();

    fireEvent.keyDown(document.body, { key: '/', code: 'Slash' });

    expect(screen.getByRole('searchbox', { name: 'Search courses' })).not.toHaveFocus();
  });

  it('moves focus from another text field on Alt+/', () => {
    renderSearchInput(<input aria-label="Other field" />);
    const other = screen.getByRole('textbox', { name: 'Other field' });
    other.focus();

    fireEvent.keyDown(other, { key: '÷', code: 'Slash', altKey: true });

    expect(screen.getByRole('searchbox', { name: 'Search courses' })).toHaveFocus();
  });

  it('ignores "/" pressed with Ctrl or Meta as well as Alt', () => {
    renderSearchInput();

    fireEvent.keyDown(document.body, { key: '/', code: 'Slash', altKey: true, ctrlKey: true });
    fireEvent.keyDown(document.body, { key: '/', code: 'Slash', altKey: true, metaKey: true });

    expect(screen.getByRole('searchbox', { name: 'Search courses' })).not.toHaveFocus();
  });
});

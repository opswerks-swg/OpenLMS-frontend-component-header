import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { SearchInput } from './LearnerDashboardMenu';

const renderSearchInput = (extra = null) => render(
  <>
    {extra}
    <SearchInput label="Search courses" catalogUrl="https://apps.local.openedx.io/search" toLmsUrl={(url) => url} />
  </>,
);

describe('SearchInput "/" shortcut', () => {
  it('focuses the search box when "/" is pressed outside a text field', () => {
    renderSearchInput();

    fireEvent.keyDown(document.body, { key: '/' });

    expect(screen.getByRole('searchbox', { name: 'Search courses' })).toHaveFocus();
  });

  it('does not take over "/" typed into another text field', () => {
    renderSearchInput(<input aria-label="Other field" />);
    const other = screen.getByRole('textbox', { name: 'Other field' });
    other.focus();

    fireEvent.keyDown(other, { key: '/' });

    expect(other).toHaveFocus();
  });

  it('ignores "/" pressed with a modifier key', () => {
    renderSearchInput();

    fireEvent.keyDown(document.body, { key: '/', ctrlKey: true });

    expect(screen.getByRole('searchbox', { name: 'Search courses' })).not.toHaveFocus();
  });
});

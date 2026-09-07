import React from 'react';
import { render, screen } from '@testing-library/react';

import HeaderNotificationsSlot from './index';
import { lockBodyScroll } from '../../utils/bodyScrollLock';

jest.mock('@openedx/frontend-plugin-framework', () => ({
  PluginSlot: ({ children }) => <div data-testid="plugin-slot">{children}</div>,
}));

jest.mock('@edx/frontend-plugin-notifications', () => ({
  __esModule: true,
  default: ({ onDrawerMountedChange, onDrawerOpenChange }) => (
    <div>
      <button
        type="button"
        data-testid="mock-drawer-open"
        onClick={() => onDrawerOpenChange?.(true)}
      >
        Open drawer
      </button>
      <button
        type="button"
        data-testid="mock-drawer-unmount"
        onClick={() => onDrawerMountedChange?.(false)}
      >
        Unmount drawer
      </button>
    </div>
  ),
}));

jest.mock('../../utils/bodyScrollLock', () => ({
  lockBodyScroll: jest.fn(() => jest.fn()),
}));

describe('HeaderNotificationsSlot', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('locks body scroll when the drawer opens', () => {
    render(<HeaderNotificationsSlot />);

    screen.getByTestId('mock-drawer-open').click();

    expect(lockBodyScroll).toHaveBeenCalledTimes(1);
  });

  it('unlocks body scroll when the drawer unmounts', () => {
    const unlock = jest.fn();
    lockBodyScroll.mockReturnValue(unlock);

    render(<HeaderNotificationsSlot />);

    screen.getByTestId('mock-drawer-open').click();
    screen.getByTestId('mock-drawer-unmount').click();

    expect(unlock).toHaveBeenCalledTimes(1);
  });

  it('unlocks body scroll when the slot unmounts with the drawer open', () => {
    const unlock = jest.fn();
    lockBodyScroll.mockReturnValue(unlock);

    const { unmount } = render(<HeaderNotificationsSlot />);

    screen.getByTestId('mock-drawer-open').click();
    unmount();

    expect(unlock).toHaveBeenCalledTimes(1);
  });
});

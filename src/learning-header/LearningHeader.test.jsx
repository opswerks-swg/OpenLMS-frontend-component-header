import React from 'react';
import {
  authenticatedUser, initializeMockApp, render, screen,
} from '../setupTest';
import { LearningHeader as Header } from '../index';

describe('Header', () => {
  beforeAll(async () => {
    // We need to mock AuthService to implicitly use `getAuthenticatedUser` within `AppContext.Provider`.
    await initializeMockApp();
  });

  it('displays user account menu trigger', () => {
    render(<Header />);
    expect(screen.getByRole('button', { name: `Account menu for ${authenticatedUser.username}` })).toBeInTheDocument();
  });
});

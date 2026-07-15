import { renderHook, waitFor } from '@testing-library/react';

import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

import useProfileImage from './useProfileImage';

jest.mock('@edx/frontend-platform', () => ({
  getConfig: jest.fn(),
}));

jest.mock('@edx/frontend-platform/auth', () => ({
  getAuthenticatedHttpClient: jest.fn(),
}));

describe('useProfileImage', () => {
  const username = 'edX';
  const mockHttpClient = { get: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    getConfig.mockReturnValue({ LMS_BASE_URL: 'http://localhost:18000' });
    getAuthenticatedHttpClient.mockReturnValue(mockHttpClient);
  });

  it('returns null when no username is provided', () => {
    const { result } = renderHook(() => useProfileImage(undefined));
    expect(result.current).toBeNull();
    expect(mockHttpClient.get).not.toHaveBeenCalled();
  });

  it('fetches the account and returns the medium image url when the user has an image', async () => {
    mockHttpClient.get.mockResolvedValueOnce({
      data: {
        profile_image: {
          has_image: true,
          image_url_medium: 'http://localhost:18000/media/profile-images/medium.jpg',
        },
      },
    });

    const { result } = renderHook(() => useProfileImage(username));

    await waitFor(() => expect(result.current).toBe('http://localhost:18000/media/profile-images/medium.jpg'));

    expect(mockHttpClient.get).toHaveBeenCalledWith(
      `http://localhost:18000/api/user/v1/accounts/${username}`,
    );
  });

  it('returns null when the user has not uploaded an image', async () => {
    mockHttpClient.get.mockResolvedValueOnce({
      data: { profile_image: { has_image: false, image_url_medium: 'http://example.com/default.jpg' } },
    });

    const { result } = renderHook(() => useProfileImage(username));

    await waitFor(() => expect(mockHttpClient.get).toHaveBeenCalled());
    expect(result.current).toBeNull();
  });

  it('fails silently and returns null when the request errors', async () => {
    mockHttpClient.get.mockRejectedValueOnce(new Error('network error'));

    const { result } = renderHook(() => useProfileImage(username));

    await waitFor(() => expect(mockHttpClient.get).toHaveBeenCalled());
    expect(result.current).toBeNull();
  });
});

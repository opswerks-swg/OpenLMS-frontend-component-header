import { renderHook, waitFor } from '@testing-library/react';

import { getConfig } from '@edx/frontend-platform';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';

import useAccountName from './useAccountName';

jest.mock('@edx/frontend-platform', () => ({
  getConfig: jest.fn(),
}));

jest.mock('@edx/frontend-platform/auth', () => ({
  getAuthenticatedHttpClient: jest.fn(),
}));

describe('useAccountName', () => {
  const mockHttpClient = { get: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    getConfig.mockReturnValue({ LMS_BASE_URL: 'http://localhost:18000' });
    getAuthenticatedHttpClient.mockReturnValue(mockHttpClient);
  });

  it('returns null and does not fetch when no username is provided', () => {
    const { result } = renderHook(() => useAccountName(undefined));
    expect(result.current).toBeNull();
    expect(mockHttpClient.get).not.toHaveBeenCalled();
  });

  it('fetches and joins first and last name', async () => {
    mockHttpClient.get.mockResolvedValueOnce({ data: { firstName: ' Juan ', lastName: 'Dela  Cruz' } });
    const { result } = renderHook(() => useAccountName('juan'));
    await waitFor(() => expect(result.current).toBe('Juan Dela Cruz'));
    expect(mockHttpClient.get).toHaveBeenCalledWith('http://localhost:18000/api/openlms/me/name/');
  });

  it('returns only the part that is set', async () => {
    mockHttpClient.get.mockResolvedValueOnce({ data: { firstName: '', lastName: 'Cruz' } });
    const { result } = renderHook(() => useAccountName('juan'));
    await waitFor(() => expect(mockHttpClient.get).toHaveBeenCalled());
    await waitFor(() => expect(result.current).toBe('Cruz'));
  });

  it('returns null when both names are empty', async () => {
    mockHttpClient.get.mockResolvedValueOnce({ data: { firstName: '', lastName: '' } });
    const { result } = renderHook(() => useAccountName('juan'));
    await waitFor(() => expect(mockHttpClient.get).toHaveBeenCalled());
    expect(result.current).toBeNull();
  });

  it('returns null when the request fails', async () => {
    mockHttpClient.get.mockRejectedValueOnce(new Error('Network error'));
    const { result } = renderHook(() => useAccountName('juan'));
    await waitFor(() => expect(mockHttpClient.get).toHaveBeenCalled());
    expect(result.current).toBeNull();
  });
});

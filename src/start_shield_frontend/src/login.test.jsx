import React from 'react';
import { render } from '@testing-library/react';
import { AuthProvider } from '../context/AppContext';
import Login from './login';

describe('Login', () => {


it('Should redirect when isAuthenticated is true', async () => {
  const mockCheckUser = jest.fn();
  const mockUseAuth = jest.fn().mockReturnValue({
    isAuthenticated: true,
    identity: {},
  });

  jest.spyOn(require('./context/AppContext'), 'useAuth').mockImplementation(mockUseAuth);
  jest.spyOn(console, 'log').mockImplementation(() => {});

  const { rerender } = render(<Login />);

  await waitFor(() => {
    expect(console.log).toHaveBeenCalledWith("Auth state:", { isAuthenticated: true, identity: {} });
    expect(mockCheckUser).toHaveBeenCalled();
  });

  // Simulate a change in authentication state
  mockUseAuth.mockReturnValue({
    isAuthenticated: false,
    identity: null,
  });

  rerender(<Login />);

  await waitFor(() => {
    expect(console.log).toHaveBeenCalledWith("Auth state:", { isAuthenticated: false, identity: null });
    expect(mockCheckUser).toHaveBeenCalledTimes(1); // Should not be called again
  });
});

it('Should call getCallerPrincipal when backendActor is available', async () => {
  const mockPrincipal = {
    toText: jest.fn().mockReturnValue('test-principal')
  };
  const mockBackendActor = {
    getCallerPrincipal: jest.fn().mockResolvedValue(mockPrincipal)
  };

  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});

  const { rerender } = render(
    <AuthProvider>
      <Login />
    </AuthProvider>
  );

  // Simulate backendActor becoming available
  jest.spyOn(require('./context/AppContext'), 'useAuth').mockReturnValue({
    backendActor: mockBackendActor,
    isAuthenticated: true,
  });

  rerender(
    <AuthProvider>
      <Login />
    </AuthProvider>
  );

  await waitFor(() => {
    expect(mockBackendActor.getCallerPrincipal).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('Caller principal from backend:', 'test-principal');
  });
});
});

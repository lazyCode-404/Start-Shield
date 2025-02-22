import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '../../context/AppContext';
import AdminNavbar from './AdminNavBar';

describe('AdminNavbar', () => {


it('Should display loading state when user details are being fetched', async () => {
  const mockBackendActor = {
    getCallerPrincipal: jest.fn().mockResolvedValue('some-principal'),
    getUserByPrincipal: jest.fn().mockResolvedValue({ name: 'John Doe', email: 'john@example.com' })
  };

  jest.spyOn(React, 'useState').mockImplementation(() => [{ name: '', email: '' }, jest.fn()]);
  
  const { getByText } = render(
    <Router>
      <AuthProvider>
        <AdminNavbar adminName="Admin" />
      </AuthProvider>
    </Router>
  );

  // Mock the useAuth hook
  jest.spyOn(require('../../context/AppContext'), 'useAuth').mockReturnValue({
    backendActor: mockBackendActor,
    isAuthenticated: true,
  });

  // Verify that the loading state is displayed
  expect(getByText('Loading...')).toBeInTheDocument();

  // Wait for the user details to be fetched
  await waitFor(() => {
    expect(mockBackendActor.getCallerPrincipal).toHaveBeenCalled();
    expect(mockBackendActor.getUserByPrincipal).toHaveBeenCalled();
  });
});

it('Should show user\'s name and email after successful data fetch', async () => {
  const mockBackendActor = {
    getCallerPrincipal: jest.fn().mockResolvedValue('test-principal'),
    getUserByPrincipal: jest.fn().mockResolvedValue({ name: 'John Doe', email: 'john@example.com' })
  };

  jest.spyOn(require('../../context/AppContext'), 'useAuth').mockReturnValue({
    backendActor: mockBackendActor,
    isAuthenticated: true,
  });

  const { getByText, getByTitle } = render(
    <Router>
      <AuthProvider>
        <AdminNavbar adminName="Admin" />
      </AuthProvider>
    </Router>
  );

  // Initially, it should show "Loading..."
  expect(getByText('Loading...')).toBeInTheDocument();

  // Wait for the user details to be fetched and displayed
  await waitFor(() => {
    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByTitle('Email: john@example.com')).toBeInTheDocument();
  });

  // Verify that the mock functions were called
  expect(mockBackendActor.getCallerPrincipal).toHaveBeenCalled();
  expect(mockBackendActor.getUserByPrincipal).toHaveBeenCalledWith('test-principal');
});

it('Should handle error gracefully when backend actor is not initialized', async () => {
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  
  jest.spyOn(require('../../context/AppContext'), 'useAuth').mockReturnValue({
    backendActor: null,
    isAuthenticated: true,
  });

  const { getByText } = render(
    <Router>
      <AuthProvider>
        <AdminNavbar adminName="Admin" />
      </AuthProvider>
    </Router>
  );

  // Initially, it should show "Loading..."
  expect(getByText('Loading...')).toBeInTheDocument();

  // Wait for the error to be logged
  await waitFor(() => {
    expect(consoleSpy).toHaveBeenCalledWith("Backend actor is not initialized.");
  });

  // Verify that the loading state persists
  expect(getByText('Loading...')).toBeInTheDocument();

  consoleSpy.mockRestore();
});

it('Should prevent multiple simultaneous calls to fetchUserDetails', async () => {
  const mockBackendActor = {
    getCallerPrincipal: jest.fn().mockResolvedValue('test-principal'),
    getUserByPrincipal: jest.fn().mockResolvedValue({ name: 'John Doe', email: 'john@example.com' })
  };

  jest.spyOn(require('../../context/AppContext'), 'useAuth').mockReturnValue({
    backendActor: mockBackendActor,
    isAuthenticated: true,
  });

  const { rerender } = render(
    <Router>
      <AuthProvider>
        <AdminNavbar adminName="Admin" />
      </AuthProvider>
    </Router>
  );

  // Trigger multiple rerenders to simulate multiple calls
  rerender(
    <Router>
      <AuthProvider>
        <AdminNavbar adminName="Admin" />
      </AuthProvider>
    </Router>
  );
  rerender(
    <Router>
      <AuthProvider>
        <AdminNavbar adminName="Admin" />
      </AuthProvider>
    </Router>
  );

  // Wait for any asynchronous operations to complete
  await waitFor(() => {});

  // Verify that getCallerPrincipal and getUserByPrincipal were each called only once
  expect(mockBackendActor.getCallerPrincipal).toHaveBeenCalledTimes(1);
  expect(mockBackendActor.getUserByPrincipal).toHaveBeenCalledTimes(1);
});

it('Should update UI when user logs out', async () => {
  const mockNavigate = jest.fn();
  jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

  const mockLogout = jest.fn();
  jest.spyOn(require('../../context/AppContext'), 'useAuth').mockReturnValue({
    backendActor: {},
    isAuthenticated: true,
    logout: mockLogout
  });

  const { getByText, queryByText } = render(
    <Router>
      <AdminNavbar adminName="Test Admin" />
    </Router>
  );

  // Check if the logout button is present
  const logoutButton = getByText('Logout');
  expect(logoutButton).toBeInTheDocument();

  // Simulate logout
  fireEvent.click(logoutButton);

  // Wait for logout to complete
  await waitFor(() => {
    expect(mockLogout).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  // Check if the user name is no longer displayed
  expect(queryByText('Test Admin')).not.toBeInTheDocument();
});

it('Should navigate to home page when logo or home button is clicked', () => {
  const mockNavigate = jest.fn();
  jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

  jest.spyOn(require('../../context/AppContext'), 'useAuth').mockReturnValue({
    backendActor: {},
    isAuthenticated: true,
  });

  const { getByAltText, getByRole } = render(
    <Router>
      <AdminNavbar adminName="Test Admin" />
    </Router>
  );

  const logo = getByAltText('StartShield Logo');
  const homeButton = getByRole('button', { name: '' }); // Home button has no text, only icon

  fireEvent.click(logo);
  expect(mockNavigate).toHaveBeenCalledWith('/');

  fireEvent.click(homeButton);
  expect(mockNavigate).toHaveBeenCalledWith('/');

  expect(mockNavigate).toHaveBeenCalledTimes(2);
});

it('Should display admin name in hero section', () => {
  const adminName = 'John Doe';
  const mockNavigate = jest.fn();
  jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

  jest.spyOn(require('../../context/AppContext'), 'useAuth').mockReturnValue({
    backendActor: {},
    isAuthenticated: true,
  });

  const { getByText } = render(
    <Router>
      <AdminNavbar adminName={adminName} />
    </Router>
  );

  const heroText = getByText(`Hello and Welcome back, ${adminName}!`);
  expect(heroText).toBeInTheDocument();
});

it('Should display search bar and handle user input', () => {
  const { getByPlaceholderText } = render(
    <Router>
      <AuthProvider>
        <AdminNavbar adminName="Test Admin" />
      </AuthProvider>
    </Router>
  );

  const searchInput = getByPlaceholderText('Search users, policies, or tokens...');
  expect(searchInput).toBeInTheDocument();

  fireEvent.change(searchInput, { target: { value: 'test search' } });
  expect(searchInput.value).toBe('test search');
});

it('Should show dropdown menu with correct options when profile icon is clicked', () => {
  const mockNavigate = jest.fn();
  jest.spyOn(require('react-router-dom'), 'useNavigate').mockReturnValue(mockNavigate);

  jest.spyOn(require('../../context/AppContext'), 'useAuth').mockReturnValue({
    backendActor: {},
    isAuthenticated: true,
    logout: jest.fn(),
  });

  const { getByRole, getByText } = render(
    <Router>
      <AdminNavbar adminName="Test Admin" />
    </Router>
  );

  const profileIcon = getByRole('img', { hidden: true });
  expect(profileIcon).toBeInTheDocument();

  fireEvent.click(profileIcon);

  expect(getByText('Notifications')).toBeInTheDocument();
  expect(getByText('Settings')).toBeInTheDocument();
  expect(getByText('Logout')).toBeInTheDocument();
});

it('Should handle case when user details are not found for given principal', async () => {
  const mockBackendActor = {
    getCallerPrincipal: jest.fn().mockResolvedValue('test-principal'),
    getUserByPrincipal: jest.fn().mockResolvedValue(null)
  };

  const consoleSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

  jest.spyOn(require('../../context/AppContext'), 'useAuth').mockReturnValue({
    backendActor: mockBackendActor,
    isAuthenticated: true,
  });

  const { getByText } = render(
    <Router>
      <AuthProvider>
        <AdminNavbar adminName="Admin" />
      </AuthProvider>
    </Router>
  );

  // Initially, it should show "Loading..."
  expect(getByText('Loading...')).toBeInTheDocument();

  // Wait for the user details fetch attempt
  await waitFor(() => {
    expect(mockBackendActor.getCallerPrincipal).toHaveBeenCalled();
    expect(mockBackendActor.getUserByPrincipal).toHaveBeenCalledWith('test-principal');
    expect(consoleSpy).toHaveBeenCalledWith("No user details found for the given principal.");
  });

  // Verify that the loading state persists
  expect(getByText('Loading...')).toBeInTheDocument();

  consoleSpy.mockRestore();
});
});

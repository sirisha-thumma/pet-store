import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import LoginPage from '../../pages/Login'
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { PET_STORE_API_URL } from '../../utils/constants';

jest.mock('axios');
jest.mock('../../context/AuthContext', () => ({
    AuthProvider: jest.fn(({ children }) => <>{children}</>),
    useAuth: jest.fn(),
}));
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

describe('LoginPage', () => {
  const mockLocation = { pathname: '/profile' };
  const mockNavigate = jest.fn();
  const mockLogin = jest.fn();
  const mockLogout = jest.fn();

  beforeEach(() => {
    useLocation.mockReturnValue(mockLocation);
    useNavigate.mockReturnValue(mockNavigate);
    useAuth.mockReturnValue({
      isLoggedIn: false,
      sessionId: null,
      login: mockLogin,
      logout: mockLogout,
    });
  });

  test('renders login form and handles login click', async () => {
    axios.get.mockResolvedValueOnce({ data: 'SessionId: 1234' });
    const expectedUrl = `${PET_STORE_API_URL}/user/login?username=testUser&password=testPassword`

    render(<LoginPage />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'testUser' } });
    fireEvent.change(screen.getByTestId('password'), { target: { value: 'testPassword' } });
    fireEvent.submit(screen.getByText('Login'));

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(expectedUrl);
    });
  });

  test('handles login failure', async () => {
    axios.get.mockRejectedValueOnce(new Error('Login failed'));

    render(<LoginPage />);

    fireEvent.submit(screen.getByRole('button'));

    await waitFor(() => {
      expect(mockLogout).toHaveBeenCalled();
    });
  });

  test('redirects to home if already logged in', () => {
    require('../../context/AuthContext').useAuth.mockReturnValue({
        isLoggedIn: true,
        sessionId: 'testid',
        login: mockLogin,
        logout: mockLogout,
    });

    render(<LoginPage />);

    expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
  });
});

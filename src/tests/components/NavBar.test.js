import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavBar from '../../components/NavBar';

jest.mock('../../context/AuthContext', () => ({
    AuthProvider: jest.fn(({ children }) => <>{children}</>),
    useAuth: jest.fn(),
}));

describe('NavBar', () => {
  test('renders welcome message and navigation links when not logged in', () => {
    require('../../context/AuthContext').useAuth.mockReturnValue({
        isLoggedIn: false,
        sessionId: null,
        login: jest.fn(),
        logout: jest.fn(),
    });

    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    expect(screen.getByText(/Welcome to pet store/i)).toBeInTheDocument();
    expect(screen.getByText('Pet')).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test('renders logout button when user is logged in', () => {
    require('../../context/AuthContext').useAuth.mockReturnValue({
        isLoggedIn: true,
        sessionId: 'testid',
        login: jest.fn(),
        logout: jest.fn(),
    });

    render(
      <BrowserRouter>
          <NavBar />
      </BrowserRouter>
    );

    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  test('calls logout function when logout button is clicked', () => {
    const logoutMock = jest.fn();
    require('../../context/AuthContext').useAuth.mockReturnValue({
        isLoggedIn: true,
        sessionId: 'testid',
        login: jest.fn(),
        logout: logoutMock,
    });

    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText(/Logout/i));
    expect(logoutMock).toHaveBeenCalledTimes(1);
  });
});

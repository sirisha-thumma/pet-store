import React from 'react';
import { render, screen } from '@testing-library/react';
import { useLocation, BrowserRouter } from 'react-router-dom';
import RequireAuth from '../../components/RequireAuth';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

jest.mock('../../context/AuthContext', () => ({
    AuthProvider: jest.fn(({ children }) => <>{children}</>),
    useAuth: jest.fn(),
}));

describe('RequireAuth', () => {
  test('renders children when user is loggedin', () => {
    require('../../context/AuthContext').useAuth.mockReturnValue({
        isLoggedIn: true,
        sessionId: 'testid',
    });

    render(
      <RequireAuth>
        <div data-testid="child">Child Component</div>
      </RequireAuth>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  test('redirects to login page when user is not loggedin', () => {
    require('../../context/AuthContext').useAuth.mockReturnValue({
        isLoggedIn: false,
        sessionId: null,
    });

    useLocation.mockReturnValue({ pathname: '/protected-route' });

    render(
        <BrowserRouter>
            <RequireAuth>
                <div data-testid="child">Child Component</div>
            </RequireAuth>
        </BrowserRouter>
    );

    expect(screen.queryByTestId('child')).not.toBeInTheDocument();
    expect(window.location.pathname).toBe('/login');

  });
});

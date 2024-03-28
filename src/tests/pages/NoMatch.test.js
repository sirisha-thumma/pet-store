import React from 'react';
import { render, screen } from '@testing-library/react';
import NoMatchPage from '../../pages/NoMatch';

describe('NoMatchPage', () => {
  it('renders properly', () => {
    render(<NoMatchPage />);
    expect(screen.getByText('Page Not Found!')).toBeInTheDocument();
  });
});
import React from 'react';
import { render } from '@testing-library/react';
import HomePage from '../../pages/Home';
import Pets from '../../components/Pets';

jest.mock('../../components/Pets', () => jest.fn(() => <div>Pets Component</div>));

describe('HomePage', () => {
  test('renders the Pets component', () => {
    render(<HomePage />);
    expect(Pets).toHaveBeenCalled();
  });
});

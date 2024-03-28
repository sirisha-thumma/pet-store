import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PetSearch from '../../components/PetSearch';
import { PET_STATUSES } from '../../utils/constants';

describe('PetSearch', () => {
  test('renders select options correctly', () => {
    const petStatus = '';
    const setPetStatus = jest.fn();

    render(<PetSearch petStatus={petStatus} setPetStatus={setPetStatus} />);

    const selectElement = screen.getByText(/Find by Status:/i);
    expect(selectElement).toBeInTheDocument();

    PET_STATUSES.forEach((status) => {
      expect(screen.getByText(status)).toBeInTheDocument();
    });
  });

  test('sets pet status when a status is selected', () => {
    const petStatus = '';
    const setPetStatus = jest.fn();

    render(<PetSearch petStatus={petStatus} setPetStatus={setPetStatus} />);

    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'available' } });

    expect(setPetStatus).toHaveBeenCalledWith('available');
  });
});

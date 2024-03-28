import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import Pets from '../../components/Pets';
import { PET_STORE_API_URL } from '../../utils/constants';

jest.mock('axios');

describe('Pets', () => {
  const mockPets = [
    { id: 1, name: 'Rabbit', status: 'available', category: { name: 'Category 1' }, tags: [{ name: 'Tag 1' }] },
    { id: 2, name: 'Dog', status: 'pending', category: { name: 'Category 2' }, tags: [{ name: 'Tag 2' }] }
  ];

  beforeEach(() => {
    axios.get.mockResolvedValueOnce({ data: mockPets });
  });

  test('renders properly with loading spinner while fetching pets', async () => {
    const expectedUrl = `${PET_STORE_API_URL}/pet/findByStatus?status=available`

    axios.get.mockResolvedValueOnce({ data: [] });
    render(<Pets />);
    expect(screen.getByTestId('loader-spinner')).toBeInTheDocument();
    
    await waitFor(() => {
        expect(axios.get).toHaveBeenCalledWith(expectedUrl);
    });
  });

  test('renders properly with pet data', async () => {
    render(<Pets />);
    await waitFor(() => {
      mockPets.forEach(pet => {
        expect(screen.getByText(pet.name)).toBeInTheDocument();
      });
    });
  });
});

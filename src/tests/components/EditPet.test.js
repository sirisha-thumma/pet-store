import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import axios from 'axios';
import EditPet from '../../components/EditPet';
import { PET_STORE_API_URL } from '../../utils/constants';

jest.mock('axios');

describe('EditPet', () => {
  const mockPetData = {
    id: 1,
    name: 'Test Pet',
    status: 'available'
  };

  test('renders properly with selected pet data', () => {
    render(
      <EditPet petData={mockPetData} setShowModal={() => {}} petStatus="available" fetchPets={() => {}} />
    );

    expect(screen.getByText('Edit Pet')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('Test Pet');
    expect(screen.getByRole('combobox')).toHaveValue('available');
  });

  test('updates pet name on input change', () => {
    render(
      <EditPet petData={mockPetData} setShowModal={() => {}} petStatus="available" fetchPets={() => {}} />
    );

    const nameInput = screen.getByRole('textbox');
    fireEvent.change(nameInput, { target: { value: 'New Pet Name' } });
    expect(nameInput).toHaveValue('New Pet Name');
  });

  test('updates pet status on select change', () => {
    render(
      <EditPet petData={mockPetData} setShowModal={() => {}} petStatus="available" fetchPets={() => {}} />
    );

    const statusSelect = screen.getByRole('combobox');
    fireEvent.change(statusSelect, { target: { value: 'pending' } });
    expect(statusSelect).toHaveValue('pending');
  });

  test('calls API to save data on Save button click', async () => {
    const fetchPetsMock = jest.fn();
    const setShowModalMock = jest.fn();

    axios.post.mockResolvedValueOnce({});

    render(
      <EditPet petData={mockPetData} setShowModal={setShowModalMock} petStatus="available" fetchPets={fetchPetsMock} />
    );

    fireEvent.click(screen.getByRole('button', {name: 'Save'}));

    await waitFor(() => {
      const expectedUrl = `${PET_STORE_API_URL}/pet/${mockPetData.id}?name=${mockPetData.name}&status=${mockPetData.status}`;
      expect(axios.post).toHaveBeenCalledWith(expectedUrl);
    });
  });

  test('closes modal on Cancel button click', () => {
    const setShowModalMock = jest.fn();

    render(
      <EditPet petData={mockPetData} setShowModal={setShowModalMock} petStatus="available" fetchPets={() => {}} />
    );

    fireEvent.click(screen.getByRole('button', {name: 'Cancel'}));
    expect(setShowModalMock).toHaveBeenCalledWith(false);
  });
});

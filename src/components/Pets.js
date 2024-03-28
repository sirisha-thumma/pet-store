import React, { useState, useEffect } from 'react';
import usePetsReducer from '../hooks/usePetsReducer';
import PetSearch from './PetSearch';
import EditPet from './EditPet';
import { MdModeEdit } from "react-icons/md";
import { PET_STORE_API_URL, PET_STATUSES } from '../utils/constants';
import axios from 'axios';
import './pets.css';

const Pets = () => {

  const [petStatus, setPetStatus] = useState(PET_STATUSES[0]);
  const [showModal, setShowModal] = useState(false);
  const [petState, dispatch] = usePetsReducer();
  const [petData, setPetData] = useState(null);

  const fetchPets = async (status) => {
    dispatch({type: 'FETCH_PETS'});
    try {
      const resp = await axios.get(`${PET_STORE_API_URL}/pet/findByStatus?status=${status}`)
      dispatch({ type: 'FETCH_PETS_SUCCESS', payload: resp.data });
    }catch(error) {
      dispatch({ type: 'FETCH_PETS_FAILURE' });
      console.error(error);
    }
  }

  const handleEditIconClick = (pet) => {
    setPetData(pet);
    setShowModal(!showModal);
  }
  
  useEffect(( ) => {
    fetchPets(petStatus);
  }, [petStatus])
  
  if(petState.isLoading) {
    return (
      <div className="loader" data-testid="loader-spinner">
        <div className="spinner" />
      </div>
    )
  }

  if(petState.isError) {
    return <h1>Something went wrong!</h1>
  }

  return (
    <div className="pet-container">
      <PetSearch petStatus={petStatus} setPetStatus={setPetStatus} />
      <table className='pets-table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Category</th>
          <th>Tags</th>
          <th className='edit-pet'>Edit Pet</th>
        </tr>
      </thead>
      <tbody>
      {
          petState?.pets?.map(pet => {
            return (
              <tr key={pet.id}>
                <td>{pet.name}</td>
                <td>{pet.status}</td>
                <td>{pet.category.name}</td>
                <td>{pet.tags.map(tag => tag.name).join(', ')}</td>
                <td className='edit-pet' onClick={() => handleEditIconClick(pet)}><button><MdModeEdit /></button></td>
              </tr>
            )
          })
        }
      </tbody>
      </table>
      {showModal && (<EditPet petData={petData} setPetData={petData} setShowModal={setShowModal} petStatus={petStatus} fetchPets={fetchPets} />)}
    </div>
  )
}

export default Pets;

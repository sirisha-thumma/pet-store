import React, {useState} from 'react'
import {PET_STATUSES, PET_STORE_API_URL} from '../utils/constants';
import './editpet.css'
import axios from 'axios';

const EditPet = ({petData, setShowModal, petStatus, fetchPets}) => {
    const pet = {
        name: petData.name,
        status: petData.status
    }
    const [editedPet, setEditedPet] = useState(pet);

    const handleSaveEdit = () => {
        setShowModal(false)
        axios.post(`${PET_STORE_API_URL}/pet/${petData.id}?name=${editedPet.name}&status=${editedPet.status}`)
        .then(resp => {
            fetchPets(petStatus);
        }).catch(error => {
            console.log(error);
        })
    }

    const handleCancelEdit = () => {
        setShowModal(false)
    }

    const handleDataChange = (e) => {
        const { name, value } = e.target;
        const newData = {
            ...petData,
            [name]: value
        };
        setEditedPet(newData);
    }

  return (
    <div className="modal">
        <div className="modal-content">
        <h2>Edit Pet</h2>
        <div className="form-group">
            <label htmlFor='name'>Name:</label>
            <input
                type="text"
                value={editedPet.name}
                onChange={(e) => handleDataChange(e)}
                name="name"
            />
        </div>
        <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select id="status" value={editedPet.status} onChange={(e) => handleDataChange(e)} name='status'>
                {PET_STATUSES.map((status, index) => (
                <option key={index} value={status}>
                    {status}
                </option>
                ))}
            </select>
        </div>
        
        <button className='save btn' onClick={handleSaveEdit}>Save</button>
        <button className='close btn' onClick={handleCancelEdit}>Cancel</button>
        </div>
    </div>
  )
}

export default EditPet

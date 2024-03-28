import React from 'react'
import { PET_STATUSES } from '../utils/constants';
import './petserach.css';

const PetSearch = ({petStatus, setPetStatus}) => {

    const handleStatusChange = (e) => {
        setPetStatus(e.target.value);
    };


  return (
        <form className='pet-search-form'>
            <label htmlFor="status">Find by Status:</label>
            <select id="pet-status" value={petStatus} onChange={handleStatusChange}>
                {PET_STATUSES.map((status, index) => (
                <option key={index} value={status}>
                    {status}
                </option>
                ))}
            </select>
        </form>
    )
}

export default PetSearch

import React, {useReducer} from 'react'

const initialState = {
    pets: [],
    isLoading: false,
    isError: false
}

const usePetsReducer = () => {
    const reducer = (state, action) => {
        switch(action.type) {
          case 'FETCH_PETS': 
            return {
              ...state,
              isLoading: true,
              isError: false
            }
          case 'FETCH_PETS_SUCCESS': 
            return {
              ...state,
              pets: action.payload,
              isLoading: false,
              isError: false
            }
          case 'FETCH_PETS_FAILURE': 
            return {
              ...state,
              isLoading: false,
              isError: true
            }
          default:
            return state
        }
    
    }
    
    return useReducer(reducer, initialState);
}

export default usePetsReducer

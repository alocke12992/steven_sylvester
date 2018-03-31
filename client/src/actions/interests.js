import axios from 'axios';
export const INTERESTS = 'INTERESTS'
export const ADD_INTEREST = 'ADD_INTEREST'
export const UPDATE_INTEREST = 'UPDATE_INTEREST'
export const DELETE_INTEREST = 'DELETE_INTEREST'

export const getInterests = () => {
  return (dispatch) => {
    axios.get('/api/interests')
      .then(res => dispatch({ type: 'INTERESTS', interests: res.data }))
  }
}

export const addInterest = (interest) => {
  return (dispatch) => {
    axios.post('/api/interests', { interest })
      .then(res => dispatch({ type: 'ADD_INTEREST', interest: res.data }))
  }
}

export const updateInterest = (interest) => {
  debugger
  return (dispatch) => {
    axios.put(`/api/interests/${ interest.id }`, { interest })
      .then(res => dispatch({ type: 'UPDATE_INTEREST', interest: res.data }))
  }
}

export const deleteInterest = (id) => {
  return (dispatch) => {
    axios.delete(`/api/interests/${ id }`)
      .then(() => dispatch({ type: 'DELETE_INTEREST', id }))
  }
}
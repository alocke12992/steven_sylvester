import axios from 'axios';
export const RESEARCH_INTERESTS = 'RESEARCH_INTERESTS'
export const ADD_RESEARCH_INTEREST = 'ADD_RESEARCH_INTEREST'
export const UPDATE_RESEARCH_INTEREST = 'UPDATE_RESEARCH_INTEREST'
export const DELETE_RESEARCH_INTEREST = 'DELETE_RESEARCH_INTEREST'

export const getResearch = (cb) => {
  return (dispatch) => {
    axios.get('/api/research_interests')
      .then(res => dispatch({type: RESEARCH_INTERESTS, researchInterests: res.data, headers: res.headers}))
      .then(cb())
  }
}

export const addResearch = (research_interest) => {
  return (dispatch) => {
    axios.post('/api/research_interests', {research_interest})
      .then(res => dispatch({type: ADD_RESEARCH_INTEREST, researchInterest: res.data, headers: res.headers}))
  }
}

export const updateResearch = (research_interest) => {
  return (dispatch) => {
    axios.put(`/api/research_interests/${research_interest.id}`, {research_interest})
      .then(res => dispatch({type: UPDATE_RESEARCH_INTEREST, researchInterest: res.data, headers: res.headers}))
  }
}

export const deleteResearch = (id) => {
  return (dispatch) => {
    axios.delete(`/api/research_interests/${id}`)
      .then(res => dispatch({type: DELETE_RESEARCH_INTEREST, id, headers: res.headers}))
  }
}
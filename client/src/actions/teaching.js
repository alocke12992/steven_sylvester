import axios from 'axios';
import {setHeaders} from './headers';
export const UNIVERSITIES = 'UNIVERSITIES'
export const ADD_UNIVERSITY = 'ADD_UNIVERSITY'
export const UPDATE_UNIVERSITY = 'UPDATE_UNIVERSITY'
export const DELETE_UNIVERSITY = 'DELETE_UNIVERSITY'

export const getUniversities = (cb) => {
  return (dispatch) => {
    axios.get('/api/universities')
      .then((res) => {
        dispatch({type: UNIVERSITIES, universities: res.data, });
        dispatch(setHeaders(res.headers));
      })
      .then(cb())
      .catch((res) => {
        dispatch(setHeaders(res.headers));
      })
  };
};

export const addUniversity = (university) => {
  return (dispatch) => {
    axios.post(`/api/universities`, university)
      .then((res) => {
        dispatch({type: ADD_UNIVERSITY, university: res.data})
        dispatch(setHeaders(res.headers));
      })
      .catch((res) => {
        dispatch(setHeaders(res.headers));
      })
  }
}

export const updateUniversity = (university) => {
  return (dispatch) => {
    axios.put(`/api/universities/${university.id}`, university)
      .then((res) => {
        dispatch({
          type: UPDATE_UNIVERSITY,
          university: res.data,
        });
        dispatch(setHeaders(res.headers));
      })
      .catch((res) => {
        dispatch(setHeaders(res.headers));
      });
  };
};

export const deleteUniversity = (id) => {
  return (dispatch) => {
    axios.delete(`/api/universities/${id}`)
      .then(res => dispatch({type: DELETE_UNIVERSITY, id, headers: res.headers}))
  }
}
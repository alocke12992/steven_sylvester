import axios from 'axios';
import {setHeaders} from './headers';
export const DATA = 'DATA'
export const ADD_DATUM = 'ADD_DATUM'
export const UPDATE_DATUM = 'UPDATE_DATUM'
export const DELETE_DATUM = 'DELETE_DATUM'

export const getData = (cb) => {
  return (dispatch) => {
    axios.get('/api/data')
      .then((res) => {
        dispatch({type: DATA, data: res.data, });
        dispatch(setHeaders(res.headers));
      })
      .then(cb())
      .catch((res) => {
        dispatch(setHeaders(res.headers));
      })
  };
};

export const addDatum = (d) => {
  let title = encodeURIComponent(d.title)
  let description = encodeURIComponent(d.description)
  return (dispatch) => {
    const data = new FormData()
    data.append('file', d.file)
    axios.post(`/api/data?title=${title}&description=${description}`, data)
      .then((res) => {
        dispatch({type: ADD_DATUM, datum: res.data})
        dispatch(setHeaders(res.headers));
      })
      .catch((res) => {
        dispatch(setHeaders(res.headers));
      })
  }
}

export const updateDatum = (d) => {
  let title = encodeURIComponent(d.title)
  let description = encodeURIComponent(d.description)
  return (dispatch) => {
    const data = new FormData()
    data.append('file', d.file)
    axios.put(`/api/data/${d.id}?title=${title}&description=${description}`, data)
      .then((res) => {
        dispatch({
          type: UPDATE_DATUM,
          datum: res.data,
        });
        dispatch(setHeaders(res.headers));
      })
      .catch((res) => {
        dispatch(setHeaders(res.headers));
      });
  };
};

export const deleteDatum = (id) => {
  return (dispatch) => {
    axios.delete(`/api/data/${id}`)
      .then(res => dispatch({type: DELETE_DATUM, id, headers: res.headers}))
  }
}
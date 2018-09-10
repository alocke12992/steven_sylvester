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

export const addPublication = (u) => {
  let name = encodeURIComponent(u.name)
  return (dispatch) => {
    const data = new FormData()
    axios.post(`/api/universities?title=${name}`, data)
      .then((res) => {
        dispatch({type: ADD_UNIVERSITY, university: res.data})
        dispatch(setHeaders(res.headers));
      })
      .catch((res) => {
        dispatch(setHeaders(res.headers));
      })
  }
}

export const updatePublication = (p) => {
  let title = encodeURIComponent(p.title)
  let abstract = encodeURIComponent(p.abstract)
  let authors = encodeURIComponent(p.authors)
  let date = encodeURIComponent(p.date)
  let journal = encodeURIComponent(p.journal)
  return (dispatch) => {
    const data = new FormData()
    data.append('file', p.file)
    axios.put(`/api/publications/${p.id}?title=${title}&abstract=${abstract}&authors=${authors}&journal=${journal}&links=${p.links}&date=${date}&pub_type=${p.pub_type}`, data)
      .then((res) => {
        dispatch({
          type: UPDATE_UNIVERSITY,
          publication: res.data,
        });
        dispatch(setHeaders(res.headers));
      })
      .catch((res) => {
        dispatch(setHeaders(res.headers));
      });
  };
};

export const deletePublication = (id) => {
  return (dispatch) => {
    axios.delete(`/api/publications/${id}`)
      .then(res => dispatch({type: DELETE_UNIVERSITY, id, headers: res.headers}))
  }
}
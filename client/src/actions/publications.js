import axios from 'axios';
import {setHeaders} from './headers';
export const PUBLICATIONS = 'PUBLICATIONS'
export const ADD_PUBLICATION = 'ADD_PUBLICATION'
export const UPDATE_PUBLICATION = 'UPDATE_PUBLICATION'
export const DELETE_PUBLICATION = 'DELETE_PUBLICATION'

export const getPublications = (cb) => {
  return (dispatch) => {
    axios.get('/api/publications')
      .then((res) => {
        dispatch({type: PUBLICATIONS, publications: res.data, });
        dispatch(setHeaders(res.headers));
      })
      .then(cb())
      .catch((res) => {
        dispatch(setHeaders(res.headers));
      })
  };
};

export const addPublication = (p) => {
  return (dispatch) => {
    const data = new FormData()
    data.append('file', p.file)
    axios.post(`/api/publications?title=${p.title}&abstract=${p.abstract}&authors=${p.authors}&journal=${p.journal}&links=${p.links}&date=${p.date}&pub_type=${p.pub_type}`, data)
      .then((res) => {
        dispatch({type: ADD_PUBLICATION, publication: res.data})
        dispatch(setHeaders(res.headers));
      })
      .catch((res) => {
        dispatch(setHeaders(res.headers));
      })
  }
}

export const updatePublication = (p) => {
  return (dispatch) => {
    const data = new FormData()
    data.append('file', p.file)
    axios.put(`/api/publications/${p.id}?title=${p.title}&abstract=${p.abstract}&authors=${p.authors}&journal=${p.journal}&links=${p.links}&date=${p.date}&pub_type=${p.pub_type}`, data)
      .then((res) => {
        dispatch({
          type: UPDATE_PUBLICATION,
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
      .then(res => dispatch({type: DELETE_PUBLICATION, id, headers: res.headers}))
  }
}
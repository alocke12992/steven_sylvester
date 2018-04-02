import axios from 'axios';
import {setHeaders} from '../actions/headers';
export const CV = 'CV'
export const ADD_CV = 'ADD_CV'
export const UPDATE_CV = 'UPDATE_CV'

export const getCv = (cb = () => {}) => {
  return (dispatch) => {
    axios
      .get('/api/cvs')
      .then((res) => {
        dispatch({
          type: CV,
          cv: res.data,
        });
        dispatch(setHeaders(res.headers));
      })
      .catch((res) => {
        dispatch(setHeaders(res.headers));
      })
      .then(() => {
        cb();
      });
  };
};

export const addCv = (cv) => {
  return (dispatch) => {
    axios.post("/api/cvs", {cv})
      .then((res) => {
        dispatch({type: ADD_CV, cv: res.data})
        dispatch(setHeaders(res.headers));
      })
      .catch((res) => {
        dispatch(setHeaders(res.headers));
      })
  }
}

export const updateCv = (cv) => {
  return (dispatch) => {
    axios
      .put(`/api/cvs/${cv.id}`, {
        cv,
      })
      .then((res) => {
        dispatch({
          type: UPDATE_CV,
          cv: res.data,
        });
        dispatch(setHeaders(res.headers));
      })
      .catch((res) => {
        dispatch(setHeaders(res.headers));
      });
  };
};
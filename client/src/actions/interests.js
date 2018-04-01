import axios from 'axios';
import {setHeaders} from '../actions/headers';
export const INTERESTS = 'INTERESTS'
export const UPDATE_INTERESTS = 'UPDATE_INTERESTS'

export const getInterests = (cb = () => {}) => {
  return (dispatch) => {
    axios
      .get('/api/interests')
      .then((res) => {
        dispatch({
          type: INTERESTS,
          interests: res.data,
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

export const updateInterests = (interests) => {
  return (dispatch) => {
    axios
      .put(`/api/interests/${interests.id}`, {
        interests,
      })
      .then((res) => {
        dispatch({
          type: UPDATE_INTERESTS,
          interests: res.data,
        });
        dispatch(setHeaders(res.headers));
      })
      .catch((res) => {
        dispatch(setHeaders(res.headers));
      });
  };
};

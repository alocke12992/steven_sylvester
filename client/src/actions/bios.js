import axios from 'axios';
import {setHeaders} from '../actions/headers';
export const BIOS = 'BIOS'
export const UPDATE_BIOS = 'UPDATE_BIOS'

export const getBios = (cb = () => {}) => {
  return (dispatch) => {
    axios
      .get('/api/bios')
      .then((res) => {
        dispatch({
          type: BIOS,
          bios: res.data,
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

export const updateBios = (bios) => {
  return (dispatch) => {
    axios
      .put(`/api/bios/${bios.id}`, {
        bios,
      })
      .then((res) => {
        dispatch({
          type: UPDATE_BIOS,
          bios: res.data,
        });
        dispatch(setHeaders(res.headers));
      })
      .catch((res) => {
        dispatch(setHeaders(res.headers));
      });
  };
};

import {
  DATA,
  ADD_DATUM,
  UPDATE_DATUM,
  DELETE_DATUM,
} from '../actions/data';

const data = (state = [], action) => {
  switch (action.type) {
    case DATA:
      return action.data;
    case ADD_DATUM:
      return [action.datum, ...state]
    case UPDATE_DATUM:
      return state.map(d => {
        if (d.id === action.datum.id) return action.datum;
        return d;
      });
    case DELETE_DATUM:
      return state.filter(d => d.id !== action.id);
    default:
      return state;
  }
};

export default data;

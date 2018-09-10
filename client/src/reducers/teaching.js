import {
  UNIVERSITIES,
  ADD_UNIVERSITY,
  UPDATE_UNIVERSITY,
  DELETE_UNIVERSITY,
} from '../actions/teaching';

const teaching = (state = [], action) => {
  switch (action.type) {
    case UNIVERSITIES:
      return action.universities;
    case ADD_UNIVERSITY:
      return [action.university, ...state]
    case UPDATE_UNIVERSITY:
      return state.map(u => {
        if (u.id === action.university.id) return action.university;
        return u;
      });
    case DELETE_UNIVERSITY:
      return state.filter(u => u.id !== action.id);
    default:
      return state;
  }
};

export default teaching;

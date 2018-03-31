import {
  INTERESTS,
  ADD_INTEREST,
  UPDATE_INTEREST,
  DELETE_INTEREST,
} from '../actions/interests';

const interests = (state = [], action) => {
  switch (action.type) {
    case INTERESTS:
      return action.interests;
    case ADD_INTEREST:
      return [action.interest, ...state];
    case UPDATE_INTEREST:
      return state.map(a => {
        if (a.id === action.interest.id) return action.interest;
        return a;
      });
    case DELETE_INTEREST:
      return state.filter(a => a.id !== action.id);
    default:
      return state;
  }
};

export default interests;

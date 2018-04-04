import {
  CV,
  ADD_CV,
  UPDATE_CV,
} from '../actions/cv';

const cv = (state = [], action) => {
  switch (action.type) {
    case CV:
      return action.cv;
    case ADD_CV:
      return {cv, ...state}
    case UPDATE_CV:
      return action.cv
    default:
      return state;
  }
};

export default cv;

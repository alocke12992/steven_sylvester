import {
  INTERESTS,
  UPDATE_INTERESTS,
} from '../actions/interests';

const interests = (state = {}, action) => {
  switch (action.type) {
    case INTERESTS:
      return action.interests;
    case UPDATE_INTERESTS:
      return action.interests
    default:
      return state;
  }
};

export default interests;

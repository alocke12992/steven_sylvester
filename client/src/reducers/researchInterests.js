import {
  RESEARCH_INTERESTS,
  ADD_RESEARCH_INTEREST,
  UPDATE_RESEARCH_INTEREST,
  DELETE_RESEARCH_INTEREST,
} from '../actions/researchInterests';

const researchInterests = (state = [], action) => {
  switch (action.type) {
    case RESEARCH_INTERESTS:
      return action.researchInterests;
    case ADD_RESEARCH_INTEREST:
      return [action.researchInterest, ...state];
    case UPDATE_RESEARCH_INTEREST:
      return state.map(a => {
        if (a.id === action.researchInterest.id) return action.researchInterest;
        return a;
      });
    case DELETE_RESEARCH_INTEREST:
      return state.filter(a => a.id !== action.id);
    default:
      return state;
  }
};

export default researchInterests;
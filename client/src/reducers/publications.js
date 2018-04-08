import {
  PUBLICATIONS,
  ADD_PUBLICATION,
  UPDATE_PUBLICATION,
  DELETE_PUBLICATION,
} from '../actions/publications';

const publications = (state = [], action) => {
  switch (action.type) {
    case PUBLICATIONS:
      return action.publications;
    case ADD_PUBLICATION:
      return [action.publication, ...state]
    case UPDATE_PUBLICATION:
      return state.map(p => {
        if (p.id === action.publication.id) return action.publication;
        return p;
      });
    case DELETE_PUBLICATION:
      return state.filter(p => p.id !== action.id);
    default:
      return state;
  }
};

export default publications;

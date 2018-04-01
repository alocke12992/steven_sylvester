import {
  BIOS,
  UPDATE_BIOS,
} from '../actions/bios';

const bios = (state = {}, action) => {
  switch (action.type) {
    case BIOS:
      return action.bios;
    case UPDATE_BIOS:
      return action.bios
    default:
      return state;
  }
};

export default bios;
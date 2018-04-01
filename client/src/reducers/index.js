import {combineReducers} from 'redux';
import bios from './bios';
import user from './user';
import flash from './flash';
import interests from './interests';
import researchInterests from './researchInterests';

const rootReducer = combineReducers({
  user,
  flash,
  interests,
  researchInterests,
  bios,
});

export default rootReducer;

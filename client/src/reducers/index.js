import {combineReducers} from 'redux';
import bios from './bios';
import publications from './publications';
import user from './user';
import flash from './flash';
import interests from './interests';
import researchInterests from './researchInterests';
import settings from './settings'

const rootReducer = combineReducers({
  user,
  flash,
  interests,
  researchInterests,
  bios,
  publications,
  settings,
});

export default rootReducer;

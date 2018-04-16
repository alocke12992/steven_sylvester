import {combineReducers} from 'redux';
import bios from './bios';
import publications from './publications';
import user from './user';
import flash from './flash';
import interests from './interests';
import researchInterests from './researchInterests';
import settings from './settings';
import data from './data';

const rootReducer = combineReducers({
  user,
  flash,
  interests,
  researchInterests,
  bios,
  publications,
  settings,
  data,
});

export default rootReducer;

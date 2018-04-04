import {combineReducers} from 'redux';
import bios from './bios';
import cv from './cv';
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
  cv,
  settings,
});

export default rootReducer;

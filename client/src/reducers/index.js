import {combineReducers} from 'redux';
import user from './user';
import flash from './flash';
import interests from './interests';
import researchInterests from './researchInterests';

const rootReducer = combineReducers({
  user,
  flash,
  interests,
  researchInterests,
});

export default rootReducer;

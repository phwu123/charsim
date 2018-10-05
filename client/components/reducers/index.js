import { combineReducers } from 'redux';
import statBasic from './statBasic.js';
import statAdv from './statAdv.js';
import statJob from './statJob.js';
import basic from './basic.js';

const rootReducer = combineReducers({
  basic,
  statBasic,
  statJob,
  statAdv,
})

export default rootReducer;
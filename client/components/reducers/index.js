import { combineReducers } from 'redux';
import incStats from './incStats.js';
import statAdv from './statAdv.js';
import statJob from './statJob.js';
import basic from './basic.js';

const rootReducer = combineReducers({
  basic,
  statBasic: incStats,
  statJob,
  statAdv,
})

export default rootReducer;
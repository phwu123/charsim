import initialState from './initialStates.js';
import { SET_POINTS } from '../constants';
import { RESET_POINTS } from '../constants';
import { GUILD_NAME } from '../constants';
import { SET_NAME } from '../constants';
import { SET_GENDER } from '../constants';

const basic = (state=initialState, action) => {
  switch (action.type) {
    case SET_POINTS:
      return {
        ...state,
        pointsLeft: action.payload
      }
    case RESET_POINTS:
      return {
        ...state,
        pointsLeft: 1325
      }
    case GUILD_NAME:
      return {
        ...state,
        guild: action.payload
      }
    case SET_NAME:
      return {
        ...state,
        name: action.payload
      }
    case SET_GENDER:
      return {
        ...state,
        gender: action.payload
      }
    default: 
      return state;
  }
}

export default basic;
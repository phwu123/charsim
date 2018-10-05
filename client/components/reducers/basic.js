import initialState from './initialStates.js';
import { SET_POINTS } from '../constants';
import { GUILD_NAME } from '../constants';

const basic = (state=initialState, action) => {
  switch (action.type) {
    case SET_POINTS:
    return {
      ...state,
      pointsLeft: action.payload
    }
    case GUILD_NAME:
      return {
        ...state,
        guild: action.payload
      }
    default: 
      return state;
  }
}

export default basic;
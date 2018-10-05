import initialState from './initialStates.js'
import { INCREASE_STR } from '../constants';
import { INCREASE_AGI } from '../constants';
import { INCREASE_VIT } from '../constants';
import { INCREASE_INT } from '../constants';
import { INCREASE_DEX } from '../constants';
import { INCREASE_LUK } from '../constants';
import { RESET_STATS } from '../constants';

const incStats = (state=initialState, action) => {
  switch(action.type) {
    case INCREASE_STR:
      return {
          ...state,
          strBase: action.payload,
      }
    case INCREASE_AGI:
      return  {
        ...state,
        agiBase: action.payload,
      }
    case INCREASE_VIT:
      return  {
        ...state,
        vitBase: action.payload,
      }
    case INCREASE_INT:
      return  {
        ...state,
        intBase: action.payload,
      }
    case INCREASE_DEX:
      return  {
        ...state,
        dexBase: action.payload,
      }
    case INCREASE_LUK:
      return  {
        ...state,
        lukBase: action.payload,
      }
    case RESET_STATS:
      return {
        pointsLeft: 1325,
        strBase: 1,
        agiBase: 1,
        vitBase: 1,
        intBase: 1,
        dexBase: 1,
        lukBase: 1,
      }
    default:
      return state;
  }
}

export default incStats;
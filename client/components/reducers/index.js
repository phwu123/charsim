import { INCREASE_STR } from '../constants';
import { INCREASE_AGI } from '../constants';
import { INCREASE_VIT } from '../constants';
import { INCREASE_INT } from '../constants';
import { INCREASE_DEX } from '../constants';
import { INCREASE_LUK } from '../constants';
import { GUILD_NAME } from '../constants';
import { SET_POINTS } from '../constants';
import { RESET_STATS } from '../constants';
import { UPDATE_BONUS } from '../constants';

const rootReducer = (state, action) => {
  switch(action.type) {
    case INCREASE_STR:
      return {
        ...state,
        status: {
          ...state.status,
          basic: {
            ...state.status.basic,
            strBase: action.payload
          }
        }
      }
    case INCREASE_AGI:
      return {
        ...state,
        status: {
          ...state.status,
          basic: {
            ...state.status.basic,
            agiBase: action.payload
          }
        }
      }
    case INCREASE_VIT:
      return {
        ...state,
        status: {
          ...state.status,
          basic: {
            ...state.status.basic,
            vitBase: action.payload
          }
        }
      }
    case INCREASE_INT:
      return {
        ...state,
        status: {
          ...state.status,
          basic: {
            ...state.status.basic,
            intBase: action.payload
          }
        }
      }
    case INCREASE_DEX:
      return {
        ...state,
        status: {
          ...state.status,
          basic: {
            ...state.status.basic,
            dexBase: action.payload
          }
        }
      }
    case INCREASE_LUK:
      return {
        ...state,
        status: {
          ...state.status,
          basic: {
            ...state.status.basic,
            lukBase: action.payload
          }
        }
      }
    case GUILD_NAME:
      return {
        ...state,
        status: {
          ...state.status,
          basic: {
            ...state.status.basic,
            guild: action.payload
          }
        }
      }
    case SET_POINTS:
      return {
        ...state,
        status: {
          ...state.status,
          basic: {
            ...state.status.basic,
            pointsLeft: action.payload
          }
        }
      }
    case RESET_STATS:
      return {
        ...state,
        status: {
          ...state.status,
          basic: {
            ...state.status.basic,
            pointsLeft: 1325,
            strBase: 1,
            agiBase: 1,
            vitBase: 1,
            intBase: 1,
            dexBase: 1,
            lukBase: 1,
          }
        }
      }
    case UPDATE_BONUS:
      let str, agi, vit, int, dex, luk;
      if (action.payload === 'swordman21')
        str = 15, agi = 8, vit = 8, int = 2, dex = 9, luk = 3;
      if (action.payload === 'acolyte21')
        str = 7, agi = 8, vit = 7, int = 12, dex = 9, luk = 2;
      if (action.payload === 'mage21')
        str = 3, agi = 8, vit = 5, int = 17, dex = 9, luk = 3;
      return {
        ...state,
        status: {
          ...state.status,
          basic: {
            ...state.status.basic,
            str,
            agi,
            vit,
            int,
            dex,
            luk
          }
        }
      }
    default:
      return state;
  }
}

export default rootReducer;


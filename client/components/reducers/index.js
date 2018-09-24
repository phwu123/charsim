import { INCREASE_STR } from '../constants';

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
    default:
      return state;
  }
}

export default rootReducer;


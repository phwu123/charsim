import { INCREASE_STR } from '../constants';

export const incStr = (stat) => ({
  type: INCREASE_STR,
  payload: stat,
})
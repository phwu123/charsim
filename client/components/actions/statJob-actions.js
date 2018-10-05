import { UPDATE_BONUS } from '../constants';

export const updateBonus = (job) => ({
  type: UPDATE_BONUS,
  payload: job,
})
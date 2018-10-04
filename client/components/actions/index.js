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

export const incstr = (num) => ({
  type: INCREASE_STR,
  payload: num,
});

export const incagi = (num) => ({
  type: INCREASE_AGI,
  payload: num,
});

export const incvit = (num) => ({
  type: INCREASE_VIT,
  payload: num,
});

export const incint = (num) => ({
  type: INCREASE_INT,
  payload: num,
});

export const incdex = (num) => ({
  type: INCREASE_DEX,
  payload: num,
});

export const incluk = (num) => ({
  type: INCREASE_LUK,
  payload: num,
});

export const guildName = (name) => ({
  type: GUILD_NAME,
  payload: name,
});

export const setPoints = (increment) => ({
  type: SET_POINTS,
  payload: increment,
});

export const resetStats = () => ({
  type: RESET_STATS,
})

export const updateBonus = (job) => ({
  type: UPDATE_BONUS,
  payload: job,
})
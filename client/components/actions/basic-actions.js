import { SET_POINTS } from '../constants';
import { RESET_POINTS } from '../constants';
import { SET_NAME } from '../constants';
import { GUILD_NAME } from '../constants';
import { SET_GENDER } from '../constants';

export const setPoints = (increment) => ({
  type: SET_POINTS,
  payload: increment,
});

export const resetPoints = () => ({
  type: RESET_POINTS,
})

export const setName = (name) => ({
  type: SET_NAME,
  payload: name,
}) 

export const guildName = (name) => ({
  type: GUILD_NAME,
  payload: name,
});

export const setGender = (gender) => ({
  type: SET_GENDER,
  payload: gender,
})


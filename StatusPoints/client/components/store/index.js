import { createStore } from 'redux';
import rootReducer from '../reducers/index';
import getInitialState from '../reducers/initialStates.js';

const store = createStore(rootReducer, getInitialState('paladin'));

export default store;
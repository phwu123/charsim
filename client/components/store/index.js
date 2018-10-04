import { createStore } from 'redux';
import rootReducer from '../reducers/index';
import initialState from '../reducers/initialStates.js';

const store = createStore(rootReducer, initialState);

export default store;
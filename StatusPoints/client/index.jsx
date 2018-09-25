import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import { Provider } from 'react-redux';
import store from './components/store';

render(
  <Provider store={store}>
    <div>
      <App />
    </div> 
  </Provider>,
  document.getElementById('root')
  );
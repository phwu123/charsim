import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import React from 'react';
import { render } from 'react-dom';
import Character from './components/Character.jsx';
//import { Provider } from 'react-redux';
//import store from './components/store';

render(
 // <Provider store={store}>
 //   <div>
      <Character />,
 //   </div> 
 // </Provider>,
  document.getElementById('Character')
  );
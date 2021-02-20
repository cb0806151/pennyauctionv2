import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Store } from './Util/Store';
import Stage from './Views/Stage';

export function renderDOM(application) {
  ReactDOM.render(
  <React.StrictMode>{application}</React.StrictMode>,
    document.getElementById('root')
  );
}

renderDOM(<Store><Stage /></Store>);
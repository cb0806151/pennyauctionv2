import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Wrapper from './Views/Wrapper';

export function renderDOM(application) {
  ReactDOM.render(
  <React.StrictMode>{application}</React.StrictMode>,
    document.getElementById('root')
  );
}

renderDOM(<Wrapper/>);
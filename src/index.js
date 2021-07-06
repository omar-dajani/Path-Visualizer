import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from './components/nav/nav.js';

function App() {
  return (
    <React.Fragment>
      <Navigation />
    </React.Fragment>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

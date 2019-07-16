import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Results from '../containers/Results';
import Landing from '../containers/Landing';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <h3 > Openpiv web platform </h3>
            <Route exact path="/" component={Landing} />
            <Route exact path="/results" component={Results} />
          </div>
        </BrowserRouter>
      </div>
    );
  }

}


export default App;

import React, { Component } from 'react';
import { Router, Route, IndexRoute, RouteLink, browserHistory } from 'react-router'
import ParallelAnimateDiv from './ParallelAnimateDiv'
import SequentialAnimateDiv from './SequentialAnimateDiv'
import Navigator from './Navigator'
import logo from './logo.svg';
import './App.css';
import { PATH_PARALLEL, PATH_SEQUENCE } from './Consts'

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Navigator}>
          <IndexRoute component={ParallelAnimateDiv} />
          <Route path={PATH_PARALLEL} component={ParallelAnimateDiv} />
          <Route path={PATH_SEQUENCE} component={SequentialAnimateDiv} />
        </Route>
      </Router>
    );
  }
}

export default App;
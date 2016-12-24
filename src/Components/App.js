import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import ParallelAnimateDiv from './ParallelAnimateDiv'
import SequentialAnimateDiv from './SequentialAnimateDiv'
import AllMethod from './AllMethod'
import Navigator from './Navigator'
import './App.css';
import { PATH_PARALLEL, PATH_SEQUENCE, PATH_ALL_METHOD } from './Consts'

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Navigator}>
          <IndexRoute component={ParallelAnimateDiv} />
          <Route path={PATH_PARALLEL} component={ParallelAnimateDiv} />
          <Route path={PATH_SEQUENCE} component={SequentialAnimateDiv} />
          <Route path={PATH_ALL_METHOD} component={AllMethod} />
        </Route>
      </Router>
    );
  }
}

export default App;
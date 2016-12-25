import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import ParallelAnimateDiv from './ParallelAnimateDiv'
import SequentialAnimateDiv from './SequentialAnimateDiv'
import AllMethod from './AllMethod'
import JoinMethod from './JoinMethod'
import Navigator from './Navigator'
import './App.css';
import { PATH_PARALLEL, PATH_SEQUENCE, PATH_ALL_METHOD, PATH_JOIN_METHOD } from './Consts'

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Navigator}>
          <IndexRoute component={ParallelAnimateDiv} />
          <Route path={PATH_PARALLEL} component={ParallelAnimateDiv} />
          <Route path={PATH_SEQUENCE} component={SequentialAnimateDiv} />
          <Route path={PATH_ALL_METHOD} component={AllMethod} />
          <Route path={PATH_JOIN_METHOD} component={JoinMethod} />

        </Route>
      </Router>
    );
  }
}

export default App;
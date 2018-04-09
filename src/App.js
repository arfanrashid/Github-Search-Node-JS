import React, { Component } from 'react';
import { GetProjectsResult } from './api';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import {
  Container,
} from 'reactstrap';

import ProjectsList from './projects/List';
import Header from './layout/Header';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Header />
          <br />
          <Container className='MainContainer'>
            <Switch>
              <Route exact path='/' component={ProjectsList} />
              <Route exact path='/projects/' component={ProjectsList} />
              <Route component={() => '404! No Route found'} />
            </Switch>
          </Container>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
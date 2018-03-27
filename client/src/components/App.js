import React, { Component } from 'react';
import NoMatch from './NoMatch';
import NavBar from './NavBar';
import Login from './Login';
import Register from './Register';
import Flash from './Flash';
import Home from './Home';
import ProtectedRoute from './ProtectedRoute';
import AuthRoute from './AuthRoute';
import FetchUser from './FetchUser';
import { Switch, Route } from 'react-router-dom';
import Cv from './Cv';
import Publications from './Publications';
import About from './About';
import CurrentResearch from './CurrentResearch';
import Footer from './Footer'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Flash />
        <FetchUser>
          <Switch>
            <Route exact path='/' component={ Home } />
            <Route exact path='/about' component={ About } />
            <Route exact path='/vitae' component={ Cv } />
            <Route exact path='/publications' component={ Publications } />
            <Route exact path='/current_research' component={ CurrentResearch } />
            <AuthRoute exact path='/login' component={ Login } />
            <Route component={ NoMatch } />
          </Switch>
        </FetchUser>
        <Footer />
      </div>
    );
  }
}

export default App;

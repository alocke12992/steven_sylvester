import React, {Component} from 'react';
import NoMatch from './NoMatch';
import Login from './Login';
import Flash from './Flash';
import Home from './Home';
import AuthRoute from './AuthRoute';
import Cv from './Cv';
import Publications from './Publications';
import About from './About';
import FetchResearch from './FetchResearch';
import {connect} from 'react-redux';
import {fetchSettings} from '../actions/settings';
import {Route, Switch, } from 'react-router-dom';

class FetchSettings extends React.Component {
  state = {loaded: false};

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(fetchSettings(this.toggleLoaded));
  }

  toggleLoaded = () => this.setState({loaded: !this.state.loaded});

  render() {
    const {loaded} = this.state;

    if (loaded) {
      return (
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/vitae' component={Cv} />
          <Route exact path='/publications' component={Publications} />
          <Route path='/current_research' component={FetchResearch} />
          <AuthRoute exact path='/login' component={Login} />
          <Route component={NoMatch} />
        </Switch>
      );
    } else {
      return null;
    }
  }
}

export default connect()(FetchSettings);
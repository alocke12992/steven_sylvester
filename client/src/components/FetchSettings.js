import React, {Component} from 'react';
import NoMatch from './NoMatch';
import Login from './Login';
import Flash from './Flash';
import Home from './Home';
import AuthRoute from './AuthRoute';
import Cv from './Cv';
import Publications from './Publications';
import About from './About';
import FetchData from './FetchData'
import FetchResearch from './FetchResearch';
import FetchPublications from './FetchPublications';
import {connect} from 'react-redux';
import {fetchSettings} from '../actions/settings';
import {Route, Switch, } from 'react-router-dom';
import Contact from './Contact';

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
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/data' component={FetchData} />
          <Route path='/current_research' component={FetchResearch} />
          <Route path='/publications' component={FetchPublications} />
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
import React from 'react';
import NoMatch from './NoMatch';
import Login from './Login';
import Home from './Home';
import AuthRoute from './AuthRoute';
import Cv from './Cv';
import About from './About';
import FetchData from './FetchData';
import FetchResearch from './FetchResearch';
import FetchPublications from './FetchPublications';
import {connect} from 'react-redux';
import {fetchSettings} from '../actions/settings';
import {Route, Switch, } from 'react-router-dom';
import Contact from './Contact';
import EditPassword from './EditPassword';
import ProtectedRoute from './ProtectedRoute';
import Profile from './Profile';
import FetchTeaching from './FetchTeaching';
import RecoverPassword from './RecoverPassword';

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
          <Route exact path='/teaching' component={FetchTeaching} />
          <Route path='/current_research' component={FetchResearch} />
          <Route path='/publications' component={FetchPublications} />
          <AuthRoute exact path='/admin' component={Login} />
          <ProtectedRoute exact path='/password' component={EditPassword} />
          <AuthRoute exact path='/recover_password' component={RecoverPassword} />
          <ProtectedRoute exact path='/profile' component={Profile} />
          <Route component={NoMatch} />
        </Switch>
      );
    } else {
      return null;
    }
  }
}

export default connect()(FetchSettings);
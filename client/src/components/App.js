import React, {Component} from 'react';
import Footer from './Footer'
import FetchSettings from './FetchSettings';
import FetchUser from './FetchUser';
import Flash from './Flash';
import NavBar from './NavBar';
import {Switch} from 'react-router-dom';


class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Flash />
        <FetchUser>
          <Switch>
            <FetchSettings />
          </Switch>
        </FetchUser>
        <Footer />
      </div>
    );
  }
}

export default App;


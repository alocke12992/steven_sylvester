import React from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import Teaching from './teaching/Teaching';
import University from './teaching/University';
import {getUniversities} from '../actions/teaching';
import {Loader, Segment, Dimmer} from 'semantic-ui-react';

class FetchTeaching extends React.Component {
  state = {loaded: false};

  componentDidMount() {
    this.props.dispatch(getUniversities(this.setLoaded));
  }

  setLoaded = () => {
    this.setState({loaded: true});
  };

  render() {
    const {loaded} = this.state;
    if (loaded) {
      return (
        <div>
          <Route exact path='/teaching' component={Teaching} />
          <Route
            exact
            path="/teaching/:id"
            component={University}
          />
        </div>
      );
    } else {
      return (
        <Segment>
          <Dimmer active>
            <Loader />
          </Dimmer>
        </Segment>
      );
    }
  }
}

export default connect()(FetchTeaching);
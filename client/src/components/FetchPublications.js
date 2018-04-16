import React from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import Publications from './Publications';
import PublicationView from './PublicationView';
import {getPublications} from '../actions/publications';
import ProtectedRoute from './ProtectedRoute'
import {Loader, Segment, Dimmer} from 'semantic-ui-react';

class FetchPublications extends React.Component {
  state = {loaded: false};

  componentDidMount() {
    this.props.dispatch(getPublications(this.setLoaded));
  }

  setLoaded = () => {
    this.setState({loaded: true});
  };

  render() {
    const {loaded} = this.state;
    if (loaded) {
      return (
        <div>
          <Route exact path='/publications' component={Publications} />
          <Route
            exact
            path="/publications/:id"
            component={PublicationView}
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

export default connect()(FetchPublications);
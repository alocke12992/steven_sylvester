import React from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import Data from './Data';
import Datum from './Datum';
import {getData} from '../actions/data';
import {Loader, Segment, Dimmer} from 'semantic-ui-react';

class FetchData extends React.Component {
  state = {loaded: false};

  componentDidMount() {
    this.props.dispatch(getData(this.setLoaded));
  }

  setLoaded = () => {
    this.setState({loaded: true});
  };

  render() {
    const {loaded} = this.state;
    if (loaded) {
      return (
        <div>
          <Route exact path='/data' component={Data} />
          <Route
            exact
            path="/data/:id"
            component={Datum}
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

export default connect()(FetchData);
import React from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import CurrentResearch from './CurrentResearch';
import EditResearch from './EditResearch';
import {getResearch} from '../actions/researchInterests';
import {Loader, Segment, Dimmer} from 'semantic-ui-react';

class FetchResearch extends React.Component {
  state = {loaded: false};

  componentDidMount() {
    this.props.dispatch(getResearch(this.setLoaded));
  }

  setLoaded = () => {
    this.setState({loaded: true});
  };

  render() {
    const {loaded} = this.state;
    if (loaded) {
      return (
        <div>
          <Route exact path='/current_research' component={CurrentResearch} />
          <Route
            exact
            path="/current_research/:id"
            component={EditResearch}
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

export default connect()(FetchResearch);

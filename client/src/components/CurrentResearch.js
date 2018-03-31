import React from 'react';
import {connect} from 'react-redux';
import {Grid, Header, Button} from 'semantic-ui-react'
import ResearchInterest from './ResearchInterest';

class CurrentResearch extends React.Component {

  render() {
    const {user} = this.props
    return (
      <div>
        <Grid>
          {user.role === 'admin' &&
            <Grid.Row>
              <Button>Add New</Button>
            </Grid.Row>
          }
          <ResearchInterest />
        </Grid>
        {/* Topic
          Title 
          Body/Description (react Quill)
        */}
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(CurrentResearch) 
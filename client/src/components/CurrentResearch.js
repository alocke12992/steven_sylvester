import React from 'react';
import {connect} from 'react-redux';
import {Button, Divider, Grid, Header, } from 'semantic-ui-react'
import ResearchInterest from './ResearchInterest';
import ResearchInterestForm from './ResearchInterestForm';

class CurrentResearch extends React.Component {
  state = {showForm: false};

  toggleForm = () => {
    this.setState(state => {
      return {showForm: !state.showForm}
    })
  }

  render() {
    const {user} = this.props
    const {showForm} = this.state
    return (
      <div>
        <Grid centered>
          {user.role === 'admin' &&
            <Grid.Row>
              <Button onClick={this.toggleForm}>
                {showForm ? 'Close Form' : 'Add New'}
              </Button>
              {showForm ?
                <ResearchInterestForm closeForm={this.toggleForm} />
                :
                null
              }
            </Grid.Row>
          }
          <Divider hidden />
          <Grid.Row>
            <Header as='h2'>Current Research</Header>
          </Grid.Row>
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
import React from 'react';
import {connect} from 'react-redux';
import {Button, Divider, Grid, Header, Container } from 'semantic-ui-react'
import Interest from './Interest';
import Title from './StyledHeader';
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
        <Grid stackable centered>
          <Divider hidden />
          <Grid.Row columns={2}>
          <Grid.Column width={6}>
            <Container fluid>
              <Title textAlign='center'>Research Interests</Title>
              <Interest />
            </Container>
          </Grid.Column>
          <Grid.Column width={6}>
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
            <Title textAlign='center'>Current Research</Title>
          <ResearchInterest />
          </Grid.Column>
          </Grid.Row>
        </Grid>
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
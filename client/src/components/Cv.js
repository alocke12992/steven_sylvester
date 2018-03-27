import React from 'react';
import { Divider, Grid, Header, Segment } from 'semantic-ui-react'

class Cv extends React.Component {

  render() {
    return (
      <Grid>
        <Grid.Row>
          <Divider />
        </Grid.Row>
        <Grid.Row columns={ 2 }>
          <Grid.Column>
            <Segment>
              <Header as='h2' textAlign='center'>Research Interests</Header>
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Header as='h2' textAlign='center'>CURRICULUM VITAE (Sept. 2017)</Header>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Cv 
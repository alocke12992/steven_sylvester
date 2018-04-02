import React from 'react';
import CvPdf from './CvPdf';
import CvUploader from './CvUploader';
import Interest from './Interest';
import {connect} from 'react-redux';
import {Button, Divider, Grid, Header, Icon, Segment} from 'semantic-ui-react'

class Cv extends React.Component {
  state = {showForm: false}

  toggleForm = () => {
    this.setState(state => {
      return {showForm: !state.showForm}
    })
  }
  render() {
    const {user} = this.props
    const {showForm} = this.state
    return (
      <Grid centered>
        <Grid.Row>
          <Divider />
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Segment>
              <Interest />
            </Segment>
          </Grid.Column>
          <Grid.Column width={7}>
            <Segment>
              {user.role === 'admin' &&
                <div>
                  <Button icon onClick={this.toggleForm}>
                    {showForm ?
                      <Icon name='delete' />
                      :
                      <Icon name='edit' />
                    }
                  </Button>
                  {showForm ?
                    <CvUploader />
                    :
                    null
                  }
                </div>
              }
              <Header as='h2' textAlign='center'>CURRICULUM VITAE (Sept. 2017)</Header>
              <CvPdf />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}
const mapStateToProps = (state) => {
  return {user: state.user}
}

export default connect(mapStateToProps)(Cv);
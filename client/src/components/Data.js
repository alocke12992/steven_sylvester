import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Grid, Divider, List, Button, Icon} from 'semantic-ui-react';
import {deleteDatum} from '../actions/data';
import Title from './StyledHeader';
import DataForm from './DataForm';
import Datum from './Datum';

class Data extends React.Component {
  state = {Data: [], showForm: false, editing: false, }

  delete = (id) => {
    const {dispatch} = this.props
    dispatch(deleteDatum(id))
  }

  toggleForm = () => {
    this.setState(state => {
      return {showForm: !state.showForm}
    })
  }

  form = () => {
    return (
      <Grid.Column width={6}>
        <Button onClick={this.toggleForm}>
          Cancel
        </Button>
        <DataForm closeForm={this.toggleForm} />
      </Grid.Column>
    )
  }

  showData = () => {
    const {data} = this.props
    return (
      data.map((datum) => {
        return (
          <Datum key={datum.id} datum={datum} id={datum.id} showForm={this.toggleForm} />
        )
      }
      )
    )
  }

  render() {
    const {showForm} = this.state
    const {user} = this.props
    return (
      <Grid centered>
        <Divider hidden />
        <Grid.Row>
          {
            user.role === 'admin' &&
            <div>
              {
                showForm === false &&
                <Button icon onClick={this.toggleForm}>
                  <Icon name='plus' />
                </Button>
              }
            </div>
          }
        </Grid.Row>
        {showForm ?
          this.form()
          :
          <Fragment>
            <Grid.Row centered>
              <Title textAlign='center'>Replication Data</Title>
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column width={8}>
                <List divided relaxed>
                  {
                    this.showData()
                  }
                </List>
              </Grid.Column>
            </Grid.Row>
          </Fragment>
        }
      </Grid>
    )
  }
}
const mapStateToProps = (state) => {
  const {data, user} = state
  return {data, user}
}

export default connect(mapStateToProps)(Data) 
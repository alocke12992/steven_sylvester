import React, {Fragment} from 'react'
import DataForm from './DataForm';
import {Button, Container, Grid, Header, Icon, List, Divider} from 'semantic-ui-react'
import styled from 'styled-components';
import {connect} from 'react-redux';
import {deleteDatum} from '../actions/data';


class Datum extends React.Component {
  state = {showForm: false, showDescription: false}

  toggleForm = () => {
    this.setState(state => {
      return {showForm: !state.showForm}
    })
  }

  toggleDescription = () => {
    this.setState(state => {
      return {showDescription: !state.showDescription}
    })
  }

  form = (datum) => {
    return (
      <Grid.Column width={6}>
        <DataForm {...datum} closeForm={this.toggleForm} />
        <Button onClick={this.toggleForm}>
          Cancel
        </Button>
      </Grid.Column>
    )
  }

  delete = (id) => {
    const {dispatch, history} = this.props
    dispatch(deleteDatum(id))
  }


  render() {
    const {datum, user} = this.props
    const {showForm, showDescription} = this.state
    return (
      <List.Item key={datum.id}>
        {showForm ? this.form(datum)
          :

          <Fragment>
            <List.Header as='h4' target='_blank' href={datum.file}>{datum.title}</List.Header>
            <List horizontal divided>
              <List.Item content={<Toggle onClick={this.toggleDescription}>Description</Toggle>} />
              <List.Item content={<Toggle as='a' target='_blank' href={datum.file}>Download</Toggle>} />
            </List>
            {
              showDescription ?
                <Fragment>
                  <List.Description >{datum.description}</List.Description>
                  <Toggle onClick={this.toggleDescription}>Close</Toggle>
                </Fragment>
                :
                null
            }
          </Fragment>
        }
        {user.role === 'admin' &&
          <List.Content floated='right'>
            {showForm ?
              null
              :
              <div>
                <Button onClick={this.toggleForm}>Edit</Button>
                <Button onClick={() => this.delete(datum.id)}>Delete</Button>
              </div>
            }
          </List.Content>
        }
      </List.Item>
    )
  }
}
const Toggle = styled(Button) `
  background: none !important;
  color: rgb(65, 131, 196) !important;
  font-weight: normal !important;
  padding: 0 !important;
  margin-top: 5px !important;
  margin-bottom: 5px !important;
`
const Close = styled(Toggle) `
  padding: 10px !important;
`
const mapStateToProps = (state) => {
  return {user: state.user}
}

export default connect(mapStateToProps)(Datum)
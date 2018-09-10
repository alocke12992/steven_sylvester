import React from 'react'
import UniversityForm from './UniversityForm';
import {Button, Grid, List, Divider} from 'semantic-ui-react'
import styled from 'styled-components';
import {connect} from 'react-redux';
// import {deleteUniversity} from '../actions/teaching';


class University extends React.Component {
  state = {showForm: false}

  toggleForm = () => {
    this.setState(state => {
      return {showForm: !state.showForm}
    })
  }

  createMarkup = (html) => {
    return {__html: html};
  };

  form = ({university}) => {
    return (
      <Grid.Column width={6}>
        <UniversityForm {...university} closeForm={this.toggleForm} />
        <Button onClick={this.toggleForm}>
          Cancel
        </Button>
      </Grid.Column>
    )
  }

  deleteUniversity = (id) => {
    const {dispatch} = this.props
    // dispatch(deleteUniversity(id))
  }


  render() {
    const {university, user} = this.props
    const {showForm} = this.state
    return (
      <List.Item key={university.id}>
        {showForm ? this.form({university})
          :

          <div>
            <List.Description>
              <div
                dangerouslySetInnerHTML={this.createMarkup(university.name)}
              />
            </List.Description>
            <List>
              <List.Item>This is a course</List.Item>
              <List.Item>This is a course</List.Item>
              <List.Item>This is a course</List.Item>
              <List.Item>This is a course</List.Item>
              <List.Item>This is a course</List.Item>
              <List.Item>This is a course</List.Item>
            </List>
          </div>
        }
        {/* {user.role === 'admin' && */}
        <List.Content floated='right'>
          {showForm ?
            null
            :
            <div>
              <Button onClick={this.toggleForm}>Edit</Button>
              <Button onClick={() => this.deleteUniversity(university.id)}>Delete</Button>
            </div>
          }
        </List.Content>
        {/* } */}
      </List.Item>
    )
  }
}
const Toggle = styled(Button)`
  background: none !important;
  color: rgb(65, 131, 196) !important;
  font-weight: normal !important;
  padding: 0 !important;
  margin-top: 5px !important;
  margin-bottom: 5px !important;
`

const mapStateToProps = (state) => {
  return {user: state.user}
}

export default connect(mapStateToProps)(University)
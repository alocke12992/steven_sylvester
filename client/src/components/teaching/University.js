import React from 'react'
import UniversityForm from './UniversityForm';
import {Button, Grid, List, Icon} from 'semantic-ui-react'
import {connect} from 'react-redux';
import styled from 'styled-components';
import CourseContainer from './CourseContainer';

class University extends React.Component {
  state = {showForm: false}

  toggleForm = () => {
    this.setState(state => {
      return {showForm: !state.showForm}
    })
  }

  form = () => {
    const {university} = this.props
    return (
      <React.Fragment>
        {this.props.user.role === "admin" ?
          <Grid.Column width={6}>
            <UniversityForm {...university} closeForm={this.toggleForm} />
          </Grid.Column>
          :
          null
        }
      </React.Fragment>
    )
  }

  showUniversity = (university) => (
    <UniHeader>
      {university.name}
      <List.Content>
        {this.props.user.role === 'admin' &&
          <React.Fragment>
            <Button
              onClick={this.toggleForm}
              color="blue"
              icon
            >
              <Icon name="edit" />
            </Button>
            <Button
              onClick={() => this.props.deleteUniversity(university.id)}
              color="red"
              icon
            >
              <Icon name="delete" />
            </Button>
          </React.Fragment>
        }
      </List.Content>
    </UniHeader>
  )

  render() {
    const {university, user} = this.props
    const {showForm} = this.state
    return (
      <List.Item key={university.id}>
        {showForm ? this.form() : this.showUniversity(university)}
        <CourseContainer user={user} universityId={university.id} />
      </List.Item>
    )
  }
}

const UniHeader = styled(List.Header)`
  display: flex !important
  justify-content: space-between !important;
`

export default connect()(University)
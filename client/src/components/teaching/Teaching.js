import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Grid, Divider, List, Button} from 'semantic-ui-react';
import Title from '../StyledHeader';
import UniversityForm from './UniversityForm';
import University from './University';
import {deleteUniversity} from '../../actions/teaching';

class Teaching extends React.Component {
  state = {showForm: false}

  toggleForm = () => {
    this.setState(state => {
      return {showForm: !state.showForm}
    })
  }

  form = () => (
    <Grid.Row centered>
      {this.props.user.role === "admin" &&
        <Fragment>
          {this.state.showForm ?
            <Grid.Column width={6}>
              <UniversityForm closeForm={this.toggleForm} />
            </Grid.Column>
            :
            <Button color="blue" onClick={this.toggleForm}>
              Add University
            </Button>
          }
        </Fragment>
      }
    </Grid.Row>
  );

  deleteUniversity = (id) => {
    const {dispatch} = this.props
    dispatch(deleteUniversity(id))
  }

  showUniversities = () => (
    this.props.universities.map((university) => (
      <University
        key={university.id}
        university={university}
        showForm={this.toggleForm}
        user={this.props.user}
        deleteUniversity={this.deleteUniversity}
      />
    ))
  );

  render() {
    return (
      <Grid centered>
        <Divider hidden />
        <Fragment>
          <Grid.Row centered>
            <Title textAlign='center'>Teaching</Title>
          </Grid.Row>
          {this.form()}
          <Grid.Row centered>
            <Grid.Column width={6}>
              <List divided relaxed>
                {
                  this.showUniversities()
                }
              </List>
            </Grid.Column>
          </Grid.Row>
        </Fragment>
      </Grid>
    )
  }
}
const mapStateToProps = (state) => {
  const {universities, user} = state
  return {universities, user}
}

export default connect(mapStateToProps)(Teaching) 
import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Grid, Divider, List, Button, Icon} from 'semantic-ui-react';
// import {deleteUniversity} from '../actions/teaching';
import Title from './StyledHeader';
import UniversityForm from './UniversityForm';
import University from './University';

class Teaching extends React.Component {
  state = {showForm: false, editing: false}

  deleteUniversity = (id) => {
    const {dispatch} = this.props
    // dispatch(deleteUniversity(id))
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
        <UniversityForm closeForm={this.toggleForm} />
      </Grid.Column>
    )
  }

  showUniversities = () => {
    const {universities} = this.props
    return (
      universities.map((university) => {
        return (
          <University key={university.id} university={university} showForm={this.toggleForm} />
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
          {/* {
            user.role === 'admin' && */}
          <div>
            {
              showForm === false &&
              <Button icon onClick={this.toggleForm}>
                <Icon name='plus' />
              </Button>
            }
          </div>
          {/* } */}
        </Grid.Row>
        {showForm ?
          this.form()
          :
          <Fragment>
            <Grid.Row centered>
              <Title textAlign='center'>Teaching</Title>
            </Grid.Row>
            <Grid.Row centered>
              <Grid.Column width={10}>
                <List divided relaxed>
                  {
                    this.showUniversities()
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
  const {universities, user} = state
  return {universities, user}
}

export default connect(mapStateToProps)(Teaching) 
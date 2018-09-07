import React from 'react';
import {
  Grid,
  Header,
  Button,
} from 'semantic-ui-react';
import {connect} from 'react-redux';
import Title from './StyledHeader';
import EditProfile from './EditProfile';
import EditPassword from './EditPassword';

const Fragment = React.Fragment;

class Profile extends React.Component {
  state = {
    editing: false,
    editingPass: false,
    email: '',
    password: '',
  }

  componentDidMount() {
    this.setState({...this.props})
  }

  toggleEdit = () => {
    this.setState(state => {
      return {editing: !state.editing}
    })
  }
  togglePass = () => {
    this.setState(state => {
      return {editingPass: !state.editingPass}
    })
  }



  profileView = () => {
    const {email} = this.state;
    return (
      <Fragment>
        <Grid.Column width={8}>
          <Header as="h3">Profile Email: {email}</Header>
        </Grid.Column>
      </Fragment>
    )
  }
  passwordView = () => {
    const {password} = this.state
    return (
      <Fragment>
        <Grid.Column width={8}>
          <Header as="h3">Password: {password}</Header>
        </Grid.Column>
      </Fragment>
    )
  }

  render() {
    const {editing, editingPass} = this.state;
    return (
      <Grid stackable centered>
        <Grid.Row centered>
          <Title as="h2">Welcome Steven</Title>
        </Grid.Row>
        <Grid.Row>
          {editing ?
            <EditProfile closeForm={this.toggleEdit} />
            :
            this.profileView()
          }
          <Grid.Column>
            <Button onClick={this.toggleEdit}>
              {editing ? 'Cancel' : 'Edit'}
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          {editingPass ?
            <EditPassword closeForm={this.togglePass} />
            :
            this.passwordView()
          }
          <Grid.Column>
            <Button onClick={this.togglePass}>
              {editingPass ? 'Cancel' : 'Edit'}
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )

  }

}

const mapStateToProps = (state) => {
  const {email, password} = state.user
  return {
    email,
    password,
  }
}

export default connect(mapStateToProps)(Profile)




import React from 'react';
import {
  Form,
  Grid,
  Image,
  Container,
  Divider,
  Header,
  Button,
} from 'semantic-ui-react';
import {connect} from 'react-redux';
import Title from './StyledHeader';
import ProfileEdit from './ProfileEdit';

const Fragment = React.Fragment;

class Profile extends React.Component {
  state = {
    editing: false,
    name: '',
    email: '',  
  }

  componentDidMount(){
    this.setState({...this.props})
  }

  toggleEdit = () => {
    this.setState(state => {
      return {editing: !state.editing}
    })
  }

  profileView = () => {
    const {name, email} = this.state;
    return (
      <Fragment>
        <Grid.Column width={8}>
          <Title as="h2">Welcome {name}</Title>
          <Header as="h3">Profile Email: {email}</Header>
        </Grid.Column>
      </Fragment>
    )
  }

  render() {
    const {editing} = this.state;
    return (
      <Container>
        <Divider hidden />
        <Grid>
          <Grid.Row>
            {editing ? <ProfileEdit closeForm={this.toggleEdit} /> : this.profileView()}
            <Grid.Column>
              <Button onClick={this.toggleEdit}>
                {editing ? 'Cancel' : 'Edit'}
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    )

  }

}

const mapStateToProps = (state) => {
  const {name, email} = state.user
  return {
    name,
    email,
  }
}

export default connect(mapStateToProps)(Profile)




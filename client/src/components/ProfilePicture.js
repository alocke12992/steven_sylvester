import React from 'react';
import {connect} from 'react-redux';
import ProfilePicUpload from './ProfilePicUpload';
import {Grid, Button, Container, Icon, Image} from 'semantic-ui-react';

class ProfilePicture extends React.Component {
  state = {showForm: false}

  toggleForm = () => {
    this.setState(state => {
      return {showForm: !state.showForm}
    })
  }

  form = ({avatar}) => {
    return (
      <Grid.Column width={6}>
        <ProfilePicUpload {...avatar} closeForm={this.toggleForm} />
        <Button onClick={this.toggleForm}>
          Cancel
        </Button>
      </Grid.Column>
    )
  }

  render() {
    const {showForm} = this.state
    const {avatar, user} = this.props
    return (
      <Container fluid>
        {
          showForm ? this.form({avatar})
            :
            <div>
              {user.role === 'admin' &&
                <Button icon onClick={this.toggleForm}>
                  <Icon name='edit' />
                </Button>
              }
              <Image src={avatar} size='medium' />
            </div>
        }
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  const {settings} = state
  return {
    avatar: settings.avatar_url,
    user: state.user
  }
}

export default connect(mapStateToProps)(ProfilePicture)
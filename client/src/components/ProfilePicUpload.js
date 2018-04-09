import React from 'react';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
import {updateAvatar} from '../actions/settings'
import {Button, Form, Grid, Header, Image} from 'semantic-ui-react';

class ProfilePicUpload extends React.Component {
  state = {avatar_url: ''}

  avatarChange = (files) => {
    this.setState({avatar_url: files[0]})
  }

  avatarSubmit = () => {
    const {avatar_url} = this.state
    const {dispatch, id, closeForm} = this.props
    dispatch(updateAvatar(avatar_url, id))
    closeForm()
  }

  render() {
    const {avatar_url} = this.state
    const {avatar} = this.props;
    return (
      <Grid.Column >
        <Grid.Row>
          <Header as='h3'>Current Picture</Header>
          <Image src={avatar} />
        </Grid.Row>
        <Grid.Row>
          <Form onSubmit={this.avatarSubmit}>
            <Grid.Column width={6}>
              <Dropzone
                onDrop={this.avatarChange}
                multiple={false}
              > Click here to upload
              {avatar_url && <Image size='medium' src={avatar_url.preview} />}
              </Dropzone>
            </Grid.Column>
            <Grid.Column>
              <Button>Submit</Button>
            </Grid.Column>
          </Form>
        </Grid.Row>
      </Grid.Column>
    );
  }
}

const mapStateToProps = (state) => {
  const {settings} = state
  return {
    id: settings.id,
    avatar: settings.avatar_url,
  };
};

export default connect(mapStateToProps)(ProfilePicUpload);

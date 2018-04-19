import React, {Fragment} from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {updateAvatar} from '../actions/settings'
import {Button, Form, Grid, Header, Image} from 'semantic-ui-react';

class ProfilePicUpload extends React.Component {
  state = {avatar_url: ''}

  avatarChange = (files) => {
    this.setState({avatar_url: files[0]})
  }

  avatarSubmit = () => {
    debugger
    const {avatar_url} = this.state
    const {dispatch, id, closeForm} = this.props
    dispatch(updateAvatar(avatar_url, id))
    closeForm()
  }

  render() {
    const {avatar_url} = this.state
    const {avatar} = this.props
    return (
      <Grid.Column >
        <Grid.Row>
          {
         
            avatar_url === '' ?
              <Fragment>
                <Header as='h3'>Current Picture</Header>
                <Image src={avatar} />
              </Fragment>
            : 
            <Fragment>
              <Header as='h3'>Selected Picture</Header>
            <Image src={avatar_url.preview} />
            </Fragment>
          }
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column width={10}>
            <Form onSubmit={this.avatarSubmit}>
              <Form.Group>
                <Drop
                  onDrop={this.avatarChange}
                  multiple={false}
                > {
                    avatar_url === '' ?
                      <Upload as='h2'>
                        Click or Drag to upload...
                      </Upload>
                      :
                      <Upload as='h2'>
                        Ready to submit.
                      </Upload>
                  }
                </Drop>
              </Form.Group>
              <Center>
                <Submit textAlign='centered'>Submit</Submit>
              </Center>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid.Column>
    );
  }
}

const Drop = styled(Dropzone) `
  border: .5px dashed gray; 
  width: 100%;
  height: 200px;
  color: lightgray !important;
  display: flex;
  align-items: center;
  justify-content: center;
`
const Upload = styled(Header) `
  color: lightgray !important;
`

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Submit = styled(Button)`
  padding-top: 50px; 
`
const Preview = styled(Image)`
  height: 50% !important;
`

const mapStateToProps = (state) => {
  const {settings} = state
  return {
    id: settings.id,
    avatar: settings.avatar_url
  };
};

export default connect(mapStateToProps)(ProfilePicUpload);

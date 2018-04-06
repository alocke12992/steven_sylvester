import React from 'react'
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
import {updateCv} from '../actions/settings';
import {Form, Grid, Image, Button} from 'semantic-ui-react';

class CvUploader extends React.Component {
  state = {pdf_url: ''}

  onDrop = (files) => {
    this.setState({pdf_url: files[0]})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {pdf_url} = this.state
    const {dispatch, id} = this.props;
    dispatch(updateCv(pdf_url, id))
  }

  render() {
    const {pdf_url} = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <Grid.Column width={4}>
          <Dropzone
            onDrop={this.onDrop}
            multiple={false}
          >
          </Dropzone>
        </Grid.Column>
        <Grid.Column width={8}>
          <Button>Update</Button>
        </Grid.Column>
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  const {settings} = state
  return {
    id: settings.id
  }
}

export default connect(mapStateToProps)(CvUploader)
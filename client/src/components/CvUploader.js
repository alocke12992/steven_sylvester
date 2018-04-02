import React from 'react'
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
import {updateCv, addCv} from '../actions/cv';
import {Form, Grid, Image, Button} from 'semantic-ui-react';

class CvUploader extends React.Component {
  state = {file: ''}

  onDrop = (files) => {
    this.setState({file: files[0]})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {file} = this.state
    const {dispatch} = this.props;
    dispatch(addCv({file}))
    this.setState({
      file: ''
    })
  }

  render() {
    const {file} = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <Grid.Column width={4}>
          <Dropzone
            onDrop={this.onDrop}
            multiple={false}
          >
            {file && <Image src={file.preview} />}
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
  return {cv: state.cv}
}

export default connect(mapStateToProps)(CvUploader)
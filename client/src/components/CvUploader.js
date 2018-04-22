import React from 'react'
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
import {updateCv} from '../actions/settings';
import styled from 'styled-components'
import {Form, Grid, Image, Button, Header, Icon} from 'semantic-ui-react';

class CvUploader extends React.Component {
  state = {pdf_url: ''}

  onDrop = (files) => {
    this.setState({pdf_url: files[0]})
  }


  handleSubmit = (e) => {
    e.preventDefault();
    const {pdf_url} = this.state
    const {dispatch, id, closeForm} = this.props;
    dispatch(updateCv(pdf_url, id))
    closeForm()
  }

  render() {
    const {pdf_url} = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
          {pdf_url === '' ?
          <Drop
            onDrop={this.onDrop}
            multiple={false}
          >
            <Upload as='h4'>Click or Drag to upload</Upload>
          </Drop>
          : 
          <Upload as='h4'>Your File is ready</Upload>
          } 
          <Submit>Update</Submit>
      </Form>
    )
  }
}

const Drop = styled(Dropzone) `
  border: .5px dashed gray; 
  border-radius: 20px;
  width: 120%;
  height: 50px;
  color: lightgray !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
`
const Upload = styled(Header) `
  color: lightgray !important;
  font-size: 12px !important;
`

const Submit = styled(Button)`
  margin-top: 20px !important;
`

const mapStateToProps = (state) => {
  const {settings} = state
  return {
    id: settings.id
  }
}

export default connect(mapStateToProps)(CvUploader)
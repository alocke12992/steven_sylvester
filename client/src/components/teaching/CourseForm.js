import React, {Component} from 'react';
import {Form, Icon} from 'semantic-ui-react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';


class CourseForm extends Component {
  initialState = {title: '', syllabus: '', id: ''}
  state = {...this.initialState, current_file: ''}

  componentDidMount() {
    const {title, syllabus, id} = this.props
    if (id)
      this.setState({title, current_file: syllabus, id});
  }

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState({[name]: value});
  }

  onDrop = (files) => {
    this.setState({syllabus: files[0]})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const course = {...this.state};
    if (this.props.id) {
      this.props.updateCourse(course)
      this.setState({...this.initialState, current_file: ''})
      this.props.closeForm()
    } else {
      this.props.addCourse(course)
      this.setState({...this.initialState, current_file: ''})
    }
  }

  render() {
    const {syllabus, title, current_file} = this.state
    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <CourseItems>
          <div className="" style={{height: '100%'}}>
            <div style={{marginBottom: '50px'}}>
              <Form.Field>
                <label>Course Title</label>
                <input placeholder='Course Title' name="title" value={title} onChange={this.handleChange} />
              </Form.Field>
            </div>
            <Form.Field>
              {syllabus === "" &&
                <UploadFile
                  onDrop={this.onDrop}
                  multiple={false}
                  acceptedFiles="application/pdf"
                >
                  Select Syllabus
                  </UploadFile>
              }
            </Form.Field>
          </div>
          {this.props.id ?
            <div style={{height: '100%'}}>
              {syllabus === "" ?
                <div>
                  <p>CurrentFile:</p>
                  <iframe title="current file" style={{height: '100%'}} src={current_file}></iframe>
                </div>
                :
                <p>You have selected {syllabus.name} for upload</p>
              }
            </div>
            :
            <div style={{height: '100%'}}>
              {syllabus === "" ?
                <p>Please Select a file to upload</p>
                :
                <p>You have selected {syllabus.name} for upload</p>
              }
            </div>
          }
        </CourseItems>
        <Buttons>
          <Form.Button
            size="medium"
            color="green"
          >
            Submit
          </Form.Button>
          <Form.Button
            color="blue"
            icon
            onClick={this.props.closeForm}
          >
            <Icon name="undo" />
          </Form.Button>
        </Buttons>
      </StyledForm>
    );
  }
}

const StyledForm = styled(Form)`
  display: flex !important;
  width: 100% !important;
  flex-direction: column !important;
`

const Buttons = styled(Form.Group)`
  width: 50% !important;
  margin: auto !important;
`
const CourseItems = styled(Form.Group)`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`
const UploadFile = styled(Dropzone)`
  background: #e0e1e2 none;
  color: rgba(0,0,0,.6);
  text-shadow: none;
  background-image: none;
  cursor: pointer;
  display: inline-block;
  min-height: 1em;
  outline: 0;
  border: none;
  vertical-align: baseline;
  margin: 0 .25em 0 0;
  padding: .78571429em 1.5em .78571429em;
  text-transform: none;
  font-weight: 700;
  line-height: 1em;
  font-style: normal;
  text-align: center;
  text-decoration: none;
  border-radius: .28571429rem;
`

export default CourseForm;
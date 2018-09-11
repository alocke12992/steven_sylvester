import React, {Component} from 'react';
import {Form} from 'semantic-ui-react';
import axios from 'axios'


class CourseForm extends Component {
  initialState = {title: '', syllabus: '', id: ''}
  state = {...this.initialState}

  componentDidMount() {
    const {title, syllabus, id} = this.props
    if (id)
      this.setState({title, syllabus, id});
  }

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState({[name]: value});
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const course = {...this.state};
    if (this.props.id) {
      this.props.updateCourse(course)
      this.props.closeForm()
    } else {
      this.props.addCourse(course)
    }
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Input placeholder='Course Title' name="title" value={this.state.title} onChange={this.handleChange} />
          <Form.Input placeholder='Syllabus Link' name="syllabus" value={this.state.syllabus} onChange={this.handleChange} />
          <Form.Button
            size="medium"
            color="green">
            Submit
          </Form.Button>
        </Form.Group>
      </Form>
    );
  }
}

export default CourseForm;
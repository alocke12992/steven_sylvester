import React, {Component} from 'react';
import {Form} from 'semantic-ui-react';
import axios from 'axios'


class CourseForm extends Component {
  initialState = {title: '', syllabus: '', id: ''}
  state = {...this.initialState}

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState({[name]: value});
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const course = {...this.state};
    const {closeForm, u_id} = this.props;
    axios.post(`api/universities/${u_id}/courses`, course)
      .then(res => {
        console.log(res.data)
        this.setState({
          ...this.initialState,
        })
        closeForm()
      })
      .catch(res => {
        return res
      })
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
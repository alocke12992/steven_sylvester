import React, {Component} from 'react';
import {Form} from 'semantic-ui-react';
import {connect} from 'react-redux';
import axios from 'axios'
import {setHeaders} from '../actions/headers'


class Contact extends Component {
  state = {first: '', last: '', email: '', subject: '', content: ''}

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState({[name]: value});
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const email = {...this.state};
    const {dispatch, closeForm} = this.props;
    axios.post('/api/emails', email).then((res) => {
      dispatch(setHeaders(res.headers))
    })
  };


  render() {
    const {first, last, email, subject, content} = this.state
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths='equal'>
          <Form.Input
            fluid
            required
            label='First name'
            placeholder='First name'
            name='first'
            value={first}
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            required
            label='Last name'
            placeholder='Last name'
            name='last'
            value={last}
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            required
            label='Email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={this.handleChange}
          />
          <Form.Input
            fluid
            label='Subject'
            placeholder='Subject...'
            name='subject'
            value={subject}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.TextArea
          required
          label='Content'
          placeholder='Add Message Content...'
          name='content'
          value={content}
          onChange={this.handleChange}
        />
        <Form.Button>Submit</Form.Button>
      </Form>
    )
  }
}

export default connect()(Contact)
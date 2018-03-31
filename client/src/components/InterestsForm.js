import React from 'react';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import { addInterest, updateInterest } from '../actions/interests';
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';

class InterestsForm extends React.Component {
  state = { title: '', body: '' };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const interest = { ...this.state }
    const { dispatch, closeForm } = this.props;
    const func = this.props.id ? updateInterest : addInterest
    dispatch(func(interest))
    this.setState({ title: '', body: '' })
    closeForm();
  }


  interests = () => {
    const { title, body } = this.state;
    return (
      <Segment>
        <Header
          as="h1"
          color="teal"
          textAlign="center">
          Add New Research Topic
        </Header>
        <Divider hidden />
        <Form onSubmit={ this.handleSubmit }>
          <Form.Input
            name="title"
            required
            value={ title }
            onChange={ this.handleChange }
            label="Title"
          />
          <Form.Input
            name="body"
            value={ body }
            onChange={ this.handleChange }
            label="Body"
          />
          <Form.Button
            size="normal"
            floated="right"
            color="green">
            Submit
          </Form.Button>
        </Form>
      </Segment>
    );
  };

  render() {
    return (
      <Grid.Column width={ 4 }>
        { this.interests() }
      </Grid.Column>
    );
  }
}

export default connect()(InterestsForm);
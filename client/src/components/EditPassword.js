import React from 'react';
import {connect} from 'react-redux';
import {recoverPassword} from '../actions/auth';
import {Button, Grid, Form, Segment, } from 'semantic-ui-react';

class EditPassword extends React.Component {
  state = {password: '', passwordConfirmation: '', };

  handleChange = event => {
    // use e to grab the id off the element also the value and set state
    // const { id, value } = event.target;
    const id = event.target.id;
    const value = event.target.value;
    this.setState({[id]: value});
  };

  handleNewPasswordSubmit = event => {
    event.preventDefault();
    const {password, passwordConfirmation} = this.state;
    const {dispatch, history} = this.props;
    dispatch(recoverPassword(password, passwordConfirmation, history));
  };


  render() {
    const {password, passwordConfirmation} = this.state;
    return (
      <Grid.Column width={8}>
        <Form onSubmit={this.handleNewPasswordSubmit}>
          <p>Enter your new password.</p>
          <Form.Field>
            <label htmlFor='password'>Password</label>
            <input
              id='password'
              placeholder='Password'
              type='password'
              required
              value={password}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label htmlFor='passwordConfirmation'>Password Confirmation</label>
            <input
              id='passwordConfirmation'
              placeholder='Password Confirmation'
              type='password'
              required
              value={passwordConfirmation}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Segment basic textAlign='center'>
            <Button>
              Submit
          </Button>
          </Segment>
        </Form>
      </Grid.Column>
    );
  }
}

export default connect()(EditPassword);

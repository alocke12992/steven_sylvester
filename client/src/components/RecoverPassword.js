import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {recoverPassword, sendPasswordReset, } from '../actions/auth';
import {Grid, Form, Image, Segment, Button} from 'semantic-ui-react';

class RecoverPassword extends React.Component {
  state = {email: '', emailSent: false, password: '', passwordConfirmation: '', token: ''};

  componentDidMount() {
    if (this.props.location.search)
      this.setState({token: this.props.location.search.split('?token=')[1]})
  };

  handleChange = event => {
    const id = event.target.id;
    const value = event.target.value;
    this.setState({[id]: value});
  };

  handleNewPasswordSubmit = event => {
    event.preventDefault();
    const {password, passwordConfirmation, token} = this.state;
    const {dispatch, history} = this.props;
    dispatch(recoverPassword(password, passwordConfirmation, token, history));
  };

  handleSubmit = event => {
    event.preventDefault();
    const {email} = this.state;
    const {dispatch} = this.props;
    dispatch(sendPasswordReset(email, () => this.setState({emailSent: true})));
  };

  render() {
    const {email, emailSent, password, passwordConfirmation, token} = this.state;

    return (
      <Grid centered columns={2}>
        <Grid.Column>
          <Segment raised>
            <Image
              src={this.props.logo}
              centered
              style={{height: '150px'}}
              alt="HN Text"
            />
            {emailSent ?
              <p>An email has been sent containing password reset instructions.</p>
              :
              token !== '' ?
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
                :
                <Form onSubmit={this.handleSubmit}>
                  <p>Please enter the email that you used to register.</p>
                  <Form.Field>
                    <label htmlFor='email'>Email</label>
                    <input
                      id='email'
                      placeholder='Email'
                      required
                      value={email}
                      onChange={this.handleChange}
                    />
                  </Form.Field>
                  <Segment basic textAlign='center'>
                    <Button
                      onClick={this.deconetOauth}>
                      Submit
                    </Button>
                    <Link to='/'>
                      <Button
                        backgroundColor={this.props.buttonColor}
                        fontColor={this.props.fontColor}
                        border={this.props.borderColor}
                      >
                        Back
                      </Button>
                    </Link>
                  </Segment>
                </Form>
            }
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}



export default connect()(RecoverPassword);

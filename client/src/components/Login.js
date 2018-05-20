import React, {Component} from 'react';
import {Header, Grid, Segment, Form, Button, Divider} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {handleLogin} from '../actions/auth';
import {Link} from 'react-router-dom';

class Login extends Component {
  state = {email: '', password: ''};

  handleChange = event => {
    const {id, value} = event.target;
    this.setState({[id]: value});
  }

  handleSubmit = event => {
    event.preventDefault();
    const {dispatch, history} = this.props;
    const {email, password} = this.state;
    dispatch(handleLogin(email, password, history));
  }

  render() {
    const {email, password} = this.state;
    return (
      <Grid centered>
        <Divider hidden />
        <Grid.Row centered>
          <Header as='h1' textAlign='center'>Login</Header>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column mobile={14} tablet={8} computer={6}>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label htmlFor='email'>Email</label>
                <input
                  required
                  id='email'
                  value={email}
                  placeholder='Email'
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Form.Field>
                <label htmlFor='password'>Password</label>
                <input
                  required
                  id='password'
                  value={password}
                  placeholder='Password'
                  type='password'
                  onChange={this.handleChange}
                />
              </Form.Field>
              <Segment textAlign='center' basic>
                <Button primary type='submit'>Submit</Button>
                <Link to={'/recover_password'}>Forgot Password?</Link>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default connect()(Login);

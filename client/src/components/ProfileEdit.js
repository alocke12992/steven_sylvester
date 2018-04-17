import React from 'react';

import {connect} from 'react-redux';
import {updateUser} from '../actions/user';
import {
  Divider,
  Form,
  Grid,
  Header,
  Button, 
} from 'semantic-ui-react';

class ProfileEdit extends React.Component {
  initialState = {
    name: '',
    email: '',
    id: null,
  }
  state = {...this.initialState};

  componentDidMount() {
    this.setState({...this.props});
  }

  handleChange = (e) => {
    const {name, value} = e.target;
    this.setState({[name]: value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const user = {...this.state};
    const {dispatch, closeForm} = this.props;
    dispatch(updateUser(user));
    this.setState({...this.initalState})
    closeForm()
  };

  form = () => {
    const {name, email} = this.state
    return (
      <Grid.Column>
        <Form onSubmit={this.handleSubmit}>
          <Grid.Column width={8}>
            <Form.Input
              label="Name"
              name="name"
              value={name}
              required
              onChange={this.handleChange}
            />
            <Form.Input
              label="Email"
              name="email"
              value={email}
              type="email"
              required
              onChange={this.handleChange}
            />
            <Button>Update</Button>
          </Grid.Column>
        </Form>
      </Grid.Column>
    );
  };

  render() {
    return (
      <Grid.Column width={8}>
        {this.form()}
      </Grid.Column>
    );
  }
}
const mapStateToProps = (state) => {
  const {name, email, id} = state.user
  return {
    name,
    email, 
    id,
  }
}

export default connect(mapStateToProps)(ProfileEdit);
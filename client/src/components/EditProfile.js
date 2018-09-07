import React from 'react';
import {connect} from 'react-redux';
import {updateUser} from '../actions/user';
import {
  Form,
  Grid,
  Button,
} from 'semantic-ui-react';

class EditProfile extends React.Component {
  initialState = {
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
    const {email} = this.state
    return (
      <Grid.Column>
        <Form onSubmit={this.handleSubmit}>
          <Grid.Column width={8}>
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
  const {email, id} = state.user
  return {
    email,
    id,
  }
}

export default connect(mapStateToProps)(EditProfile);
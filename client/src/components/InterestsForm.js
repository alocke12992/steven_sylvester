import React from 'react';
import ReactQuill from 'react-quill';
import {connect} from 'react-redux';
import {updateInterests} from '../actions/interests';
import {
  Divider,
  Form,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';

class InterestsForm extends React.Component {
  initialState = {
    body: '',
    id: null,
  }
  state = {...this.initialState};

  componentWillMount() {
    this.setState({...this.props});
  }

  handleQuillChange = (value, name) => {
    this.setState({[name]: value});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const interests = {...this.state};
    const {dispatch, closeForm} = this.props;
    dispatch(updateInterests(interests));
    closeForm()
  };

  interests = () => {
    return (
      <Segment>
        <Header
          as="h1"
          color="teal"
          textAlign="center">
          Update Research Interests
        </Header>
        <Divider hidden />
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <ReactQuill
              value={this.state.body}
              onChange={(value) => this.handleQuillChange(value, 'body')}
            />
            <Divider hidden />
          </Form.Field>
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
      <Grid.Column width={8}>
        {this.interests()}
      </Grid.Column>
    );
  }
}
const mapStateToProps = (state) => {
  const {body, id} = state.interests
  return {
    body,
    id
  }
}

export default connect(mapStateToProps)(InterestsForm);
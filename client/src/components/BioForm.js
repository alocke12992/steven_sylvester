import React from 'react';
import ReactQuill from 'react-quill';
import {connect} from 'react-redux';
import {updateBios} from '../actions/bios';
import toolbar from './Toolbar'
import {
  Divider,
  Form,
  Grid,
  Header,
} from 'semantic-ui-react';

class BioForm extends React.Component {
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
    const bios = {...this.state};
    const {dispatch, closeForm} = this.props;
    dispatch(updateBios(bios));
    closeForm()
  };

  bios = () => {
    return (
      <Grid.Column>
        <Header
          as="h1"
          color="teal"
          textAlign="center">
          Update Bio
        </Header>
        <Divider hidden />
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <ReactQuill
              modules={{toolbar}}
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
      </Grid.Column>
    );
  };

  render() {
    return (
      <Grid.Column width={8}>
        {this.bios()}
      </Grid.Column>
    );
  }
}
const mapStateToProps = (state) => {
  const {body, id} = state.bios
  return {
    body,
    id
  }
}

export default connect(mapStateToProps)(BioForm);
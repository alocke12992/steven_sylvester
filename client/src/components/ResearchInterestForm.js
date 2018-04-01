import React from 'react';
import ReactQuill from 'react-quill';
import {connect} from 'react-redux';
import {addResearch, updateResearch} from '../actions/researchInterests';
import {
  Button,
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';

class ResearchInterestForm extends React.Component {
  initialState = {
    topic: '',
    title: '',
    body: '',
  };

  state = {...this.initialState};

  componentdidMount() {
    if (this.props.id)
      this.setState({...this.props});
  }

  handleQuillChange = (value, name) => {
    this.setState({[name]: value});
  };

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState({[name]: value});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const researchInterest = {...this.state};
    const {dispatch, closeForm} = this.props;
    const func = this.props.id ? updateResearch : addResearch
    dispatch(func(researchInterest));
    this.setState({...this.initialState})
    closeForm()
  };

  researchForm = () => {
    const {topic, title, body} = this.state;
    return (
      <Container>
        <Header
          as="h1"
          color="violet"
          textAlign="center">
          Current Research
        </Header>
        <Divider hidden />
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Research Topic</label>
            <input
              placeholder='Topic'
              name='topic'
              value={topic}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Title</label>
            <input
              placeholder='Title'
              name='title'
              value={title}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <Header as="h4" color="violet">
              Description
            </Header>
            <ReactQuill
              value={this.state.body}
              onChange={(value) => this.handleQuillChange(value, 'body')}
            />
            <Divider hidden />
          </Form.Field>
          <Form.Button
            size="normal"
            color="green">
            Submit All Changes
          </Form.Button>
        </Form>
      </Container>
    );
  };

  render() {
    return (
      <Grid.Row>
        <Grid.Column width={8}>
          {this.researchForm()}
        </Grid.Column>
      </Grid.Row>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    topic,
    title,
    body,
    id,
  } = state
  return {
    topic,
    title,
    body,
    id,
  };
};

export default connect(mapStateToProps)(ResearchInterestForm);
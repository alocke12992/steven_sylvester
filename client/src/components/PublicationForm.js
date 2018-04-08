import React from 'react';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
import {addPublication, updatePublication} from '../actions/publications';
import {
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';

class PublicationForm extends React.Component {
  initialState = {
    title: '',
    abstract: '',
    authors: '',
    file: '',
    journal: '',
    date: '',
    links: '',
  };

  state = {...this.initialState};

  componentDidMount() {
    if (this.props.id)
      this.setState({...this.props});
  }

  onDrop = (files) => {
    this.setState({file: files[0]})
  }

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState({[name]: value});
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const publication = {...this.state};
    const {dispatch, closeForm} = this.props;
    const func = this.props.id ? updatePublication : addPublication
    dispatch(func(publication));
    closeForm()
  };



  researchForm = () => {
    const {title, abstract, authors, file, journal, links, date} = this.state;
    return (
      <Container>
        <Header
          as="h1"
          textAlign="center">
          Add Publication
        </Header>
        <Divider hidden />
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Publication Title</label>
            <input
              placeholder='Publication Title'
              name='title'
              value={this.state.title}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Contributing Authors</label>
            <input
              placeholder='Authors'
              name='authors'
              value={authors}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Segment>
            <Header as="h4">Journal</Header>
            <Form.Field>
              <label>Journal Name</label>
              <input
                placeholder='Journal Name'
                name='journal'
                value={journal}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Journal Link</label>
              <input
                placeholder='Journal Link'
                name='links'
                value={links}
                onChange={this.handleChange}
              />
            </Form.Field>
          </Segment>
          <Form.Field>
            <label>Publication Date</label>
            <input
              placeholder='Date Published'
              name='date'
              value={date}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.TextArea
            label="Abstract"
            placeholder='Abstract'
            name='abstract'
            value={abstract}
            onChange={this.handleChange}
          />
          <Form.Field>
            <Dropzone
              onDrop={this.onDrop}
              multiple={false}
            >
            </Dropzone>
          </Form.Field>
          <Form.Button
            size="medium"
            color="green">
            Submit
          </Form.Button>
        </Form>
      </Container>
    );
  };

  render() {
    return (
      <div>
        {this.researchForm()}
      </div>
    );
  }
}

export default connect()(PublicationForm);
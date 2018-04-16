import React, {Fragment} from 'react';
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
    pub_type: 'Book Chapter',
    id: '',
  };

  

  state = {...this.initialState, current_file: '', files: []};

  componentDidMount() {
    const {title, abstract, authors, journal, date, links, pub_type, id, file} = this.props
    if (this.props.id)
      this.setState({title, abstract, authors, journal, date, links, pub_type, id, current_file: file});
  }

  onDrop = (files) => {
    this.setState({file: files[0], files})
  }

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState({[name]: value});
  };

  handleSelect = (e) => {
    this.setState({pub_type: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const publication = {...this.state};
    const {dispatch, closeForm} = this.props;
    const func = this.props.id ? updatePublication : addPublication
    dispatch(func(publication));
    this.setState({
      ...this.initialState,
      current_file: '',
      files: []
    })
    closeForm()
  };

 render(){
    const {
      title, 
      abstract, 
      authors, 
      file, 
      journal, 
      links, 
      date, 
      files, 
      pub_type, 
      type,
      current_file,
    } = this.state;
    return (
      <Container>
        <Header
          as="h1"
          textAlign="center">{this.props.id ? 
            'Edit Publication' 
            : 
            'Add Publication'
          }
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
            <Header as='h3'>Publication Type: {pub_type}</Header>
            <Form.Field label='Publication Type' fluid='true' value={pub_type} onChange={this.handleSelect} control='select'>
            <option value='Book Chapter'>Book Chapter</option>
            <option value='Journal Article'>Journal Article</option>
            <option value='Blog Post'>Blog Post</option>
            </Form.Field>
            <Form.Field>
              <label>Name of Book/Journal/Blog</label>
              <input
                placeholder='Name'
                name='journal'
                value={journal}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Link to Source</label>
              <input
                  placeholder='Link'
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
            {
            files.length > 0 ?
              <p>You have selected {files.length} file</p>
            :
            <div>
              {
                this.props.id ? 
                <p>CurrentFile:<br /><iframe src={current_file}></iframe></p>
                :
                null
              }
            <Dropzone
            onDrop={this.onDrop}
            multiple={false}
            >
            </Dropzone>
            </div>
          }
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
}


export default connect()(PublicationForm);
import React, {Fragment} from 'react';
import Dropzone from 'react-dropzone';
import {connect} from 'react-redux';
import {addDatum, updateDatum} from '../actions/data';
import {
  Container,
  Divider,
  Form,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';

class DataForm extends React.Component {
  initialState = {
    title: '',
    description: '',
    file: '',
    id: '',
  };



  state = {...this.initialState, current_file: '', files: []};

  componentDidMount() {
    const {title, description, id, file} = this.props
    if (this.props.id)
      this.setState({title, description, id, current_file: file});
  }

  onDrop = (files) => {
    this.setState({file: files[0], files})
  }

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState({[name]: value});
  };

  handleSubmit = (e) => {
    e.preventDefault()
    const datum = {...this.state};
    const {dispatch, closeForm} = this.props;
    const func = this.props.id ? updateDatum : addDatum
    dispatch(func(datum));
    this.setState({
      ...this.initialState,
      current_file: '',
      files: []
    })
    closeForm()
  };

  render() {
    const {
      title,
      description,
      file,
      files,
      current_file,
    } = this.state;
    return (
      <Container>
        <Header
          as="h1"
          textAlign="center">{this.props.id ?
            'Edit'
            :
            'Add New'
          }
        </Header>
        <Divider hidden />
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Title</label>
            <input
              placeholder='Datum Title'
              name='title'
              value={this.state.title}
              onChange={this.handleChange}
            />
          </Form.Field>
          <Form.TextArea>
            <label>Description</label>
            <input
              placeholder='Description'
              name='description'
              value={description}
              onChange={this.handleChange}
            />
          </Form.TextArea>
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


export default connect()(DataForm);
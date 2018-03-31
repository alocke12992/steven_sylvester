import React from 'react';
import { connect } from 'react-redux';
import InterestsForm from './InterestsForm'
import { getInterests, updateInterest, addInterest } from '../actions/interests';
import ReactQuill from 'react-quill';
import { Button, Divider, Form, Segment, Responsive, Container, Image } from 'semantic-ui-react';

class Interests extends React.Component {
  state = { body: '', edit: false };

  componentDidMount() {
    this.props.dispatch(getInterests());
  }

  toggleForm = () => {
    this.setState({ edit: !this.state.edit, });
  };

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };


  handleSubmit = e => {
    e.preventDefault();
    const { body } = this.state;
    const { dispatch } = this.props
    dispatch(addInterest(body))
    this.setState({ body: '' });
  };

  showForm = () => {
    return (
      <Form onSubmit={ this.handleSubmit }>
        <Form.Field>
          <ReactQuill
            value={ this.state.body }
            onChange={ (value) =>
              this.handleChange(value, 'body')
            }
          />
          <Divider hidden />
        </Form.Field>
        <Form.Button color="green">
          Submit Changes
        </Form.Button>
        <Divider />
      </Form>
    );
  };

  render() {
    const { content, edit, text, } = this.state;
    return (
      <Segment>
        { edit && this.showForm() }
        <Button onClick={ this.toggleForm }>
          { edit ? 'Back' : 'Edit' }
        </Button>
        <Divider hidden />
        <div
          dangerouslySetInnerHTML={ {
            __html: content,
          } }
        />
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user, interest: state.interest }
}
export default connect(mapStateToProps)(Interests);
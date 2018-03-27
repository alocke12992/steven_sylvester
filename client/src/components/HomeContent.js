import React from 'react';
import ReactQuill from 'react-quill';
import { connect } from 'react-redux';
import { Button, Divider, Form, Header, Segment, Responsive, Container, Image } from 'semantic-ui-react';

class HomeContent extends React.Component {
  state = { content: '', edit: false, text: '', };

  modules = () => {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ]
  }

  formats = () =>
    [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image'
    ]


  toggleForm = () => {
    this.setState( { edit: !this.state.edit, } );
  };

  handleChange = ( value, name ) => {
    debugger
    this.setState( { [name]: value } );
  };
  handleSubmit = ( e ) => {
    e.preventDefault();
  };

  showForm = () => {
    return (
      <div>
        <ReactQuill theme="snow"
          modules={ this.modules() }
          formats={ this.formats() }>
        </ReactQuill>
        <Divider hidden />
        <Form.Button color="green">
          Submit Changes
        </Form.Button>
        <Divider />
      </div>
    );
  };

  render() {
    const { content, edit, text, } = this.state;
    const { user } = this.props
    return (
      <div>
        { edit && this.showForm() }
        {
          user.role === 'admin' &&
          <Button onClick={ this.toggleForm }>
            { edit ? 'Back' : 'Edit' }
          </Button>
        }
        <Divider hidden />
        <div
          dangerouslySetInnerHTML={ {
            __html: content,
          } }
        />
        <Header as="h2">About Steven</Header>
        <p>
          "THE ONLY THING NECESSARY FOR THE TRIUMPH OF EVIL IS FOR GOOD MEN TO DO NOTHING!"
          I am pretty down to earth guy who strives to challenge himself.
          I don't like to fail so I do everything in my power to achieve my goals.
          I have made mistakes in my life but have learned from them and continue to grow.
          </p>
        <p>
          "At times many of us let that enemy of achievement- even the culprit 'self-defeat' - dwarf our aspirations, smother our dreams, cloud our vision, and impare our lives.
          The enemy's voice whispers in our ears, 'You can't do it.' 'You're too young.' 'You're too old.' 'You're nobody.'
          This is when we remember that we are created in the image of God.
          Reflection on this truth provides a profound sense of strength and power."
          - President Thomas S. Monson
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect( mapStateToProps )( HomeContent );
import React from 'react';
import {connect} from 'react-redux';
import {addUniversity, updateUniversity} from '../actions/teaching';
import {
  Container,
  Divider,
  Form,
  Header,
} from 'semantic-ui-react';

class UniversityForm extends React.Component {
  initialState = {
    name: '',
    id: '',
  };

  state = {...this.initialState};

  componentDidMount() {
    const {name, id} = this.props
    if (this.props.id)
      this.setState({name, id});
  }

  handleChange = (e) => {
    const {name, value} = e.target
    this.setState({[name]: value});
  };


  handleSubmit = (e) => {
    e.preventDefault()
    const university = {...this.state};
    const {dispatch, closeForm} = this.props;
    const func = this.props.id ? updateUniversity : addUniversity
    dispatch(func(university));
    this.setState({
      ...this.initialState,
    })
    closeForm()
  };

  render() {
    const {name} = this.state;
    return (
      <Container>
        <Header
          as="h1"
          textAlign="center">{this.props.id ?
            'Edit university'
            :
            'Add university'
          }
        </Header>
        <Divider hidden />
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>University Name</label>
            <input
              placeholder='University Name'
              name='name'
              value={name}
              onChange={this.handleChange}
            />
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


export default connect()(UniversityForm);
import React from 'react';
import {connect} from 'react-redux';
import {addUniversity, updateUniversity} from '../../actions/teaching';
import {
  Container,
  Form,
  Header,
  Icon,
  Button,
  Message
} from 'semantic-ui-react';
import styled from 'styled-components';

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
          as="h3"
          textAlign="center">{this.props.id ?
            'Edit university'
            :
            'Add university'
          }
        </Header>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field required>
            <label>University Name</label>
            <FieldGroup>
              <input
                placeholder='University Name'
                name='name'
                value={name}
                onChange={this.handleChange}
                style={{marginRight: '15px'}}
              />
              <Form.Group>
                <Button
                  onClick={this.handleSubmit}
                  color="green"
                  icon
                >
                  <Icon name="checkmark" />
                </Button>
                <Button onClick={() => this.props.closeForm()} icon color="red"><Icon name="cancel" /></Button>
              </Form.Group>
            </FieldGroup>
          </Form.Field>
        </Form>
      </Container>
    );
  };
}

const FieldGroup = styled(Form.Group)`
  display: flex !important
  align-items: end !important;
  margin: 0 .5em 1em !important;
`


export default connect()(UniversityForm);
import React from 'react';
import {connect} from 'react-redux';
import BioForm from './BioForm'
import Title from './StyledHeader';
import styled from 'styled-components';
import {getBios} from '../actions/bios';
import {Button, Container, Grid, Icon,} from 'semantic-ui-react';

const CVContainer = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  justify-content: center;
`;

class Bio extends React.Component {
  state = {showForm: false};

  componentDidMount() {
    this.props.dispatch(getBios());
  }

  toggleForm = () => {
    this.setState(state => {
      return {showForm: !state.showForm}
    })
  }

  createMarkup = (html) => {
    return {__html: html};
  };

  form = ({body}) => {
    return (
      <Grid.Column width={6}>
        <BioForm {...body} closeForm={this.toggleForm} />
        <Button onClick={this.toggleForm}>
          Cancel
        </Button>
      </Grid.Column>
    )
  }

  render() {
    const {body, user, cv} = this.props
    const {showForm} = this.state
    console.log(cv)
    return (
      <Grid.Row columns={3}>
        {
          showForm ? this.form({body})
            :
            <div>
              {user.role === 'admin' &&
                <Grid.Column width={2}>
                  <Button icon onClick={this.toggleForm}>
                    <Icon name='edit' />
                  </Button>
                </Grid.Column>
              }
              <Grid.Column width={8}>
                <Container fluid>
                  <div
                    dangerouslySetInnerHTML={this.createMarkup(body)}
                  />
                  <CVContainer>
                    <a href={cv} target="_blank" rel="noopener noreferrer">Curriculum Vitae</a>
                  </CVContainer>
                </Container>
              </Grid.Column>
            </div>
        }
      </Grid.Row>
    )
  }
}

const mapStateToProps = (state) => {
  const { body } = state.bios;
  const { settings } = state;
  return {
    cv: settings.pdf_url,
    user: state.user,
    body
  }
}
export default connect(mapStateToProps)(Bio);
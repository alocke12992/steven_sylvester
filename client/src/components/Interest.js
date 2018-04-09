import React from 'react';
import {connect} from 'react-redux';
import InterestsForm from './InterestsForm'
import {getInterests} from '../actions/interests';
import {Button, Container, Grid, Header, Icon} from 'semantic-ui-react';

class Interests extends React.Component {
  state = {showForm: false};

  componentDidMount() {
    this.props.dispatch(getInterests());
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
        <InterestsForm {...body} closeForm={this.toggleForm} />
        <Button onClick={this.toggleForm}>
          Cancel
        </Button>
      </Grid.Column>
    )
  }

  render() {
    const {body, user} = this.props
    const {showForm} = this.state
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
                <Header as='h2' textAlign='center'>Research Interests</Header>
                <Container fluid>
                  <div
                    dangerouslySetInnerHTML={this.createMarkup(body)}
                  />
                </Container>
              </Grid.Column>
            </div>
        }
      </Grid.Row>
    )
  }
}

const mapStateToProps = (state) => {
  const {body} = state.interests
  return {user: state.user, body}
}
export default connect(mapStateToProps)(Interests);
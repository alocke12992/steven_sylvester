import React from 'react'
import {connect} from 'react-redux'
import {Button, Container, Grid, Header, Icon} from 'semantic-ui-react'
import {deleteResearch} from '../actions/researchInterests';
import ResearchInterestForm from './ResearchInterestForm';

class EditResearch extends React.Component {
  state = {showForm: false}

  toggleForm = () => {
    this.setState(state => {
      return {showForm: !state.showForm}
    })
  }

  createMarkup = (html) => {
    return {__html: html};
  };

  deletePost = () => {
    const {research: {id}, dispatch, history} = this.props
    dispatch(deleteResearch(id))
    history.push('/current_research')
  }

  form = ({research}) => {
    return (
      <Grid.Column width={6}>
        <ResearchInterestForm {...research} closeForm={this.toggleForm} />
        <Button onClick={this.toggleForm}>
          Cancel
        </Button>
      </Grid.Column>
    )
  }

  render() {
    const {research = {}} = this.props
    const {showForm} = this.state
    return (
      <Grid.Row columns={3}>
        {
          showForm ? this.form({research})
            :
            <div>
              <Grid.Column width={8}>
                <Container text>
                  <Header size='medium'>{research.topic}</Header>
                  <Header size='small'>{research.title}</Header>
                  <div
                    dangerouslySetInnerHTML={this.createMarkup(research.body)}
                  />
                </Container>
              </Grid.Column>
              <Grid.Column width={2}>
                <Button icon onClick={this.toggleForm}>
                  <Icon name='edit' />
                </Button>
                <Button icon onClick={this.deletePost}>
                  <Icon name='delete' />
                </Button>
              </Grid.Column>
            </div>
        }
      </Grid.Row>
    )
  }
}

const mapStateToProps = (state, props) => {
  const research = state.researchInterests.find(
    a => a.id === parseInt(props.match.params.id),
  );
  return {research};
}

export default connect(mapStateToProps)(EditResearch)
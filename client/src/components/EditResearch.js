import React from 'react'
import {connect} from 'react-redux'
import {Button, Container, Grid, Header, Icon} from 'semantic-ui-react'
import {updateResearch, deleteResearch} from '../actions/researchInterests';

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


  render() {
    const {research = {}} = this.props
    return (
      <Grid.Row columns={3}>
        <Grid.Column width={8}>
          <Container text>
            <Header size='medium'>{research.topic}</Header>
            <Header size='small'>{research.title}</Header>
            <div
              dangerouslySetInnerHTML={this.createMarkup(research.body)}
            />
          </Container>
        </Grid.Column>
        <Grid.Column width={4}>
          <Button icon>
            <Icon name='edit' />
          </Button>
          <Button icon onClick={this.deletePost}>
            <Icon name='delete' />
          </Button>
        </Grid.Column>
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
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button, Container, Grid, Header, Divider} from 'semantic-ui-react';
import {deleteResearch} from '../actions/researchInterests';
import CurrentResearchForm from './CurrentResearchForm';

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
        <CurrentResearchForm {...research} closeForm={this.toggleForm} />
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
      <Grid centered>
        <Divider hidden />
        <Grid.Row centered>
          {
            showForm ? this.form({research})
              :
              <div>
                <Grid.Column width={12}>
                  <Container text>
                    <Header size='medium'>{research.topic}</Header>
                    <Header size='small'>{research.title}</Header>
                    <div
                      dangerouslySetInnerHTML={this.createMarkup(research.body)}
                    />
                  </Container>
                </Grid.Column>
              </div>
          }
        </Grid.Row>
        <Grid.Row centered>
          <Button onClick={this.toggleForm}>
            Edit
            </Button>
          <Button onClick={this.deletePost}>
            Delete
            </Button>
        </Grid.Row>
        <Grid.Row>
          <Link to='/current_research'>
            <Button>Back</Button>
          </Link>
        </Grid.Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state, props) => {
  const research = state.researchInterests.find(
    a => a.id === parseInt(props.match.params.id, 10),
  );
  return {research};
}

export default connect(mapStateToProps)(EditResearch)
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button, Container, Grid, Header, Icon} from 'semantic-ui-react'
import {getResearch, deleteResearch} from '../actions/researchInterests';

class ResearchInterest extends React.Component {
  state = {topic: '', title: '', body: ''}

  createMarkup = (html) => {
    return {__html: html};
  };

  render() {
    const {researchInterests, user} = this.props
    return (
      researchInterests.map((research) => {
        return (
          <Grid.Row columns={3} key={research.id}>
            <Grid.Column width={8}>
              <Container text>
                <Header size='medium'>{research.topic}</Header>
                <Header size='small'>{research.title}</Header>
                <div
                  dangerouslySetInnerHTML={this.createMarkup(research.body)}
                />
              </Container>
            </Grid.Column>
            {user.role === 'admin' &&
              <Grid.Column width={4}>
                <Button icon>
                  <Link to={`/current_research/${research.id}`} >
                    <Icon name='settings' />
                  </Link>
                </Button>
              </Grid.Column>
            }
          </Grid.Row>
        )
      })
    )
  }
}

const mapStateToProps = (state) => {
  return {
    researchInterests: state.researchInterests,
    user: state.user,
  }
}

export default connect(mapStateToProps)(ResearchInterest)
import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button, Container, Grid, Header, Icon} from 'semantic-ui-react'

class CurrentResearch extends React.Component {
  state = {topic: '', title: '', body: ''}

  createMarkup = (html) => {
    return {__html: html};
  };

  render() {
    const {researchInterests, user} = this.props
    return (
      researchInterests.map((research) => {
        return (
          <Grid.Row centered columns={2} key={research.id}>
            <Grid.Column width={12}>
              <Container fluid>
                <Header size='medium'>{research.topic}</Header>
                <Header size='small'>{research.title}</Header>
                <div
                  dangerouslySetInnerHTML={this.createMarkup(research.body)}
                />
              </Container>
            </Grid.Column>
            {user.role === 'admin' &&
              <Grid.Column width={2}>
                <Link to={`/current_research/${research.id}`} >
                   <Button icon='settings'>
                  </Button>
                </Link>
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

export default connect(mapStateToProps)(CurrentResearch)
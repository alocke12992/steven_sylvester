import React from 'react'
import {connect} from 'react-redux'
import {Button, Container, Grid, Header, Icon} from 'semantic-ui-react'
import {getResearch} from '../actions/researchInterests';

class ResearchInterest extends React.Component {
  state = {topic: '', title: '', body: ''}


  componentDidMount() {
    this.props.dispatch(getResearch());
  }


  render() {
    const {researchInterests} = this.props
    return (
      researchInterests.map((research) => {
        return (
          <Grid.Row columns={2}>
            <Grid.Column width={14}>
              <Container text>
                <Header size='medium'>{research.topic}</Header>
                <Header size='small'>{research.title}</Header>
                <p>{research.body}</p>
              </Container>
            </Grid.Column>
            <Grid.Column width={2}>
              <Button button>
                <Icon name='edit' />
              </Button>
              <Button icon>
                <Icon name='delete' />
              </Button>
            </Grid.Column>
          </Grid.Row>
        )
      })
    )
  }
}

const mapStateToProps = (state) => {
  return {
    researchInterests: state.researchInterests
  }
}

export default connect(mapStateToProps)(ResearchInterest)
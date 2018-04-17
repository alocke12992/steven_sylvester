import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {Grid, Divider, Header, List, Button, Icon} from 'semantic-ui-react';
import {getPublications, deletePublication} from '../actions/publications';
import styled from 'styled-components';
import Title from './StyledHeader';
import PublicationForm from './PublicationForm';
import PublicationView from './PublicationView';

import {Link} from 'react-router-dom';

class Publications extends React.Component {
  state = {publications: [], showForm: false, editing: false, showAbstract: false, showLinks: false}

  deletePub = (id) => {
    debugger
    const {dispatch, history} = this.props
    dispatch(deletePublication(id))
  }

  toggleForm = () => {
    this.setState(state => {
      return {showForm: !state.showForm}
    })
  }

  form = () => {
    return (
      <Grid.Column width={6}>
        <Button onClick={this.toggleForm}>
          Cancel
        </Button>
        <PublicationForm closeForm={this.toggleForm} />
      </Grid.Column>
    )
  }

  showPubs = () => {
    const {publications, user} = this.props
    return (
      publications.map((publication) => {
        return (
          <PublicationView key={publication.id} publication={publication} id={publication.id} showForm={this.toggleForm}/>
        )
      }
    )
  )
}

  render() {
    const {showForm} = this.state
    const {user} = this.props
    return (
      <Grid centered>
        <Divider hidden />
        <Grid.Row>
          {
            user.role === 'admin' && 
              <div>
                {
                  showForm === false &&
                    <Button icon onClick={this.toggleForm}>
                      <Icon name='plus' />
                    </Button>
                }
              </div>
          }
        </Grid.Row>
        {showForm ?
          this.form()
          :  
          <Fragment>
            <Grid.Row centered>
              <Title textAlign='center'>Publications</Title>
            </Grid.Row>
            <Grid.Row centered>
            <Grid.Column width={10}>
              <List divided relaxed>
                {
                this.showPubs()
                }
              </List>
            </Grid.Column>
          </Grid.Row>
          </Fragment>
        }
      </Grid>
    )
  }
}
const mapStateToProps = (state) => {
  const {publications, user} = state
  return {publications, user}
}

const Toggle = styled(Button) `
  background: none !important;
  color: rgb(65, 131, 196) !important;
  font-weight: normal !important;
  padding: 0 !important;
  margin-top: 5px !important;
  margin-bottom: 5px !important;
`
const Close = styled(Toggle) `
  padding: 10px !important;
`


export default connect(mapStateToProps)(Publications) 
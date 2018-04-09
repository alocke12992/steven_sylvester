import React from 'react';
import {connect} from 'react-redux';
import {Grid, Divider, Header, List, Button, Icon} from 'semantic-ui-react';
import {getPublications} from '../actions/publications';
import styled from 'styled-components'
import PublicationForm from './PublicationForm';
import {Link} from 'react-router-dom';

class Publications extends React.Component {
  state = {publications: [], showForm: false, editing: false, showAbstract: false, showLinks: false}

  toggleForm = () => {
    this.setState(state => {
      return {showForm: !state.showForm}
    })
  }

  toggleEdit = () => {
    this.setState(state => {
      return {
        editing: !state.editing
      }
    })
  }

  toggleAbstract = () => {
    this.setState(state => {
      return {showAbstract: !state.showAbstract, showLinks: false}
    })
  }
  toggleLinks = () => {
    this.setState(state => {
      return {showLinks: !state.showLinks, showAbstract: false}
    })
  }

  showPubs = (publication) => {
    const {publications, user} = this.props
    const {showAbstract, showLinks, editing} = this.state
    return (
      publications.map((publication) => {
        return (

          <List.Item key={publication.id}>
            {
              editing ? <PublicationForm closeForm={this.toggleForm} />
                :
                <div>
                  <List.Description>{publication.authors}</List.Description>
                  <List.Header as='a' target='_blank' href={publication.file}>{publication.title}</List.Header>
                  <List.Description><a target='_blank' href={publication.links}>{publication.journal}</a></List.Description>
                  <List horizontal divided>
                    <List.Item content={<Toggle onClick={this.toggleAbstract}>Abstract</Toggle>} />
                    <List.Item content={<Toggle onClick={this.toggleLinks}>Links</Toggle>} />
                  </List>
                  {
                    showAbstract ?
                      <div>
                        <List.Description >{publication.abstract}</List.Description>
                        <Toggle onClick={this.toggleAbstract}>Close</Toggle>
                      </div>
                      :
                      null
                  }
                  {
                    showLinks ?
                      <div>
                        <Divider hidden />
                        <List.Description><a target='_blank' href={publication.links}>Journal</a></List.Description>
                        <List.Description><a target='_blank' href={publication.file}>Download Paper</a></List.Description>
                        <Close onClick={this.toggleLinks}>Close</Close>
                      </div>
                      :
                      null
                  }
                </div>
            }
            {user.role === 'admin' &&
              <div>
                <Button icon>
                  <Link to={`/publications/${publication.id}`} >
                    <Icon name='settings' />
                  </Link>
                </Button>
              </div>
            }
          </List.Item>
        )
      }
      )
    )
  }

  form = () => {
    return (
      <Grid.Row centered>
        <Grid.Column width={10}>
          <PublicationForm closeForm={this.toggleForm} />
        </Grid.Column>
      </Grid.Row>
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
            <Button icon onClick={this.toggleForm}>
              {
                showForm ?

                  <Icon name='minus' />
                  :
                  <Icon name='plus' />
              }
            </Button>
          }
          <Header>Publications</Header>
        </Grid.Row>
        {showForm ?
          this.form()
          :
          null
        }
        <Grid.Row centered>
          <Grid.Column width={10}>
            <List divided relaxed>
              {this.showPubs()}
            </List>
          </Grid.Column>
        </Grid.Row>
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
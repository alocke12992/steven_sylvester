import React from 'react'
import PublicationForm from './PublicationForm';
import {Button, Grid, List, Divider} from 'semantic-ui-react'
import styled from 'styled-components';
import {connect} from 'react-redux';
import {deletePublication} from '../actions/publications';


class PublicationView extends React.Component {
  state = {pageNumber: 1, showAbstract: false, showLinks: false, showForm: false}

  toggleForm = () => {
    this.setState(state => {
      return {showForm: !state.showForm}
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

  createMarkup = (html) => {
    return {__html: html};
  };

  form = ({publication}) => {
    return (
      <Grid.Column width={6}>
        <PublicationForm {...publication} closeForm={this.toggleForm} />
        <Button onClick={this.toggleForm}>
          Cancel
        </Button>
      </Grid.Column>
    )
  }

  deletePub = (id) => {
    const {dispatch} = this.props
    dispatch(deletePublication(id))
  }


  render() {
    const {publication, user} = this.props
    const {showAbstract, showLinks, showForm} = this.state
    return (
      <List.Item key={publication.id}>
        {showForm ? this.form({publication})
          :

          <div>
            <List.Description>
              <div
                dangerouslySetInnerHTML={this.createMarkup(publication.authors)}
              />
            </List.Description>
            <List.Header as='a' target='_blank' href={publication.file}>{publication.title}</List.Header>
            <List.Content floated='right'>
              <PubType>
                {publication.pub_type}
              </PubType>
            </List.Content>
            <List.Description><a target='_blank' href={publication.links}>{publication.journal}</a></List.Description>
            <List.Description>Date published: {publication.date}</List.Description>
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
                  <List.Description><a target='_blank' href={publication.links}>Source</a></List.Description>
                  <List.Description><a target='_blank' href={publication.file}>Download Paper</a></List.Description>
                  <Close onClick={this.toggleLinks}>Close</Close>
                </div>
                :
                null
            }
          </div>
        }
        {user.role === 'admin' &&
          <List.Content floated='right'>
            {showForm ?
              null
              :
              <div>
                <Button onClick={this.toggleForm}>Edit</Button>
                <Button onClick={() => this.deletePub(publication.id)}>Delete</Button>
              </div>
            }
          </List.Content>
        }
      </List.Item>
    )
  }
}
const Toggle = styled(Button)`
  background: none !important;
  color: rgb(65, 131, 196) !important;
  font-weight: normal !important;
  padding: 0 !important;
  margin-top: 5px !important;
  margin-bottom: 5px !important;
`
const Close = styled(Toggle)`
  padding: 10px !important;
`

const PubType = styled.span`
    background-color: #008bd2;
    color: #fff;
    display: inline-block;
    padding: 3px 4px;
    margin-left: 5px;
    font-size: 10px;
    font-weight: bold;
    line-height: 1;
    border-radius: 2px;
    box-shadow: inset 0 -1px 0 rgba(0,0,0,0.12);
`

const mapStateToProps = (state) => {
  return {user: state.user}
}

export default connect(mapStateToProps)(PublicationView)
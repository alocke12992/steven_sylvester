import React from 'react'
import {connect} from 'react-redux'
import {Button, Container, Grid, Header, Icon} from 'semantic-ui-react'
import {deletePublication} from '../actions/publications';
import PublicationForm from './PublicationForm';
import {Document, Page} from 'react-pdf'

class PublicationView extends React.Component {
  state = {showForm: false, pageNumber: 1}

  toggleForm = () => {
    this.setState(state => {
      return {showForm: !state.showForm}
    })
  }

  deletePublication = () => {
    const {publication: {id}, dispatch, history} = this.props
    dispatch(deletePublication(id))
    history.push('/publications')
  }

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

  render() {
    const {publication = {}} = this.props
    const {showForm, pageNumber} = this.state
    return (
      <Grid.Row columns={3}>
        {
          showForm ? this.form({publication})
            :
            <div>
              <Grid.Column width={2}>
                <Button icon onClick={this.toggleForm}>
                  <Icon name='edit' />
                </Button>
                <Button icon onClick={this.deletePublication}>
                  <Icon name='delete' />
                </Button>
              </Grid.Column>
              <Grid.Column width={6}>
                <Container>
                  <Header as='a' href={publication.file}>{publication.title}</Header>
                  <Header as='h4'>{publication.authors}</Header>
                  <a href={publication.links}>{publication.journal}</a>
                  <p>{publication.abstract}</p>
                </Container>
              </Grid.Column>
              <Grid.Column width={8}>
                <Document
                  file={publication.file}
                >
                  <Page pageNumber={pageNumber} />
                </Document>
              </Grid.Column>
            </div>
        }
      </Grid.Row>
    )
  }
}

const mapStateToProps = (state, props) => {
  const publication = state.publications.find(
    p => p.id === parseInt(props.match.params.id),
  );
  return {publication};
}

export default connect(mapStateToProps)(PublicationView)
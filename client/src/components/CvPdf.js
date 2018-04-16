import React from 'react';
import CvUploader from './CvUploader';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {Document, Page} from 'react-pdf';
import {Button, Icon, Container, Grid, Header} from 'semantic-ui-react';

class CvPdf extends React.Component {
  state = {
    showForm: false,
    numPages: null,
    page: 1,
  }

  toggleForm = () => {
    this.setState(state => {
      return {showForm: !state.showForm}
    })
  }

  onDocumentLoad = ({numPages}) => {
    this.setState({numPages});
  }

  forwardPage = () => {
    const {page} = this.state
    this.setState({page: page + 1})
  }

  backPage = () => {
    const {page} = this.state
    this.setState({page: page - 1})
  }

  pageChanger = () => {
    const {page, numPages} = this.state
    if (page === 1) {
      return (
        <Button icon onClick={this.forwardPage}>
          <Icon name='chevron right' />
        </Button>
      )
    } if (page < numPages) {
      return (
        <div>
          <Button icon onClick={this.backPage}>
            <Icon name='chevron left' />
          </Button>
          <Button icon onClick={this.forwardPage}>
            <Icon name='chevron right' />
          </Button>
        </div>
      )
    } else {
      return (
        <Button icon onClick={this.backPage}>
          <Icon name='chevron left' />
        </Button>
      )
    }
  }

  render() {
    const {page, numPages, showForm} = this.state;
    const {cv, user} = this.props

    return (
      <Grid>
        <Grid.Row centered>
          {user.role === 'admin' &&
            <div>
              <Button icon onClick={this.toggleForm}>
                {showForm ?
                  <Icon name='delete' />
                  :
                  <Icon name='edit' />
                }
              </Button>
              {showForm ?
                <CvUploader />
                :
                null
              }
            </div>
          }
            <Header as='h2'>Curriculum Vitae</Header>
        </Grid.Row>
        <PageRow columns={2}>
          <Grid.Column floated='right' width={4}>
            <p>Page {page} of {numPages}</p>
          </Grid.Column>
        </PageRow>
        <CvRow centered>
          <Document
            file={cv}
            onLoadSuccess={this.onDocumentLoad}
          >
            <Page pageNumber={page} />
          </Document>
        </CvRow>
        <Grid.Row centered>
          {this.pageChanger()}
        </Grid.Row>
        <Grid.Row centered>
          <a target='_blank' href={cv}>Download</a>
        </Grid.Row>
      </Grid>
    );
  }
}
const CvRow = styled(Grid.Row)`
  padding-top: 0 !important; 
` 
const PageRow = styled(Grid.Row)`
  padding-bottom: 0 !important;
`

const mapStateToProps = (state) => {
  const {settings} = state
  return {
    cv: settings.pdf_url,
    user: state.user
  }
}

export default connect(mapStateToProps)(CvPdf);
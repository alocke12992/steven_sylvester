import React from 'react';
import {connect} from 'react-redux';
import {Document, Page} from 'react-pdf';
import {Button, Icon, Container, Grid} from 'semantic-ui-react';

class CvPdf extends React.Component {
  state = {
    numPages: null,
    page: 1,
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
    const {page, numPages} = this.state;
    const {cv} = this.props

    return (
      <Container fluid>
        <p>Page {page} of {numPages}</p>
        {this.pageChanger()}
        <Document
          file={cv}
          onLoadSuccess={this.onDocumentLoad}
        >
          <Page pageNumber={page} />
        </Document>
        <a target='_blank' href={cv}>Download</a>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  const {settings} = state
  return {
    cv: settings.pdf_url
  }
}

export default connect(mapStateToProps)(CvPdf);
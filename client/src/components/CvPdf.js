import React from 'react';
import {connect} from 'react-redux';
import {Document, Page} from 'react-pdf'

class CvPdf extends React.Component {
  state = {
    numPages: null,
    pageNumber: 1,
  }

  onDocumentLoad = ({numPages}) => {
    this.setState({numPages});
  }

  render() {
    const {pageNumber, numPages} = this.state;
    const {cv} = this.props

    return (
      <div>
        <Document
          file={cv}
          onLoadSuccess={this.onDocumentLoad}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
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
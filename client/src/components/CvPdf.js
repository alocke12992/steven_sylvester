import React from 'react';
import myPdf from '../files/cv.pdf'
import {connect} from 'react-redux';
// import {getCv} from '../actions/cv';
import {Document, Page} from 'react-pdf'

class CvPdf extends React.Component {
  state = {
    numPages: null,
    pageNumber: 1,
    // file: ''
  }

  // componentWillMount = () => {
  //   const {dispatch} = this.props
  //   dispatch(getCv)
  //   this.setState({...this.props})

  // }

  onDocumentLoad = ({numPages}) => {
    this.setState({numPages});
  }

  render() {
    const {pageNumber, numPages} = this.state;
    return (
      <div>
        <Document
          file={myPdf}
          onLoadSuccess={this.onDocumentLoad}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    );
  }
}

export default connect()(CvPdf);
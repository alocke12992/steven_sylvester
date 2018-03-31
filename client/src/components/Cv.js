import React from 'react';
import Interest from './Interest';
import { Document, Page } from 'react-pdf';
import { Divider, Grid, Header, Segment } from 'semantic-ui-react'

class Cv extends React.Component {
  state = {
    numPages: null,
    pageNumber: 1,
  }

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  }

  render() {
    const { pageNumber, numPages } = this.state;
    return (
      <Grid>
        <Grid.Row>
          <Divider />
        </Grid.Row>
        <Grid.Row columns={ 2 }>
          <Grid.Column>
            <Segment>
              <Header as='h2' textAlign='center'>Research Interests</Header>
              <Interest />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment>
              <Header as='h2' textAlign='center'>CURRICULUM VITAE (Sept. 2017)</Header>
              <Document
                file={ { url: 'https://drive.google.com/open?id=0B0uyzLguugkBdmhVMzhVRTZVdHBYczluZW5iZXBUTjh4dkRF' } }
                onLoadSuccess={ this.onDocumentLoad }
              >
                <Page pageNumber={ pageNumber } />
              </Document>
              <p>Page { pageNumber } of { numPages }</p>
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Cv 
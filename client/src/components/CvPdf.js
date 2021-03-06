import React from 'react';
import CvUploader from './CvUploader';
import Title from './StyledHeader';
import styled from 'styled-components';
import {connect} from 'react-redux';
import {Button, Grid} from 'semantic-ui-react';

class CvPdf extends React.Component {
  state = {
    showForm: false,
  }

  toggleForm = () => {
    this.setState(state => {
      return {showForm: !state.showForm}
    })
  }

  render() {
    const {showForm} = this.state;
    const {cv, user} = this.props

    return (
      <Grid>
        <Grid.Row centered>
          {user.role === 'admin' &&
            <div>
              {showForm ?
                <Button icon='cancel' onClick={this.toggleForm}>
                </Button>
                :
                <Button icon='edit' onClick={this.toggleForm}>
                </Button>
              }
            </div>
          }
          <Title textAlign='center'>Curriculum Vitae</Title>
        </Grid.Row>
        {showForm ?
          <Grid.Row centered>
            <CvUploader closeForm={this.toggleForm} />
          </Grid.Row>
          :
          null
        }
        <CvRow centered>
          <Viewer src={cv} />
        </CvRow>
        <Download centered>
          <a target='_blank' href={cv}>Download</a>
        </Download>
      </Grid>
    );
  }
}
const CvRow = styled(Grid.Row)`
  padding-top: 0 !important; 
  margin-top: 0 !important;
`
const Download = styled(Grid.Row)`
  padding: 0 !important;
`

const Viewer = styled.iframe`
  width: 100%; 
  height: 100vh;
`

const mapStateToProps = (state) => {
  const {settings} = state
  return {
    cv: settings.pdf_url,
    user: state.user
  }
}

export default connect(mapStateToProps)(CvPdf);
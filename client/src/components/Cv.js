import React from 'react';
import CvPdf from './CvPdf';
import {connect} from 'react-redux';
import {Divider, Grid} from 'semantic-ui-react'

class Cv extends React.Component {
  state = {showForm: false}

  toggleForm = () => {
    this.setState(state => {
      return {showForm: !state.showForm}
    })
  }
  render() {
    return (
      <Grid centered>
        <Divider hidden />
        <Grid.Row>
          <CvPdf />
        </Grid.Row>
      </Grid>
    )
  }
}
const mapStateToProps = (state) => {
  return {user: state.user}
}

export default connect(mapStateToProps)(Cv);
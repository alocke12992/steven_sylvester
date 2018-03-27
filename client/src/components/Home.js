import React, { Component } from 'react';
import HomeContent from './HomeContent';
import { Container, Divider, Grid, Header, Image, Menu, Segment } from 'semantic-ui-react';

class Home extends Component {
  render() {
    return (
      <Grid>
        <Grid.Row>
          <div></div>
          <Divider hidden />
        </Grid.Row>
        <Grid.Row columns={ 4 }>
          <Grid.Column>
            <div></div>
          </Grid.Column>
          <Grid.Column>
            <Image src={ require( '../images/profile.jpg' ) } size='medium' />
          </Grid.Column>
          <Divider hidden />
          <Grid.Column>
            <HomeContent />
          </Grid.Column>
          <Grid.Column>
            <div></div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Home;

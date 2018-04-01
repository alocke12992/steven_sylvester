import React, {Component} from 'react';
import Bio from './Bio';
import {Container, Divider, Grid, Header, Image, Menu, Segment} from 'semantic-ui-react';

class Home extends Component {
  render() {
    return (
      <Grid centered>
        <Divider hidden />
        <Grid.Row>
          <Grid.Column width={4}>
            <Image src={require('../images/profile.jpg')} size='medium' />
          </Grid.Column>
          <Grid.Column width={6}>
            <Bio />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default Home;

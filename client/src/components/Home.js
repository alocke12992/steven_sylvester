import React, {Component} from 'react';
import Bio from './Bio';
import ProfilePicture from './ProfilePicture';
import {Divider, Grid, Image, } from 'semantic-ui-react';


const Home = () => (
  <Grid centered>
    <Divider hidden />
    <Grid.Row>
      <Grid.Column width={4}>
        <ProfilePicture />
      </Grid.Column>
      <Grid.Column width={6}>
        <Bio />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);


export default Home;

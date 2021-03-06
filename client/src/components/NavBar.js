import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Menu, Image, Icon, Grid} from 'semantic-ui-react';
import {Link, withRouter} from 'react-router-dom';
import styled from 'styled-components';

class NavBar extends Component {
  rightNavs = (user) => {
    return (
      <Nav stackable pointing secondary>
        <Link to='/'>
          <Menu.Item name='Home' />
        </Link>
        <Link to='/publications'>
          <Menu.Item name='Research' />
        </Link>
        <Link to='/teaching'>
          <Menu.Item name='Teaching' />
        </Link>
        {
          user.id && (
            <Link to='/vitae'>
              <Menu.Item name='Curriculum Vitae' />
            </Link>
          )
        }
        {/*
          REMOVED PER CLIENT REQUEST
          <Link to='/contact'>
            <Menu.Item name='Contact' />
          </Link>
        */}
      </Nav>
    )
  }


  render() {
    const { user } = this.props;
    return (
      <Grid centered>
        <Image src={require('../images/slcHeaderNoName.jpg')} style={{width: '100% !important', height: 'auto !important'}} />
        <Grid.Row centered>
          <Grid.Column width={1}>
          </Grid.Column>
          <NavWrapper>
            <Name>Steven Sylvester</Name>
            <Description>Utah Valley University<br />History & Political Science - Assistant Professor</Description>
          </NavWrapper>
          <Grid.Column verticalAlign='middle' width={1}>
            <a target='_blank' href='https://twitter.com/ssylvester82?lang=en' rel="noopener noreferrer">
              <CustomIcon name='twitter' />
            </a>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered>
          <Center textAlign='center' width={16}>
            {this.rightNavs(user)}
          </Center>
        </Grid.Row>
      </Grid>
    );
  }
}

const Name = styled.h1`
  font-family: 'Playfair Display', sans-serif;
  font-size: 40px;
  font-weight: normal;
  line-height: 48px;
  padding: 0 0 20px;
  text-align: center;
`

const NavWrapper = styled.div`
    margin-left: 20px;
    margin-right: 20px;
    padding: 20px 0;
    text-align: center;
    width: 40%;
`

const Description = styled.div`
    color: #333;
    font-family: 'Lato', sans-serif;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.4em;
    line-height: 19px;
    margin: 0;
    padding-bottom: 10px;
    text-align: center;
    text-transform: uppercase;
`

const Center = styled(Grid.Column)`
  display: flex !important;
  justify-content: center !important;
  width: 100% !important;
`

const Nav = styled(Menu)`
  display: flex !important;
  justify-content: space-around !important;
  width: 80% !important;
  color: #333;
  font-family: 'Lato', sans-serif;
  font-size: 11px;
  font-weight: 700;
  line-height: 19px;

  &.ui.secondary.pointing.menu {
    &:after {
      display: none !important;
    }
  }
`;

const CustomIcon = styled(Icon)`
  font-size: 2rem !important;
`;

const mapStateToProps = state => {
  return { user: state.user };
};

export default withRouter( connect( mapStateToProps )(NavBar));

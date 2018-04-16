import React, {Component} from 'react';
import {Menu, Image, Header, Container} from 'semantic-ui-react';
import {Link, withRouter} from 'react-router-dom';
import styled from 'styled-components';

class NavBar extends Component {
  rightNavs = () => {
    return (
      <Menu.Menu position='right'>
        <Link to='/vitae'>
          <Menu.Item name='Curriculum Vitae' />
        </Link>
        <Link to='/publications'>
          <Menu.Item name='Publications' />
        </Link>
        <Link to='/current_research'>
          <Menu.Item name='Current Research' />
        </Link>
        <Link to='/data'>
          <Menu.Item name='Replication Data' />
        </Link>
        <Link to='/contact'>
          <Menu.Item name='Contact' />
        </Link>
      </Menu.Menu>

    )

  }


  render() {
    return (
      <div>
        <Image src={require('../images/slcHeaderNoName.jpg')} style={{width: '100% !important', height: 'auto !important'}} />
        <NavWrapper>
          <Name>Steven Sylvester</Name>
          <Description>Utah Valley University<br />History & Political Science - Assistant Professor</Description>
        </NavWrapper>
        <Menu pointing secondary style={styles.base}>
          <Link to='/'>
            <Menu.Item name='home' />
          </Link>
          {this.rightNavs()}
        </Menu>
      </div>
    );
  }
}

const styles = {
  base: {
    padding: '5px',
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
    margin: 0 auto;
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

export default withRouter(NavBar);

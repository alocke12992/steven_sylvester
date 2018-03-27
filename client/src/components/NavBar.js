import React, { Component } from 'react';
import About from './About';
import Cv from './Cv';
import CurrentResearch from './CurrentResearch';
import Publications from './Publications';
import { Menu, Image, Header } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

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
      </Menu.Menu>

    )

  }


  render() {
    return (
      <div>
        <Image src={ require( '../images/slcheader.jpg' ) } />
        <Menu pointing secondary style={ styles.base }>
          <Link to='/'>
            <Menu.Item name='home' />
          </Link>
          { this.rightNavs() }
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

export default withRouter( NavBar );

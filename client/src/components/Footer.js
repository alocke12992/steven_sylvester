import React from 'react';
import { connect } from 'react-redux';
import { handleLogout } from '../actions/auth';
import { Menu } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';

class Footer extends React.Component {

  rightNavs = () => {
    const { user, dispatch, history } = this.props;

    if ( user.id ) {
      return (
        <Menu.Menu position='right'>
          <Link to='/password'>
            <Menu.Item name='Edit Password' />
          </Link>
          <Menu.Item
            name='Logout'
            onClick={ () => dispatch( handleLogout( history ) ) }
          />
        </Menu.Menu>
      );
    }
  }

  render() {
    return (
      <div>
        <div style={ styles.footer }>
        </div>
        <Menu borderless>
          <Menu.Item
            header>
          </Menu.Item>
          { this.rightNavs() }
        </Menu>
      </div>
    );
  }
}

const styles = {
  footer: {
    height: '200px',
  }
}
const mapStateToProps = state => {
  return { user: state.user };
};


export default withRouter( connect( mapStateToProps )( Footer ) );
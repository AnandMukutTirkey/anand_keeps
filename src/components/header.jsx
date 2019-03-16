import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import classNames from 'classnames';
import MenuIcon from '@material-ui/icons/Menu';
import Book from '@material-ui/icons/Book'
import IconButton from '@material-ui/core/IconButton';
import { Toolbar, Typography, Button } from '@material-ui/core';

class Header extends React.Component {

  handleLogout = v => e => {
    this.props.logoutfunc()
  }
  render() {
    let logout
    if (this.props.login) {
      logout = <Button
        color="inherit"
        style={{ right: 50, position: 'fixed' }}
        onClick={this.handleLogout("9")}
      >Logout</Button>
    }
    return (<div>
      <AppBar position="fixed">
        <Toolbar>
          <Book />
          <Typography variant="h6" color="inherit" noWrap>
            Keep
              </Typography>
          {logout}
        </Toolbar>
      </AppBar>
    </div>)
  }
}

export default (Header)
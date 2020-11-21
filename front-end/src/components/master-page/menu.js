import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { AccountCircle, Email, Home, LibraryBooks, Pets, PhotoSizeSelectActual } from '@material-ui/icons';

export default function LongMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: '26ch',
            square: true
          },
        }}
      >       
          <MenuItem onClick={handleClose}>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem >
                <ListItemIcon>
                  <Home/>
                </ListItemIcon>
                <Link color='textPrimary' href='/'>Home</Link>
              </ListItem>
              <ListItem >
                <ListItemIcon>
                  <PhotoSizeSelectActual/>
                </ListItemIcon>
                  <Link color='textPrimary' href='/gallery'>Gallery</Link>
              </ListItem>
              <ListItem >
                <ListItemIcon>
                  <Pets/>
                </ListItemIcon>
                <Link color='textPrimary' href='/signup'>Sign-up</Link>
              </ListItem>
              <ListItem >
                <ListItemIcon>
                  <AccountCircle/>
                </ListItemIcon>
                <Link color='textPrimary' href='/profile'>Profile</Link>
              </ListItem>
              <ListItem >
                <ListItemIcon>
                  <Email/>
                </ListItemIcon>
                <Link color='textPrimary' href='/contact'>Contact</Link>
              </ListItem>
              <ListItem >
                <ListItemIcon>
                  <LibraryBooks/>
                </ListItemIcon>
                <Link color='textPrimary' href='/story'>Story</Link>
              </ListItem>
            </List>
          </MenuItem>  
      </Menu>
    </div>
  );
}

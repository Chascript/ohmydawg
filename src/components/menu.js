import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';



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
            width: '20ch',
            square: true
          },
        }}
      >
        
          <MenuItem onClick={handleClose}>
            <List component="nav" aria-label="main mailbox folders">
              <ListItem ><Link href='/'>Home</Link></ListItem>
              <ListItem ><Link href='/gallery'>Gallery</Link></ListItem>
              <ListItem ><Link href='/loginsignup'>Sign-up/log-in</Link></ListItem>
              <ListItem ><Link href='/profile'>Profile</Link></ListItem>
              <ListItem ><Link href='/contact'>Contact</Link></ListItem>
              <ListItem ><Link href='/story'>Story</Link></ListItem>
            </List>
          </MenuItem>
        
      </Menu>
    </div>
  );
}

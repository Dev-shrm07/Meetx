import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {AiOutlineMenu} from 'react-icons/ai'
import {ImCross} from 'react-icons/im'
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useMediaQuery, useTheme, Box, Stack } from '@mui/material';
import { User } from '../models/user';
import { logout } from '../network/meet_api';
import * as MeetAPI from "../network/meet_api"

interface Navbarprops{
    user: User|null,
    onSignupclicked: ()=>void,
    onLoginclicked: ()=>void,
    onLogoutClicked: ()=>void,
}

const NavBar = ({user, onSignupclicked, onLoginclicked, onLogoutClicked}: Navbarprops) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  async function logout() {
    try {
        await MeetAPI.logout()
        onLogoutClicked()
    } catch (error) {
        console.error(error)
        alert(error)
    }
    
  }

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  

  const navLinks = user ? (
    <Button color="inherit" onClick={logout}>
      Logout
    </Button>
  ) : (
    <>
      <Button color="inherit" onClick={onLoginclicked}>Login</Button>
      <Button color="inherit" onClick={onSignupclicked}>Signup</Button>
    </>
  );

  const drawerContent = (
    <List>
      <ListItem>
      <ImCross onClick={handleDrawerToggle} className='k'/>
      </ListItem>
      <ListItem button>
        {user ? (
          <ListItemText primary="Logout" onClick={logout} />
        ) : (
          <ListItemText primary="Login" onClick={onLoginclicked}/>
        )}
      </ListItem>
      {!user && (
        <ListItem button>
          <ListItemText primary="Signup" onClick={onSignupclicked} />
        </ListItem>
      )}
    </List>
  );

  return (
    <AppBar position="static" className='appbar'>
      <Toolbar>
        {isSmallScreen && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <AiOutlineMenu />
          </IconButton>
        )}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Meet Manager
        </Typography>
        {/* Show login/signup buttons on larger screens */}
        {!isSmallScreen && <div>{navLinks}</div>}
      </Toolbar>

      {/* Drawer for displaying menu on smaller screens */}
      <Drawer
        anchor="right" // Change anchor to 'left' if you want the menu on the left side
        open={isDrawerOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: 'block', sm: 'none' } }} // Hide the drawer on larger screens
      >
        <Box
          sx={{
            width: '100vw',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          {drawerContent}
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default NavBar;

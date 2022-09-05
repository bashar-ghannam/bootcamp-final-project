import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AccountCircle from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Link } from 'react-router-dom';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    top: 'auto',
    bottom: 0,
    width: '100%',
    color: 'red',
    backgroundColor: 'red',
  },
  link: {
    textDecoration: 'none',
  },
});

function Navbar({ user, logout }) {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        label="Home"
        value="Home"
        icon={
          <Link to="/">
            <HomeIcon />
          </Link>
        }
      />
      <BottomNavigationAction
        label="Favorites"
        value="favorites"
        icon={
          <Link to="/">
            <FavoriteIcon />
          </Link>
        }
      />
      <BottomNavigationAction
        label="Notification"
        value="Notification"
        icon={
          <Link to="/meal">
            <NotificationsIcon />
          </Link>
        }
      />
      <BottomNavigationAction
        label="Profile"
        value="Profile"
        icon={
          <div>
            <span
              ref={anchorRef}
              aria-controls={open ? 'menu-list-grow' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <AccountCircle />
            </span>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom' ? 'center top' : 'center bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="menu-list-grow"
                        onKeyDown={handleListKeyDown}
                      >
                        {user === null ? (
                          <MenuItem onClick={handleClose}>
                            <Link to="/login" className={classes.link}>
                              Login
                            </Link>
                          </MenuItem>
                        ) : (
                          <div>
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>
                              <span onClick={logout}>Logout</span>
                            </MenuItem>
                          </div>
                        )}
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        }
      />
    </BottomNavigation>
  );
}

export default Navbar;

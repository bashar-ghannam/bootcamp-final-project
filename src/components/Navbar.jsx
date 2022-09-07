import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { Badge } from '@mui/material';
import { observer, inject } from 'mobx-react';

function Navbar({ user, logout, CartStore, favCount }) {
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      sx={{ position: 'fixed', top: 'auto', bottom: 0, width: '100%' }}
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
          <Link to="/favMeals">
            <Badge color="secondary" badgeContent={favCount}>
              <FavoriteIcon />
            </Badge>
          </Link>
        }
      />
      <BottomNavigationAction
        label="Notification"
        value="Notification"
        icon={
          <Link to="/cart">
            <Badge color="secondary" badgeContent={CartStore.totalQuantities}>
              <ShoppingCartIcon />
            </Badge>
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
              id="composition-button"
              aria-controls={open ? 'composition-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <AccountCircle />
            </span>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom-start' ? 'left top' : 'left bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                        sx={{ width: 'auto' }}
                      >
                        {user === null ? (
                          <MenuItem
                            onClick={handleClose}
                            sx={{
                              width: '100px',
                              display: 'block',
                            }}
                          >
                            <Link
                              to="/login"
                              style={{ textDecoration: 'none', color: 'black' }}
                            >
                              Login
                            </Link>
                          </MenuItem>
                        ) : (
                          <div>
                            <MenuItem
                              onClick={handleClose}
                              sx={{ width: '100px', display: 'block' }}
                            >
                              Profile
                            </MenuItem>
                            <MenuItem
                              onClick={handleClose}
                              sx={{ width: '100px', display: 'block' }}
                            >
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

export default inject('CartStore')(observer(Navbar));

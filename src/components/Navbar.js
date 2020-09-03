import React from 'react';
import PropTypes from 'prop-types';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Notifications from './Notifications';

// Redux
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions';

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    paddingLeft: '50px',
  },
  inputRoot: {
    color: 'inherit',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  avatarImage: {
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

const Navbar = (props) => {
  const classes = useStyles();

  const {
    logoutUser,
    user: {
      authenticated,
      credentials: { username, imageUrl },
      gonnas,
      notifications,
    },
  } = props;

  return (
    <div className={classes.grow}>
      <AppBar position='static'>
        <Toolbar>
          <Link to={`/`} className={classes.link}>
            <Typography className={classes.title} variant='h6' noWrap>
              Gonna
            </Typography>
          </Link>
          <div className={classes.grow} />
          {username && authenticated && (
            <div className={classes.sectionDesktop}>
              <IconButton aria-label='notifications' color='inherit'>
                <Notifications />
              </IconButton>
              {imageUrl && (
                <Link to={`/users/${username}`}>
                  <Avatar aria-label='userprofile'>
                    <img
                      src={imageUrl}
                      alt='User image'
                      className={classes.avatarImage}
                    />
                  </Avatar>
                </Link>
              )}
              <Button
                variant='contained'
                color='secondary'
                onClick={() => logoutUser()}
              >
                Log out
              </Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  logoutUser,
};

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(Navbar);

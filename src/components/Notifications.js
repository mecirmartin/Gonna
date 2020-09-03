import React, { useState, Fragment } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Link } from 'react-router-dom';

//MUI
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';
import makeStyles from '@material-ui/styles/makeStyles';

//Redux
import { markNotificationsRead } from '../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({ ...theme.spreadThis }));

const Notifications = (props) => {
  const classes = useStyles();
  const notifications = useSelector((state) => state.user.notifications);
  const dispatch = useDispatch();
  const [anchor, setAnchor] = useState(null);
  dayjs.extend(relativeTime);

  const handleOpen = (event) => {
    setAnchor(event.target);
  };

  const handleClose = () => {
    setAnchor(null);
  };

  const onMenuOpened = () => {
    let unreadNotificationsIds = notifications
      .filter((not) => !not.read)
      .map((not) => not.notificationId);
    dispatch(markNotificationsRead(unreadNotificationsIds));
  };

  let notificationIcon;
  if (notifications && notifications.length > 0) {
    notifications.filter((not) => not.read === false).length > 0
      ? (notificationIcon = (
          <Badge color='secondary' badgeContent={notifications.length}>
            <NotificationsIcon />
          </Badge>
        ))
      : (notificationIcon = <NotificationsIcon />);
  } else {
    notificationIcon = <NotificationsIcon />;
  }

  let notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map((not) => {
        const verb = not.type === 'gonna' ? 'gonned' : 'commented on';
        const time = dayjs(not.createdAt).fromNow();
        const iconColor = not.read ? 'primary' : 'secondary';
        const icon =
          not.type === 'gonna' ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          );
        return (
          <Link
            className={classes.link}
            to={`/users/${not.recipient}/event/${not.eventId}`}
            key={not.createdAt}
          >
            <MenuItem onClick={handleClose}>
              {icon}
              <Typography variant='body1'>
                {not.sender} {verb} your event {time}
              </Typography>
            </MenuItem>
          </Link>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications.</MenuItem>
    );

  return (
    <Fragment>
      <Tooltip title='Notifications'>
        <IconButton
          aria-owns={anchor ? 'simple-menu' : undefined}
          aria-haspopup='true'
          onClick={handleOpen}
        >
          {notificationIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        {notificationsMarkup}
      </Menu>
    </Fragment>
  );
};

export default Notifications;

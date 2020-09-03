import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import ChatIcon from '@material-ui/icons/Chat';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteEvent from './DeleteEvent';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EventComments from './EventComments';
import theme from '../util/theme';
import Commentadder from './Commentadder';
import { Link } from 'react-router-dom';
import Emote from './Emote';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSelector, useDispatch } from 'react-redux';
import { gonnaEvent, ungonnaEvent } from '../redux/actions/dataActions';

const useStyles = makeStyles((theme) => ({ ...theme.spreadThis }));

const EventCard = (props) => {
  const classes = useStyles();
  dayjs.extend(relativeTime);

  const {
    event: {
      eventName,
      desc,
      time,
      userImage,
      place,
      gonnaCount,
      commentCount,
      username,
      eventId,
    },
  } = props;

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [commentsOpen, setCommentsOpen] = useState(false);

  const isGonned = () => {
    if (user.gonnas && user.gonnas.find((gonna) => gonna.eventId === eventId))
      return true;
    else return false;
  };

  const handleCommentClick = () => {
    setCommentsOpen(!commentsOpen);
  };

  const gonnaButton = isGonned() ? (
    <Tooltip title='Ungonna'>
      <IconButton onClick={() => dispatch(ungonnaEvent(eventId))}>
        <FavoriteIcon />
        <span>{gonnaCount}</span>
      </IconButton>
    </Tooltip>
  ) : (
    <Tooltip title='Gonna'>
      <IconButton onClick={() => dispatch(gonnaEvent(eventId))}>
        <FavoriteBorder />
        <span>{gonnaCount}</span>
      </IconButton>
    </Tooltip>
  );

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Link to={`/users/${username}`}>
            <Avatar aria-label='user'>
              <img
                className={classes.avatarImage}
                src={userImage}
                alt='User image'
              />
            </Avatar>
          </Link>
        }
        titleTypographyProps={{ variant: 'h5' }}
        title={eventName}
        subheader={dayjs().to(dayjs(time))}
      />
      {username === user.credentials.username ? (
        <DeleteEvent eventId={eventId} />
      ) : null}

      <CardContent className={classes.cardContent}>
        <Box>
          <Typography className={classes.iconContainer}>
            <Emote emote='📍' />
            {place}
          </Typography>
          <Typography className={classes.iconContainer}>
            <Emote emote='⌚' />
            {dayjs(time).format('D.M.YYYY H:m')}
          </Typography>
          <Typography className={classes.iconContainer}>
            <Emote emote='⭐' />
            {desc}
          </Typography>
        </Box>
      </CardContent>

      <CardActions disableSpacing>
        {gonnaButton}
        <IconButton onClick={handleCommentClick}>
          <ChatIcon />
          <span>{commentCount}</span>
        </IconButton>
      </CardActions>

      {commentsOpen && (
        <div>
          <Commentadder eventId={eventId} />
          <EventComments eventId={eventId} />{' '}
        </div>
      )}
    </Card>
  );
};

export default EventCard;

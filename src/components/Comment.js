import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

//MUI stuff
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import theme from '../util/theme';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  commentBody: {
    margin: '0 14px 14px 14px',
  },
  link: {
    textDecoration: 'none',
  },
}));

const Comment = ({ body, createdAt, userImage, username }) => {
  const classes = useStyles();

  return (
    <Paper elevation={3}>
      <Card>
        <CardHeader
          avatar={
            <Link to={`/users/${username}`} className={classes.link}>
              {' '}
              <Avatar aria-label='user'>
                <img
                  src={userImage}
                  className={classes.avatarImage}
                  alt='User image'
                />
              </Avatar>
            </Link>
          }
          subheaderTypographyProps={{ variant: 'caption' }}
          title={
            <Link to={`/users/${username}`} className={classes.link}>
              {username}
            </Link>
          }
          subheader={dayjs().to(dayjs(createdAt))}
        />
        <Typography className={classes.commentBody} variant='body2'>
          {body}
        </Typography>
      </Card>
    </Paper>
  );
};

export default Comment;

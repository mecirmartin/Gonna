import React from 'react';
import Emote from './Emote';

//MUI
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import theme from '../util/theme';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  profileText: {
    textAlign: 'center',
  },
}));

const StaticProfile = ({ age, email, imageUrl, username }) => {
  const classes = useStyles();
  return imageUrl ? (
    <Paper className={classes.profile}>
      <div className={classes.imageWrapper}>
        <img
          src={imageUrl}
          alt='profile image'
          className={classes.profileImage}
        ></img>
      </div>
      <div className={classes.profileText}>
        <Typography variant='h4'>{username}</Typography>
        <Typography>{age}</Typography>
      </div>
    </Paper>
  ) : (
    <div className={classes.imageWrapper}>
      <CircularProgress />
    </div>
  );
};

export default StaticProfile;

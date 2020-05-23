import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

//MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20,
  },

  image: {
    minWidth: 200,
  },

  content: { padding: 25, objectFit: 'cover' },
};

const Event = () => {
  const {
    classes,
    event: {
      eventName,
      desc,
      time,
      userImage,
      place,
      gonnaCount,
      commentCount,
      username,
    },
  } = this.props;

  dayjs.extend();
  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title='Event image'
        className={classes.image}
      />
      <CardContent class={classes.content}>
        <Typography variant='h5' component={Link} to={`/users/${username}`}>
          {username}
        </Typography>
        <Typography variant='body2' color='textSecondary'>
          {dayjs().to(time)}
        </Typography>
        <Typography variant='body1'>{desc}</Typography>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(Event);

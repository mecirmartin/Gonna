import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';
import StaticProfile from '../components/StaticProfile';
import EventSkeleton from '../util/EventSkeleton';

//Mui
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Typography from '@material-ui/core/Typography';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  circularProgress: {
    textAlign: 'center',
  },
}));

const User = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.data.loading);
  const events = useSelector((state) => state.data.events);
  const [profile, setProfile] = useState({});
  const [eventId, setEventId] = useState('');

  useEffect(() => {
    const username = props.match.params.username;
    const eventId = props.match.params.eventId;
    if (eventId) setEventId(eventId);
    dispatch(getUserData(username));
    const fetch = async () => {
      try {
        const res = await axios.get(`/user/${username}`);
        setProfile({ ...res.data.user });
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, []);

  let oneEvent = events.find((event) => event.eventId === eventId);
  let recentEvents = loading ? (
    <EventSkeleton />
  ) : events === null ? (
    <Typography>This user has no events.</Typography>
  ) : !eventId ? (
    events.map((event) => <EventCard key={event.eventId} event={event} />)
  ) : oneEvent ? (
    <EventCard event={oneEvent} />
  ) : (
    <Typography>Event not found</Typography>
  );
  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {recentEvents}
      </Grid>
      <Grid item sm={4} xs={12}>
        <StaticProfile {...profile} />
      </Grid>
    </Grid>
  );
};

export default User;

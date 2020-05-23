import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import Event from '../components/Event';

const Home = () => {
  const [state, setState] = useState({});

  useEffect(() => {
    const fetcher = async () => {
      try {
        const token = localStorage.getItem('FBIdToken');
        const res = axios.post('events', token);
        console.log(res.data);
        setState({
          events: res.data,
        });
      } catch (err) {
        console.log(err);
      }
    };

    fetcher();
  }, []);

  let recentEvents = state.events ? (
    state.events.map((event) => <Event event={event} />)
  ) : (
    <p>Loading something....</p>
  );
  return (
    <Grid container spacing={8}>
      <Grid item sm={8} xs={12}>
        {recentEvents}
      </Grid>
      <Grid item sm={4} xs={12}>
        <p>Profile...</p>
      </Grid>
    </Grid>
  );
};

export default Home;

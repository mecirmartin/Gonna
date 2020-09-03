import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import EventCard from '../components/EventCard';
import Eventadder from '../components/Eventadder';
import PropTypes from 'prop-types';
import EventSkeleton from '../util/EventSkeleton';

import { connect } from 'react-redux';
import { getEvents } from '../redux/actions/dataActions';

class Home extends Component {
  componentDidMount() {
    this.props.getEvents();
  }
  render() {
    const { events, loading } = this.props.data;

    let recentEvents = !loading ? (
      events.map((event) => <EventCard key={event.eventId} event={event} />)
    ) : (
      <EventSkeleton />
    );
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {recentEvents}
        </Grid>
        <Grid item sm={4} xs={12}>
          {!loading && <Eventadder />}
        </Grid>
      </Grid>
    );
  }
}

Home.propTypes = {
  getEvents: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getEvents })(Home);

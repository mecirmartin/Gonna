import React, { useEffect, Fragment } from 'react';
import { getEvent } from '../redux/actions/dataActions';
import Comment from './Comment';

//MUI
import CircularProgress from '@material-ui/core/CircularProgress';

// Redux
import { useSelector, useDispatch } from 'react-redux';

const EventComments = ({ eventId }) => {
  const loading = useSelector((state) => state.UI.loading);
  const comments = useSelector((state) => state.data.event.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEvent(eventId));
  }, []);

  return !comments ? (
    <CircularProgress size={50} />
  ) : (
    <Fragment>
      {comments.map((comment) => (
        <Comment {...comment} key={comment.createdAt} />
      ))}
    </Fragment>
  );
};

export default EventComments;

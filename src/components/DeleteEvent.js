import React, { Component, Fragment, useState } from 'react';
import PropTypes from 'prop-types';

// MUI stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

import { useDispatch } from 'react-redux';
import { deleteEvent } from '../redux/actions/dataActions';

const useStyles = makeStyles({
  deleteButton: {
    top: '10%',
    left: '90%',
    position: 'absolute',
  },
});

const DeleteEvent = ({ eventId }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const deletePost = () => {
    console.log('eventId v deletePost', eventId);
    dispatch(deleteEvent(eventId));
    setOpen(false);
  };

  return (
    <Fragment>
      <Tooltip title='Delete Event'>
        <Button onClick={handleOpen} className={classes.deleteButton}>
          <DeleteOutline color='secondary' />
        </Button>
      </Tooltip>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm'>
        <DialogTitle>Are you sure you want to delete this event?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Cancel
          </Button>
          <Button onClick={deletePost} color='secondary'>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

DeleteEvent.propTypes = {
  eventId: PropTypes.string.isRequired,
};

export default DeleteEvent;

import React, { useState, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import { validateEvent } from '../util/validators';
import Button from '@material-ui/core/Button';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import theme from '../util/theme';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import { postEvent } from '../redux/actions/dataActions';

const useStyles = makeStyles((theme) => ({
  ...theme.spredThis,
  textfield: {
    margin: '0px auto 14px auto',
  },
  div: {
    marginBottom: 20,
  },
  form: {
    position: 'sticky',
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    margin: '28px auto 0px auto',
    padding: '5px 7px 5px 7px',
  },
}));

const Eventadder = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedDate, handleDateChange] = useState(new Date());
  const loading = useSelector((state) => state.UI.loading);

  const handleSubmit = () => {
    const newEvent = {
      eventName: formik.values.eventName,
      place: formik.values.place,
      desc: formik.values.description,
      time: selectedDate,
    };
    dispatch(postEvent(newEvent));
    formik.values.eventName = '';
    formik.values.place = '';
    formik.values.description = '';
    handleDateChange(new Date());
  };

  const formik = useFormik({
    initialValues: {
      eventName: '',
      place: '',
      description: '',
    },
    validate: validateEvent,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className={classes.form}>
      <TextField
        className={classes.textfield}
        label='Place'
        name='place'
        fullWidth
        variant='outlined'
        value={formik.values.place}
        onChange={formik.handleChange}
        helperText={formik.touched.place && formik.errors.place}
        onBlur={formik.handleBlur}
        error={formik.touched.place && formik.errors.place ? true : false}
      />

      <TextField
        className={classes.textfield}
        label='Name of Event'
        name='eventName'
        fullWidth
        variant='outlined'
        value={formik.values.eventName}
        onChange={formik.handleChange}
        helperText={formik.touched.eventName && formik.errors.eventName}
        onBlur={formik.handleBlur}
        error={
          formik.touched.eventName && formik.errors.eventName ? true : false
        }
      />

      <TextField
        className={classes.textfield}
        label='Description'
        variant='outlined'
        name='description'
        multiline
        fullWidth
        rows='8'
        value={formik.values.description}
        onChange={formik.handleChange}
        helperText={formik.touched.description && formik.errors.description}
        onBlur={formik.handleBlur}
        error={
          formik.touched.description && formik.errors.description ? true : false
        }
      />
      <MuiPickersUtilsProvider utils={DayjsUtils}>
        <DateTimePicker
          name='time'
          label='Time and date'
          fullWidth
          className={classes.textfield}
          value={selectedDate}
          onChange={handleDateChange}
        />
      </MuiPickersUtilsProvider>

      <Button
        type='submit'
        variant='contained'
        fullWidth
        color='primary'
        className={classes.button}
      >
        Submit
        {loading && (
          <CircularProgress size={30} className={classes.progressSpinner} />
        )}
      </Button>
    </form>
  );
};

export default Eventadder;

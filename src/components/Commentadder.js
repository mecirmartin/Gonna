import React from 'react';

// Mui
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../util/theme';
import Avatar from '@material-ui/core/Avatar';

// Formik
import { useFormik } from 'formik';
import { validateComment } from '../util/validators';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { commentOnEvent } from '../redux/actions/dataActions';

const useStyles = makeStyles((theme) => ({
  ...theme.spreadThis,
  avatarGrid: {
    position: 'absolute',
    left: '0.5%',
  },
}));

const Commentadder = ({ eventId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userImage = useSelector((state) => state.user.credentials.imageUrl);

  const handleSubmit = () => {
    dispatch(commentOnEvent(eventId, formik.values.body));
    formik.values.body = '';
  };

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    validate: validateComment,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={3} justify='center' alignItems='center'>
        <Grid className={classes.avatarGrid} item xs={false}>
          <Avatar aria-label='user'>
            <img
              className={classes.avatarImage}
              src={userImage}
              alt='User image'
            />
          </Avatar>
        </Grid>
        <Grid item xs={8}>
          <TextField
            name='body'
            value={formik.values.body}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            fullWidth
            placeholder='Type something...'
            helperText={formik.touched.body && formik.errors.body}
            error={formik.touched.body && formik.errors.body ? true : false}
          />
        </Grid>
        <Grid item xs={2}>
          {' '}
          <Button
            type='submit'
            variant='contained'
            fullWidth
            color='primary'
            className={classes.button}
          >
            {' '}
            Submit{' '}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Commentadder;

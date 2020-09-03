export const validateEvent = (values) => {
  const errors = {};
  if (!values.eventName) {
    errors.eventName = 'Required';
  } else if (values.eventName.length > 30) {
    errors.eventName = 'Must be 30 characters or less';
  }

  if (!values.place) {
    errors.place = 'Required';
  } else if (values.place.length > 30) {
    errors.place = 'Must be 30 characters or less';
  }

  if (!values.description) {
    errors.description = 'Required';
  } else if (values.description.length > 500) {
    errors.description = 'Must be 500 characters or less';
  }

  return errors;
};

export const validateComment = (values) => {
  const errors = {};
  if (!values.body) {
    errors.body = 'Required';
  } else if (values.body.length > 500) {
    errors.body = 'Must be 500 characters or less';
  }

  return errors;
};

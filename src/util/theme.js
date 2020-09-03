export default {
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
  spreadThis: {
    typography: {
      useNextVariants: true,
    },
    link: {
      textDecoration: 'none',
      color: 'inherit',
    },
    form: {
      textAlign: 'center',
    },
    pageTitle: {
      margin: '0px auto 20px auto',
    },
    image: {
      maxWidth: 75,
      margin: '40px auto 20px auto',
    },
    textField: {
      margin: '0px auto 10px auto',
    },
    button: {
      margin: '20px auto 5px auto',
      position: 'relative',
    },
    customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10,
    },
    progress: {
      position: 'absolute',
    },
    root: {
      marginBottom: 28,
      position: 'relative',
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },

    avatarImage: {
      maxWidth: '100%',
      maxWidth: 50,
      maxHeight: '100%',
      borderRadius: '50%',
    },

    iconContainer: {
      display: 'flex',
      alignItems: 'center',
    },

    imageWrapper: {
      textAlign: 'center',
      position: 'relative',
      '& button': {
        position: 'absolute',
        top: '80%',
        left: '70%',
      },
    },
    profileImage: {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%',
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle',
      },
      '& a': {
        color: '#00bcd4',
      },
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0',
    },
    '& svg.button': {
      '&:hover': {
        cursor: 'pointer',
      },
    },
  },
  buttons: {
    textAlign: 'center',
    '& a': {
      margin: '20px 10px',
    },
  },
};

export default theme => ({
  header: {
    height: '80vh',
    position: 'relative',
  },
  panel: {
    width: '100%',
    height: '100vh',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  frame: {
    width: '100%',
    height: '100vh',
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100vh',
    background: theme.background.primary,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  body: {
    borderRadius: '30px 30px 0px 0px',
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    height: theme.spacing(7),
    width: theme.spacing(7),
  },
});
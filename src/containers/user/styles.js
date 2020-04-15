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
  paper: {
    padding: 32,
    borderRadius: theme.spacing(4),
    boxShadow: theme.shadows[8],
    transition: theme.transitions.create(),
    '&:hover': {
      boxShadow: theme.shadows[16],
    }
  },
  avatar: {
    height: theme.spacing(8),
    width: theme.spacing(8),
  },
  noWrap: {
    flexWrap: 'nowrap',
  },
  stretch: {
    flex: '1 1 auto',
  },
});
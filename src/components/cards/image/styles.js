import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  rounded: {
    width: '100%',
    paddingBottom: '100%',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: theme.shape.borderRadius,
  },
  square: {
    width: '100%',
    paddingBottom: '100%',
    position: 'relative',
    overflow: 'hidden',
  },
  jpg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  png: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: `calc(100% - ${theme.spacing(4)}px)`,
    height: `calc(100% - ${theme.spacing(4)}px)`,
    margin: theme.spacing(2),
    filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.24)) drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.12))',
  },
}));
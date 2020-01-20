import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        type: 'dark',
      },
    
});

theme.typography.h1 = {
  fontSize: '6rem',
  '@media (max-width:650px)': {
    fontSize: '3.3rem',
  },
};

theme.typography.h6 = {
  fontSize: '1.5rem',
  '@media (max-width:650px)': {
    fontSize: '1rem',
  },
};

export default theme;
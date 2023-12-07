import * as React from 'react';
import { Newspaper } from '@mui/icons-material';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';


interface HeaderProps {
  toggleTheme: (auth: boolean) => void;
}



const Header:React.FC<HeaderProps> = ({toggleTheme}: HeaderProps) => {
  const [auth, setAuth] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setAuth(isChecked);
    toggleTheme(isChecked);

  };




  return (
     
    <AppBar position="relative">
      <Toolbar>
        <Newspaper sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap flexGrow={1}>
          News App
        </Typography>
        <FormGroup>
        <FormControlLabel
          control={
            <Switch color='default'
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
              id='theme'
            />
          }
          label={auth ? 'Switch to Light mode' : 'Switch to Dark mode'}
         
        />
      </FormGroup>
      </Toolbar>
    </AppBar>
   
  )
}

export default Header

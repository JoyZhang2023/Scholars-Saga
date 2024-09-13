import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import SignOut from './SignOut';

interface NavbarAdminProps {
  header: string;
}

const NavbarAdmin: React.FC<NavbarAdminProps> = ({ header }) => {
  const router = useRouter();

  const handleLogout = () => {
    // Implement logout functionality here
    router.push('/login'); // Redirect to login page after logout
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {header}
        </Typography>
        <Button color="inherit">{<SignOut/>}</Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarAdmin;

// components/Navigation.js
import { Drawer, List, ListItem, ListItemText, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navigation({ children }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'History', path: '/history' },
    { text: 'Receive', path: '/receive' },
  ];

  return (
    <div>
      <IconButton onClick={() => setOpen(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer  anchor="left" open={open} onClose={() => setOpen(false)} PaperProps={{ 
    sx: { width: '300px' } // Adjust width as needed
  }}
  transitionDuration={{ 
    enter: 400, // Speed up enter animation (default is 225)
    exit: 300   // Speed up exit animation (default is 195)
  }}>
        <List > 
          {menuItems.map((item) => (
            <ListItem button onClick={() => navigate(item.path)} key={item.text}>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      {children}
    </div>
  );
}
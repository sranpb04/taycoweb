
import { Box, Typography, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header({ currentTab }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { text: 'Home', path: '/' },
    { text: 'History', path: '/history' },
    { text: 'Receive', path: '/receive' }
  ];

  return (
    <>
      <Box sx={{ 
        backgroundColor: '#ff8c00',
        padding: '12px 20px',
        marginBottom: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '5px'
      }}>
        <IconButton 
          onClick={() => setDrawerOpen(true)}
          sx={{ color: 'white' }}
        >
          <MenuIcon />
        </IconButton>
        <Typography sx={{ 
          color: 'white',
          fontSize: '20px',
          fontWeight: 'bold'
        }}>
          Tayco / {currentTab}
        </Typography>
      </Box>

      <Drawer 
        anchor="left" 
        open={drawerOpen} 
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ 
          sx: { width: '300px' } 
        }}
        transitionDuration={{ enter: 400, exit: 300 }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.text}
              onClick={() => {
                navigate(item.path);
                setDrawerOpen(false);
              }}
              sx={{
                border: '1px solid #e0e0e0',
                margin: '8px 16px',
                borderRadius: '4px',
                '&:hover': {
                  border: '1px solid #ff9800',
                  borderWidth:'270',
                  backgroundColor: 'rgba(255, 152, 0, 0.08)',
                  '& .MuiListItemText-primary': {
                    color: '#ff9800'
                  }
                }
              }}
            >
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
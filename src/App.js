// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import History from './pages/History';
import Receive from './pages/Recieve';
import Header from './components/header';
import { SearchProvider } from './context/SearchContext';
const theme = createTheme({
  palette: {
    primary: {
      main: '#ff9800',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SearchProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<><Header currentTab="Home" /><Home /></>} />
          <Route path="/history" element={<><Header currentTab="History" /><History /></>} />
          <Route path="/receive" element={<><Header currentTab="Receive" /><Receive /></>} />
        </Routes>
      </BrowserRouter>
      </SearchProvider>
    </ThemeProvider>
  );
}

export default App;
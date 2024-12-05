// pages/History.js
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import { useSearch } from '../context/SearchContext';

export default function History() {
  const { searchHistory, printHistory } = useSearch();

  const getMostSearchedOrder = () => {
    const orderCounts = searchHistory.reduce((acc, curr) => {
      const key = curr.orderNo;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const mostSearched = Object.entries(orderCounts)
      .sort(([,a], [,b]) => b - a)[0] || ['5', 6];

    return {
      orderNo: mostSearched[0],
      count: mostSearched[1]
    };
  };

  const mostSearched = getMostSearchedOrder();

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            height: '100%',
            borderRadius: 2,
            border: '1px solid #e0e0e0'
          }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Most Searched Order
              </Typography>
              <Typography variant="h4" color="primary">
                #{mostSearched.orderNo}
              </Typography>
              <Typography color="text.secondary">
                Searched {mostSearched.count} times
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ 
            height: '100%',
            borderRadius: 2,
            border: '1px solid #e0e0e0'
          }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Labels Printed
              </Typography>
              <Typography variant="h4" color="primary">
                {printHistory.length}
              </Typography>
              <Typography color="text.secondary">
                Total printed labels
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
// pages/Home.js
import { useState } from 'react';
import { useSearch } from '../context/SearchContext';
import { 
  TextField, 
  Button, 
  Box, 
  Card, 
  CardContent, 
  Checkbox,
  Typography 
} from '@mui/material';
import { supabase } from '../services/supabaseClient';
import Barcode from 'react-barcode';
import LabelTemplate from '../components/LabelTemplate';
import { printLabel } from '../utils/printLabel';
export default function Home() {
  const [searchValue, setSearchValue] = useState('');
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const { addSearchItem, addPrintItem } = useSearch();

  const handleSelectAll = () => {
    if (selectedItems.length === items.length) {
      // If all items are selected, deselect all
      setSelectedItems([]);
    } else {
      // If not all items are selected, select all
      setSelectedItems(items.map((_, index) => index));
    }
  };
  const handleSelectItem = (index) => {
    if (selectedItems.includes(index)) {
      setSelectedItems(selectedItems.filter(i => i !== index));
    } else {
      setSelectedItems([...selectedItems, index]);
    }
  };
  
  
  const handleSearch = async () => {
    if (!searchValue.trim()) return;
    
    try {
      const { data, error } = await supabase
        .from('joined')
        .select('item_number, item_description, plant_date')
        .ilike('order_nr', `%${searchValue}%`);
      
      if (error) throw error;
      
      // Create a new array to trigger re-render
      
      setItems(data || []);
      data.forEach(item => addSearchItem(item));
      data.forEach(item => {
        addSearchItem({
          orderNo: item.orderNo || '000000',
          itemNo: item.itemNo || 'X-ABCD-00000X',
          description: item.description || 'DESCRIPTION LONG LOREM IPSUM',
          color: item.color || 'COLOR',
          plantDate: item.plantDate || '1985-06-99',
          timestamp: new Date()
        });});
    } catch (error) {
      console.error('Search error:', error);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const generateLabels = async () => {
    const selectedData = items.filter((_, index) => selectedItems.includes(index));
    for (const item of selectedItems) {
        const labelData = {
          orderNo: searchValue,
          itemNo: item.item_number,
          description: item.item_description,
          color: item.color,
          plantDate: item.plant_date
        };
        selectedItems.forEach(item => {
            // Track print
            addPrintItem(item);})
        await printLabel(labelData);
      }
    // Implementation for generating labels for Zebra printer
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', flexWrap:'wrap',justifyContent: 'center', mb: 4 }}>
        <TextField
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Scan or type item number"
          sx={{ width: '60%' }}
        />
        
       
      </Box>
      {/* Buttons with spacing */}
  {items.length > 0 && (
    <Box sx={{ 
      display: 'flex',
      justifyContent: 'center',
      gap: 3,
      mb: 4
    }}>
        <Button 
          variant="contained" 
          onClick={handleSearch}
      
          sx={{ ml: 2 }}
        >
          Search
        </Button>
      <Button 
        variant="contained"
        onClick={handleSelectAll}
        
        sx={{ 
          bgcolor: '#ff9800',
          '&:hover': {
            bgcolor: '#f57c00'
          }
        }}
      >
        {selectedItems.length === items.length ? 'Deselect All' : 'Select All'}
      </Button>
      
      <Button 
        variant="contained"
        onClick={generateLabels}
        disabled={selectedItems.length === 0}
        sx={{ 
          bgcolor: '#ff9800',
          '&:hover': {
            bgcolor: '#f57c00'
          }
        }}
      >
        Generate Labels
      </Button>
    </Box>
  )}

      {items.length > 0 && (
  <Box sx={{ display: 'flex-center', flexWrap: 'wrap', gap: 2 ,justifyContent: 'center'}}>
    {items.map((item, index) => (
      <Card 
        key={index}
        sx={{ 
          width: 300, 
          height:400,
          borderRadius: 4,
          boxShadow: 2,
        border: selectedItems.includes(index) ? '2px solid #ff9800' : '1px solid #e0e0e0',
            transition: 'all 0.1s ease-in-out',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 4px 8px rgba(255, 152, 0, 0.2)',
              border: '2px solid #ff9800',
              cursor: 'pointer'
            }
          
        }}
      >
        <CardContent>
          <Typography variant="h6">Item #: {item.item_number}</Typography>
          <Typography>Description: {item.item_description}</Typography>
         
          <Typography>Plant Date: {item.plant_date}</Typography>
        </CardContent>
        <CardContent>
              <Checkbox
                checked={selectedItems.includes(index)}
                onChange={() => handleSelectItem(index)}
              />
              <LabelTemplate data={{
  orderNo: searchValue,
  itemNo: item.item_number,
  description: item.item_description,
  color: item.color,
  plantDate: item.plant_date
}} />
            </CardContent>
      </Card>
    ))}
  </Box>
)}

    </Box>
  );
}
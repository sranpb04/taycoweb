// components/LabelTemplate.js
import { Box, Typography } from '@mui/material';
import Barcode from 'react-barcode';
import { extractColor } from '../utils/extractColors';
export default function LabelTemplate({ data }) {
    const color = extractColor(data.description || '');
    const mainDescription = data.description ? 
      data.description.split(',').slice(0, 2).join(',') : 
      'DESCRIPTION LONG LOREM IPSUM DOLOR SIT';
  
    return (
        <Box sx={{ 
          width: '400', 
          height: '300', 
          padding: '4px',
          border: '1px solid black',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative'
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ 
              fontWeight: 'bold',
              fontSize: '12px'
            }}>
              ORDER # {data?.orderNo || '000000'}
            </Typography>
            <Barcode
              value={`${data?.orderNo || '000000'}.${data?.itemNo || 'X-ABCD-00000X'}`}
              height={20}
              width={1}
              fontSize={8}
              displayValue={false}
            />
          </Box>
          
          <Typography sx={{ 
            fontWeight: 'bold',
            fontSize: '12px'
          }}>
            ITEM # {data.itemNo || 'X-ABCD-00000X'}
          </Typography>
          
          <Typography sx={{ fontSize: '10px' }}>
        {mainDescription}
      </Typography>
      
      <Typography sx={{ 
        fontStyle: 'italic',
        fontSize: '10px'
      }}>
        {color}
      </Typography>
          
          <Typography sx={{ fontSize: '10px' }}>
            PLANT DATE {data.plantDate || '1995-05-99'}
          </Typography>
          
          <Typography sx={{ 
            fontSize: '10px',
            mt: 'auto'
          }}>
            ___/999 QTY ___/___ BOXES
          </Typography>
        </Box>
      );
}
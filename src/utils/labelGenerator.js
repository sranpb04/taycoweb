// utils/labelGenerator.js
// utils/labelGenerator.js
const ZPL_TEMPLATE = `
^XA
^CF0,20
^FO20,20^FD ORDER # {orderNo}^FS
^FO350,20^BC^FD{barcode}^FS
^FO20,50^FD ITEM # {itemNo}^FS
^FO20,80^FD{description}^FS
^FO20,110^FD{color}^FS
^FO20,140^FDPLANT DATE {plantDate}^FS
^FO20,170^FD___/{totalQty} QTY ___/___ BOXES^FS
^XZ
`;

export const generateLabel = async (item) => {
  const zplData = ZPL_TEMPLATE
    .replace('{orderNo}', item.orderNo)
    .replace('{barcode}', `${item.orderNo}.${item.itemNo}`)
    .replace('{itemNo}', item.itemNo)
    .replace('{description}', item.description)
    .replace('{color}', item.color)
    .replace('{plantDate}', item.plantDate)
    .replace('{totalQty}', '999');

  // Zebra Printer API Implementation
  try {
    const response = await fetch('http://localhost:9100', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: zplData
    });
    
    if (!response.ok) {
      throw new Error('Printing failed');
    }
    
    return true;
  } catch (error) {
    console.error('Printer error:', error);
    return false;
  }
};
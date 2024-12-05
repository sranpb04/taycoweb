// utils/printLabel.js
const printLabel = async (labelData) => {
  const zplTemplate = `
^XA
^CF0,20
^FO20,20^FD ORDER # ${labelData.orderNo}^FS
^FO300,20^BC^FD${labelData.orderNo}.${labelData.itemNo}^FS
^FO20,50^FD ITEM # ${labelData.itemNo}^FS
^FO20,80^FD${labelData.description}^FS
^FO20,110^FD${labelData.color}^FS
^FO20,140^FDPLANT DATE ${labelData.plantDate}^FS
^FO20,170^FD___/999 QTY ___/___ BOXES^FS
^XZ`;

  try {
    const response = await fetch('http://localhost:9100', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: zplTemplate
    });
    
    if (!response.ok) throw new Error('Printing failed');
    return true;
  } catch (error) {
    console.error('Printer error:', error);
    return false;
  }
};
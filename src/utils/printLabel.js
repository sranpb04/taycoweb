// utils/printLabel.js
export const printLabel = async (labelData) => {
    // Create a Blob with the ZPL data
    const zplTemplate = `
    ^XA
    ^CF0,30
    ^FO30,20^A0N,30,30^FDORDER # ${labelData.orderNo}^FS
    ^FO320,20^BCN,40,Y,N^FD${labelData.orderNo}.${labelData.itemNo}^FS
    ^FO30,60^A0N,25,25^FDITEM # ${labelData.itemNo}^FS
    ^FO30,100^A0N,20,20^FD${labelData.description}^FS
    ^FO30,140^A0I,20,20^FDCOLOR^FS
    ^FO30,180^A0N,20,20^FDPLANT DATE ${labelData.plantDate}^FS
    ^FO30,220^A0N,20,20^FD___/999 QTY ___/___ BOXES^FS
    ^PQ1
    ^XZ`;
  
    const blob = new Blob([zplTemplate], { type: 'application/x-zpl' });
    const url = URL.createObjectURL(blob);
    
    // Create an iframe to handle printing
    const printFrame = document.createElement('iframe');
    printFrame.style.display = 'none';
    document.body.appendChild(printFrame);
    
    try {
      printFrame.src = url;
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for iframe to load
      printFrame.contentWindow.print();
      return true;
    } catch (error) {
      console.error('Printer error:', error);
      throw error;
    } finally {
      // Cleanup
      URL.revokeObjectURL(url);
      printFrame.remove();
    }
  };
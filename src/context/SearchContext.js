// context/SearchContext.js
import { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchHistory, setSearchHistory] = useState([]);
  const [printHistory, setPrintHistory] = useState([]);

  const addSearch = (orderData) => {
    setSearchHistory(prev => [...prev, {
      orderNo: orderData.orderNo,
      itemNo: orderData.itemNo,
      timestamp: new Date()
    }]);
  };

  const addPrint = (labelData) => {
    setPrintHistory(prev => [...prev, {
      orderNo: labelData.orderNo,
      itemNo: labelData.itemNo,
      timestamp: new Date()
    }]);
  };

  return (
    <SearchContext.Provider value={{ 
      searchHistory, 
      printHistory, 
      addSearch, 
      addPrint 
    }}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
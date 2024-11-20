import React, { createContext, useContext, useState } from "react";

// Create Context
const BuyContext = createContext();

// Context Provider
export const BuyProvider = ({ children }) => {
  const [boughtCourses, setBoughtCourses] = useState([]);

  return (
    <BuyContext.Provider value={{ boughtCourses, setBoughtCourses }}>
      {children}
    </BuyContext.Provider>
  );
};

// Custom Hook for easy access
export const useBuyContext = () => useContext(BuyContext);

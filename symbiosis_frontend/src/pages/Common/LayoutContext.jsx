import React, { createContext, useContext, useState } from 'react';

const LayoutContext = createContext();

export function useLayoutContext() {
  return useContext(LayoutContext);
}

export function LayoutProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  return (
    <LayoutContext.Provider value={{ cartCount, setCartCount }}>
      {children}
    </LayoutContext.Provider>
  );
}
import React, { createContext, useContext, useState } from 'react';

const LayoutContext = createContext();

export function useLayoutContext() {
  return useContext(LayoutContext);
}

export function LayoutProvider({ children }) {
  const [cartCount, setCartCount] = useState(localStorage.getItem('cart-count') || 0);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  return (
    <LayoutContext.Provider value={{ cartCount, setCartCount, theme, setTheme }}>
      {children}
    </LayoutContext.Provider>
  );
}

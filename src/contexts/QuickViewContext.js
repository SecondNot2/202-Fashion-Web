import React, { createContext, useState, useContext } from "react";

const QuickViewContext = createContext();

export const useQuickView = () => useContext(QuickViewContext);

export const QuickViewProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [product, setProduct] = useState(null);

  const openQuickView = (productData) => {
    setProduct(productData);
    setIsOpen(true);
  };

  const closeQuickView = () => {
    setIsOpen(false);
    setProduct(null);
  };

  return (
    <QuickViewContext.Provider
      value={{ isOpen, product, openQuickView, closeQuickView }}
    >
      {children}
    </QuickViewContext.Provider>
  );
};

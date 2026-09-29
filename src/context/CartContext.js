'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('noor_cart_v1');
      if (saved) {
        setItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Error loading cart:', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('noor_cart_v1', JSON.stringify(items));
      } catch (e) {
        console.error('Error saving cart:', e);
      }
    }
  }, [items, isLoaded]);

  const addToCart = (dish, quantity = 1, instructions = '') => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === dish.id);
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          instructions: instructions || next[existingIndex].instructions,
        };
        toast.success(`Updated ${dish.name} quantity in order`);
        return next;
      } else {
        toast.success(`Added ${dish.name} to order`);
        return [...prev, { ...dish, quantity, instructions }];
      }
    });
  };

  const removeFromCart = (dishId) => {
    setItems((prev) => {
      const dish = prev.find((i) => i.id === dishId);
      if (dish) toast.info(`Removed ${dish.name}`);
      return prev.filter((i) => i.id !== dishId);
    });
  };

  const updateQuantity = (dishId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(dishId);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === dishId ? { ...i, quantity: newQty } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
    setDiscountPercent(0);
    setPromoCode('');
    try {
      localStorage.removeItem('noor_cart_v1');
    } catch (e) {
      console.error(e);
    }
  };

  const applyPromo = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ROYAL15') {
      setDiscountPercent(15);
      setPromoCode('ROYAL15');
      toast.success('Royal Privilege Applied: 15% Savings');
      return true;
    } else if (clean === 'NOOR10') {
      setDiscountPercent(10);
      setPromoCode('NOOR10');
      toast.success('Welcome Offer Applied: 10% Savings');
      return true;
    } else {
      toast.error('Invalid promotional key. Try "ROYAL15"');
      return false;
    }
  };

  const itemCount = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const discountedSubtotal = subtotal - discountAmount;
  const gstTax = Math.round(discountedSubtotal * 0.05); // 5% GST
  const packagingFee = items.length > 0 ? 45 : 0; // Artisanal sustainable packaging
  const total = discountedSubtotal + gstTax + packagingFee;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        itemCount,
        subtotal,
        discountPercent,
        discountAmount,
        promoCode,
        applyPromo,
        gstTax,
        packagingFee,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

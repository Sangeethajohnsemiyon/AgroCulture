import React, { createContext, useContext, useState, useEffect } from 'react';
import { orderAPI } from '../api';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext(null);
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) fetchCart();
    else setCart({ items: [] });
  }, [isAuthenticated]);

  useEffect(() => {
    setCartCount(cart.items?.length || 0);
  }, [cart]);

  const fetchCart = async () => {
    try {
      const data = await orderAPI.getCart();
      if (data.success) setCart(data.cart || { items: [] });
    } catch {}
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!isAuthenticated) { toast.error('Please login to add items to cart'); return; }
    setLoading(true);
    try {
      const data = await orderAPI.addToCart({ productId, quantity });
      if (data.success) { setCart(data.cart); toast.success('Added to cart! 🛒'); }
    } catch (err) {
      toast.error(err.message || 'Failed to add to cart');
    } finally { setLoading(false); }
  };

  const removeFromCart = async (productId) => {
    try {
      const data = await orderAPI.removeFromCart(productId);
      if (data.success) { setCart(data.cart); toast.success('Removed from cart'); }
    } catch {}
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const data = await orderAPI.updateCart({ productId, quantity });
      if (data.success) setCart(data.cart);
    } catch {}
  };

  const clearCart = () => setCart({ items: [] });

  const getCartTotal = () => {
    return cart.items?.reduce((total, item) => {
      const price = item.product?.price || 0;
      return total + price * item.quantity;
    }, 0) || 0;
  };

  return (
    <CartContext.Provider value={{ cart, cartCount, loading, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

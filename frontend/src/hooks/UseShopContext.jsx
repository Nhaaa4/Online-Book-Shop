/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { booksAPI, authAPI } from '../service/api';

const ShopContext = createContext()

export default function ShopContextProvider({ children }) {
  const navigate = useNavigate()
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState({})
  const [books, setBooks] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getBooks = async () => {
    try {
      setIsLoading(true)
      const response = await booksAPI.getAll()
      setBooks(response.data.data)
    } catch (err) {
      console.error(err)
      // Error handling is already done in API interceptor
    } finally {
      setIsLoading(false)
    }
  }

  const getCategories = async () => {
    try {
      setIsLoading(true)
      const response = await booksAPI.getCategories()
      setCategories(response.data.data)
    } catch (err) {
      console.error(err)
      // Error handling is already done in API interceptor
    } finally {
      setIsLoading(false)
    }
  }

  const addToCart = (bookId, quantity) => {
    if (!token) {
      toast("Please log in to add items to your cart", {
        description: <span className="text-gray-500">You need to be logged in to add items to your cart.</span>,
        style: {
          background: "#fef3c7", 
          color: "#92400e",      
          border: "1px solid #fcd34d" 
        },
      });
      return;
    }
    setCartItems((prevItems) => {
      const updatedItems = { ...prevItems, [bookId]: (prevItems[bookId] || 0) + quantity };
      localStorage.setItem('bookshop_cart', JSON.stringify(updatedItems));
      return updatedItems;
    });
    toast(`${quantity} item(s) added to cart`, {
      description: <span className="text-gray-500">You have added {quantity} item(s) to your cart.</span>,
    });
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, count) => total + count, 0);
  };

  const updateQuantity = (bookId, quantity) => {
    if (quantity <= 0) {
      setCartItems((prevItems) => {
        const updatedItems = { ...prevItems };
        delete updatedItems[bookId];
        localStorage.setItem('bookshop_cart', JSON.stringify(updatedItems));
        return updatedItems;
      });
    } else {
      setCartItems((prevItems) => {
        const updatedItems = { ...prevItems, [bookId]: quantity };
        localStorage.setItem('bookshop_cart', JSON.stringify(updatedItems));
        return updatedItems;
      });
    }
  }

  const removeFromCart = (bookId) => {
    setCartItems((prevItems) => {
      const updatedItems = { ...prevItems };
      delete updatedItems[bookId];
      localStorage.setItem('bookshop_cart', JSON.stringify(updatedItems));
      return updatedItems;
    });
  }

  // User management functions
  const fetchUser = useCallback(async () => {
    if (!token) {
      setUser(null);
      return;
    }
    
    try {
      const response = await authAPI.getProfile();
      if (response.data.success) {
        setUser(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      setUser(null);
    }
  }, [token]);

  const refreshUser = () => {
    fetchUser();
  };

  const [cartData, setCartData] = useState([]);
  const totalPrice = cartData.reduce((total, item) => total + (item.price * item.quantity), 0);

  useEffect(() => {
    if (!books || !cartItems) return;
  
    const items = Object.entries(cartItems).map(([bookId, quantity]) => {
      const book = books.find((b) => b?.id?.toString() === bookId.toString());
      if (!book) return null;
  
      return {
        ...book,
        quantity,
      };
    }).filter(Boolean);
  
    setCartData(items);
  }, [cartItems, books]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('bookshop_cart')) || {};
    setCartItems(stored)

    getBooks();
    getCategories();
  }, [setCartItems]);

  useEffect(() => {
    if (!token && localStorage.getItem('bookshop_user')) {
      setToken(localStorage.getItem('bookshop_user'));
    }
  }, [token]);

  useEffect(() => {
    fetchUser();
  }, [token]);

  const values = {
    token,
    setToken,
    navigate,
    addToCart,
    getCartCount,
    books,
    isLoading,
    setIsLoading,
    categories,
    cartItems,
    setCartItems,
    updateQuantity,
    removeFromCart,
    totalPrice,
    cartData,
    user,
    refreshUser
  };

  return (
    <ShopContext.Provider value={{ ...values }}>
      {children}
    </ShopContext.Provider>
  )
}

export function useShopContext() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShopContext must be used within a ShopContextProvider');
  }
  return context;
}
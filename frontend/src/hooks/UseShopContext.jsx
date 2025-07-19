/* eslint-disable react-refresh/only-export-components */
import axios from 'axios';
import { createContext, useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const ShopContext = createContext()

export default function ShopContextProvider({ children }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL  
  const navigate = useNavigate()
  const [token, setToken] = useState(null);
  const [cartItems, setCartItems] = useState({})
  const [books, setBooks] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const getBooks = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(backendUrl + `/api/books`)
      setBooks(response.data.data)
    } catch (err) {
      console.error(err)
      toast(err.response.data.message)
    } finally {
      setIsLoading(false)
    }
  }

  const getCategories = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(backendUrl + `/api/books/categories`)
      setCategories(response.data.data)
    } catch (err) {
      console.error(err)
      toast(err.response.data.message)
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
      localStorage.setItem('cart', JSON.stringify(updatedItems));
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
        localStorage.setItem('cart', JSON.stringify(updatedItems));
        return updatedItems;
      });
    } else {
      setCartItems((prevItems) => {
        const updatedItems = { ...prevItems, [bookId]: quantity };
        localStorage.setItem('cart', JSON.stringify(updatedItems));
        return updatedItems;
      });
    }
  }

  const removeFromCart = (bookId) => {
    setCartItems((prevItems) => {
      const updatedItems = { ...prevItems };
      delete updatedItems[bookId];
      localStorage.setItem('cart', JSON.stringify(updatedItems));
      return updatedItems;
    });
  }

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
    const stored = JSON.parse(localStorage.getItem('cart')) || {};
    setCartItems(stored)

    getBooks();
    getCategories();
  }, [setCartItems]);

  useEffect(() => {
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
    }
  }, [token]);

  const values = {
    token,
    setToken,
    backendUrl,
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
    cartData
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
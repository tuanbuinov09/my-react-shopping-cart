import { useEffect, useState, useLayoutEffect } from 'react';
import './App.css'
import ProductDetail from './components/ProductDetail/ProductDetail'
import ShoppingCartContext from "./contexts/ShoppingCartContext";
import Header from './components/Header/Header';
import useLocalStorage from './hooks/useLocalStorage';
import Checkout from './components/Checkout/Checkout';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [totalCartQuantity, setTotalCartQuantity] = useState(0);
  const [localStorageCartItems, setLocalStorageCartItems] = useLocalStorage("cartItems", []);

  useLayoutEffect(() => {
    if (cartItems.length === 0) {
      updateCartItems(localStorageCartItems);
    }
  }, []);

  const updateCartItems = (newCartItems) => {
    console.log(newCartItems);

    newCartItems.sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }

      if (nameA > nameB) {
        return 1;
      }

      const dateAddedA = a.dateAdded;
      const dateAddedB = b.dateAdded;

      if (dateAddedA < dateAddedB) {
        return 1;
      }

      if (dateAddedA > dateAddedB) {
        return -1;
      }

      return 0;
    });

    const totalQuantity = newCartItems.reduce(
      (acc, item) => { return item.quantity + acc; },
      0
    );

    setCartItems(newCartItems);
    setTotalCartQuantity(totalQuantity);
    setLocalStorageCartItems(cartItems);
  };

  useEffect(() => {
    console.log(cartItems, totalCartQuantity);
  }, [cartItems, totalCartQuantity]);

  const value = { cartItems, totalCartQuantity, updateCartItems };

  return (
    <>
      <ShoppingCartContext.Provider value={value}>
        <Header />

        <Checkout />
        <ProductDetail productID={1} />
        <ProductDetail productID={2} />
      </ShoppingCartContext.Provider>
    </>
  )
}

export default App;
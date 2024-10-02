import { useEffect, useState, useLayoutEffect } from 'react';
import './App.css'
import ProductDetail from './component/ProductDetail/ProductDetail'
import ShoppingCartContext from "./ShoppingCartContext";
import Header from './component/Header/Header';
import useLocalStorage from './hooks/useLocalStorage';

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

    const totalQuantity = newCartItems.reduce(
      (acc, item) => { return item.quantity + acc; },
      0
    );

    // newCartItems = newCartItems.sort((a, b) => {
    //   const nameA = a.name.toUpperCase();
    //   const nameB = b.name.toUpperCase();
    //   if (nameA < nameB) {
    //     return -1;
    //   }

    //   if (nameA > nameB) {
    //     return 1;
    //   }


    //   return 0;
    // });

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
        <ProductDetail productID={1} />
        <ProductDetail productID={2} />
      </ShoppingCartContext.Provider>
    </>
  )
}

export default App;
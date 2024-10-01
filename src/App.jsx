import { useEffect, useState } from 'react';
import './App.css'
import ProductDetail from './component/ProductDetail/ProductDetail'
import ShoppingCartContext from "./ShoppingCartContext";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [totalCartQuantity, setTotalCartQuantity] = useState(0);

  const updateCartItems = (newCartItems) => {
    console.log(newCartItems);

    const totalQuantity = newCartItems.reduce(
      (acc, item) => { return item.quantity + acc; },
      0
    );

    setCartItems(newCartItems);
    setTotalCartQuantity(totalQuantity);
  };

  useEffect(() => {
    console.log(cartItems, totalCartQuantity);
  }, [cartItems, totalCartQuantity]);

  const value = { cartItems, totalCartQuantity, updateCartItems };

  return (
    <>
      <ShoppingCartContext.Provider value={value}>
        <ProductDetail productID={1} />
        <ProductDetail productID={2} />
      </ShoppingCartContext.Provider>
    </>
  )
}

export default App;

import { useContext } from "react";
import ShoppingCartContext from "../../contexts/ShoppingCartContext";
import * as style from './Cart.module.css';
import CartItem from "./CartItem/CartItem";

function Cart() {
    const { cartItems, totalCartQuantity, updateCartItems } = useContext(ShoppingCartContext);

    return (
        <>
            <div className={style.container}>
                <div className={style.cartItems}>
                    {totalCartQuantity === 0 ? <h3 className={style.noItem}>No item in cart.</h3> : <></>}
                    {cartItems.map((item) => {
                        return <CartItem key={item.id + item.size} cartItem={item} />;
                    })}
                </div>
                <div className={style.btnContainer}>
                    {totalCartQuantity > 0
                        ?
                        <button
                            className={style.checkoutBtn}
                            onClick={() => {
                                const selection = confirm("Proceed?");

                                selection && updateCartItems([]);
                            }}>Check Out</button>
                        : <></>}
                </div>
            </div >
        </>
    );
}

export default Cart;
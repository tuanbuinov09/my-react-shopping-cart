import { useContext } from "react";
import ShoppingCartContext from "../../ShoppingCartContext";
import classNames from "classnames";
import * as style from './Cart.module.css';

function Cart() {
    const { cartItems, updateCartItems } = useContext(ShoppingCartContext);

    return (
        <>
            <div className={classNames(style.container)}>
                {cartItems.length === 0 ? <h3 className={style.noItem}>No item in cart.</h3> : <></>}
                {cartItems.map((item) => {
                    return <div key={item.id + item.size} className={classNames(style.cartItem)}>
                        <img src={item.image} alt={item.name} className={classNames(style.image, style.left)} />

                        <div className={classNames(style.right)}>
                            <h3>{item.name}</h3>
                            <p>Size: <span className={style.fieldValue}>{item.size}</span></p>
                            <p>Price: <span className={style.fieldValue}>{item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span></p>
                            <div className={classNames(style.btnContainer)}>
                                <button className={classNames(style.quantityBtn)} onClick={
                                    () => {
                                        const editingItem = cartItems.find(x => x.id === item.id && x.size === item.size);
                                        editingItem.quantity = editingItem.quantity - 1;

                                        if (editingItem.quantity === 0) {
                                            const indexOfItem = cartItems.indexOf(editingItem);
                                            cartItems.splice(indexOfItem, 1);
                                        }

                                        updateCartItems(cartItems);
                                    }
                                }>-</button>
                                <div className={classNames(style.quantity)}>{item.quantity}</div>
                                <button className={classNames(style.quantityBtn)} onClick={
                                    () => {
                                        const editingItem = cartItems.find(x => x.id === item.id && x.size === item.size);
                                        editingItem.quantity = editingItem.quantity + 1;

                                        updateCartItems(cartItems);
                                    }
                                }>+</button>
                            </div>

                            <button className={classNames(style.removeBtn)}
                                onClick={() => {
                                    const editingItem = cartItems.find(x => x.id === item.id && x.size === item.size);

                                    const indexOfItem = cartItems.indexOf(editingItem);
                                    cartItems.splice(indexOfItem, 1);

                                    updateCartItems(cartItems);
                                }}>Remove</button>
                        </div>

                    </div>;
                })}
            </div >
        </>
    );
}

export default Cart;
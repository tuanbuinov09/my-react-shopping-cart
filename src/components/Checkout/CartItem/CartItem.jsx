import { useContext } from "react";
import ShoppingCartContext from "../../../contexts/ShoppingCartContext";
import PropTypes from 'prop-types';
import * as style from './CartItem.module.css';
import classNames from "classnames";

function CartItem(props) {
    const { cartItems, updateCartItems } = useContext(ShoppingCartContext);

    const { cartItem } = props;

    const increaseQuantity = () => {
        const editingItem = cartItems.find(x => x.id === cartItem.id && x.size === cartItem.size);
        editingItem.quantity = editingItem.quantity + 1;

        updateCartItems(cartItems);
    }

    const decreaseQuantity = () => {
        const editingItem = cartItems.find(x => x.id === cartItem.id && x.size === cartItem.size);
        editingItem.quantity = editingItem.quantity - 1;

        if (editingItem.quantity === 0) {
            const indexOfItem = cartItems.indexOf(editingItem);
            cartItems.splice(indexOfItem, 1);
        }

        updateCartItems(cartItems);
    }

    return (
        <div className={style.cartItem}>
            <img src={cartItem.image} alt={cartItem.name} className={classNames(style.image, style.left)} />

            <div className={style.right}>
                <h3>{cartItem.name}</h3>
                <p>Size: <span className={style.fieldValue}>{cartItem.size}</span></p>
                <p>Price: <span className={style.fieldValue}>{cartItem.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span></p>

                <div className={style.btnContainer}>
                    <button
                        className={style.quantityBtn}
                        onClick={decreaseQuantity}>-</button>
                    <div className={style.quantity}>{cartItem.quantity}</div>
                    <button
                        className={style.quantityBtn}
                        onClick={increaseQuantity}>+</button>
                </div>

                <button className={style.removeBtn}
                    onClick={() => {
                        const editingItem = cartItems.find(x => x.id === cartItem.id && x.size === cartItem.size);

                        const indexOfItem = cartItems.indexOf(editingItem);
                        cartItems.splice(indexOfItem, 1);

                        updateCartItems(cartItems);
                    }}>Remove</button>
            </div>
        </div>
    );
}

CartItem.propTypes = {
    cartItem: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        size: PropTypes.string,
        price: PropTypes.number,
        quantity: PropTypes.number,
        dateAdded: PropTypes.instanceOf(Date),
        image: PropTypes.string,
    })
};

export default CartItem;
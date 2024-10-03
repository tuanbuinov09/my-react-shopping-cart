import cartIcon from '../../assets/icons8-cart-96.png';
import classNames from 'classnames';
import * as style from './Header.module.css';
import { useContext, useState } from 'react';
import ShoppingCartContext from '../../contexts/ShoppingCartContext';
import Cart from '../Cart/Cart';

function Header() {
    const { totalCartQuantity } = useContext(ShoppingCartContext);

    const [showCart, setShowCart] = useState(false);

    const toggleOpenCart = () => {
        setShowCart(s => !s);
    };

    return (
        <header className={classNames(style.header)}>
            <div className={classNames(style.left)}>
            </div>

            <div className={classNames(style.right)}>
                <div className={classNames(style.iconWrapper)}
                    onClick={toggleOpenCart}>
                    <img className={classNames(style.cartIcon)} src={cartIcon} alt='icon' />
                    <span className={classNames(style.cartCount)}>{totalCartQuantity}</span>

                </div>
            </div>
            {showCart && <Cart />}
        </header >
    );
}

export default Header;
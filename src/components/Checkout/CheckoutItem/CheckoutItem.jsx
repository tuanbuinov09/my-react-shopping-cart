import PropTypes from 'prop-types';
import * as style from './CheckoutItem.module.css';
import classNames from "classnames";

function CheckoutItem(props) {
    const { cartItem } = props;
    const total = cartItem.quantity * cartItem.price;
    return (
        <div className={style.cartItem}>
            <img src={cartItem.image} alt={cartItem.name} className={classNames(style.image, style.left)} />

            <div className={style.right}>
                <h4>{cartItem.name}</h4>
                <p>Size: <span className={style.fieldValue}>{cartItem.size}</span></p>
                <p>
                    Price: <span className={style.fieldValue}>{cartItem.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>,
                    Quantity: <span className={style.fieldValue}>{cartItem.quantity}</span>
                </p>
                <p>
                    Total: <span className={style.fieldValue}>{total.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                </p>
            </div>
        </div>
    );
}

CheckoutItem.propTypes = {
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

export default CheckoutItem;
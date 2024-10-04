import * as style from './Checkout.module.css';
import { useContext, useEffect, useState } from "react";
import ShoppingCartContext from "../../contexts/ShoppingCartContext";
import CheckoutItem from './CheckoutItem/CheckoutItem';
import useLocalStorage from '../../hooks/useLocalStorage';

function Checkout() {
    const { cartItems, totalCartQuantity, updateCartItems } = useContext(ShoppingCartContext);
    const [latestCheckoutAddress, setLatestCheckoutAddress] = useLocalStorage('latestCheckoutAddress', {});
    const [_, setLocalCartItems] = useLocalStorage('cartItems', []);

    const totalCartPrice = cartItems.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);

    const [inputs, setInputs] = useState({
        name: "",
        address: "",
        phoneNumber: "",
    });

    useEffect(() => {
        setInputs({ ...latestCheckoutAddress });
    }, []);

    const updateInputs = (fieldName, value) => {
        setInputs(i => ({ ...i, [fieldName]: value }));
    }

    const [errorMessages, setErrorMessages] = useState({
        name: "",
        address: "",
        phoneNumber: "",
    });

    useEffect(() => {
    }, [errorMessages]);

    const validate = () => {
        let result = true;
        const validationErrors = {};

        if (inputs.name.trim().length === 0) {
            validationErrors.name = "Please enter your name";
            result = false;
        } else if (!isNaN(inputs.name.trim()) || inputs.name.trim().length > 100) {
            validationErrors.name = "Please enter a valid name with length between 1 - 100";
            result = false;
        }

        if (inputs.address.trim().length === 0) {
            validationErrors.address = "Please enter your address";
            result = false;
        } else if (inputs.address.trim().length > 256) {
            validationErrors.address = "Please enter an address with length between 1 - 256";
            result = false;
        }

        if (inputs.phoneNumber.length === 0) {
            validationErrors.phoneNumber = "Please enter your phone number";
            result = false;
        } else if (isNaN(inputs.phoneNumber)) {
            validationErrors.phoneNumber = "Please enter a valid phone number";
            result = false;
        }

        setErrorMessages(validationErrors);
        return result;
    };

    return (
        <div className={style.container}>
            <div className={style.left}>
                <div className={style.cartItems}>
                    <h3 className={style.title}>ITEMS</h3>

                    {totalCartQuantity === 0
                        ? <>
                            <h3 className={style.noItem}>No item in cart.</h3>
                            <a href='/'>{`Back to shopping`}</a> </>
                        : <></>}
                    {cartItems.map((item) => {
                        return <CheckoutItem key={item.id + item.size} cartItem={item} />;
                    })}
                </div>

                {totalCartQuantity !== 0
                    ? <div className={style.confirmBtnContainer}>
                        <h4>Total: <span className={style.highlightText}>{totalCartPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span></h4>

                        <button
                            type='button'
                            className={style.checkoutBtn}
                            onClick={() => {
                                const result = validate();
                                if (!result) {
                                    return;
                                }

                                const selection = confirm("Confirmation on your order?");
                                if (selection) {
                                    updateCartItems([]);

                                    setLocalCartItems([]);
                                    setLatestCheckoutAddress(inputs);

                                    alert("Success!!");
                                };

                            }}>CONFIRM</button>
                    </div>
                    : <></>}
            </div>
            <div className={style.right}>
                <form>
                    <h3 className={style.title}>SHIPPING INFORMATION</h3>

                    <div className={style.inputGroup}>
                        <label className={style.label}>Name: </label>
                        <input
                            type="text"
                            name='name'
                            value={inputs.name}
                            className={style.textInput}
                            onChange={(e) => {
                                setErrorMessages({ ...errorMessages, name: "" });
                                updateInputs(e.target.name, e.target.value);
                            }} />

                        <p className={style.errorMessage}>{errorMessages.name ? errorMessages.name : ""}</p>
                    </div>

                    <div className={style.inputGroup}>
                        <label className={style.label}>Address: </label>
                        <input
                            type="text"
                            name='address'
                            value={inputs.address}
                            className={style.textInput}
                            onChange={(e) => {
                                setErrorMessages({ ...errorMessages, address: "" });
                                updateInputs(e.target.name, e.target.value);
                            }} />

                        <p className={style.errorMessage}>{errorMessages.address ? errorMessages.address : ""}</p>
                    </div>

                    <div className={style.inputGroup}>
                        <label className={style.label}>Phone number: </label>
                        <input
                            type="tel"
                            name='phoneNumber'
                            value={inputs.phoneNumber}
                            className={style.textInput}
                            onChange={(e) => {
                                setErrorMessages({ ...errorMessages, phoneNumber: "" });
                                updateInputs(e.target.name, e.target.value.trim());
                            }} />

                        <p className={style.errorMessage}>{errorMessages.phoneNumber ? errorMessages.phoneNumber : ""}</p>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Checkout;
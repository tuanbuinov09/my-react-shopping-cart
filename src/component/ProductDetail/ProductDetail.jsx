import classnames from "classnames";
import { useEffect, useState, useLayoutEffect, useContext } from 'react';
import * as style from './ProductDetail.module.css';
import { products } from "../../mock-data";
import PropTypes from 'prop-types';
import ShoppingCartContext from "../../ShoppingCartContext";

function ProductDetail(props) {
    const { cartItems, updateCartItems } = useContext(ShoppingCartContext);

    const [product, setProduct] = useState(null);

    const [selectedProductDetail, setSelectedProductDetail] = useState({
        size: "S",
        quantity: 0
    });

    useLayoutEffect(() => {
        const productsFromDataSource = products.find(x => x.id === props.productID);
        setProduct(productsFromDataSource);
    }, []);

    useEffect(() => {
        console.log("selected:", selectedProductDetail);

    }, [selectedProductDetail]);

    const updateProductDetail = (updatedProductDetail) => {
        setSelectedProductDetail(s => {
            return { ...s, ...updatedProductDetail };
        });
    }

    return (
        <>
            {
                product ?
                    <div className={style.container}>
                        <div className={style.left}>
                            <div className={style.imgContainer}>
                                <img alt="none" src={product.image} className={style.img} />
                            </div>
                        </div>
                        <div className={style.right}>
                            <h2 className={style.title}>{product.name}</h2>

                            <div className={style.flex}>
                                <div className={style.subtitle}>Size: </div>
                                <div className={style.sizeContainer}>
                                    {product.sizes.map((s, index) => {
                                        return (
                                            <div key={index} className={[classnames(style.size, { [style.active]: s === selectedProductDetail.size })].join(" ")}
                                                onClick={() => {
                                                    updateProductDetail({ size: s });
                                                }}
                                            >
                                                {s}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            <p className={classnames(style.price)}><span className={[classnames(style.priceLabel)]}>Price: </span><span>{`${product.price.toLocaleString('it-IT', { style: 'currency', currency: 'USD' })} ${product.currency}`}</span></p>

                            <div className={style.desc}>{product.description ? product.description : "No description"}</div>

                            <div className={classnames(style.btnContainer)}>
                                <button className={classnames(style.quantityBtn)} onClick={
                                    () => {
                                        if (selectedProductDetail.quantity === 0) return;

                                        updateProductDetail({ quantity: selectedProductDetail.quantity - 1 })
                                    }
                                }>-</button>
                                <span className={classnames(style.quantity)}>{selectedProductDetail.quantity}</span>
                                <button className={classnames(style.quantityBtn)} onClick={
                                    () => {
                                        if (selectedProductDetail.quantity === 20) return;

                                        updateProductDetail({ quantity: selectedProductDetail.quantity + 1 })
                                    }
                                }>+</button>
                            </div>

                            <div className={style.btnContainer}>
                                <button onClick={() => {
                                    if (selectedProductDetail.quantity === 0) {
                                        return;
                                    }

                                    if (cartItems.length === 0) {
                                        cartItems.push({ ...product, ...selectedProductDetail });
                                    } else {
                                        const productInCart = cartItems.find(x => x.id === props.productID && x.size === selectedProductDetail.size);
                                        
                                        if (productInCart) {
                                            productInCart.quantity = productInCart.quantity + selectedProductDetail.quantity;
                                        } else {
                                            cartItems.push({ ...product, ...selectedProductDetail });
                                        }
                                    }

                                    updateCartItems(cartItems);

                                    // alert("Selected: " + product.name + " " + selectedProductDetail.size + " " + selectedProductDetail.quantity);
                                }} className={[classnames(style.btn, { [style.disabled]: selectedProductDetail.quantity == 0 })].join(" ")}>ADD TO CART</button>
                            </div>

                        </div>
                    </div>
                    : <></>}
        </>
    );
}

ProductDetail.propTypes = {
    productID: PropTypes.number
};

export default ProductDetail;
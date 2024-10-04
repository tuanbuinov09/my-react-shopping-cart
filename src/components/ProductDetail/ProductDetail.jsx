import classNames from "classnames";
import { useEffect, useState, useLayoutEffect, useContext } from 'react';
import * as style from './ProductDetail.module.css';
import { products } from "../../data/mock-data";
import ShoppingCartContext from "../../contexts/ShoppingCartContext";
import { useParams } from "react-router-dom";

function ProductDetail() {
    const { productID } = useParams();
    const { cartItems, updateCartItems } = useContext(ShoppingCartContext);

    const [product, setProduct] = useState(null);

    const [selectedProductDetail, setSelectedProductDetail] = useState({
        size: "S",
        quantity: 0
    });

    useLayoutEffect(() => {
        const productsFromDataSource = products.find(x => x.id === Number.parseInt(productID));

        setProduct(productsFromDataSource);
        setSelectedProductDetail({ ...selectedProductDetail, size: productsFromDataSource.sizes[0] });
    }, [productID]);

    useEffect(() => {
        // console.log("selected:", selectedProductDetail);

    }, [selectedProductDetail]);

    const updateProductDetail = (updatedProductDetail) => {
        setSelectedProductDetail(s => {
            return { ...s, ...updatedProductDetail };
        });
    }

    const addToCart = () => {
        if (selectedProductDetail.quantity === 0) {
            return;
        }

        if (cartItems.length === 0) {
            cartItems.push({ ...product, ...selectedProductDetail, dateAdded: Date.now() });
        } else {
            const productInCart = cartItems.find(x => x.id === product.id && x.size === selectedProductDetail.size);

            if (productInCart) {
                productInCart.quantity = productInCart.quantity + selectedProductDetail.quantity;
            } else {
                cartItems.push({ ...product, ...selectedProductDetail, dateAdded: Date.now() });
            }
        }

        updateCartItems(cartItems);
    }

    const increaseQuantity = () => {
        if (selectedProductDetail.quantity === 20) return;

        updateProductDetail({ quantity: selectedProductDetail.quantity + 1 });
    }

    const decreaseQuantity = () => {
        if (selectedProductDetail.quantity === 0) return;

        updateProductDetail({ quantity: selectedProductDetail.quantity - 1 });
    }

    return (
        <>
            {
                product
                    ? <div className={style.container}>
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
                                            <div key={index} className={[classNames(style.size, { [style.active]: s === selectedProductDetail.size })].join(" ")}
                                                onClick={() => {
                                                    updateProductDetail({ size: s });
                                                }}>{s}</div>
                                        );
                                    })}
                                </div>
                            </div>

                            <p className={style.price}>
                                <span className={style.priceLabel}>Price: </span><span>{`${product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`}</span>
                            </p>

                            <div className={style.desc}>{product.description ? product.description : "No description"}</div>

                            <div className={style.btnContainer}>
                                <button
                                    className={style.quantityBtn}
                                    onClick={decreaseQuantity}>-</button>

                                <div className={style.quantity}>{selectedProductDetail.quantity}</div>

                                <button
                                    className={style.quantityBtn}
                                    onClick={increaseQuantity}>+</button>
                            </div>

                            <div className={style.btnContainer}>
                                <button
                                    onClick={addToCart}
                                    className={[classNames(style.btn, { [style.disabled]: selectedProductDetail.quantity === 0 })].join(" ")}>ADD TO CART</button>
                            </div>

                        </div>
                    </div>
                    : <></>
            }
        </>
    );
}

export default ProductDetail;
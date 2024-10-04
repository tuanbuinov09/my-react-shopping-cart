import * as style from './Card.module.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function Card(props) {
    const { product } = props;
    const navigate = useNavigate();

    return (
        <div
            className={style.card}
            onClick={() => {
                navigate(`/product/${product.id}`);
            }}>
            <img src={product.image} alt={product.name} className={style.image} />
            <div className={style.detail}>
                <h3>{product.name}</h3>
                <p>Sizes: <span className={style.fieldValue}>{product.sizes.join(", ")}</span></p>
                <p>
                    Price: <span className={style.fieldValue}>{product.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</span>
                </p>
            </div>
        </div >
    );
}

Card.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        sizes: PropTypes.arrayOf(PropTypes.string),
        price: PropTypes.number,
        quantity: PropTypes.number,
        image: PropTypes.string,
    })
};

export default Card;
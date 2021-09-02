import Card from "../UI/Card";
import classes from "./ProductItem.module.css";

import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart";
const ProductItem = (props) => {
    const dispatch = useDispatch();

    const { title, price, description, id } = props;

    const handleAdd = () => {
        dispatch(cartActions.addItem({ id, title, price }));
    };
    return (
        <li className={classes.item}>
            <Card>
                <header>
                    <h3>{title}</h3>
                    <div className={classes.price}>${price.toFixed(2)}</div>
                </header>
                <p>{description}</p>
                <div className={classes.actions}>
                    <button onClick={handleAdd}>Add to Cart</button>
                </div>
            </Card>
        </li>
    );
};

export default ProductItem;

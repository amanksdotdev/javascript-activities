import classes from "./CartButton.module.css";
import { cartActions } from "../../store/cart";
import { useSelector, useDispatch } from "react-redux";

const CartButton = (props) => {
    const dispatch = useDispatch();
    const totalItems = useSelector((state) => state.totalQuantity);

    const handleCart = () => {
        dispatch(cartActions.toggleCart());
    };
    return (
        <button className={classes.button} onClick={handleCart}>
            <span>My Cart</span>
            <span className={classes.badge}>{totalItems}</span>
        </button>
    );
};

export default CartButton;

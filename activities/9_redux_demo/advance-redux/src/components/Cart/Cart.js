import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

import { useSelector } from "react-redux";

const Cart = (props) => {
    const items = useSelector((state) => state.items);

    return (
        <Card className={classes.cart}>
            <h2>Your Shopping Cart</h2>
            <ul>
                {items.length === 0 ? (
                    <p>Cart is empty</p>
                ) : (
                    items.map((item) => <CartItem key={item.id} item={item} />)
                )}
            </ul>
        </Card>
    );
};

export default Cart;

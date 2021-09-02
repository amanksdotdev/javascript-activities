import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../store/counter";
import classes from "./Counter.module.css";

const Counter = () => {
    // dispatch function used to update state in redux store
    const dispatch = useDispatch();
    //useSelector to get specific state from store
    const counter = useSelector((state) => state.counter.counter);
    const show = useSelector((state) => state.counter.showCounter);

    const toggleCounterHandler = () => {
        dispatch(counterActions.toggleCounter());
        //actions method (toggleCounter()) returns an object like {type: UNIQUE_STR, payload: ARGUMENT_PASSED}
    };

    const incrementHandler = () => {
        dispatch(counterActions.increment());
    };

    const decrementHandler = () => {
        dispatch(counterActions.decrement());
    };

    const increseHandler = () => {
        dispatch(counterActions.increase(10));
    };

    return (
        <main className={classes.counter}>
            <h1>Redux Counter</h1>
            {show && <div className={classes.value}>{counter}</div>}
            <div>
                <button onClick={incrementHandler}>Increment</button>
                <button onClick={increseHandler}>Increase by 10</button>
                <button onClick={decrementHandler}>Decrement</button>
            </div>
            <button onClick={toggleCounterHandler}>Toggle Counter</button>
        </main>
    );
};

export default Counter;

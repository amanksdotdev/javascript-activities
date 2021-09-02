const redux = require("redux");

//reducer function should be a pure function
function counterReducer(state = { counter: 0 }, action) {
    switch (action.type) {
        case "increment":
            return { counter: state.counter + 1 };
        case "decrement":
            return { counter: state.counter - 1 };
        default:
            return state;
    }
}

//creating a redux store
const store = redux.createStore(counterReducer);

//subscriber function
function counterSubscriber() {
    const latestState = store.getState();
    console.log(latestState);
}

//subscribing the redux store
store.subscribe(counterSubscriber);

//dispatches the action which makes counterReducer run which updates the state and the subscribed counterSubscriber runs
store.dispatch({ type: "increment" });
store.dispatch({ type: "increment" });
store.dispatch({ type: "increment" });
store.dispatch({ type: "decrement" });

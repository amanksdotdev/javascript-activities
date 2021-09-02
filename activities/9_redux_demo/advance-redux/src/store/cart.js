import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        showCart: false,
        totalQuantity: 0,
    },
    reducers: {
        addItem(state, action) {
            const { id, title, price } = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            state.totalQuantity++;
            if (!existingItem) {
                state.items.push({
                    id,
                    title,
                    price,
                    totalPrice: price,
                    quantity: 1,
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice =
                    existingItem.totalPrice + action.payload.price;
            }
        },
        removeItem(state, action) {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            state.totalQuantity--;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter((item) => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice -= existingItem.price;
            }
        },
        toggleCart(state) {
            state.showCart = !state.showCart;
        },
    },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;

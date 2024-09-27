import { createSlice } from '@reduxjs/toolkit';

const CartSlice = createSlice(
    {
        name: "Cart",
        initialState: {
            data: [],
            original_total: 0,
            total: 0,
        },
        reducers: {
            addToCart(state, { payload }) {
                const productData = state.data.find(d => d.product_id == payload.product_id);
                if (productData) {
                    productData.quantity++;
                } else {
                    state.data.push({ product_id: payload.product_id, quantity: 1 });
                }
                state.total += Number(payload.price);
                state.original_total += Number(payload.original_price);

                localStorage.setItem("cart-data", JSON.stringify(state.data));
                localStorage.setItem("cart-total", state.total);
                localStorage.setItem("cart-original-total", state.original_total);
            },
            dbToCart(state, action) {
                console.log("dbToCart action", action.payload);
                state.data = action.payload.data;
                state.total = action.payload.total;
                state.original_total = action.payload.original_total;
                localStorage.setItem("cart-data", JSON.stringify(state.data));
                localStorage.setItem("cart-total", state.total);
                localStorage.setItem("cart-original-total", state.original_total);
            },
            removeFromCart() {

            },
            changeQty(state, { payload }) {
                const data = state.data.find(d => d.product_id == payload.product_id);
                if (data) {
                    if (payload.flag == 1) {
                        data.quantity++;
                        state.original_total += payload.original_price;
                        state.total += payload.final_price;
                    }
                    else {
                        data.quantity--;
                        state.original_total -= payload.original_price;
                        state.total -= payload.final_price;
                    }
                }
            },
            lsToCart(state) {
                const lsCartData = localStorage.getItem("cart-data");
                const lsCartTotal = localStorage.getItem("cart-total");
                const lsCartOrgiTotal = localStorage.getItem("cart-original-total");
                if (lsCartData) {
                    state.data = JSON.parse(lsCartData);
                    state.total = Number(lsCartTotal);
                    state.original_total = Number(lsCartOrgiTotal);
                }
            },
            emptyCart(state) {
                state.data = [];
                state.total = 0;
                state.original_total = 0;
                localStorage.removeItem("cart-data");
                localStorage.removeItem("cart-total");
                localStorage.removeItem("cart-original-total");
            }
        }
    }
)

export const { addToCart, dbToCart, lsToCart, removeFromCart, changeQty, emptyCart } = CartSlice.actions;
export default CartSlice.reducer;
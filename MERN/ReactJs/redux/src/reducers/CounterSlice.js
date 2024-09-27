import { createSlice } from "@reduxjs/toolkit";

const CounterSlice = createSlice(
    {
        name: "Counter",
        initialState: {
            value: 4,
            price: 100
        },
        reducers: {
            inc(state) {
                state.value++;
                state.price = state.value * 100;
            },
            desc(state) {
                state.value--;
                state.price = state.value * 100;
            },
            reset(state) {
                state.value = 0;
                state.price = 0;
            }
        }
    }
);

export const { inc, desc, reset } = CounterSlice.actions;
export default CounterSlice.reducer;
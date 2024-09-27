import { configureStore } from "@reduxjs/toolkit";
import CounterReducer from "./reducers/CounterSlice";

const store = configureStore(
    {
        reducer: {
            "counter": CounterReducer,
            "cart":"",
            "user":"",
        }
    }
);

export default store;
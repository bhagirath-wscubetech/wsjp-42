import { configureStore } from "@reduxjs/toolkit";
import AdminReducer from "./reducers/AdminSlice";
import UserReducer from "./reducers/UserSlice";
import CartReducer from "./reducers/CartSlice";

const store = configureStore(
    {
        reducer: {
            "admin": AdminReducer,
            "cart": CartReducer,
            "user": UserReducer
        }
    }
);
export default store;

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { inc, desc, reset } from "./reducers/CounterSlice";

export default function App() {
    const counter = useSelector(store => store.counter);
    const dispatch = useDispatch();

    const incHandler = () => {
        dispatch(inc());
    }
    const descHandler = () => {
        dispatch(desc());
    }
    const resetHandler = () => {
        dispatch(reset());
    }

    return (
        <div>
            <h1>{counter.value}</h1>
            <h1>₹ {counter.price}</h1>
            <button onClick={incHandler}>+</button>
            <button onClick={descHandler}>-</button>
            <button onClick={resetHandler}>Reset</button>
        </div>
    )
}

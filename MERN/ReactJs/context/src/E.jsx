import React, { useContext } from 'react';
import { Context } from './Context/Main';

export default function E() {
    const { counter } = useContext(Context);
    return (
        <div>
            E - {counter}
        </div>
    )
}

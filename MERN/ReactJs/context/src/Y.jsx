import React, { useContext } from 'react'
import Z from './Z'
import { Context } from './Context/Main'

export default function Y() {
    const {inc} = useContext(Context);
    return (
        <div>
            Y <button onClick={inc}>Inc</button>
            <Z />
        </div>
    )
}

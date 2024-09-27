import React, { useContext } from 'react'
import C from './C'
import X from './X'
import { Context } from './Context/Main'

export default function B() {
    const { desc } = useContext(Context);
    return (
        <div>
            B - <button onClick={desc}>Desc</button>
            <C />
            <X />
        </div>
    )
}

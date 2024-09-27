import React, { createContext, useState } from 'react';

const Context = createContext();

export default function Main(props) {
    const [counter, setCounter] = useState(10);

    const inc = () => setCounter(counter + 1);
    const desc = () => setCounter(counter - 1);

    return (
        <Context.Provider value={{ counter, inc, desc }}>
            <div>
                Main
                {props.children}
            </div>
        </Context.Provider>
    )
}

export {Context};
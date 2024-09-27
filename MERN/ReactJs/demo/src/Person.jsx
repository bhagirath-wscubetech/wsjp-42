import { useState } from "react";

function Person(props) {
    const [toggle, setToggle] = useState(false);
    // let toggle = false;

    const toggleChangeHandler = () => {
        setToggle(!toggle);
        // toggle = !toggle;
    }

    return (
        <div className="box">
            <img style={{ filter: toggle == true ? 'grayscale(1)' : '' }} src={props.source} alt="" width="100%" />
            <div>Name:{props.name}</div>
            <div>Email:{props.email}</div>
            <div style={
                {
                    color: props.age >= 35 ? 'red' : 'blue'
                    // cond ? true : false
                }
            }>Age:{props.age}</div>
            <button onClick={toggleChangeHandler}>Click Me</button>
        </div>
    )
}

export default Person;
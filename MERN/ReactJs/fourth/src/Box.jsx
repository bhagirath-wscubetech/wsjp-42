import { useState } from "react";

function Box(props) {
    const [toggle, setToggle] = useState(false);
    const [counter, setCounter] = useState(0);
    // false / true

    const toggleHandler = () => {
        if (toggle == false) {
            setCounter(counter + 1);
        }
        setToggle(!toggle);
        // !toggle => true => false
        // !toggle => false => true
    }

    return <div className="col-12 mt-3">
        <div className="shadow p-2">
            <h3 onClick={toggleHandler}>{props.title} - {counter}</h3>
            <hr />
            <div className="content" style={{ display: toggle == true ? 'block' : 'none' }}>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi illo reprehenderit magnam, est, atque quo asperiores voluptatem quos porro repellendus eaque facere accusantium cum excepturi, assumenda perferendis quisquam incidunt dolore.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi illo reprehenderit magnam, est, atque quo asperiores voluptatem quos porro repellendus eaque facere accusantium cum excepturi, assumenda perferendis quisquam incidunt dolore.</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi illo reprehenderit magnam, est, atque quo asperiores voluptatem quos porro repellendus eaque facere accusantium cum excepturi, assumenda perferendis quisquam incidunt dolore.</p>
            </div>
        </div>
    </div>
}


export default Box;
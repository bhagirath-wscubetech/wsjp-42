import React, { useState } from "react";
// {} => named

function App() {
  // let count = 0;
  const [count, setCount] = useState(0);
  // [state_name,state_modifier] = useState(default_value);

  const inc = () => {
    // count++;
    setCount(count + 1);
  }
  const desc = () => {
    // count--;
    setCount(count - 1);
  }


  // react fragment // to enclose multiple elements 
  // React.Fragment = <></>
  return (
    <div className="container">
      <h1 style={{ textAlign: "center", color: count > 10 ? "red" : "blue" }}>{count}</h1 >
      <button className="btn btn-primary" onClick={desc}>-</button>
      <button className="btn btn-danger" onClick={inc}>+</button>
    </div>
  )
}

export default App

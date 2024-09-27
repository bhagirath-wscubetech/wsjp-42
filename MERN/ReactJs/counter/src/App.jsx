import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState(0);
  const [products, setProduct] = useState([]);

  const fetchProduct = async () => {
    const resp = await fetch('https://dummyjson.com/products');
    const data = await resp.json();
    setProduct(data.products);
  }

  useEffect(
    () => {
      fetchProduct();
    },
    [] // only at the first render
  )


  useEffect(
    () => {
      setPrice(count * 500);
    }, [count]
  )


  // useEffect(
  //   () => {
  //     console.log('Main first render par call hota hun');
  //   },
  //   [] // dependency list
  // )
  // // [] -> list is empty // the cb function must be called only at the first render
  // useEffect(
  //   () => {
  //     console.log('count change');
  //   },
  //   [count]
  // )
  // // [count] -> the callback function must be called at the first render and everything the count changes
  // useEffect(
  //   () => {
  //     console.log('Price change');
  //   }, [price]
  // )



  const inc = () => {
    setCount(count + 1);
  }
  const desc = (e) => {
    e.preventDefault();
    setCount(count - 1);
  }

  return (
    <>
      <div className="card">
        <button onClick={inc} onContextMenu={desc}>
          count is {count}
        </button>
        <button>
          price is {price}
        </button>
      </div>

    </>
  )
}

export default App

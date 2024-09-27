import React from 'react'
import ReactDOM from 'react-dom/client'
import A from './A.jsx'
import './index.css';
import Main from './Context/Main.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Main>
      <A />
    </Main>
  </React.StrictMode>,
)

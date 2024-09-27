import React from 'react'

export default function SearchBox(props) {
    return (
        <div className='card my-4'>
            <input onKeyUp={(e) => props.serachHandler(e.target.value)} placeholder='Yahan search karo....' type="text" className='form-control' />
        </div>
    )
}

import React from 'react'

export default function Display(props) {
    return (
        <div className='mt-2'>
            {
                props.todos.map(
                    (item, index) => <div key={index} className='position-relative bg-dark text-white p-3 mb-2'>
                        {item}
                        <button className='top-0 mt-2 btn text-white position-absolute end-0 me-3'
                            onClick={() => props.removeHandler(index)}>X</button>
                    </div>
                )
            }
        </div>
    )
}

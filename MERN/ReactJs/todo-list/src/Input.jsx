import React, { useId } from 'react'

export default function Input(props) {
    const changeHandler = (e) => {
        if(e.key == "Enter"){
            // console.log(e.target.value);
            props.addHandler(e.target.value);
            e.target.value = "";
        }
    }

    return (
        <div className='p-2'>
            <input  type="text" onKeyUp={changeHandler} className='form-control rounded-0' />
        </div>
    )
}

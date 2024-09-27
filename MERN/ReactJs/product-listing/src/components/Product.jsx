import React from 'react'

export default function Product(props) {
    return (
        <div className='col-lg-4 col-md-6 col-12 mt-4'>
            <div className='shadow'>
                <img src={props.img} className='img-fluid' alt="" />
                <div className='p-3'>
                    <div>{props.name}</div>
                    <div>Rating: {props.rating} ⭐</div>
                </div>
            </div>
        </div>
    )
}

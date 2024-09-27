import React from 'react';
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from "../../reducers/CartSlice";
import axios from 'axios';

export default function ProductBox(props) {
    const dispatcher = useDispatch();
    const user = useSelector(store => store.user);

    const cartButtonHandler = (data) => {
        if (user.data != null) {
            // user ne login kiya hua hai
            axios.post(
                "http://localhost:5000/user/add-to-cart",
                {
                    product_id: data.product_id,
                    user_id: user.data._id
                }
            )
        }
        dispatcher(addToCart(data));
    }

    return (
        <div className='shadow p-4'>
            <div className='flex w-full justify-center'>
                <img className='h-[100px]' src={`http://localhost:5000/images/product/${props.main_image}`} />
            </div>
            <h3 className='text-[16px] text-[#262626] my-3 text-center'>
                {props.name}
            </h3>
            <div className='text-[16px] flex gap-3 my-3 justify-center'>
                <del className='text-[#FF4858]'>₹{props.original_price}</del>
                <b>₹{props.final_price}</b>
            </div>
            <div className='flex justify-center'>
                <button onClick={
                    () => {
                        cartButtonHandler({
                            product_id: props._id,
                            price: props.final_price,
                            original_price: props.original_price
                        })
                    }
                }>
                    <FaCartArrowDown fontSize={20} />
                </button>
            </div>
        </div>
    )
}

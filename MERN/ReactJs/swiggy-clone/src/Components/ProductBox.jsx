import React from 'react'

export default function ProductBox(props) {
    return (
        <div className={`hover:scale-[0.95] duration-200 shadow rounded-[16px] relative overflow-hidden ${props.className}`}>
            <img className='w-full h-full object-cover' src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/e0839ff574213e6f35b3899ebf1fc597" alt="" />
            <div className='box-gradient absolute top-0 w-full h-full bg-red-400'>
                <span className='absolute bottom-0 text-white p-3 font-bold text-xl'>ITEMS AT ₹149</span>
            </div>
        </div>
    )
}

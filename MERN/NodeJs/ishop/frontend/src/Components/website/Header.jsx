import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toINRCurrency } from '../../../helper';
import { logout } from '../../reducers/UserSlice';
import { emptyCart } from '../../reducers/CartSlice';

export default function Header() {
    const cart = useSelector(store => store.cart);


    const user = useSelector(store => store.user);
    const dispatcher = useDispatch();
    return (
        <>
            <div className='w-full p-3 shadow sticky top-0 bg-white'>
                <nav className='max-w-[1200px] mx-auto'>
                    <ul className='flex justify-end gap-5'>
                        <li>
                            {
                                user.data == null
                                    ? <Link to="/login?ref=header">Login</Link>
                                    : <>
                                        <span>Hi {user.data?.name}! - </span>
                                        <button onClick={
                                            () => {
                                                dispatcher(logout());
                                                dispatcher(emptyCart());
                                            }
                                        }>Logout</button>
                                    </>
                            }

                        </li>
                        <li>
                            <Link to="/cart">Cart ({cart.data.length})</Link>
                        </li>
                        <li>₹ {toINRCurrency(cart.total)}</li>
                    </ul>
                </nav>
            </div>
            <div className='max-w-[1200px] mx-auto'>
                <h1 className='text-3xl text-center my-5 text-red-600'>ISHOP</h1>
                <ul className='font-[500] uppercase w-full flex gap-[20px] justify-center items-center h-[50px]'>
                    <li>
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link to={"/store"}>Store</Link>
                    </li>
                    <li>
                        <Link>Iphone</Link>
                    </li>
                    <li>
                        <Link>Ipad</Link>
                    </li>
                    <li>
                        <Link>Macbook</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom';
import { Context } from "./MainContext";

export default function Layout() {
    const { user, logout } = useContext(Context);
    return (
        <>
            <header className='border-b  bg-white py-4 px-2'>
                <div className='max-w-[1200px] mx-auto items-center flex justify-between'>
                    <div className='text-5xl font-bold'>
                        Logo
                    </div>
                    <ul className='text-[18px] flex gap-3'>
                        <li>
                            <Link to={"/"}>Home</Link>
                        </li>
                        {
                            user != null
                                ?
                                <>
                                    <li>
                                        <Link to={"/add-quiz"}>
                                            Add Quiz
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={"/view-quiz"}>
                                            View Quiz
                                        </Link>
                                    </li>
                                    <li className='cursor-pointer' onClick={logout}>
                                        Logout
                                    </li>
                                </>
                                :
                                <>
                                    <li>
                                        <Link to={"/login"}>Login</Link>
                                    </li>
                                    <li>
                                        <Link to={"/register"}>Register</Link>
                                    </li>
                                    <li>
                                        <Link to={"/play"}>Play</Link>
                                    </li>
                                </>
                        }

                    </ul>
                </div>
            </header>
            <Outlet />
        </>
    )
}

import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { RiDashboard2Fill } from "react-icons/ri";
import { BiCategoryAlt } from "react-icons/bi";
import { AiOutlineProduct } from "react-icons/ai";
import { BsBorderWidth } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { CiLogout } from "react-icons/ci";
import { login, logout, lsToAdmin } from '../../reducers/AdminSlice';

export default function SideMenu() {
    const admin = useSelector(store => store.admin);
    const location = useLocation();
    const navigator = useNavigate();
    const dispatcher = useDispatch();

    const getLsAdmin = () => {
        const lsAdmin = localStorage.getItem("admin");
        if (lsAdmin) {
            const lsToken = localStorage.getItem("admin-token");
            const adminStamp = localStorage.getItem("admin-login-stamp"); // ms
            const currentTime = new Date().getTime(); //ms
            const rem = currentTime - adminStamp;
            if (rem > (24 * 60 * 60 * 1000)) {
                navigator("/admin/login");
                dispatcher(logout());
                return { lsAdmin: null };
            } else {
                return { lsAdmin, lsToken };
            }
        } else {
            return { lsAdmin: null };
        }
    }

    // useEffect(
    //     () => {
    //         const { lsAdmin, lsToken } = getLsAdmin();
    //         if (lsAdmin != null) {
    //             dispatcher(lsToAdmin({ data: JSON.parse(lsAdmin), token: lsToken }));
    //         }
    //     }, [] // empty -> only at first render
    // )

    // useEffect(
    //     () => {
    //         const { lsAdmin } = getLsAdmin();
    //         if (admin?.data == null && lsAdmin == null) {
    //             navigator("/admin/login");
    //         }
    //     }, [admin, location.pathname] //dependency list
    // )


    const menu = [
        {
            name: "Dashboard",
            icon: <RiDashboard2Fill />,
            path: "/admin"
        },
        {
            name: "Category",
            icon: <BiCategoryAlt />,
            path: "/admin/category"
        },
        {
            name: "Color",
            icon: <BiCategoryAlt />,
            path: "/admin/color"
        },
        {
            name: "Product",
            icon: <AiOutlineProduct />,
            path: "/admin/product"
        },
        {
            name: "Order",
            icon: <BsBorderWidth />,
            path: "/admin/order"
        }
    ]

    return (
        <div className='bg-gray-600 min-h-[100vh] px-3 py-2'>
            <div className='text-white border-b pb-2 text-3xl text-center'>
                Admin Panel
            </div>
            <ul className='mt-3 text-white'>
                {
                    menu.map(
                        (item, i) => {
                            return (
                                <li key={i} className='flex gap-3 items-center text-xl mb-2'>
                                    {item.icon}
                                    <Link className='duration-500 hover:translate-x-2' to={item.path}>{item.name}</Link>
                                </li>
                            )
                        }
                    )
                }

                <li onClick={() => dispatcher(logout())} className='flex gap-3 items-center cursor-pointer text-xl mb-2'>
                    <CiLogout />
                    Logout
                </li>
                {/* <li className='flex gap-3 items-center text-xl mb-2'>
                    <BiCategoryAlt />
                    <Link to={"/category"}>Category</Link>
                </li>
                <li className='flex gap-3 items-center text-xl mb-2'>
                    <BiCategoryAlt />
                    <Link to={"/product"}>Product</Link>
                </li> */}
            </ul>
        </div>
    )
}

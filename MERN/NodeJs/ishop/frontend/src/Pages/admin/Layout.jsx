import React from 'react';
import Header from '../../Components/admin/Header';
import SideMenu from '../../Components/admin/SideMenu'
import { Outlet } from 'react-router-dom'

export default function Layout() {
    return (
        <>
            <div className='grid grid-cols-5'>
                <SideMenu />
                <div className='col-span-4'>
                    <Header />
                    <Outlet />
                </div>
            </div>
        </>
    )
}

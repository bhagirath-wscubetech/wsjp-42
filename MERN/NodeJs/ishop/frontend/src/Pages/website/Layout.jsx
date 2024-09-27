import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/website/Header'
import Footer from '../../components/website/Footer'

export default function Layout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

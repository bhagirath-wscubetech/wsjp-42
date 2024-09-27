import React from 'react'
import { useSelector } from 'react-redux'

export default function Header() {
    const admin = useSelector(store => store.admin);
    return (
        <div className='py-4 shadow-lg px-3'>
            Hello, {admin?.data?.name}
        </div> 
    )
}

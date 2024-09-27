import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../../MainContext';
import axios from 'axios';
import { MdDelete } from "react-icons/md";
import { FaPenFancy } from "react-icons/fa";


export default function View() {
    const { showToast, showConfirmation, category, fetchCategory, API_BASE_URL, CATEGORY_URL } = useContext(Context);

    useEffect(
        () => {
            fetchCategory();
        }, []
    )

    const changeStatus = (id, new_status) => {
        axios.patch(
            API_BASE_URL + CATEGORY_URL + "/change-status",
            { id, new_status }
        ).then(
            (success) => {
                showToast(success.data.msg, success.data.status);
                if (success.data.status == 1) {
                    fetchCategory();
                }
            }
        ).catch(
            () => {
                showToast("Client side error", 0);
            }
        )
    }

    const deleteCat = (id) => {
        axios.delete(
            API_BASE_URL + CATEGORY_URL + "/delete/" + id
        ).then(
            (success) => {
                showToast(success.data.msg, success.data.status);
                if (success.data.status == 1) {
                    fetchCategory();
                }
            }
        ).catch(
            () => {
                showToast("Client side error", 0);
            }
        )
    }

    return (
        <div className='m-3 p-3 shadow-lg py-5 rounded'>
            <nav className="flex my-3" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center">
                        <a href="#" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                            <svg className="w-3 h-3 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                            </svg>
                            Dashboard
                        </a>
                    </li>
                    <li>
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <a href="#" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Category</a>
                        </div>
                    </li>
                </ol>
            </nav>

            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 ml-auto block focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">

                <Link to={"/admin/category/add"}>
                    Add
                </Link>
            </button>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Slug
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.isArray(category) 
                            &&
                            category.map(
                                (cat) => {
                                    return <tr key={cat._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {cat.name}
                                        </th>
                                        <td className="px-6 py-4">{cat.slug}</td>
                                        <td className="px-6 py-4">
                                            <img width="70" src={API_BASE_URL + "/images/category/" + cat.image_name} alt="" />
                                        </td>
                                        <td className="px-6 py-4">
                                            {
                                                cat.status
                                                    ? <button onClick={() => changeStatus(cat._id, false)} className='p-3 bg-green-800 text-white'>
                                                        Active
                                                    </button>
                                                    : <button onClick={() => changeStatus(cat._id, true)} className='p-3 bg-orange-800 text-white'>
                                                        Inactive
                                                    </button>
                                            }
                                        </td>
                                        <td className="flex gap-2 items-center px-6 py-4">
                                            <MdDelete
                                                onClick={
                                                    () => {
                                                        showConfirmation(
                                                            () => deleteCat(cat._id)
                                                        )
                                                    }
                                                }
                                                className='cursor-pointer' fontSize={20} />
                                            <Link to={"/admin/category/edit/" + cat._id}>
                                                <FaPenFancy />
                                            </Link>
                                        </td>
                                    </tr>
                                }
                            )
                        }
                    </tbody>
                </table>
            </div>

        </div >
    )
}

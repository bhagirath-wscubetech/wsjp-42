import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Context } from '../../../MainContext';

import { MdDelete } from "react-icons/md";

export default function MultipeImage() {
    const { showToast, API_BASE_URL, PRODUCT_URL } = useContext(Context);
    const { product_id } = useParams();
    const [otherImageNames, setOtherImageName] = useState([]);



    useEffect(
        () => {
            axios.get(API_BASE_URL + PRODUCT_URL + "/" + product_id)
                .then(
                    (success) => {
                        if (success.data.status == 1) {
                            setOtherImageName(success.data.productData.other_images);
                        }
                    }
                ).catch(
                    (error) => {
                        console.log(error);
                    }
                )
        }, [product_id]
    )

    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();

        for (let otherImage of e.target.other_images.files) {
            formData.append("other_images", otherImage);
        }
        axios.post(
            "http://localhost:5000/product/add-multiple-images/" + product_id,
            formData
        ).then(
            (success) => {
                showToast(success.data.msg, success.data.status);
                if (success.data.status == 1) {
                    setOtherImageName(success.data.otherImagesNames);
                    e.target.reset();
                }
            }
        ).catch(
            (error) => {
                console.log(error);
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
                            <Link to="/admin/product" className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">
                                Product
                            </Link>
                        </div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">
                            <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                            </svg>
                            <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Multiple Image</span>
                        </div>
                    </li>
                </ol>
            </nav>
            <form onSubmit={submitHandler}>
                <div className="my-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Images</label>
                    <input type="file" multiple name='other_images' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
                </div>
                <button type="submit" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Save</button>
            </form>

            <div className='my-4'>
                <div className='text-lg'>Current Images</div>
                <div className='grid my-2 grid-cols-10 gap-6'>
                    {
                        otherImageNames.map(
                            (name, index) => {
                                return <div className='flex flex-col items-center gap-3'>
                                    <img width="50" height="50" key={index} src={API_BASE_URL + "/images/product/" + name} />
                                    <MdDelete />
                                </div>
                            }
                        )
                    }
                </div>
            </div>
        </div>
    )
}

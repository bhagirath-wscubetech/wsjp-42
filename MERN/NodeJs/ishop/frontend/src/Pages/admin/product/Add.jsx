import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Context } from '../../../MainContext';
import { Link, useNavigate } from 'react-router-dom';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

export default function Add() {
    const animatedComponents = makeAnimated();
    const { API_BASE_URL, fetchCategory, category, fetchColor, color, showToast, PRODUCT_URL } = useContext(Context);
    const [sel_colors, setSelColor] = useState([]);
    const navigator = useNavigate();
    // const [descriptions, setDescriptions] = useState({
    //     long: "",
    //     short: ""
    // })
    const nameRef = useRef();
    const slugRef = useRef();
    const originalPriceRef = useRef();
    const discountPerRef = useRef();
    const finalPriceRef = useRef();

    const calfinalPrice = () => {
        const op = originalPriceRef.current.value;
        const dp = discountPerRef.current.value;
        if (op != "" && dp != "") {
            const final = op - ((dp / 100) * op);
            finalPriceRef.current.value = final;
        }
    }

    useEffect(
        () => {
            fetchCategory();
            fetchColor();
        }, []
    )

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", nameRef.current.value);
        formData.append("slug", slugRef.current.value);
        formData.append("category", e.target.category.value);
        formData.append("main_image", e.target.main_image.files[0]);
        formData.append("original_price", originalPriceRef.current.value);
        formData.append("discount_percent", discountPerRef.current.value);
        formData.append("final_price", finalPriceRef.current.value);
        formData.append("short_description", e.target.short_description.value);
        formData.append("long_description", e.target.long_description.value);
        formData.append("colors", JSON.stringify(sel_colors));
        // json to array

        axios.post(
            API_BASE_URL + PRODUCT_URL + "/create",
            formData
        ).then(
            (success) => {
                showToast(success.data.msg, success.data.status);
                if (success.data.status == 1) {
                    e.target.reset();
                    navigator("/admin/product");
                }
            }
        ).catch(
            (error) => {
                console.log(error);
            }
        )
    }


    function convertToSlug() {
        const slug =
            nameRef.current.value
                .toLowerCase()
                .trim()
                .replace(/[\s_]+/g, '-')
                .replace(/[^\w\-]+/g, '')
                .replace(/\-\-+/g, '-');

        slugRef.current.value = slug;
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
                            <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">Add</span>
                        </div>
                    </li>
                </ol>
            </nav>

            <form onSubmit={submitHandler}>
                <div className="grid gap-3 grid-cols-2">
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input ref={nameRef} onChange={convertToSlug} type="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="slug" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slug</label>
                        <input readOnly ref={slugRef} type="text" id="slug" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                </div>
                <div className="grid gap-3 grid-cols-3">
                    <div className="mb-5">
                        <label htmlFor="original_price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Original Price</label>
                        <input onChange={calfinalPrice} ref={originalPriceRef} type="number" id="original_price" name='original_price' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount Percentage</label>
                        <input onChange={calfinalPrice} ref={discountPerRef} name='discount_percent' type="number" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="final_price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Final Price</label>
                        <input ref={finalPriceRef} readOnly type="final_price" id="final_price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    </div>
                </div>

                <div className="grid gap-3 grid-cols-2">
                    <div className="mb-5">
                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                        <Select name='category' options={
                            category?.map(
                                (cat) => {
                                    return {
                                        value: cat._id,
                                        label: cat.name
                                    }
                                }
                            )
                        } />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Color</label>
                        <Select
                            onChange={
                                (opt) => {
                                    const d = opt.map(o => o.value);
                                    setSelColor(d);
                                }
                            }
                            components={animatedComponents}
                            closeMenuOnSelect={false} isMulti
                            options={
                                color.map(
                                    (col) => {
                                        return {
                                            label: col.name,
                                            value: col._id
                                        }
                                    }
                                )
                            } />
                        {/* <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name='category'>
                            <option>Select colors</option>
                            {
                                color.map(
                                    (col) => {
                                        return (
                                            <option key={col._id} value={col._id}>{col.name}</option>
                                        )
                                    }
                                )
                            }
                        </select> */}
                    </div>
                </div>
                <div className="grid gap-3 grid-cols-2">
                    <div className='mb-5'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Short Description</label>
                        <textarea className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="short_description"></textarea>
                    </div>
                    <div className='mb-5'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Long Description</label>
                        <textarea className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="long_description"></textarea>
                    </div>
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
                    <input type="file" name='main_image' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
                </div>
                <button type="submit" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Save</button>
            </form>
        </div>
    )
}

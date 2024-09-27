import React, { createContext, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const Context = createContext();

export default function MainContext(props) {
    const [confirmation_open, setConfirmationOpen] = useState(false);
    const [category, setCategory] = useState([]);
    const [product, setProduct] = useState([]);
    const [color, setColor] = useState([]);
    const [yes_handler, setYesHandler] = useState(null);
    const API_BASE_URL = "http://localhost:5000";
    const CATEGORY_URL = "/category";
    const COLOR_URL = "/color";
    const PRODUCT_URL = "/product";

    const fetchProduct = (product_id = null, limit = 0, category_slug = null, product_color = null) => {
        let API = API_BASE_URL + PRODUCT_URL;
        if (product_id != null) {
            API += `/${product_id}`;
        }
        const query = new URLSearchParams();
        query.append("limit", limit);
        query.append("category_slug", category_slug);
        query.append("product_color", product_color);

        console.log(query.toString());

        axios.get(API + "?" + query.toString())
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        setProduct(success.data.productData);
                    }
                }
            ).catch(
                (error) => {
                    setProduct([]);
                }
            )
    }

    const fetchCategory = (category_id = null) => {
        let API = API_BASE_URL + CATEGORY_URL;
        if (category_id != null) {
            API += `/${category_id}`;
        }
        axios.get(API)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        setCategory(success.data.categoryData);
                    }
                }
            ).catch(
                (error) => {
                    setCategory([]);
                }
            )
    }
    const fetchColor = (color_id = null) => {
        let API = API_BASE_URL + COLOR_URL;
        if (color_id != null) {
            API += `/${color_id}`;
        }
        // http://localhost:5000/category
        axios.get(API)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        setColor(success.data.colors);
                    }
                }
            ).catch(
                (error) => {
                    setColor([]);
                }
            )
    }


    const showToast = (msg, flag) => {
        // flag = 1 / 0
        // success / warning
        toast(msg, {
            type: flag ? 'success' : 'warning'
        })
    }

    const clickHandler = () => {
        yes_handler();
        setConfirmationOpen(false);
    }
    const showConfirmation = (yesHandlerCallback) => {
        setYesHandler(() => yesHandlerCallback);
        setConfirmationOpen(true);
    }

    return (
        <Context.Provider value={{ fetchProduct, product, PRODUCT_URL, fetchColor, color, COLOR_URL, category, showConfirmation, fetchCategory, showToast, API_BASE_URL, CATEGORY_URL }}>
            <div style={{
                display: confirmation_open == false && "none",
                background: "rgba(0,0,0,0.4)"
            }} className='w-full h-full flex justify-center items-center fixed top-0 z-[9999]'>
                <div className='bg-white shadow z-[999999] p-5 rounded'>
                    <div className='text-lg font-[400] text-gray-700'>
                        Do you really want to delete?
                    </div>
                    <div className='text-center'>
                        <button onClick={() => {
                            setYesHandler(null);
                            setConfirmationOpen(false);
                        }} className='bg-red-600 text-white px-5 py-1  ml-2 rounded my-2'>
                            No
                        </button>
                        <button onClick={clickHandler} className='bg-green-600 text-white px-5 py-1 ml-2  rounded my-2'>
                            Yes
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
            {props.children}
        </Context.Provider>
    )
}

export { Context };

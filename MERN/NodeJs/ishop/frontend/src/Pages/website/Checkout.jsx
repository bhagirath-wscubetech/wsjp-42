import React, { useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toINRCurrency } from "../../../helper";
import { IoMdAdd } from "react-icons/io";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { emptyCart } from "../../reducers/CartSlice";
import { Context } from "../../MainContext";

export default function Checkout() {
    const cart = useSelector(store => store.cart);
    const user = useSelector(store => store.user);
    const [adress_index, setAddressIndex] = useState(0);
    const [payment_mode, setPaymentMode] = useState(1);
    const { showToast } = useContext(Context);
    const navigator = useNavigate();
    const dispatcher = useDispatch();
    // 1: Online 0: COD

    const placeOrder = () => {
        const address = user.data.shipping_address[adress_index];

        axios.post(
            "http://localhost:5000/order/place-order",
            {
                user_id: user.data._id,
                address,
                payment_mode,
                order_total: cart.total
            }
        ).then(
            (response) => {

                if (response.data.status == 1) {
                    showToast(response.data.msg, 1);
                    navigator(`/thank-you/${response.data.order_id}`);
                    dispatcher(emptyCart());
                } else {
                    showToast(response.data.msg, 0);
                }
            }
        ).catch(
            () => {

            }
        )

    }

    return (
        <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                    Checkout
                </h2>
                <hr className='my-2' />
                <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                        <h4 className='text-lg font-semibold'>Select payment mode</h4>
                        <div className='flex gap-3 mb-6'>
                            <div className='flex gap-2'>
                                <input checked={payment_mode == 0 ? true : false} name="payment_mode" id='cod' type="radio" onClick={() => setPaymentMode(0)} />
                                <label htmlFor="cod">COD</label>
                            </div>
                            <div className='flex gap-2'>
                                <input checked={payment_mode == 1 ? true : false} name="payment_mode" id='online' type="radio" onClick={() => setPaymentMode(1)} />
                                <label htmlFor="online">Prepaid (Online)</label>
                            </div>
                        </div>
                        <h4 className='text-lg font-semibold'>Select a address</h4>
                        <div className='grid grid-cols-2 gap-3 mt-3'>
                            {
                                user?.data?.shipping_address.map(
                                    (address, index) => {
                                        return <div className={`shadow-md rounded p-3`}>
                                            <div className='text-[18px]'>
                                                <input checked={adress_index == index ? true : false} type="radio" value={index} name='address_index' className='mr-3'
                                                    onClick={() => setAddressIndex(index)}
                                                />
                                                {address.name}, {address.contact}
                                            </div>
                                            <div className='text-[15px]'>
                                                {address.addressLine1}, <br />
                                                {address.addressLine2}, <br />
                                                {address.city}, {address.state}, <br />
                                            </div>
                                            <span className='text-[14px]'>{address.postalCode}, {address.country}</span>
                                        </div>
                                    }
                                )
                            }
                        </div>
                        <button className='my-4 w-[200px] block mx-auto p-3 border rounded'>
                            <IoMdAdd className='inline-block' /> Add new adress
                        </button>
                    </div>
                    {/* Side bar */}
                    <div className="sticky top-[100px] mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                            <p className="text-xl font-semibold text-gray-900 dark:text-white">
                                Order summary
                            </p>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                            Original price
                                        </dt>
                                        <dd className="text-base font-medium text-gray-900 dark:text-white">
                                            ₹ {toINRCurrency(cart.original_total)}
                                        </dd>
                                    </dl>
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                                            Savings
                                        </dt>
                                        <dd className="text-base font-medium text-green-600">
                                            - ₹ {toINRCurrency(cart.original_total - cart.total)}
                                        </dd>
                                    </dl>
                                </div>
                                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                                    <dt className="text-base font-bold text-gray-900 dark:text-white">
                                        Total
                                    </dt>
                                    <dd className="text-base font-bold text-gray-900 dark:text-white">
                                        ₹ {toINRCurrency(cart.total)}
                                    </dd>
                                </dl>
                            </div>
                            <button
                                onClick={placeOrder}
                                className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Place order
                            </button>
                            <div className="flex items-center justify-center gap-2">
                                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                    {" "}
                                    or{" "}
                                </span>
                                <a
                                    href="#"
                                    title=""
                                    className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                                >
                                    Continue Shopping
                                    <svg
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 12H5m14 0-4 4m4-4-4-4"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
                            <form className="space-y-4">
                                <div>
                                    <label
                                        htmlFor="voucher"
                                        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        {" "}
                                        Do you have a voucher or gift card?{" "}
                                    </label>
                                    <input
                                        type="text"
                                        id="voucher"
                                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                        placeholder=""
                                        required=""
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Apply Code
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}

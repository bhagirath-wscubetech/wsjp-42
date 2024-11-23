import React from 'react'
import { useParams } from 'react-router-dom'

export default function ThankYou() {
    const { order_id } = useParams();
    console.log("order_id", order_id);
    return (
        <>
            {/* Container */}
            <div className="min-h-screen flex items-center justify-center bg-white py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    {/* Success Message Card */}
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <div className="text-center">
                            <svg
                                className="mx-auto h-16 w-20 text-green-600"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2l4-4m0 5a9 9 0 1 0-6 3.97"
                                />
                            </svg>
                            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                                Thank you for your order!
                            </h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Your order has been placed successfully. You will receive an email
                                confirmation shortly.
                            </p>
                            <p className="mt-2 text-sm text-gray-600">
                                Order ID: {order_id}
                            </p>
                        </div>
                        <div className="mt-8">
                            <a
                                href="/"
                                className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                            >
                                Go back to Home
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

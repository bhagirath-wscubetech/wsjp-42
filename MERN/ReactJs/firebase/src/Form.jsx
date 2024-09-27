import React from 'react';
import { getDatabase, ref, set } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

export default function Form() {

    const submitHandler = (e) => {
        e.preventDefault();
        const data = {
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            email: e.target.email.value,
            password: e.target.password.value
        }
        const db = getDatabase();
        const uId = new Date().getTime() + uuidv4();
        set(
            ref(
                db, 'users/' + uId
            ),
            data
        );
        e.target.reset();
    }

    return (
        <div className='shadow p-3'>
            <h3 className='text-center text-2xl font-bold'>User Registration</h3>
            <hr className='my-4' />
            <form onSubmit={submitHandler} className='my-3'>
                <div>
                    <label
                        htmlFor="first_name"
                        className=" my-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        First name
                    </label>
                    <input
                        type="text"
                        name='first_name'
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                    />
                </div>
                <div>
                    <label
                        htmlFor="last_name"
                        className=" my-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Last name
                    </label>
                    <input
                        type="text"
                        name="last_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                    />
                </div>
                <div>
                    <label
                        htmlFor="email"
                        className=" my-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                    />
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className=" my-3 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                    />
                </div>
                <button className='border border-blue-500 duration-500 mt-3 py-2 px-3 hover:bg-blue-500 hover:text-white'>Save</button>
            </form>
        </div>
    )
}

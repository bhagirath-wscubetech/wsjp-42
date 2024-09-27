import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function App() {
    const [users, setUser] = useState([]);
    const [edit_data, setEditData] = useState(null);

    console.log("edit_data", edit_data);

    const openToast = (msg, flag) => {
        toast(msg, { type: flag ? 'success' : 'error' })
    }

    const fetchUsers = () => {
        axios.get("http://localhost:5000/user")
            .then(
                (success) => {
                    // console.log("success", success);
                    if (success.data.status == 1) {
                        setUser(success.data.users);
                    }
                }
            ).catch(
                (error) => {
                    console.log("catch", error);
                }
            )
    }

    const deleteHandler = (user_id) => {
        axios.delete(`http://localhost:5000/user/delete/${user_id}`)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        fetchUsers();
                    }
                    openToast(success.data.msg, success.data.status);
                }
            ).catch(
                (error) => {
                    openToast("Client side error", 0);
                }
            )
    }

    const changeStatus = (user_id) => {
        axios.patch(`http://localhost:5000/user/change-status/${user_id}`)
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        fetchUsers();
                    }
                    openToast(success.data.msg, success.data.status);
                }
            ).catch(
                (error) => {
                    openToast("Client side error", 0);
                }
            )
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const data = {
            name: e.target.name.value,
            email: e.target.email.value,
            contact: e.target.contact.value,
            password: e.target.password.value
        }
        let response;
        if (edit_data == null) {
            response = axios.post("http://localhost:5000/user/register", data);
        } else {
            response = axios.put(
                `http://localhost:5000/user/update/${edit_data._id}`, data
            );
        }
        response
            .then(
                (success) => {
                    if (success.data.status == 1) {
                        e.target.reset();
                        setEditData(null);
                        fetchUsers();
                    }
                    openToast(success.data.msg, success.data.status);
                }
            ).catch(
                (error) => {
                    openToast("Client side error", 0);
                }
            )
    }

    useEffect(
        () => {
            fetchUsers();
        }, []
    )

    return (
        <>
            <ToastContainer />
            <h2 className='text-center text-xl my-2'>User Dashboard</h2>
            <div className='w-[1200px] gap-2 mx-auto grid grid-cols-4'>
                <div className="col-span-3">
                    <div className="relative overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Contact
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
                                    users.map(
                                        (user) => {
                                            return (
                                                <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th
                                                        scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                                    >
                                                        {user.name}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {user.email}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {user.contact}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {
                                                            user.status
                                                                ? <button onClick={() => changeStatus(user._id)} className='p-2 bg-green-400'>Active</button>
                                                                : <button onClick={() => changeStatus(user._id)} className='p-2 bg-orange-400'>Inactive</button>
                                                        }
                                                    </td>
                                                    <td>
                                                        <button onClick={
                                                            () => deleteHandler(user._id)
                                                        } className='p-3 mr-1 bg-red-600 text-white'>Delete</button>
                                                        <button onClick={
                                                            () => setEditData(user)
                                                        } className='p-3 bg-blue-600 text-white'>Edit</button>
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    )
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="shadow rounded">
                    <div className='text-xl text-center py-2'>Register</div>
                    <RegisterForm editData={edit_data} submitHandler={submitHandler} />
                </div>
            </div>
        </>
    )
}



const RegisterForm = (props) => {
    const [togglePassword, setTogglePassword] = useState(false);
    return (
        <form onSubmit={props.submitHandler} className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                    Name
                </label>
                <input
                    type="text"
                    id="name"
                    defaultValue={props.editData?.name}
                    name="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    defaultValue={props.editData?.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="flex items-center gap-3 text-gray-700 font-bold mb-2">
                    Password
                    {
                        togglePassword
                            ? <FaRegEyeSlash onClick={() => setTogglePassword(false)} />
                            : <FaRegEye onClick={() => setTogglePassword(true)} />
                    }
                </label>
                <input
                    type={togglePassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    defaultValue={props.editData?.password}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2" htmlFor="contact">
                    Contact
                </label>
                <input
                    defaultValue={props.editData?.contact}
                    type="text"
                    id="contact"
                    name="contact"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>

            <div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                >
                    Submit
                </button>
            </div>
        </form>
    );
};
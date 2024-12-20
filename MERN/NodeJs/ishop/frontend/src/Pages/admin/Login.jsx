import React, { useContext } from 'react';
import axios from "axios";
import { Context } from "../../MainContext";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../reducers/AdminSlice';

export default function Login() {
    const { showToast } = useContext(Context);
    const navigator = useNavigate();
    const dispatcher = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        const data = {
            email: e.target.email.value,
            password: e.target.password.value,
        }
        axios.post(
            "http://localhost:5000/admin/login",
            data
        ).then(
            (response) => {
                showToast(response.data.msg, response.data.status);
                if (response.data.status == 1) {
                    console.log(response.data);
                    e.target.reset();
                    navigator("/admin");
                    dispatcher(
                        login(
                            {
                                data: response.data.admin,
                                token: response.data.token
                            }
                        )
                    );
                    // payload
                }
            }
        ).catch(
            (error) => {
                showToast("Client side error");
            }
        )
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Login to your account</h2>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
                        <input
                            type="email"
                            name='email'
                            id="email"
                            placeholder="Enter your email"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
                        <input
                            type="password"
                            name='password'
                            id="password"
                            placeholder="Enter your password"
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200"
                    >
                        Login
                    </button>
                </form>
                <p className="mt-6 text-gray-600">
                    Don't have an account? <a href="/signup" className="text-blue-500 hover:underline">Sign up</a>
                </p>
            </div>
        </div>
    )
}

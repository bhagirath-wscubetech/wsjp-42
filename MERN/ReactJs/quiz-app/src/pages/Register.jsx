import React, { useContext, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Context } from '../MainContext';
import { useNavigate } from 'react-router-dom';


export default function Register() {
    const { login } = useContext(Context);
    const [error, setError] = useState("");
    const navigator = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        setError("");
        const email = e.target.email.value;
        const password = e.target.password.value;
        const auth = getAuth();
        if (email != "" && password != "") {
            createUserWithEmailAndPassword(auth, email, password)
                .then(
                    (userCredential) => {
                        // Signed up 
                        const user = userCredential.user;
                        // console.log(user);
                        login(user.toJSON());
                        navigator("/");
                        // ...
                    }
                )
                .catch(
                    (error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        setError(errorMessage);
                        // ..
                    }
                );

        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <div className='text-red-600 my-3 text-[20px]'>{error}</div>
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            name='email'
                            id="email"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            name='password'
                            id="password"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your password"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

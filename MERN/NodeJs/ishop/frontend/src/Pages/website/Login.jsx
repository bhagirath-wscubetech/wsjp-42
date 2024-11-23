import React, { useContext } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../MainContext';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../reducers/UserSlice';
import { dbToCart } from '../../reducers/CartSlice';

export default function Login() {
    const [searchParams, setSearchParams] = useSearchParams();
    const cart = useSelector(store => store.cart);
    const { showToast } = useContext(Context);
    const dispatcher = useDispatch();
    const navigator = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        const data = {
            email: e.target.email.value,
            password: e.target.password.value
        }
        axios.post(
            "http://localhost:5000/user/login",
            data
        ).then(
            (response) => {
                showToast(response.data.msg, response.data.status);
                if (response.data.status == 1) {
                    console.log(response.data);
                    dispatcher(login({
                        data: response.data.user,
                        token: response.data.token
                    }));
                    axios.post(
                        `http://localhost:5000/user/move-to-cart/${response.data.user._id}`,
                        {
                            cartData: JSON.stringify(cart.data)
                        }
                    ).then(
                        (resp) => {
                            if (resp.data.status == 1) {
                                console.log("resp inside", resp);
                                const latestCart = resp.data.latestCart;
                                let original_total = 0, final_total = 0;
                                const data = latestCart.map(
                                    (lc) => {
                                        original_total += (lc.product_id.original_price * lc.quantity);
                                        final_total += (lc.product_id.final_price * lc.quantity);

                                        return {
                                            product_id: lc.product_id._id,
                                            quantity: lc.quantity
                                        }
                                    }
                                )
                                console.log("data", data);
                                dispatcher(dbToCart({
                                    data: data,
                                    total: final_total,
                                    original_total: original_total
                                }))
                                // console.log(data);
                            }
                        }
                    ).catch(
                        (err) => {

                        }
                    )
                    if (searchParams.get("ref") == "checkout") {
                        navigator("/checkout");
                    } else {
                        navigator("/");
                    }
                    e.target.reset();
                }
            }
        ).catch(
            () => {

            }
        )
    }

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a
                    href="#"
                    className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
                >
                    <img
                        className="w-8 h-8 mr-2"
                        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                        alt="logo"
                    />
                    Flowbite
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form onSubmit={submitHandler} className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Your email
                                </label>
                                <input
                                    defaultValue={"bhagirath@wscubetech.com"}
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="name@company.com"
                                    required=""
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                >
                                    Password
                                </label>
                                <input
                                    defaultValue={"Bhagirath@123!"}
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    required=""
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="remember"
                                            aria-describedby="remember"
                                            type="checkbox"
                                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                            required=""
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label
                                            htmlFor="remember"
                                            className="text-gray-500 dark:text-gray-300"
                                        >
                                            Remember me
                                        </label>
                                    </div>
                                </div>
                                <a
                                    href="#"
                                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Forgot password?
                                </a>
                            </div>
                            <button
                                type="submit"
                                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Sign in
                            </button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet?{" "}
                                <Link
                                    to={`/register?${searchParams.toString()}`}
                                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}

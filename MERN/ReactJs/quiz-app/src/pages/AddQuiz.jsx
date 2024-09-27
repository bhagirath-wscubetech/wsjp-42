import React, { useContext, useEffect, useState } from 'react';
import { getDatabase, ref, set } from "firebase/database";
import { Context } from '../MainContext';
import { useNavigate } from 'react-router-dom';

const AddQuiz = () => {
    const { user } = useContext(Context);
    const navigator = useNavigate();
    
    useEffect(
        () => {
            const lsUser = localStorage.getItem("user");
            if(lsUser == undefined){
                navigator("/login");
            }
        }, [user]
    )

    const submitHandler = (e) => {
        e.preventDefault();
        const db = getDatabase();
        const quizData = {
            question: e.target.question.value,
            option1: e.target.option1.value,
            option2: e.target.option2.value,
            option3: e.target.option3.value,
            option4: e.target.option4.value,
            correct: e.target.correctOption.value
        }
        const quizId = new Date().getTime() + Math.floor(Math.random() * 1000);
        set(
            ref(
                db, "quiz/" + quizId
            ),
            quizData
        )
        e.target.reset();
    }

    return (
        <div className="max-w-lg mx-auto p-4">
            <form onSubmit={submitHandler} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="question">
                        Question
                    </label>
                    <input
                        id="question"
                        name="question"
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your question here"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Option 1
                    </label>
                    <input
                        name={`option1`}
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder={`Enter option 1`}
                    />
                    <div className="mt-2">
                        <label className="inline-flex items-center">
                            <input
                                defaultValue={1}
                                type="radio"
                                name="correctOption"
                                className="form-radio"
                            />
                            <span className="ml-2">Correct answer</span>
                        </label>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Option 2
                    </label>
                    <input
                        name={`option2`}
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder={`Enter option 2`}
                    />
                    <div className="mt-2">
                        <label className="inline-flex items-center">
                            <input
                                defaultValue={2}
                                type="radio"
                                name="correctOption"
                                className="form-radio"
                            />
                            <span className="ml-2">Correct answer</span>
                        </label>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Option 3
                    </label>
                    <input

                        name={`option3`}
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder={`Enter option 3`}
                    />
                    <div className="mt-2">
                        <label className="inline-flex items-center">
                            <input
                                defaultValue={3}
                                type="radio"
                                name="correctOption"
                                className="form-radio"
                            />
                            <span className="ml-2">Correct answer</span>
                        </label>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Option 4
                    </label>
                    <input
                        name={`option4`}
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder={`Enter option 4`}
                    />
                    <div className="mt-2">
                        <label className="inline-flex items-center">
                            <input
                                defaultValue={4}
                                type="radio"
                                name="correctOption"
                                className="form-radio"
                            />
                            <span className="ml-2">Correct answer</span>
                        </label>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddQuiz;

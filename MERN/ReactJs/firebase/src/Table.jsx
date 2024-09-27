import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";

export default function Table() {
    const [users, setUser] = useState([]);
    const fetchData = () => {
        const db = getDatabase();
        const userRef = ref(db, 'users');
        onValue(userRef, (snapshot) => {
            const data = snapshot.val();
            // data => object of objects;
            const keys = Object.keys(data);
            const arr = [];
            for (let k of keys) {
                arr.push({ id: k, ...data[k] });
            }
            // array of objects
            setUser(arr);
        });
    }

    useEffect(
        () => {
            fetchData();
        }, []
    )

    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            First Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Last Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Email
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(
                            (u) => {
                                return (
                                    <tr key={u.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th
                                            scope="row"
                                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                        >
                                            {u.first_name}
                                        </th>
                                        <td className="px-6 py-4">
                                            {u.last_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {u.email}
                                        </td>
                                    </tr>
                                )
                            }
                        )
                    }

                </tbody>
            </table>
        </div>
    )
}

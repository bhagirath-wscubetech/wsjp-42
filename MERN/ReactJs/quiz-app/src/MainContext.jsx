import React, { createContext, useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";
const Context = createContext();

export default function MainContext(props) {
    const [user, setUser] = useState(null);
    const [quiz, setQuiz] = useState([]);

    useEffect(
        () => {
            const lsUser = localStorage.getItem("user");
            if (lsUser != undefined) {
                setUser(JSON.parse(lsUser));
                // JSON => object/array (JSON.parse);
            }
        }, []
    )
    useEffect(
        () => {
            fetchData();
        }, []
    )

    const fetchData = () => {
        const db = getDatabase();
        const starCountRef = ref(db, 'quiz');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            const arr = Object.keys(data).map(
                (k) => {
                    return {
                        ...data[k],
                        id: k
                    }
                }
            )
            setQuiz(arr);
        });
    }


    const login = (user_data) => {
        setUser(user_data);
        localStorage.setItem("user", JSON.stringify(user_data));
        // object/array => JSON (JSON.stringify);
    }
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    }

    return (
        <Context.Provider value={{ quiz, user, login, logout }}>
            {props.children}
        </Context.Provider>
    )
}

export { Context };
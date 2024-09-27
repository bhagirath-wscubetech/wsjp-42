import React, { useState } from 'react'
import Input from './Input'
import Display from './Display'

export default function App() {
    const [todos, setTodo] = useState(['Task1', 'Task2', 'Task3', 'Task4']);

    const addTodo = (value) => {
        setTodo([...todos, value]);
    }
    const removeTask = (index) => {
        // console.log(index);
        const filteredData = todos.filter(
            (t, i) => {
                if (i == index) {
                    return false; // isko new array mein mat jane do
                } else {
                    return true; // isko new array mein jane do
                }
            }
        )
        setTodo(filteredData);
    }

    return (
        <div className='container'>
            <Input addHandler={addTodo} />
            <Display todos={todos} removeHandler={removeTask} />
        </div>
    )
}

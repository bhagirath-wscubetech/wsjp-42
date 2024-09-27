import React, { useContext, useEffect, useState } from 'react';
import { Context } from "../MainContext";

export default function Play() {
    const [current, setCurrent] = useState(0);
    const { quiz } = useContext(Context);
    const [answers, setAnswer] = useState([]);

    useEffect(
        () => {
            const lsCurrent = localStorage.getItem("current");
            if (lsCurrent != undefined) {
                setCurrent(parseInt(lsCurrent));
                // string to interger
            }
            const lsAnswers = localStorage.getItem("answers");
            if (lsAnswers != undefined) {
                setAnswer(JSON.parse(lsAnswers));
                // json to array
            }
        }, []
    )

    useEffect(
        () => {
            if (answers.length != 0) {
                localStorage.setItem("answers", JSON.stringify(answers));
                // array to json 
            }
        }, [answers]
    )

    useEffect(
        () => {
            if (current != 0) {
                localStorage.setItem("current", current);
            }
        }, [current]
    );

    const saveAnswer = (id, ans) => {
        const answersCopy = [...answers];
        const found = answersCopy.find((ans) => ans.id == id);
        if (found) {
            found.ans = ans;
            setAnswer(answersCopy);
        } else {
            setAnswer([...answers, { id, ans }]);
        }
    }

    return (
        <div className='mx-auto my-4 w-[600px]'>
            <Box {...quiz[current]} answers={answers} saveAnswer={saveAnswer} current={current} />
            {/* quiz[0], quiz[1]*/}
            <div className='flex justify-between mt-3'>
                <button disabled={current == 0 && true}
                    onClick={() => {
                        if (current == 1) localStorage.setItem("current", 0);
                        setCurrent(current - 1)
                    }} className='disabled:bg-gray-400 p-3 text-white rounded bg-blue-400'>
                    Prev
                </button>
                <button disabled={current == (quiz.length - 1) && true}
                    onClick={() => setCurrent(current + 1)} className='disabled:bg-gray-400 p-3 text-white rounded bg-blue-400'>
                    Next
                </button>
            </div>
            <button disabled={current == (quiz.length - 1) ? false : true}
               className='block mx-auto disabled:bg-gray-400 p-3 text-white rounded bg-blue-400'>
                Finish
            </button>
        </div>
    )
}

const Box = (props) => {
    console.log(props);
    const [ans, setAns] = useState(null);

    useEffect(
        () => {
            const found = props.answers.find((d) => {
                return d.id == props.id
            });
            if (found) {
                setAns(found.ans);
            } else {
                setAns(null);
            }
        }, [props.current, props.answers, props.id]
    )

    const answer = (opt) => {
        props.saveAnswer(props.id, opt)
        setAns(opt);
    }

    return <div className='shadow-lg rounded p-3 w-full'>
        <h3 className='text-xl py-3 border-b'>
            {props.current + 1}) {props?.question}
        </h3>
        <div onClick={() => answer(1)} className={`${ans == 1 && 'bg-blue-500 text-white'} cursor-pointer py-2 px-1 border-b`}>
            A) {props.option1}
        </div>
        <div onClick={() => answer(2)} className={`${ans == 2 && 'bg-blue-500 text-white'} cursor-pointer py-2 px-1 border-b`}>
            B) {props.option2}
        </div>
        <div onClick={() => answer(3)} className={`${ans == 3 && 'bg-blue-500 text-white'} cursor-pointer py-2 px-1 border-b`}>
            C) {props.option3}
        </div>
        <div onClick={() => answer(4)} className={`${ans == 4 && 'bg-blue-500 text-white'} cursor-pointer py-2 px-1`}>
            D) {props.option4}
        </div>
    </div>
}
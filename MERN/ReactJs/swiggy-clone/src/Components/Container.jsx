import React from 'react'

export default function Container(props) {
    return (
        <div className={`max-w-[1200px] px-2 mx-auto ${props.className ?? ""}`}>
            {props.children}
        </div>
    )
}

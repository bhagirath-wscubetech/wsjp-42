import React from 'react'

export default function DisplayBox(props) {
    return (
        <div className='row gy-3'>
            {
                props.movies.map(
                    (m,i) => {
                        return <Box key={i} title={m.title} source={m.poster_path} />
                    }
                )
            }
        </div>
    )
}

function Box(props) {
    return (
        <div className='col-lg-2 col-md-3 col-6'>
            <div className='card overflow-hidden'>
                <img src={`https://image.tmdb.org/t/p/w1280/` + props.source} alt="" />
                <div className='text-center my-2'>{props.title}</div>
            </div>
        </div>
    )
}
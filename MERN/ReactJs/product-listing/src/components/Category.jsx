import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Category(props) {
    const [categories, setCategory] = useState([]);
    const setTitle = () => {
        const found = categories.find(d => d.slug == props.currentSlug);
        if (found) {
            document.title = `${found?.name} Listing (${props.totalProduct})`;
        } else {
            document.title = `Products Listing (${props.totalProduct})`;
        }
    }
    useEffect(
        () => {
            setTitle();
        }, [props.currentSlug, categories, props.totalProduct]
    )

    const getCategories = async () => {
        const resp = await fetch('https://dummyjson.com/products/categories');
        const data = await resp.json();
        setCategory(data);
    }

    useEffect(
        () => {
            getCategories();
        }, []
    )


    return (
        <ul className="list-group my-3">
            <li className={`list-group-item ${props.currentSlug == null && 'bg-primary text-white'}`}>
                <Link className='nav-link' to={`/`}>All</Link>
            </li>
            {
                categories.map(
                    (cat, index) => {
                        return (
                            <li key={index} className={`
                                ${cat.slug == props.currentSlug && 'bg-primary text-white'} 
                            list-group-item`}>
                                <Link className='nav-link' to={`/${cat.slug}`}>{cat.name}</Link>
                            </li>
                        );
                    }
                )
            }
        </ul >

    )
}

import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../MainContext'
import { Link, useParams, useSearchParams } from 'react-router-dom';
import ProductBox from '../../Components/website/ProductBox';

export default function Store() {
    const { fetchCategory, category, color, fetchProduct, product, fetchColor } = useContext(Context);
    const [limit, setLimit] = useState(2);
    const [product_color, setProductColor] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const { category_slug } = useParams();


    useEffect(
        () => {
            fetchCategory();
            fetchColor();
            if (searchParams.get("limit")) {
                setLimit(searchParams.get("limit"));
            }
            if (searchParams.get("product_color")) {
                setProductColor(searchParams.get("product_color"));
            }
        }, []
    )

    // useEffect(
    //     () => {
    //         if (category_slug != null) {
    //             setLimit(limit);
    //         }
    //     }, [category_slug]
    // )

    useEffect(
        () => {
            const query = {};
            query['limit'] = limit
            if (product_color != null) {
                query['product_color'] = product_color;
            }
            setSearchParams(query);
            fetchProduct(null, limit, category_slug, product_color);
        }, [category_slug, limit, product_color]
    )

    return (
        <>
            <div className='text-center font-[500] my-4 py-3 bg-[#F6F7F8]'>
                Store / All
            </div>
            <div className='max-w-[1200px] mx-auto p-2 gap-4 grid grid-cols-5'>
                <div >
                    <div className='bg-[#F6F7F8] p-3'>
                        <div className='uppercase font-[500] text-[18px] text-[#22262A]'>
                            Categoires
                        </div>
                        <ul>
                            <li className='mt-2 relative'>
                                <Link to={`/store`}>All</Link>
                            </li>
                            {category.map(
                                (cat) => {
                                    return <li className='mt-2 relative' key={cat._id}>
                                        <Link to={`/store/${cat.slug}`}>
                                            {cat.name}
                                        </Link>
                                        <span className='absolute text-gray-500 right-4'>
                                            {cat.productCount}
                                        </span>
                                    </li>
                                }
                            )}
                        </ul>
                    </div>
                    <div className='bg-[#F6F7F8] my-3 p-3'>
                        <div className='uppercase font-[500] text-[18px] text-[#22262A]'>
                            Color
                        </div>
                        <ul className='flex flex-wrap gap-3 mt-2'>
                            {color.map(
                                (col) => {
                                    return <li onClick={() => setProductColor(col._id)} className={`cursor-pointer border-[4px] 
                                        ${col._id == product_color ? 'border-blue-500' : 'border-gray-500'}
                                        rounded-[50%] w-[30px] h-[30px]`} style={{
                                            background: col.code
                                        }} key={col._id}>
                                    </li>
                                }
                            )}
                        </ul>
                    </div>
                </div>
                <div className='col-span-4'>
                    <div className='m-3 bg-gray-100 p-4'>
                        <select value={limit} onChange={
                            (e) => setLimit(e.target.value)
                        } name="" id="" className='bg-transparent border border-gray-700 p-2 focus:outline-none'>
                            <option value="2">2</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="0">All</option>
                        </select>
                    </div>

                    <div className='m-4 gap-3 grid grid-cols-4'>
                        {
                            product.map(
                                (prod) => {
                                    return <ProductBox key={prod._id} {...prod} />
                                }
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

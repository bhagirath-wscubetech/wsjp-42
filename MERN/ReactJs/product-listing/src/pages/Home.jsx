import { useEffect, useState } from "react";
import Product from "../components/Product";
import Category from "../components/Category";
import { useParams, useSearchParams } from "react-router-dom";
import ProductSkeleton from "../components/ProductSkeleton";

function Home() {
    const [products, setProduct] = useState([]);
    // const [limit, setLimit] = useState(30);
    const [searchParams, setSearchParams] = useSearchParams();
    const { slug } = useParams();
    const [page, setPage] = useState(0);
    const [totalProduct, setTotalProduct] = useState(0);
    const [isLoading, setLoading] = useState(false);

    const limit = 20;

    // const incLimit = () => {
    //     setLimit(
    //         (prevLimit) => {
    //             if (prevLimit < totalProduct) {
    //                 return prevLimit + 20;
    //             } else {
    //                 return prevLimit;
    //             }
    //         }
    //     );
    // }

    let pagination = [];
    for (let i = 0; i < Math.ceil(totalProduct / limit); i++) {
        pagination.push(i);
    }


    const getProducts = async () => {
        let resp;
        setLoading(true);
        if (slug == null) {
            resp = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${limit * page}`);
        } else {
            resp = await fetch(`https://dummyjson.com/products/category/${slug}`);
        }
        const data = await resp.json();
        setLoading(false);
        setProduct(data.products);
        setTotalProduct(data.total);
    }

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;
    //         if (bottom) {
    //             console.log('User reached the bottom of the page');
    //             incLimit();
    //         }
    //     };

    //     window.addEventListener('scroll', handleScroll);
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    // useEffect(() => {
    //     const urlLimit = searchParams.get("limit");
    //     if (urlLimit != undefined) {
    //         setLimit(Number(urlLimit));
    //     }
    // }, []); // first render

    useEffect(
        () => {
            const urlPage = searchParams.get('page');
            if (urlPage) {
                setPage(Number(urlPage));
            }
        }, []
    )

    useEffect(() => {
        getProducts();
        setSearchParams({
            page: page
        })
    }, [slug, page]);

    const displayProducts = products.map((prod) => {
        return <Product key={prod.id} id={prod.id} img={prod.thumbnail} name={prod.title} rating={prod.rating} />
    });


    return (
        <div className='container'>
            <div className="row">
                <div className="col-3">
                    <Category totalProduct={products.length} currentSlug={slug} />
                </div>
                <div className="col-9">

                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li
                                style={
                                    {
                                        display: page == 0 ? 'none' : ''
                                    }
                                }
                                onClick={() => setPage(page - 1)} className="page-item">
                                <a className="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">«</span>
                                </a>
                            </li>
                            {
                                pagination.map(
                                    (p) => {
                                        return <li key={p} onClick={() => setPage(p)} className={`page-item ${page == p && 'active'}`}>
                                            <a className="page-link" href="#">
                                                {p + 1}
                                            </a>
                                        </li>
                                    }
                                )
                            }
                            <li
                                style={
                                    {
                                        display: page == (Math.ceil(totalProduct / limit) - 1) ? 'none' : ''
                                    }
                                }
                                className="page-item"
                                onClick={() => setPage(page + 1)}>
                                <a className="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">»</span>
                                </a>
                            </li>
                        </ul>
                    </nav>

                    <div className="row">
                        {
                            isLoading
                                ? <ProductSkeleton />
                                : displayProducts
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

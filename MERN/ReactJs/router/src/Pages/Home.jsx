// src/components/Home.js
import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const Home = () => {
    return (
        <>
            <Header />
            <div className="container">
                <div className="jumbotron mt-5">
                    <h1 className="display-4">Welcome to My Blog</h1>
                    <p className="lead">This is a simple blog website using Bootstrap and React.</p>
                    <hr className="my-4" />
                    <p>Click the button below to view all blogs.</p>
                    <a className="btn btn-primary btn-lg" href="/blogs" role="button">View Blogs</a>
                </div>
            </div>
            <Footer/>
        </>
    );
}

export default Home;

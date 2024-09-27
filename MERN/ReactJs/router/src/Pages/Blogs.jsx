import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Link } from 'react-router-dom';

const Blogs = () => {
    const blogs = [
        { id: 1, title: 'First Blog Post', summary: 'This is the summary of the first blog post.' },
        { id: 2, title: 'Second Blog Post', summary: 'This is the summary of the second blog post.' },
        { id: 3, title: 'Third Blog Post', summary: 'This is the summary of the third blog post.' },
        { id: 4, title: 'Fourth Blog Post', summary: 'This is the summary of the fourth blog post.' },
        { id: 5, title: 'Fifth Blog Post', summary: 'This is the summary of the fifth blog post.' },
        { id: 6, title: 'Sixth Blog Post', summary: 'This is the summary of the sixth blog post.' },
        { id: 7, title: 'Seventh Blog Post', summary: 'This is the summary of the seventh blog post.' },
        { id: 8, title: 'Eighth Blog Post', summary: 'This is the summary of the eighth blog post.' },
        { id: 9, title: 'Ninth Blog Post', summary: 'This is the summary of the ninth blog post.' },
        { id: 10, title: 'Tenth Blog Post', summary: 'This is the summary of the tenth blog post.' },
        { id: 11, title: 'Eleventh Blog Post', summary: 'This is the summary of the eleventh blog post.' },
        { id: 12, title: 'Twelfth Blog Post', summary: 'This is the summary of the twelfth blog post.' },
        { id: 13, title: 'Thirteenth Blog Post', summary: 'This is the summary of the thirteenth blog post.' },
        { id: 14, title: 'Fourteenth Blog Post', summary: 'This is the summary of the fourteenth blog post.' },
        { id: 15, title: 'Fifteenth Blog Post', summary: 'This is the summary of the fifteenth blog post.' },
        { id: 16, title: 'Sixteenth Blog Post', summary: 'This is the summary of the sixteenth blog post.' },
        { id: 17, title: 'Seventeenth Blog Post', summary: 'This is the summary of the seventeenth blog post.' },
        { id: 18, title: 'Eighteenth Blog Post', summary: 'This is the summary of the eighteenth blog post.' },
        { id: 19, title: 'Nineteenth Blog Post', summary: 'This is the summary of the nineteenth blog post.' },
        { id: 20, title: 'Twentieth Blog Post', summary: 'This is the summary of the twentieth blog post.' },
    ];

    return (
        <>
            <Header />
            <div className="container mt-5">
                <h2>All Blogs</h2>
                <div className="row">
                    {blogs.map(blog => (
                        <div className="col-md-3 mb-4" key={blog.id}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{blog.title}</h5>
                                    <p className="card-text">{blog.summary}</p>
                                    <Link to="/details">
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Blogs;

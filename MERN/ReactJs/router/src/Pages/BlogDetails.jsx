// src/components/BlogDetails.js
import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

const BlogDetails = ({ blog }) => {
    return (
        <>
            <Header />
            <div className="container mt-5">
                <h2>{blog.title}</h2>
                <p>{blog.content}</p>
                <a href="/blogs" className="btn btn-secondary">Back to Blogs</a>
            </div>
            <Footer />
        </>
    );
}

// Sample usage of the BlogDetails component with mock data
const mockBlog = {
    title: 'Sample Blog Post',
    content: 'This is the detailed content of the blog post.'
};

const BlogDetailsPage = () => <BlogDetails blog={mockBlog} />;

export default BlogDetailsPage;

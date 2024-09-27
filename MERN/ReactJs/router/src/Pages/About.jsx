// src/components/About.js
import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';


const About = () => {
  const imageUrl = 'https://via.placeholder.com/600x400'; // Replace with the URL of any online image you prefer

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <img src={imageUrl} className="img-fluid" alt="About Us" />
          </div>
          <div className="col-md-6">
            <h2>About Us</h2>
            <p>
              Welcome to My Blog, your number one source for all things related to [Topic]. We're dedicated to providing you the very best of content, with an emphasis on quality, reliability, and insightful commentary.
            </p>
            <p>
              Founded in [Year] by [Founder Name], My Blog has come a long way from its beginnings in [Location]. When [Founder Name] first started out, their passion for [passion related to your blog’s topic] drove them to start their own blog.
            </p>
            <p>
              We hope you enjoy our content as much as we enjoy offering it to you. If you have any questions or comments, please don't hesitate to contact us.
            </p>
            <p>
              Our team consists of experienced writers and editors who are passionate about [Blog Topic]. We strive to provide fresh and interesting perspectives on the latest trends and news.
            </p>
            <p>
              Thank you for visiting our blog. We hope that our content inspires, educates, and entertains you. Stay tuned for more updates and posts!
            </p>
            <p>
              Sincerely,<br/>
              [Your Name]
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;

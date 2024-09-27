// src/components/Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer className="mt-4 bg-light text-center text-lg-start">
            <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                © 2024 My Blog:
                <a className="text-dark" href="https://myblog.com/"> myblog.com</a>
            </div>
        </footer>
    );
}

export default Footer;

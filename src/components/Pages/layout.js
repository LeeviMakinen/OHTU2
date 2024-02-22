import React from 'react';
import './pages.css';


function Layout({ children }) {
    return (
        <div className="container">
            {children}
        </div>
    );
}

export default Layout;

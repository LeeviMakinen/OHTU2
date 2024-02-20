import React from 'react';
import './pages.css'; // Import your CSS file for layout styles


function Layout({ children }) {
    return (
        <div className="container">
            {children}
        </div>
    );
}

export default Layout;

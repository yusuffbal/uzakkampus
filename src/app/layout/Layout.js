import React from 'react';
import Menu from '../components/menu/Menu';
import Footer from '../components/menu/Footer';

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Menu />
      <div className="flex-grow-1">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;

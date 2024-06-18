import React, { useEffect } from 'react';
import Menu from '../components/menu/Menu';
import Footer from '../components/menu/Footer';
import { AlertManager } from '../components/alerts/AlertsManager';
import { shallowEqual, useSelector } from 'react-redux';

const Layout = ({ children }) => {

  const {
    alerts
  } = useSelector(
    (state) => ({

      alerts: state.status.alerts
    }),
    shallowEqual
  );


  


  return (
    <div className="d-flex flex-column min-vh-100">
      <Menu />

      <div className="flex-grow-1 bg-light">
        {children}
      </div>
      <Footer />

      <AlertManager alerts={alerts} />

    </div>
  );
}

export default Layout;

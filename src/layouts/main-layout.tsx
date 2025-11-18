import { Outlet } from 'react-router-dom';

import Footer from '@src/components/footer/footer';
import Header from '@src/components/header/header';

const Layout = () => (
  <div className="wrapper">
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;

import { Outlet } from 'react-router-dom';

import Footer from '@/components/footer/footer';
import Header from '@/components/header/header';


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

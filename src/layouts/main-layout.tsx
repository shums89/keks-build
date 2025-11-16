import Footer from '../components/footer/footer';
import Header from '../components/header/header';
import { Outlet } from 'react-router-dom';

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

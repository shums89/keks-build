import type { ReactNode } from 'react';
import Header from '../components/header/header';

type LayoutProps = {
  children: ReactNode;
}

const Layout = ({ children } : LayoutProps) => (
  <div className="wrapper">
    <Header />
    <main>
      {children}
    </main>
  </div>
);

export default Layout;

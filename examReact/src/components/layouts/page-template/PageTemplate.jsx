import { Outlet } from 'react-router-dom';
import Header from '../../header/Header';
import Footer from '../../footer/Footer';

const PageTemplate = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default PageTemplate;

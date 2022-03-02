import Header from './header';

const Layout = ({ children }) => {
  return (
    <main>
      <Header />
      {children}
    </main>
  );
};

export default Layout;

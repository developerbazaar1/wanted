import Footer from "../Footer";
import { Outlet } from "react-router-dom";
import TopNav from "../TopNav";
import NavBar from "../NavComponents/NavBar";

function Layout({ setPriceFilter }: any) {
  return (
    <>
      <div className="blac__background ">
        <TopNav />
      </div>
      <NavBar setPriceFilter={setPriceFilter} />

      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;

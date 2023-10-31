import Footer from "../Footer";
import { Outlet } from "react-router-dom";
import TopNav from "../TopNav";
import NavBar from "../NavComponents/NavBar";

function Layout() {
  return (
    <>
      <div className="blac__background ">
        <TopNav />
      </div>
      <NavBar />

      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;

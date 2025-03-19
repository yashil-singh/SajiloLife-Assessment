import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className="fluid min-h-[calc(100vh-344px)] pt-8 pb-24">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;

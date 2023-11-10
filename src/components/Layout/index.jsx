import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import Discount from "../Discount";

export default function Layout({ children }) {
  return (
    <React.Fragment>
      <div className="w-full overflow-x-hidden">
        <Header />
<<<<<<< HEAD
        <div className="w-full pt-[30px] pb-[60px]">{children}</div>
=======
        <div className="w-full  pt-[30px] pb-[60px]">{children}</div>
>>>>>>> 6b9da2a83a6e91a80c49225029b1f8a4a9415d11
        <Discount/>
        <Footer />
      </div>
    </React.Fragment>
  );
}

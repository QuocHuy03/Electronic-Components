import React from "react";
import Header from "../Header";
import Footer from "../Footer";

export default function Layout({ children }) {
  return (
    <React.Fragment>
      <div className="w-full overflow-x-hidden">
        
        <Header />
        {children}
        <Footer />
      </div>
    </React.Fragment>
  );
}

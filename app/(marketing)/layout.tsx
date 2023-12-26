import React, { ReactNode } from "react";
import NavBar from "./_components/navbar";
import Footer from "./_components/footer";

const MarketingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" h-full bg-slate-100">
      <NavBar />
      <main className=" pb-10 pt-40 bg-slate-100">{children}</main>
      <Footer/>
    </div>
  );
};

export default MarketingLayout;

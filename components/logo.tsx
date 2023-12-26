import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => (
  <div className=" md:flex hidden">
    {/* <Image src={"/public/logo.svg"} alt={"App logo"} fill /> */}
    <Link href={"/"} className=" font-bold text-lg">
      Trimilo
    </Link>
  </div>
);

export default Logo;

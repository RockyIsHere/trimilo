import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className=" fixed bottom-0 w-full border-t bg-slate-100">
      <div className=" md:max-w-screen-2xl mx-auto p-4 flex justify-between items-center w-full">
        <Logo />
        <div className=" space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size={"sm"} variant={"ghost"}>
            <Link href={""}>Privecy Policy</Link>
          </Button>
          <Button size={"sm"} variant={"ghost"}>
            <Link href={""}>Terms & condition</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Footer;

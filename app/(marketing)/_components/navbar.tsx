import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NavBar = () => (
  <div className=" fixed top-0 border-b w-full h-14 px-4 shadow-sm flex items-center">
    <div className=" md:max-w-screen-2xl mx-auto w-full flex items-center justify-between">
      <Logo />
      <div className=" flex gap-2">
        <Button size={"sm"} variant={"outline"}>
          <Link href={"/sign-in"}>Sign in</Link>
        </Button>
        <Button size={"sm"}>
          <Link href={"/sign-up"}>Get trimilo for free</Link>
        </Button>
      </div>
    </div>
  </div>
);

export default NavBar;

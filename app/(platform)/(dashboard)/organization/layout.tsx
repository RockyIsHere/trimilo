import { ReactNode } from "react";
import Sidebar from "../_components/sidebar";
import { auth } from "@clerk/nextjs";
import { startCase } from "lodash";

export async function generateMetadata() {
  const {orgSlug} = auth();
  return {
    title: startCase( orgSlug || 'Organization')
  }
}

export default function OrganizationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <main className=" pt-20 md:pt-24 px-4 max-w-6xl 2xl:max-w-screen-xl mx-auto">
      <div className=" flex gap-x-7">
        <div className=" w-64 shrink-0 hidden md:block">
          <Sidebar />
        </div>
        {children}
      </div>
    </main>
  );
}

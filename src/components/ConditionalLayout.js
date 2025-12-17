"use client";

import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import Footer from "./Footer";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isStandalonePage = pathname === "/me";

  return (
    <>
      {!isStandalonePage && <Navigation />}
      {children}
      {!isStandalonePage && <Footer />}
    </>
  );
}

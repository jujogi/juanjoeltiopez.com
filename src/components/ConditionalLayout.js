"use client";

import { usePathname } from "next/navigation";
import Navigation from "./Navigation";
import Footer from "./Footer";
import FloatingWhatsAppButton from "./FloatingWhatsAppButton";

export default function ConditionalLayout({ children }) {
  const pathname = usePathname();
  const isStandalonePage = pathname === "/me";

  return (
    <>
      {!isStandalonePage && <Navigation />}
      {children}
      {!isStandalonePage && <Footer />}
      {!isStandalonePage && <FloatingWhatsAppButton />}
    </>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Footer } from "./footer";

/**
 * Route-aware site chrome.
 *
 * The admin panel renders its own full-screen shell (and its own <main>), so
 * the public header, footer and main wrapper must not be applied there. This
 * component reads the pathname on the client and skips the chrome for /admin,
 * while the server layout stays a single source for fonts, metadata and schema.
 *
 * Because the admin surface is behind a login gate and is disallowed in
 * robots.txt, hiding the public chrome from crawlers for those routes is
 * correct behaviour, not an SEO regression.
 */
export function RouteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Lompat ke konten utama
      </a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </>
  );
}

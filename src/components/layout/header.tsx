"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Menu, X, ChevronDown, ArrowUpRight } from "lucide-react";
import { navigation } from "@/content/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/logo";

/** Top-level items shown as plain links (house rule: wordmark, a few links, one action). */
const PRIMARY_LABELS = new Set(["Tentang Kami", "Produk", "Solusi", "Riset & Inovasi", "Wawasan"]);

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const isHome = pathname === "/";
  const onDark = isHome && !scrolled;

  // Solid bar once the page has moved past the first screen.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus and release scroll lock on navigation.
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
    setMobileSection(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const closeAll = useCallback(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, []);

  const primary = navigation.filter((n) => PRIMARY_LABELS.has(n.label));
  const secondary = navigation.filter((n) => !PRIMARY_LABELS.has(n.label));

  return (
    <header
      ref={headerRef}
      className={cn(
        "fixed inset-x-0 top-0 z-100 transition-[background-color,color] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
        onDark ? "text-ground" : "bg-ground text-ink"
      )}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className="frame flex h-16 items-center gap-6 md:h-[4.5rem]">
        <Link
          href="/"
          onClick={closeAll}
          aria-label={`${"PT Bio Industri Nusantara"}, beranda`}
          className="shrink-0"
        >
          <Logo className="h-7 w-auto md:h-8" />
        </Link>

        <nav aria-label="Navigasi utama" className="ml-auto hidden items-center gap-1 lg:flex">
          {primary.map((item) => {
            const hasChildren = Boolean(item.children?.length);
            const isOpen = openMenu === item.label;
            const active = pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <div key={item.label} className="relative">
                {hasChildren ? (
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`mega-${item.label}`}
                    onClick={() => setOpenMenu(isOpen ? null : item.label)}
                    onMouseEnter={() => setOpenMenu(item.label)}
                    className={cn(
                      "flex items-center gap-1 px-3 py-2 font-display text-[0.9375rem] font-semibold tracking-[-0.014em] transition-colors duration-200",
                      isOpen || active ? "" : "opacity-90 hover:opacity-100"
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      aria-hidden
                      className={cn(
                        "size-3.5 transition-transform duration-300",
                        isOpen && "rotate-180"
                      )}
                    />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "block px-3 py-2 font-display text-[0.9375rem] font-semibold tracking-[-0.014em] transition-opacity duration-200",
                      active ? "" : "opacity-90 hover:opacity-100"
                    )}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}

          {secondary.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block px-3 py-2 font-display text-[0.9375rem] font-semibold tracking-[-0.014em] opacity-90 transition-opacity duration-200 hover:opacity-100"
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/rfq"
            className={cn(
              "press ml-3 inline-flex items-center gap-2 rounded-[2px] px-5 py-2.5 font-display text-[0.9375rem] font-bold tracking-[-0.014em] transition-colors duration-300",
              onDark ? "bg-ground text-deep hover:bg-fresh hover:text-deep-3" : "bg-deep text-ground hover:bg-accent"
            )}
          >
            Permintaan Penawaran
            <ArrowUpRight aria-hidden className="size-4" />
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
          className="ml-auto lg:hidden"
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* ---------------- Mega menu ---------------- */}
      {primary.map((item) => {
        const isOpen = openMenu === item.label;
        if (!item.children?.length) return null;
        return (
          <div
            key={item.label}
            id={`mega-${item.label}`}
            hidden={!isOpen}
            className={cn(
              "absolute inset-x-0 top-full bg-ground text-ink",
              isOpen ? "block" : "hidden"
            )}
          >
            <div className="frame grid gap-x-10 gap-y-8 py-10 md:grid-cols-12 md:py-14">
              <div className="md:col-span-4">
                <h2 className="font-display text-h3 font-bold">{item.label}</h2>
                <p className="mt-3 max-w-xs text-ink-2">
                  Jelajahi lengkapnya melalui halaman {item.label.toLowerCase()}.
                </p>
                <Link
                  href={item.href}
                  onClick={closeAll}
                  className="link-arrow press mt-5"
                >
                  Lihat semua <ArrowUpRight aria-hidden className="size-4" />
                </Link>
              </div>
              <ul className="grid gap-1 md:col-span-8 md:grid-cols-2">
                {item.children.map((child) => (
                  <li key={child.href}>
                    <Link
                      href={child.href}
                      onClick={closeAll}
                      className="group block rounded-[2px] p-4 transition-colors duration-300 hover:bg-ground-2"
                    >
                      <span className="flex items-center gap-1.5 font-display text-[1.0625rem] font-bold tracking-[-0.018em]">
                        {child.label}
                        <ArrowUpRight
                          aria-hidden
                          className="size-4 shrink-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        />
                      </span>
                      {child.description && (
                        <span className="mt-1 block text-[0.9375rem] leading-snug text-ink-2">
                          {child.description}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}

      {/* ---------------- Mobile navigation ---------------- */}
      <div
        id="mobile-nav"
        hidden={!mobileOpen}
        className={cn(
          "fixed inset-x-0 top-16 bottom-0 z-99 overflow-y-auto bg-ground text-ink lg:hidden",
          mobileOpen ? "block" : "hidden"
        )}
      >
        <nav aria-label="Navigasi seluler" className="frame py-8">
          <ul>
            {navigation.map((item) => {
              const expanded = mobileSection === item.label;
              const children = item.children;
              return (
                <li key={item.label} className="[&:not(:last-child)]:mb-1">
                  {children ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={expanded}
                        onClick={() => setMobileSection(expanded ? null : item.label)}
                        className="flex w-full items-center justify-between py-5 text-left font-display text-[1.375rem] font-bold tracking-[-0.025em]"
                      >
                        {item.label}
                        <ChevronDown
                          aria-hidden
                          className={cn(
                            "size-5 shrink-0 text-accent transition-transform duration-300",
                            expanded && "rotate-180"
                          )}
                        />
                      </button>
                      {expanded && (
                        <ul className="pb-5">
                          {children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={closeAll}
                                className="block py-2.5 pl-4 text-[1.0625rem] text-ink-2"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={closeAll}
                      className="block py-5 font-display text-[1.375rem] font-bold tracking-[-0.025em]"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-col gap-3">
            <Link href="/rfq" onClick={closeAll} className="btn btn-primary w-full">
              Permintaan Penawaran
            </Link>
            <Link href="/contact" onClick={closeAll} className="btn btn-secondary w-full">
              Hubungi Kami
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

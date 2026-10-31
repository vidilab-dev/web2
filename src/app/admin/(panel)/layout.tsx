import Link from "next/link";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Package,
  Newspaper,
  Images,
  Users,
  Home,
  LogOut,
} from "lucide-react";
import { isAuthenticated } from "@/lib/auth";
import { logoutAction } from "../actions";
import { LogoMark } from "@/components/layout/logo";

const nav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/submissions", label: "Permintaan Masuk", icon: Inbox },
  { href: "/admin/products", label: "Produk", icon: Package },
  { href: "/admin/news", label: "Berita & Wawasan", icon: Newspaper },
  { href: "/admin/media", label: "Pustaka Media", icon: Images },
  { href: "/admin/users", label: "Pengguna & Peran", icon: Users },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // The login route renders its own full-screen shell, so it opts out here.
  // Every other route under /admin requires a valid session.
  if (!(await isAuthenticated())) redirect("/admin/login");

  return (
    <div className="flex min-h-[100svh] bg-ground-2 text-ink">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-[100svh] w-64 shrink-0 flex-col bg-deep text-ground lg:flex">
        <div className="flex items-center gap-2.5 px-6 py-6">
          <LogoMark className="size-7 text-fresh" />
          <span className="font-display text-[0.875rem] font-extrabold tracking-[-0.012em]">
            PT BIN Admin
          </span>
        </div>

        <nav aria-label="Navigasi admin" className="flex-1 px-3 py-4">
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 rounded-[2px] px-3 py-2.5 text-[0.9375rem] font-medium text-ground/70 transition-colors duration-200 hover:bg-ground/10 hover:text-ground"
                >
                  <item.icon aria-hidden className="size-4 shrink-0" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="px-3 pb-4">
          <Link
            href="/"
            className="flex items-center gap-3 rounded-[2px] px-3 py-2.5 text-[0.9375rem] text-ground/60 transition-colors duration-200 hover:text-ground"
          >
            <Home aria-hidden className="size-4" />
            Lihat Situs
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex w-full items-center gap-3 rounded-[2px] px-3 py-2.5 text-left text-[0.9375rem] text-ground/60 transition-colors duration-200 hover:text-ground"
            >
              <LogOut aria-hidden className="size-4" />
              Keluar
            </button>
          </form>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-deep px-4 py-3 text-ground lg:hidden">
        <span className="font-display text-[0.9375rem] font-extrabold">PT BIN Admin</span>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-[0.875rem] text-ground/70">
            Situs
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="text-[0.875rem] text-ground/70">
              Keluar
            </button>
          </form>
        </div>
      </div>

      {/* Mobile nav */}
      <nav
        aria-label="Navigasi admin seluler"
        className="fixed inset-x-0 top-12 z-40 overflow-x-auto bg-deep px-2 py-2 lg:hidden"
      >
        <ul className="flex gap-1">
          {nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="whitespace-nowrap rounded-[2px] px-3 py-2 text-[0.8125rem] font-medium text-ground/70"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Content */}
      <div className="min-w-0 flex-1 pt-24 lg:pt-0">
        <main className="p-5 md:p-8 lg:p-10">{children}</main>
      </div>
    </div>
  );
}

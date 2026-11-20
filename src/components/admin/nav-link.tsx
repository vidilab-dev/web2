"use client";

import Link, { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

function LinkContent({ children }: { children: React.ReactNode }) {
  const { pending } = useLinkStatus();
  return (
    <>
      <span className="flex min-w-0 items-center gap-3">{children}</span>
      {pending && <LoaderCircle aria-hidden className="ml-auto size-4 shrink-0 animate-spin motion-reduce:animate-none" />}
      {pending && <span role="status" className="sr-only">Memuat halaman…</span>}
    </>
  );
}

/** Keep the shell interactive and acknowledge navigation before data arrives. */
export function AdminNavLink({ href, className, children }: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const active = href === "/admin" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn("flex items-center gap-2", className, active && "bg-ground/10 text-ground")}
    >
      <LinkContent>{children}</LinkContent>
    </Link>
  );
}

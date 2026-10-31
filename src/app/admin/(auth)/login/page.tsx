import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { LogoMark } from "@/components/layout/logo";
import { LoginForm } from "./login-form";

export const metadata = {
  title: "Masuk | Panel Admin PT BIN",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await isAuthenticated()) redirect("/admin");

  return (
    <main className="flex min-h-[100svh] items-center justify-center bg-deep px-6 py-16">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-3 text-ground">
          <LogoMark className="size-9 text-fresh" />
          <div className="flex flex-col leading-none">
            <span className="font-display text-[1rem] font-extrabold tracking-[-0.012em]">
              PT BIO INDUSTRI
            </span>
            <span className="mt-1 text-[0.5625rem] font-semibold tracking-[0.24em] text-fresh">
              NUSANTARA
            </span>
          </div>
        </div>

        <h1 className="mt-10 text-[clamp(1.75rem,4vw,2.5rem)] leading-[0.98] text-ground">
          Panel Admin
        </h1>
        <p className="mt-4 text-[0.9375rem] leading-relaxed text-ground/70">
          Masuk untuk mengelola produk, berita, dan permintaan masuk.
        </p>

        {/* Light card so the form controls sit on their intended ground. */}
        <div className="mt-9 bg-ground p-7 md:p-8">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}

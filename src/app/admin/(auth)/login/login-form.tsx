"use client";

import { useActionState } from "react";
import { Loader2, Lock } from "lucide-react";
import { loginAction } from "../../actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, { error: null as string | null });

  return (
    <form action={formAction} className="flex flex-col gap-6">
      {state?.error && (
        <div role="alert" className="bg-earth/12 p-5 text-[0.9375rem] text-ink">
          {state.error}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="font-display text-[0.9375rem] font-bold">
          Kata Sandi Admin
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-[2px] bg-paper px-4 py-3.5 text-[1rem] text-ink ring-1 ring-ink/15 outline-none transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-accent"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        aria-busy={pending}
        className="btn btn-primary press inline-flex items-center justify-center disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? <Loader2 aria-hidden className="size-4 animate-spin" /> : <Lock aria-hidden className="size-4" />}
        {pending ? "Memverifikasi…" : "Masuk"}
      </button>

      <p className="text-[0.8125rem] leading-relaxed text-ink-2">
        Panel ini menggunakan gerbang demo untuk evaluasi. Sebelum digunakan
        produksi, ganti dengan penyedia autentikasi resmi dan simpan hash kata
        sandi di database.
      </p>
    </form>
  );
}

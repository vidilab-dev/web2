export default function AdminLoading() {
  return (
    <div role="status" aria-live="polite" aria-busy="true" className="space-y-8">
      <p className="text-[0.9375rem] font-semibold text-ink-2">Memuat halaman admin…</p>
      <div aria-hidden="true" className="space-y-8 motion-safe:animate-pulse">
        <div className="space-y-3">
          <div className="h-9 w-56 max-w-full rounded-[2px] bg-ground-3" />
          <div className="h-4 w-80 max-w-full rounded-[2px] bg-ground-3" />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((item) => <div key={item} className="h-32 rounded-[2px] bg-ground" />)}
        </div>
        <div className="space-y-5 bg-ground p-6 md:p-8">
          {[0, 1, 2, 3].map((item) => <div key={item} className="h-10 rounded-[2px] bg-ground-2" />)}
        </div>
      </div>
    </div>
  );
}

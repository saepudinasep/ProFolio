export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-line bg-paper-raised p-5">
      <p className="font-display text-2xl font-semibold tracking-tight">
        {value}
      </p>
      <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
        {label}
      </p>
    </div>
  );
}

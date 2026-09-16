/**
 * Route-level loading state. Pages render on demand (CSP nonce), so this
 * shows instantly on navigation while the next page streams in.
 */
export default function Loading() {
  return (
    <main className="min-h-[100svh] bg-ink pt-[72px]">
      <div className="fixed inset-x-0 top-0 z-[60] h-px overflow-hidden">
        <div className="h-full w-1/3 animate-[loadbar_1.1s_ease-in-out_infinite] bg-accent" />
      </div>
    </main>
  );
}

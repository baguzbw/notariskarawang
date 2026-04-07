export default function Loading() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-dongker h-16 sticky top-0 z-50" />

      <section className="bg-dongker py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-3 w-32 bg-dongker-light/50 rounded mb-3 animate-pulse" />
          <div className="h-10 w-48 bg-dongker-light/50 rounded mb-4 animate-pulse" />
          <div className="w-16 h-0.5 bg-gold/40" />
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Sidebar skeleton */}
            <div className="lg:col-span-1 animate-pulse">
              <div className="w-full aspect-[3/4] bg-cream-dark mb-6 border border-cream-dark" />
              <div className="h-6 w-48 bg-cream-dark rounded mb-2" />
              <div className="h-4 w-36 bg-gold/30 rounded mb-4" />
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-3 bg-cream-dark rounded" style={{ width: `${70 + i * 5}%` }} />
                ))}
              </div>
            </div>

            {/* Content skeleton */}
            <div className="lg:col-span-2 space-y-10 animate-pulse">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-5 h-5 bg-gold/30 rounded" />
                  <div className="h-6 w-40 bg-cream-dark rounded" />
                </div>
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-3 bg-cream-dark rounded" style={{ width: `${95 - i * 10}%` }} />
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-5 h-5 bg-gold/30 rounded" />
                  <div className="h-6 w-52 bg-cream-dark rounded" />
                </div>
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold/40 mt-2 shrink-0" />
                      <div className="h-3 bg-cream-dark rounded flex-1" style={{ width: `${80 + (i % 3) * 7}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-dongker h-16 sticky top-0 z-50" />

      <section className="bg-dongker py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-3 w-28 bg-dongker-light/50 rounded mb-3 animate-pulse" />
          <div className="h-10 w-40 bg-dongker-light/50 rounded mb-4 animate-pulse" />
          <div className="w-16 h-0.5 bg-gold/40" />
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            {/* Left skeleton */}
            <div className="space-y-8 animate-pulse">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-5 h-5 bg-gold/30 rounded" />
                  <div className="h-6 w-40 bg-cream-dark rounded" />
                </div>
                <div className="space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-3 bg-cream-dark rounded" style={{ width: `${90 - i * 10}%` }} />
                  ))}
                </div>
              </div>

              <div>
                <div className="h-6 w-40 bg-cream-dark rounded mb-4" />
                <div className="space-y-4">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-gold/30 rounded mt-0.5 shrink-0" />
                      <div className="space-y-1 flex-1">
                        <div className="h-3 w-20 bg-cream-dark rounded" />
                        <div className="h-3 bg-cream-dark rounded" style={{ width: `${70 + i * 5}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Map skeleton */}
            <div className="animate-pulse">
              <div className="h-6 w-36 bg-cream-dark rounded mb-4" />
              <div className="w-full aspect-video bg-cream-dark border border-cream-dark" />
              <div className="h-3 w-3/4 bg-cream-dark rounded mt-2" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

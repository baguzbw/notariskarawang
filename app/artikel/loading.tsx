export default function Loading() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Navbar placeholder */}
      <div className="bg-dongker h-16 sticky top-0 z-50" />

      {/* Hero skeleton */}
      <section className="bg-dongker py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-3 w-24 bg-dongker-light/50 rounded mb-3 animate-pulse" />
          <div className="h-10 w-64 bg-dongker-light/50 rounded mb-4 animate-pulse" />
          <div className="w-16 h-0.5 bg-gold/40" />
        </div>
      </section>

      {/* Content skeleton */}
      <section className="bg-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured article skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-2 border border-cream-dark mb-12 animate-pulse">
            <div className="min-h-72 bg-cream-dark" />
            <div className="bg-cream-light p-8 lg:p-12 flex flex-col justify-center gap-4">
              <div className="h-3 w-20 bg-cream-dark rounded" />
              <div className="h-7 w-full bg-cream-dark rounded" />
              <div className="h-7 w-3/4 bg-cream-dark rounded" />
              <div className="w-10 h-0.5 bg-gold/30" />
              <div className="h-4 w-32 bg-cream-dark rounded" />
            </div>
          </div>

          {/* Section divider */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-3 w-28 bg-cream-dark rounded animate-pulse" />
            <div className="h-px bg-cream-dark flex-1" />
          </div>

          {/* Card grid skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-cream-light border border-cream-dark overflow-hidden animate-pulse"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="aspect-video bg-cream-dark" />
                <div className="p-5 space-y-3">
                  <div className="h-3 w-24 bg-cream-dark rounded" />
                  <div className="h-4 w-full bg-cream-dark rounded" />
                  <div className="h-4 w-4/5 bg-cream-dark rounded" />
                  <div className="h-4 w-2/3 bg-cream-dark rounded" />
                  <div className="h-3 w-12 bg-gold/30 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

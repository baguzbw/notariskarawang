export default function Loading() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-dongker h-16 sticky top-0 z-50" />

      <section className="bg-dongker py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
          <div className="h-8 w-3/4 bg-dongker-light/50 rounded mb-4" />
          <div className="h-8 w-1/2 bg-dongker-light/50 rounded mb-4" />
          <div className="w-16 h-0.5 bg-gold/40 mb-4" />
          <div className="h-3 w-28 bg-dongker-light/40 rounded" />
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 animate-pulse">
              <div className="w-full h-64 bg-cream-dark mb-8" />
              <div className="space-y-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <div className="h-3 bg-cream-dark rounded w-full" />
                    <div className="h-3 bg-cream-dark rounded" style={{ width: `${85 + (i % 3) * 5}%` }} />
                    {i % 3 === 0 && <div className="h-3 bg-cream-dark rounded w-3/4" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-cream-light border border-cream-dark p-6 animate-pulse">
                <div className="h-5 w-36 bg-cream-dark rounded mb-3" />
                <div className="w-8 h-0.5 bg-gold/30 mb-4" />
                <div className="space-y-2 mb-4">
                  <div className="h-3 bg-cream-dark rounded w-full" />
                  <div className="h-3 bg-cream-dark rounded w-4/5" />
                </div>
                <div className="h-4 w-28 bg-cream-dark rounded mb-1" />
                <div className="h-3 w-24 bg-cream-dark rounded mb-4" />
                <div className="h-10 bg-cream-dark rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-cream">
      <div className="bg-dongker h-16 sticky top-0 z-50" />

      <section className="bg-dongker py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-3 w-48 bg-dongker-light/50 rounded mb-3 animate-pulse" />
          <div className="h-10 w-52 bg-dongker-light/50 rounded mb-4 animate-pulse" />
          <div className="w-16 h-0.5 bg-gold/40" />
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-cream-dark hidden sm:block" />
            <div className="space-y-8">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex gap-6 relative animate-pulse"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="w-16 h-16 bg-cream-dark shrink-0 relative z-10" />
                  <div className="flex-1 bg-cream-light border border-cream-dark p-6">
                    <div className="h-5 w-48 bg-cream-dark rounded mb-3" />
                    <div className="h-3 w-full bg-cream-dark rounded mb-2" />
                    <div className="h-3 w-4/5 bg-cream-dark rounded mb-2" />
                    <div className="h-3 w-3/5 bg-cream-dark rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

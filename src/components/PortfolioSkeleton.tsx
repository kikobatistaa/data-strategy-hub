import { Skeleton } from "@/components/ui/skeleton";

const PortfolioSkeleton = () => {
  return (
    <div className="min-h-screen bg-zinc-950 animate-fade-in">
      {/* Hero Skeleton */}
      <section className="min-h-screen flex items-center justify-center px-4 md:px-8">
        <div className="max-w-6xl w-full text-center space-y-8">
          <Skeleton className="h-20 md:h-32 w-3/4 mx-auto bg-zinc-900/50" />
          <Skeleton className="h-8 w-2/3 mx-auto bg-zinc-900/50" />
          <Skeleton className="h-6 w-1/2 mx-auto bg-zinc-900/50" />
          <div className="flex gap-4 justify-center pt-8">
            <Skeleton className="h-12 w-40 bg-zinc-900/50" />
            <Skeleton className="h-12 w-40 bg-zinc-900/50" />
          </div>
        </div>
      </section>

      {/* Experience Section Skeleton */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-12 w-64 mx-auto mb-16 bg-zinc-900/50" />
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-md space-y-4"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-6 w-48 bg-zinc-800/50" />
                    <Skeleton className="h-5 w-64 bg-zinc-800/50" />
                  </div>
                  <Skeleton className="h-5 w-32 bg-zinc-800/50" />
                </div>
                <Skeleton className="h-20 w-full bg-zinc-800/50" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20 bg-zinc-800/50" />
                  <Skeleton className="h-6 w-24 bg-zinc-800/50" />
                  <Skeleton className="h-6 w-28 bg-zinc-800/50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section Skeleton */}
      <section className="py-24 px-4 md:px-8 bg-zinc-900/20">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-12 w-64 mx-auto mb-16 bg-zinc-900/50" />
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div 
                key={i} 
                className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-md space-y-4"
              >
                <Skeleton className="h-6 w-full bg-zinc-800/50" />
                <Skeleton className="h-5 w-3/4 bg-zinc-800/50" />
                <Skeleton className="h-5 w-32 bg-zinc-800/50" />
                <Skeleton className="h-16 w-full bg-zinc-800/50" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section Skeleton */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-12 w-64 mx-auto mb-16 bg-zinc-900/50" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-md space-y-2">
                <Skeleton className="h-12 w-12 mx-auto bg-zinc-800/50" />
                <Skeleton className="h-5 w-24 mx-auto bg-zinc-800/50" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section Skeleton */}
      <section className="py-24 px-4 md:px-8 bg-zinc-900/20">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-12 w-64 mx-auto mb-16 bg-zinc-900/50" />
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div 
                key={i} 
                className="p-6 rounded-xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-md space-y-4"
              >
                <Skeleton className="h-6 w-full bg-zinc-800/50" />
                <Skeleton className="h-20 w-full bg-zinc-800/50" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-20 bg-zinc-800/50" />
                  <Skeleton className="h-6 w-20 bg-zinc-800/50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section Skeleton */}
      <section className="py-24 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Skeleton className="h-12 w-64 mx-auto bg-zinc-900/50" />
          <div className="space-y-4">
            <Skeleton className="h-6 w-full bg-zinc-900/50" />
            <Skeleton className="h-6 w-5/6 mx-auto bg-zinc-900/50" />
            <Skeleton className="h-6 w-4/5 mx-auto bg-zinc-900/50" />
          </div>
        </div>
      </section>

      {/* Footer Skeleton */}
      <footer className="py-8 px-4 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Skeleton className="h-5 w-48 bg-zinc-900/50" />
          <div className="flex gap-4">
            <Skeleton className="h-8 w-8 rounded-full bg-zinc-900/50" />
            <Skeleton className="h-8 w-8 rounded-full bg-zinc-900/50" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioSkeleton;

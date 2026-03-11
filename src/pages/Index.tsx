import { lazy, Suspense } from "react";
import Hero from "@/components/Hero";
import MobileMenu from "@/components/MobileMenu";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load below-the-fold components for better initial load performance
const Experience = lazy(() => import("@/components/Experience"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const Education = lazy(() => import("@/components/Education"));
const Skills = lazy(() => import("@/components/Skills"));
const Projects = lazy(() => import("@/components/Projects"));
const About = lazy(() => import("@/components/About"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));
const JobOpportunityDrawer = lazy(() => import("@/components/JobOpportunityDrawer"));

// Lightweight section skeleton for lazy-loaded components
const SectionSkeleton = () => (
  <div className="py-24 px-6">
    <div className="max-w-4xl mx-auto space-y-6">
      <Skeleton className="h-10 w-64 mx-auto" />
      <Skeleton className="h-6 w-96 mx-auto" />
      <div className="grid gap-6 mt-12">
        <Skeleton className="h-48 w-full rounded-xl" />
        <Skeleton className="h-48 w-full rounded-xl" />
      </div>
    </div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen animate-fade-in">
      <ScrollProgressBar />
      <MobileMenu />
      <Hero />
      <Suspense fallback={<SectionSkeleton />}>
        <Experience />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Education />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Skills />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Projects />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <About />
      </Suspense>
      <Suspense fallback={<SectionSkeleton />}>
        <Contact />
      </Suspense>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <ScrollToTopButton />
      <Suspense fallback={null}>
        <JobOpportunityDrawer />
      </Suspense>
    </div>
  );
};

export default Index;

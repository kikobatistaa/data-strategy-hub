import { lazy, Suspense, useState, useCallback } from "react";
import Hero from "@/components/Hero";
import MobileMenu from "@/components/MobileMenu";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import Preloader from "@/components/Preloader";
import { Skeleton } from "@/components/ui/skeleton";

const Experience = lazy(() => import("@/components/Experience"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const Education = lazy(() => import("@/components/Education"));
const Skills = lazy(() => import("@/components/Skills"));
const Projects = lazy(() => import("@/components/Projects"));
const About = lazy(() => import("@/components/About"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));
const JobOpportunityDrawer = lazy(() => import("@/components/JobOpportunityDrawer"));
const Marquee = lazy(() => import("@/components/Marquee"));
const AnimatedCounter = lazy(() => import("@/components/AnimatedCounter"));

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
  const [preloaderDone, setPreloaderDone] = useState(false);

  const handlePreloaderComplete = useCallback(() => {
    setPreloaderDone(true);
  }, []);

  return (
    <>
      <Preloader onComplete={handlePreloaderComplete} />
      <div className={`min-h-screen ${preloaderDone ? "animate-fade-in" : ""}`}>
        <ScrollProgressBar />
        <MobileMenu />
        <Hero preloaderDone={preloaderDone} />
        <Suspense fallback={null}>
          <AnimatedCounter />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Experience />
        </Suspense>
        <Suspense fallback={null}>
          <Marquee />
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
        <Suspense fallback={null}>
          <Marquee />
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
    </>
  );
};

export default Index;

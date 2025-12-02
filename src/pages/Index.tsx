import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import MobileMenu from "@/components/MobileMenu";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import JobOpportunityDrawer from "@/components/JobOpportunityDrawer";
import PortfolioSkeleton from "@/components/PortfolioSkeleton";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial content loading (fonts, images, etc.)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <PortfolioSkeleton />;
  }

  return (
    <div className="min-h-screen animate-fade-in">
      <ScrollProgressBar />
      <MobileMenu />
      <Hero />
      <Experience />
      <Education />
      <Skills />
      <Projects />
      <About />
      <Contact />
      <Footer />
      <ScrollToTopButton />
      <JobOpportunityDrawer />
    </div>
  );
};

export default Index;

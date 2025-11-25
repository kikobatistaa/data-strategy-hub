import Hero from "@/components/Hero";
// Removed: import Navigation from "@/components/Navigation";
import MobileMenu from "@/components/MobileMenu";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import JobOpportunityDrawer from "@/components/JobOpportunityDrawer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <MobileMenu />
      {/* Navigation bar removed as requested */}
      <Hero />
      <Experience />
      <Education />
      <Skills />
      <Projects />
      <About />
      <Footer />
      <ScrollToTopButton />
      <JobOpportunityDrawer />
    </div>
  );
};

export default Index;
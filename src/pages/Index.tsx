import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import MobileMenu from "@/components/MobileMenu";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/ScrollToTopButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <MobileMenu />
      <Navigation />
      <Hero />
      <Experience />
      <Education />
      <Skills />
      <Projects />
      <About />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Index;
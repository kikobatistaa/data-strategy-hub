import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Footer from "@/components/Footer";
import DevelopmentBanner from "@/components/DevelopmentBanner";

const Index = () => {
  return (
    <div className="min-h-screen">
      <DevelopmentBanner /> {/* Render the banner at the top */}
      <Navigation />
      <Hero />
      <Experience />
      <Education />
      <Projects />
      <About />
      <Footer />
    </div>
  );
};

export default Index;
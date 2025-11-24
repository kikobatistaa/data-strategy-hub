import Hero from "@/components/Hero";
import Navigation from "@/components/Navigation";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Footer from "@/components/Footer";
import DevelopmentBanner from "@/components/DevelopmentBanner";
import ParticleBackground from "@/components/ParticleBackground";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <ParticleBackground />
      <div className="relative z-10">
        <DevelopmentBanner /> {/* Render the banner at the top */}
        <Navigation />
        <Hero />
      <Experience />
      <Education />
      <Skills />
      <Projects />
      <About />
      <Footer />
      </div>
    </div>
  );
};

export default Index;
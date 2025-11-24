import Warning from "@/components/Warning";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Warning />
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

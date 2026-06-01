import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Statistics from "@/components/Statistics";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackgroundOrbs from "@/components/BackgroundOrbs";
import PageWrapper from "@/components/PageWrapper";
import Blog from '@/components/Blog';

export default function Home() {
  return (
    <>
      {/* Premium SaaS Background with layered depth effects */}
      <BackgroundOrbs className="fixed top-0 left-0 w-full h-full pointer-events-none" />
      
      <Navbar />
      <PageWrapper>
        <main className="text-white min-h-screen relative z-10">
          <Hero />
          <Statistics />
          <Skills />
          <Projects />
          <Blog />
          <Contact />
        </main>
      </PageWrapper>
      <Footer />
    </>
  );
}
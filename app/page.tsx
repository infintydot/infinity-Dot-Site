import Loader from "@/components/animations/Loader";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import TechStack from "@/components/sections/TechStack";
import Process from "@/components/sections/Process";
import Portfolio from "@/components/sections/Portfolio";
import SocialProof from "@/components/sections/SocialProof";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    // STRICT FIX: No flex, no overflow-hidden here. Just a clean block wrapper.
    <main className="relative w-full bg-[#070707]">
      <Loader />

      {/* 01. HERO SECTION */}
      <Hero />

      {/* 02. ABOUT / COMPANY */}
      <About />

      {/* 03. SERVICES BENTO GRID */}
      <Services />

      {/* 04. TECHNOLOGIES ORBIT */}
      <TechStack />

      {/* 05. DEVELOPMENT PROCESS TIMELINE */}
      <Process />

      {/* 06. PORTFOLIO TEASER */}
      <Portfolio />

      {/* 07. TESTIMONIALS / STATS */}
      {/* <SocialProof /> */}

      {/* 08. CONTACT CTA */}
      <Contact />
    </main>
  );
}
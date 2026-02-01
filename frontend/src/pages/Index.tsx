import Hero from "@/components/Hero";
import WhatItIs from "@/components/WhatItIs";
import Problem from "@/components/Problem";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <WhatItIs />
      <Problem />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;

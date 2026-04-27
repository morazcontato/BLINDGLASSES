import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { ValueProps, Features } from "@/components/Benefits";
import ProductGrid from "@/components/ProductGrid";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ValueProps />
        <ProductGrid />
        <Features />
        <Testimonials />
        <About />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

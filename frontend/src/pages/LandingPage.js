import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-lightBG dark:bg-darkBG text-gray-900 dark:text-gray-100">
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}

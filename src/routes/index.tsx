import { createFileRoute } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FeaturesSection } from "@/components/FeaturesSection";
import { ScreenshotsSection } from "@/components/ScreenshotsSection";
import { PricingSection } from "@/components/PricingSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    < <Header /> 
      <div className="min-h-screen w-full ">
       
        <main
          className="mx-auto max-w-330 rounded-[24px] overflow-hidden relative"
          style={{
            background: "linear-gradient(180deg, var(--surface), var(--surface-2))",
            border: "1px solid var(--border)",
            boxShadow: "var(--shadow-pop)",
          }}
        >
          <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />
          <div className="relative">            
            <Hero />
            <FeaturesSection />
            <ScreenshotsSection />
            <PricingSection />
            <ServicesSection />
            <ContactSection />
            <Footer />
          </div>
        </main>
      </div>     
    </ThemeProvider>
  );
}

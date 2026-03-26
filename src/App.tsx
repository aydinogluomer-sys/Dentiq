/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SmoothScrollProvider } from "./components/providers/SmoothScrollProvider";
import { StickyHeader } from "./components/layout/StickyHeader";
import { Footer } from "./components/layout/Footer";
import { FloatingCTA } from "./components/sections/FloatingCTA";
import { HeroSection } from "./components/sections/HeroSection";
import { TrustStrip } from "./components/sections/TrustStrip";
import { AboutSection } from "./components/sections/AboutSection";
import { ServicesSection } from "./components/sections/ServicesSection";
import { TeamSection } from "./components/sections/TeamSection";
import { ReviewsSection } from "./components/sections/ReviewsSection";
import { AppointmentSection } from "./components/sections/AppointmentSection";
import { ContactSection } from "./components/sections/ContactSection";

export default function App() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-[#14151d] text-white font-body transition-colors duration-300">
        <StickyHeader />
        <main>
          <HeroSection />
          <TrustStrip />
          <AboutSection />
          <ServicesSection />
          <TeamSection />
          <ReviewsSection />
          <AppointmentSection />
          <ContactSection />
        </main>
        <Footer />
        <FloatingCTA />
      </div>
    </SmoothScrollProvider>
  );
}

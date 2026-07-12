import HeroSection from "@/components/sections/HeroSection";
import InsightFlow from "@/components/sections/InsightFlow";
import DashboardPreview from "@/components/sections/DashboardPreview";
import SignatureInteraction from "@/components/sections/SignatureInteraction";
import AutomationOutcome from "@/components/sections/AutomationOutcome";
import SiteFooter from "@/components/sections/SiteFooter";


export default function Home() {
  return (
    <main>
      <nav className="navbar">
        <a href="#hero" className="brand" aria-label="X ~ AI home">
          <span className="brandMark">X</span>
          <span>X ~ AI</span>
        </a>

        <div className="navLinks">
          <a href="#flow">How it works</a>
          <a href="#workspace">Workspace</a>
          <a href="#intelligence">Intelligence</a>
        </div>

        <a href="#workspace" className="navButton">
          Explore workspace
        </a>
      </nav>

      <HeroSection />
      <InsightFlow />
      <DashboardPreview />
      <SignatureInteraction />
      <AutomationOutcome />
      <SiteFooter />
      
    </main>
  );
}
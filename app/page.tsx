import HomeClient from "./HomeClient";
import Hero from "./components/Hero/Hero";
import ProjectsSection from "./components/Projects/ProjectsSection";
import AboutSection from "./components/About/AboutSection";
import ContactSection from "./components/Contact/ContactSection";

export default function Home() {
  return (
    <main>
      <HomeClient />
      <Hero />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}

import HomeClient from "./HomeClient";
import Hero from "./components/Hero/Hero";
import ProjectsSection from "./components/Projects/ProjectsSection";
import AboutSection from "./components/About/AboutSection";
export default function Home() {
  return (
    <main>
      <HomeClient />
      <Hero />
      <ProjectsSection />
      <AboutSection />
    </main>
  );
}

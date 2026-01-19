import HomeClient from "./HomeClient";
import Hero from "./components/Hero/Hero";
import ProjectsSection from "./components/Projects/ProjectsSection";
export default function Home() {
  return (
    <main>
      <HomeClient />
      <Hero />
      <ProjectsSection />
    </main>
  );
}

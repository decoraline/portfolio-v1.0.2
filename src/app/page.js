import UnicornWrapper from "./components/UnicornWrapper";
import { ProjectsSection } from "./components/ProjectsSection";
import { ContactSection } from "./components/ContactSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <UnicornWrapper />
      <main>
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}

import Image from "next/image";
import styles from "./page.module.css";
import UnicornWrapper from "./components/UnicornWrapper";
import ProjectCards from "./components/ProjectCards";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className={styles.page}>
      <UnicornWrapper />
      <main className={styles.main}>
        <div id="projects">
          <ProjectCards />
        </div>
      </main>
      <footer className="w-full">
        <div id="footer">
          <Footer />
        </div>
      </footer>
    </div>
  );
}

import Image from "next/image";
import styles from "./page.module.css";
import UnicornWrapper from "./components/UnicornWrapper";
import ProjectCards from "./components/ProjectCards";

export default function Home() {
  return (
    <div className={styles.page}>
      <UnicornWrapper />
      <main className={styles.main}>
        <div id="projects">
          <ProjectCards />
        </div>
      </main>
    </div>
  );
}

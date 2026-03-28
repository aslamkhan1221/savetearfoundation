import HeroSlider from "@/components/HeroSlider/HeroSlider";
import Initiative from "@/components/Initiative/Initiative";
import CtaBanner from "@/components/CtaBanner/CtaBanner";
import ProgramsOverview from "@/components/ProgramsOverview/ProgramsOverview";
import { getSlides, seedInitialSlides, getCases } from "@/lib/actions";
import styles from "./page.module.css";
import Link from "next/link";

export default async function Home() {
  await seedInitialSlides();
  const slides = await getSlides();
  const medicalCases = await getCases("medical");
  const educationCases = await getCases("education");

  return (
    <main className={styles.main}>
      <HeroSlider initialSlides={slides} />

      {/* Medical Cases Section */}
      <section className="container" style={{ marginTop: "40px" }}>
        <div className="section-header">
          <h2>Medical Cases</h2>
          <div className="wave-underline"></div>
        </div>

        <div className={styles.grid}>
          {/* Static Cases */}



          {/* Dynamic Cases */}
          {medicalCases.map((c) => (
            <Link key={c.id} href={`/cases/${c.slug}`} className={styles.caseImageLink}>
              <img src={c.image_url} alt="Medical Case" className={styles.caseImage} />
            </Link>
          ))}
        </div>
      </section>

      {/* Success Stories Section - Keeping static as per request to keep current cases same if not mentioned otherwise, but user said "keep current cases data same" likely meaning don't delete them, but I will make medical/education dynamic */}
      <section className={styles.graySection}>
        <div className="container">
          <div className="section-header">
            <h2>Success Stories</h2>
            <div className="wave-underline"></div>
          </div>
          <div className={styles.grid}>
            <img src="/images/ganesh-pote-success-case.jpg" alt="" />
            <img src="/images/viraj-kale-success-case.jpg" alt="" />
            <img src="/images/baby-of-ashwini-success-case.jpg" alt="" />
            <img src="/images/vansh-patole-success-case.jpg" alt="" />
            <img src="/images/mahesh-tejam-success-case.jpg" alt="" />
            <img src="/images/baby-of-deepali-success-case.jpg" alt="" />
          </div>
          <div className={styles.viewMore}>
            <button className={`${styles.viewAllBtn} btn`}>VIEW ALL</button>
          </div>
        </div>
      </section>

      {/* Educational Cases Section */}
      <section className="container">
        <div className="section-header">
          <h2>Educational Cases</h2>
          <div className="wave-underline"></div>
        </div>
        <div className={styles.grid}>
          {/* Static Cases */}
          {/* <img src="/images/priya-sharma-education-cases.jpg" alt="" />
          <img src="/images/srushti-gogri-education-cases.jpg" alt="" />
          <img src="/images/lishant-jaikumar-education-cases.jpg" alt="" /> */}

          {/* Dynamic Cases */}
          {educationCases.map((c) => (
            <Link key={c.id} href={`/cases/${c.slug}`} className={styles.caseImageLink}>
              <img src={c.image_url} alt="Education Case" className={styles.caseImage} />
            </Link>
          ))}
        </div>
        <div className={styles.viewMore}>
          <button className={`${styles.viewAllBtn} btn`}>VIEW ALL</button>
        </div>
      </section>

      <Initiative />
      <CtaBanner />
      <ProgramsOverview />
    </main>
  );
}

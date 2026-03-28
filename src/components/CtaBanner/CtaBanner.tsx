import styles from "./CtaBanner.module.css";

export default function CtaBanner() {
    return (
        <section className={styles.bannerSection}>
            <div className={styles.background}>
                <div className={styles.slantedBoxOuter}>
                    <div className={styles.slantedBoxInner}>
                        <div className={styles.textContent}>
                            <h2>Together Let's Make Sure "Save Children Tears First"</h2>
                            <button className={styles.donateBtn}>DONATE NOW</button>
                        </div>
                    </div>
                </div>
                <div className={styles.imageGrid}>
                    <div className={styles.imageWrapper}>
                        <img src="https://savetears.org/wp-content/uploads/2022/05/home-center-banner.jpg?id=33621" alt="Child 1" />
                    </div>
                    <div className={styles.imageWrapper}>
                        <img src="/images/education-support.jpg" alt="Child 2" />
                    </div>
                </div>
            </div>
        </section>
    );
}

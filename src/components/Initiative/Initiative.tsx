import styles from "./Initiative.module.css";

export default function Initiative() {
    const points = [
        "Underprivileged Children",
        "Children suffering critical ailments",
        "Cardiac and other congenital Birth Defects",
        "Socio- Economically Weak children",
        "Orphans due to Natural or other calamities are a part of our society",
        "Women empowerment",
        "Elderly people"
    ];

    return (
        <section className={styles.initiativeSection}>
            <div className="container">
                <div className="section-header">
                    <h2>Save Tears Foundation</h2>
                    <div className="wave-underline"></div>
                </div>

                <div className={styles.content}>
                    <blockquote className={styles.quote}>
                        "Happiness/Tears" if given an option, what would you choose for yourself?
                    </blockquote>
                    <h3 className={styles.answer}>The answer undoubtedly would be happiness.</h3>
                    <p className={styles.think}>Now think about it?</p>

                    <div className={styles.paragraphs}>
                        <p>
                            As per statistics, 25% of the population in India is poor. Which consist of underprivileged children,
                            deprived women, unattended medically unfit elderly people, and jobless people. These people don't
                            have an option of choosing happiness and therefore are bound to accept the 2nd option TEARS in
                            their daily life as they have to strive daily for their basic needs.
                        </p>
                        <p>
                            We at Save Tears Foundation step in with a clear vision to help the needy with life changing
                            services that will build better futures for children and vulnerable families.
                        </p>
                        <p className={styles.boldTitle}>STF has taken an initiative by helping:</p>
                    </div>

                    <ul className={styles.list}>
                        {points.map((point, index) => (
                            <li key={index}>
                                <span className={styles.bullet}>›</span> {point}
                            </li>
                        ))}
                    </ul>

                    <div className={styles.action}>
                        <button className="btn" style={{ backgroundColor: '#76a84c', color: 'white', borderRadius: '4px', padding: '10px 40px' }}>
                            KNOW MORE
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

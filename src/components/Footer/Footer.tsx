import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>
                    <div className={styles.section}>
                        <h3>ABOUT US</h3>
                        <p>Save Tears Foundation is a non-profit organization dedicated to bringing hope and happiness to those in need through medical and educational support.</p>
                    </div>
                    <div className={styles.section}>
                        <h3>QUICK LINKS</h3>
                        <ul>
                            <li><a href="#">Home</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Our Programs</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className={styles.section}>
                        <h3>CONTACT INFO</h3>
                        <p>📞 +91 78886 76667</p>
                        <p>✉️ info@savetears.org</p>
                        <p>📍 Thane, Maharashtra, India</p>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <p>© 2026 Save Tears Foundation. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}

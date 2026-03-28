import styles from "./GreenFooter.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faLinkedin,
    faYoutube,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function GreenFooter() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.grid}>
                    <div className={styles.column}>
                        <h4>POLICIES</h4>
                        <div className={styles.divider}></div>
                        <ul>
                            <li>Disclaimer</li>
                            <li>Privacy Policy</li>
                            <li>Terms and Conditions</li>
                            <li>Refund & Cancellation Policy</li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <h4>ADMIN OFFICE</h4>
                        <div className={styles.divider}></div>
                        <div className={styles.companyInfo}>
                            <div className={styles.item}>
                                <span className={styles.icon}>🚀</span>
                                <div>
                                    <strong>Save Tears Foundation</strong><br />
                                    Building No A-1, 302, (West Side) Laram Center,<br />
                                    Above Sunil Jewellers, Next to Nadco, Andheri (W)<br />
                                    Mumbai 400058, Maharashtra
                                </div>
                            </div>
                            <div className={styles.item}>
                                <span className={styles.icon}>📞</span>
                                <span>+91 78886 76667</span>
                            </div>
                            <div className={styles.item}>
                                <span className={styles.icon}>✉️</span>
                                <span>info@savetears.org</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <h4>FOLLOW US</h4>
                        <div className={styles.divider}></div>
                        <div className={styles.socialGrid}>
                            <FontAwesomeIcon icon={faFacebook} size="4x" />
                            <FontAwesomeIcon icon={faLinkedin} size="4x" />
                            <FontAwesomeIcon icon={faYoutube} size="4x" />
                            <FontAwesomeIcon icon={faInstagram} size="4x" />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.copyright}>
                <p>© 2022 Save Tears Foundation. All rights reserved</p>
            </div>
        </footer>
    );
}

"use client";

import { useEffect, useState } from "react";
import styles from "./FloatingWidgets.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faLinkedin,
    faYoutube,
    faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function FloatingWidgets() {
    const [showScroll, setShowScroll] = useState(false);

    useEffect(() => {
        const checkScrollTop = () => {
            if (!showScroll && window.pageYOffset > 400) {
                setShowScroll(true);
            } else if (showScroll && window.pageYOffset <= 400) {
                setShowScroll(false);
            }
        };

        window.addEventListener("scroll", checkScrollTop);
        return () => window.removeEventListener("scroll", checkScrollTop);
    }, [showScroll]);

    const scrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <div className={styles.sideWidgets}>
                <div className={styles.contactUsTab}>
                    <span>✉️ Contact Us</span>
                </div>
                <div className={styles.socialStack}>
                    <a href="" className={styles.facebook}><FontAwesomeIcon icon={faFacebook} size="2x" /></a>
                    <a href="" className={styles.instagram}><FontAwesomeIcon icon={faInstagram} size="2x" /></a>
                </div>
            </div>

            <div className={styles.phoneWidget}>
                <div className={styles.phoneIcon}>📞</div>
            </div>

            <button
                className={`${styles.backToTop} ${showScroll ? styles.show : ""}`}
                onClick={scrollTop}
            >
                ⌃
            </button>

            <div className={styles.whatsappFloat}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" />
            </div>
        </>
    );
}

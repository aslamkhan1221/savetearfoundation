"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className="container">
          <div className={styles.topBarContent}>
            <div className={styles.contactInfo}>
              <span>📞 Help Line: +91 78886 76667 |</span>
              <span>✉️ Email: info@savetears.org |</span>
              <span>Reg No: F-40639 THANE / 2019 |</span>
              <span>Darpan Unique ID: MH/2022/0313074 |</span>
              <span> Pan No: AAZTS3904J |</span>
            </div>
            <div className={styles.socialIcons}>
              <FontAwesomeIcon icon={faFacebook} />
              <FontAwesomeIcon icon={faLinkedin} />
              <FontAwesomeIcon icon={faYoutube} />
              <FontAwesomeIcon icon={faInstagram} />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mainNav}>
        <div className="container">
          <div className={styles.navContent}>
            <div className={styles.logo}>

              <div className={styles.logoText}>
                <img src="/images/st-logo.jpg" alt="" width={150} />
              </div>
            </div>

            <nav className={styles.links}>
              <Link href="/" className={styles.active}>HOME</Link>
              <Link href="/about">ABOUT US ▾</Link>
              <Link href="/programs">OUR PROGRAMS ▾</Link>
              <Link href="/stories">SUCCESS STORIES</Link>
              <Link href="/contact">CONTACT US</Link>
              <Link href="/admin">ADMIN</Link>
            </nav>

            <button className={`${styles.donateBtn} btn btn-donate`}>
              DONATE US
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faLinkedin,
  faYoutube,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className="container">
          <div className={styles.topBarContent}>
            <div className={styles.contactInfo}>
              <span>📞 Help Line: +91 78886 76667 |</span>
              <span className={styles.hideOnMobile}>✉️ Email: info@savetears.org |</span>
              <span className={styles.hideOnMobile}>Reg No: F-40639 THANE / 2019 |</span>
              <span className={styles.hideOnMobile}>Darpan Unique ID: MH/2022/0313074 |</span>
              <span className={styles.hideOnMobile}> Pan No: AAZTS3904J |</span>
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
              <Link href="/" className={styles.logoText}>
                <img src="/images/st-logo.jpg" alt="ST Foundation Logo" width={150} />
              </Link>
            </div>

            <button 
              className={styles.menuToggle} 
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>

            <nav className={`${styles.links} ${isMenuOpen ? styles.open : ""}`}>
              <Link href="/" className={styles.active} onClick={() => setIsMenuOpen(false)}>HOME</Link>
              <Link href="/about" onClick={() => setIsMenuOpen(false)}>ABOUT US ▾</Link>
              <Link href="/programs" onClick={() => setIsMenuOpen(false)}>OUR PROGRAMS ▾</Link>
              <Link href="/stories" onClick={() => setIsMenuOpen(false)}>SUCCESS STORIES</Link>
              <Link href="/contact" onClick={() => setIsMenuOpen(false)}>CONTACT US</Link>
              <Link href="/admin" onClick={() => setIsMenuOpen(false)}>ADMIN</Link>
              
              <button className={`${styles.donateBtnMobile} btn btn-donate`}>
                DONATE US
              </button>
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

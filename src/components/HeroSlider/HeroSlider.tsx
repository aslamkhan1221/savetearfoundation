"use client";

import { useState, useEffect } from "react";
import styles from "./HeroSlider.module.css";

import { Slide as SlideType } from "@/lib/db";

export default function HeroSlider({ initialSlides = [] }: { initialSlides?: SlideType[] }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const slides = initialSlides && initialSlides.length > 0 ? initialSlides : [];

    useEffect(() => {
        if (isPaused || slides.length === 0) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [isPaused, slides.length]);

    if (slides.length === 0) return null;

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

    return (
        <section className={styles.sliderSection}>
            <div
                className={styles.sliderContainer}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {slides.map((slide: SlideType, index: number) => (
                    <div
                        key={slide.id}
                        className={`${styles.slide} ${index === currentSlide ? styles.active : ""}`}
                        style={{ backgroundImage: `url(${slide.image_url})` }}
                    >
                        <div className={styles.overlay}>
                            <div className="container">
                                <div className={styles.content}>
                                    <h2>{slide.title}</h2>
                                    <h1>{slide.subtitle}</h1>
                                    {index === 1 && <button className={styles.donationCheque}>Donation Cheque</button>}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <button className={styles.prevBtn} onClick={prevSlide}>⟨</button>
                <button className={styles.nextBtn} onClick={nextSlide}>⟩</button>

                <div className={styles.thumbnails}>
                    {slides.map((slide: SlideType, index: number) => (
                        <div
                            key={slide.id}
                            className={`${styles.thumbnail} ${index === currentSlide ? styles.thumbActive : ""}`}
                            onClick={() => setCurrentSlide(index)}
                        >
                            <img src={slide.image_url} alt="Thumbnail" />
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.bottomWave}>
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0C240 80 480 120 720 120C960 120 1200 80 1440 0V120H0V0Z" fill="white" />
                </svg>
            </div>
        </section>
    );
}

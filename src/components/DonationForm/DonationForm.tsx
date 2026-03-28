"use client";

import { useState } from "react";
import styles from "./DonationForm.module.css";

interface DonationFormProps {
    caseId?: number;
}

const PRESET_AMOUNTS = [500, 1000, 2000, 5000, 10000];

export default function DonationForm({ caseId }: DonationFormProps) {
    const [amount, setAmount] = useState<number | string>(1000);
    const [donorName, setDonorName] = useState("");
    const [donorEmail, setDonorEmail] = useState("");
    const [donorPhone, setDonorPhone] = useState("");

    const handleAmountClick = (val: number) => {
        setAmount(val);
    };

    const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val === "" || /^\d+$/.test(val)) {
            setAmount(val);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Thank you for your donation of ₹${amount}! (This is a demonstration)`);
        // In a real app, this would integrate with a payment gateway like Razorpay
    };

    return (
        <div className={styles.donationCard}>
            <h2>Make a Donation</h2>

            <div className={styles.amountGrid}>
                {PRESET_AMOUNTS.map((amt) => (
                    <button
                        key={amt}
                        type="button"
                        className={`${styles.amountBtn} ${amount === amt ? styles.active : ""}`}
                        onClick={() => handleAmountClick(amt)}
                    >
                        ₹{amt}
                    </button>
                ))}
            </div>

            <div className={styles.customAmount}>
                <div className={styles.inputGroup}>
                    <span className={styles.currency}>₹</span>
                    <input
                        type="text"
                        placeholder="Custom Amount"
                        className={styles.inputField}
                        value={amount}
                        onChange={handleCustomAmountChange}
                    />
                </div>
            </div>

            <form className={styles.donorForm} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Full Name"
                    className={styles.donorInput}
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Email Address"
                    className={styles.donorInput}
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    required
                />
                <input
                    type="tel"
                    placeholder="Phone Number"
                    className={styles.donorInput}
                    value={donorPhone}
                    onChange={(e) => setDonorPhone(e.target.value)}
                    required
                />

                <div className={styles.totalSection}>
                    <span className={styles.totalLabel}>Total Amount:</span>
                    <span className={styles.totalAmount}>₹{amount || 0}</span>
                </div>

                <button type="submit" className={styles.donateBtn}>
                    DONATE NOW
                </button>
            </form>

            <div className={styles.secureText}>
                <span>🔒 Secure 256-bit SSL encrypted </span>
            </div>
        </div>
    );
}

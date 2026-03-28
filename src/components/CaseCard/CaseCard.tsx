import styles from "./CaseCard.module.css";

interface CaseCardProps {
    type: "medical" | "success" | "education";
    title?: string;
    subtitle?: string;
    image: string;
    amount?: string;
    caseNo?: string;
    name?: string;
    statusText?: string;
    details?: string[];
}

export default function CaseCard({
    type,
    title,
    subtitle,
    image,
    amount,
    caseNo,
    name,
    statusText,
    details
}: CaseCardProps) {
    return (
        <div className={`${styles.card} ${styles[type]}`}>
            <div className={styles.contentArea}>
                {type === "medical" && (
                    <>
                        <h3>HELP</h3>
                        <h4>{title}</h4>
                        <div className={styles.waveSmall}></div>
                        <div className={styles.stats}>
                            <span className={styles.amount}>{amount}</span>
                            <span className={styles.caseNo}>Case No. {caseNo}</span>
                        </div>
                    </>
                )}

                {type === "success" && (
                    <>
                        <h3>{statusText || "Successfully Treated"}</h3>
                        <div className={styles.waveSmall}></div>
                        <h4>{name}</h4>
                    </>
                )}

                {type === "education" && (
                    <>
                        <h4>{name}</h4>
                        <div className={styles.educationDetails}>
                            {details?.map((detail, idx) => (
                                <p key={idx}>{detail}</p>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className={styles.imageArea}>
                <img src={image} alt={title || name} />
            </div>
        </div>
    );
}

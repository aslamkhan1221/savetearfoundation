import { getCaseBySlug } from "@/lib/actions";
import styles from "./CaseDetails.module.css";
import { notFound } from "next/navigation";
import DonationForm from "@/components/DonationForm/DonationForm";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function CaseDetailsPage({ params }: PageProps) {
    const { slug } = await params;
    const caseData = await getCaseBySlug(slug);

    if (!caseData) {
        return notFound();
    }

    return (
        <div className="container">
            <div className={styles.container}>
                <div className={styles.mainLayout}>
                    <div className={styles.leftContent}>
                        <div className={styles.caseHeader}>
                            <div className={styles.imageWrapper}>
                                <img
                                    src={caseData.image_url}
                                    alt={caseData.name}
                                    className={styles.mainImage}
                                />
                            </div>

                            <div className={styles.infoSection}>
                                <span className={styles.badge}>{caseData.type} Case</span>
                                <h1 className={styles.caseTitle}>
                                    {caseData.name}
                                </h1>
                                <div className={styles.wave}></div>

                                <div className={styles.section}>
                                    <h3>Case Details</h3>
                                    <div className={styles.content}>{caseData.details}</div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.grid}>
                            {caseData.family_background && (
                                <div className={styles.section}>
                                    <h3>Family Background</h3>
                                    <div className={styles.content}>{caseData.family_background}</div>
                                </div>
                            )}

                            {caseData.appeal && (
                                <div className={styles.donorAppeal}>
                                    <h3>Appeal to Donors</h3>
                                    <div className={styles.content}>{caseData.appeal}</div>
                                </div>
                            )}

                            {caseData.support_documents && (
                                <div className={styles.supportDoc}>
                                    <h3>Support Documents</h3>
                                    <div className={styles.docGrid}>
                                        {JSON.parse(caseData.support_documents).map((docUrl: string, index: number) => {
                                            const isImage = /\.(jpg|jpeg|png|webp|gif)$/i.test(docUrl);
                                            const isPDF = /\.pdf$/i.test(docUrl);

                                            return (
                                                <div key={index} className={styles.docItem}>
                                                    {isImage ? (
                                                        <a href={docUrl} target="_blank" rel="noopener noreferrer">
                                                            <img src={docUrl} alt={`Document ${index + 1}`} className={styles.docImage} />
                                                        </a>
                                                    ) : isPDF ? (
                                                        <div className={styles.pdfPlaceholder}>
                                                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                                                <polyline points="14 2 14 8 20 8"></polyline>
                                                                <path d="M9 15l2 2 4-4"></path>
                                                            </svg>
                                                            <span>PDF Document</span>
                                                            <a href={docUrl} target="_blank" rel="noopener noreferrer" className={styles.docBtnSmall}>View PDF</a>
                                                        </div>
                                                    ) : (
                                                        <a href={docUrl} target="_blank" rel="noopener noreferrer" className={styles.docBtn}>
                                                            View Document {index + 1}
                                                        </a>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={styles.sidebar}>
                        <DonationForm caseId={caseData.id} />
                    </div>
                </div>
            </div>
        </div>
    );
}

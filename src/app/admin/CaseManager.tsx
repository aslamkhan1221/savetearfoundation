"use client";

import { useState } from "react";
import styles from "./admin.module.css";
import { addCase, updateCase, deleteCase } from "@/lib/actions";
import { Case } from "@/lib/db";

interface CaseManagerProps {
    initialCases: Case[];
}

export default function CaseManager({ initialCases }: CaseManagerProps) {
    const [cases, setCases] = useState<Case[]>(initialCases);
    const [editingCase, setEditingCase] = useState<Case | null>(null);

    const handleEdit = (c: Case) => {
        setEditingCase(c);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleCancel = () => {
        setEditingCase(null);
    };

    return (
        <div className={styles.adminSection}>
            <section className={styles.section}>
                <h2>{editingCase ? "Edit Case" : "Add New Case"}</h2>
                <form
                    action={async (formData) => {
                        if (editingCase) {
                            await updateCase(formData);
                            setEditingCase(null);
                        } else {
                            await addCase(formData);
                        }
                        // Refresh logic handled by revalidatePath in actions
                        window.location.reload();
                    }}
                    className={styles.form}
                >
                    {editingCase && <input type="hidden" name="id" value={editingCase.id} />}

                    <div className={styles.field}>
                        <label>Name</label>
                        <input type="text" name="name" defaultValue={editingCase?.name || ""} required />
                    </div>

                    <div className={styles.field}>
                        <label>Type</label>
                        <select name="type" defaultValue={editingCase?.type || "medical"} required>
                            <option value="medical">Medical</option>
                            <option value="education">Education</option>
                        </select>
                    </div>

                    <div className={styles.field}>
                        <label>Photo {editingCase && "(Leave empty to keep current)"}</label>
                        <input type="file" name="photo" accept="image/*" required={!editingCase} />
                        {editingCase && <img src={editingCase.image_url} alt="Current" className={styles.thumbMini} />}
                    </div>

                    <div className={styles.field}>
                        <label>Case Details</label>
                        <textarea name="details" rows={3} defaultValue={editingCase?.details || ""}></textarea>
                    </div>

                    <div className={styles.field}>
                        <label>Family Background</label>
                        <textarea name="family_background" rows={3} defaultValue={editingCase?.family_background || ""}></textarea>
                    </div>

                    <div className={styles.field}>
                        <label>Appeal to Donors</label>
                        <textarea name="appeal" rows={3} defaultValue={editingCase?.appeal || ""}></textarea>
                    </div>

                    <div className={styles.field}>
                        <label>Support Documents {editingCase && "(Upload new ones to replace current)"}</label>
                        <input type="file" name="support_document" multiple />
                        {editingCase && editingCase.support_documents && (
                            <div className={styles.currentDocs}>
                                {JSON.parse(editingCase.support_documents).length} document(s) currently uploaded
                            </div>
                        )}
                    </div>

                    <div className={styles.formButtons}>
                        <button type="submit" className="btn btn-donate">
                            {editingCase ? "Update Case" : "Add Case"}
                        </button>
                        {editingCase && (
                            <button type="button" onClick={handleCancel} className={styles.cancelBtn}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </section>

            <section className={styles.section}>
                <h2>Current Cases</h2>
                <div className={styles.slideList}>
                    {cases.map((c) => (
                        <div key={c.id} className={styles.slideItem}>
                            <div className={styles.slideInfo}>
                                <img src={c.image_url} alt={c.name} className={styles.thumb} />
                                <div>
                                    <h3 style={{ textTransform: 'capitalize' }}>{c.name}</h3>
                                    <p>{c.details?.substring(0, 50)}...</p>
                                </div>
                            </div>
                            <div className={styles.itemActions}>
                                <button
                                    onClick={() => handleEdit(c)}
                                    className={styles.editBtn}
                                >
                                    Edit
                                </button>
                                <form action={async (formData) => {
                                    if (confirm("Are you sure you want to delete this case?")) {
                                        const id = Number(formData.get("id"));
                                        await deleteCase(id);
                                        window.location.reload();
                                    }
                                }}>
                                    <input type="hidden" name="id" value={c.id} />
                                    <button type="submit" className={styles.deleteBtn}>Delete</button>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

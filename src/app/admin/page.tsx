import styles from "./admin.module.css";
import loginStyles from "./login.module.css";
import {
    getSlides, addSlide, deleteSlide,
    seedInitialSlides, isAuthenticated,
    logout, login, getCases
} from "@/lib/actions";
import CaseManager from "./CaseManager";

export default async function AdminPage() {
    const authenticated = await isAuthenticated();

    if (!authenticated) {
        return (
            <div className={loginStyles.loginContainer}>
                <div className={loginStyles.loginBox}>
                    <h1>Admin Login</h1>
                    <form action={login} className={loginStyles.form}>
                        <div className={loginStyles.field}>
                            <label>Email</label>
                            <input type="email" name="email" required />
                        </div>
                        <div className={loginStyles.field}>
                            <label>Password</label>
                            <input type="password" name="password" required />
                        </div>
                        <button type="submit" className="btn btn-donate">Login</button>
                    </form>
                </div>
            </div>
        );
    }

    await seedInitialSlides(); // Ensure initial slides exist
    const slides = await getSlides();
    const cases = await getCases();

    return (
        <div className={styles.adminContainer}>
            <div className="container">
                <div className={styles.adminHeader}>
                    <h1>Admin Panel</h1>
                    <form action={logout}>
                        <button type="submit" className={styles.logoutBtn}>Logout</button>
                    </form>
                </div>

                <div className={styles.adminGrid}>
                    {/* Slides Management */}
                    <div className={styles.adminSection}>
                        <section className={styles.section}>
                            <h2>Add New Slide</h2>
                            <form action={addSlide} className={styles.form}>
                                <div className={styles.field}>
                                    <label>Image URL</label>
                                    <input type="text" name="image_url" placeholder="/images/example.jpg" required />
                                </div>
                                <div className={styles.field}>
                                    <label>Title</label>
                                    <input type="text" name="title" placeholder="Slide Title" required />
                                </div>
                                <div className={styles.field}>
                                    <label>Subtitle</label>
                                    <input type="text" name="subtitle" placeholder="Slide Subtitle" required />
                                </div>
                                <button type="submit" className="btn btn-donate">Add Slide</button>
                            </form>
                        </section>

                        <section className={styles.section}>
                            <h2>Current Slides</h2>
                            <div className={styles.slideList}>
                                {slides.map((slide) => (
                                    <div key={slide.id} className={styles.slideItem}>
                                        <div className={styles.slideInfo}>
                                            <img src={slide.image_url} alt={slide.title} className={styles.thumb} />
                                            <div>
                                                <h3>{slide.title}</h3>
                                                <p>{slide.subtitle}</p>
                                            </div>
                                        </div>
                                        <form action={async (formData) => {
                                            "use server";
                                            const id = Number(formData.get("id"));
                                            await deleteSlide(id);
                                        }}>
                                            <input type="hidden" name="id" value={slide.id} />
                                            <button type="submit" className={styles.deleteBtn}>Delete</button>
                                        </form>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Case Management */}
                    <CaseManager initialCases={cases} />
                </div>
            </div>
        </div>
    );
}

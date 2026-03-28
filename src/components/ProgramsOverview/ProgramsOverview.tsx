import styles from "./ProgramsOverview.module.css";

const PROGRAMS = [
    {
        title: "Khushiyon Ki Thali",
        image: "/images/khushiyon-ki-thali.jpg",
        description: "There is no stranger to hunger, extreme poverty, or severe malnutrition in India. They have been around for many centuries. While our ranking may change yearly, the number of individuals needing a single meal remains constant."
    },
    {
        title: "Critical Medical Support",
        image: "/images/critical-medical-support.jpg",
        description: "The Save Tears Foundation works with kids from the poorest, most economically oppressed households to help them pay for life-saving procedures. We fund the children's medical care and assists them in returning to their regular life."
    },
    {
        title: "Education Support",
        image: "/images/education-support.jpg",
        description: "Through grant-making and campaigning, the Education Support Program enhances the right to education. For groups of students that are traditionally disadvantaged and excluded due to ability, or socioeconomic status, we encourage excellent practices in inclusive education."
    },
    {
        title: "Women Empowerment",
        image: "/images/women-empowerment.jpg",
        description: "In addition to being a fundamental human right, gender equality is also a precondition for a society that is stable, affluent, and sustainable. The faster women's self-reliance and empowerment take place in society, the faster that society will advance as a whole."
    },
    {
        title: "Ration Distribution",
        image: "/images/Ration-Distribution-Neha-1.jpg",
        description: "In India, there is no stranger to hunger, extreme poverty, or severe malnutrition. They have been around for many centuries."
    },
    {
        title: "Calamity Support",
        image: "/images/calamity-support.jpg",
        description: "With 27 of its 29 states and seven union territories vulnerable to frequent natural disasters including cyclones, earthquakes, landslides, floods, and droughts, India is one of the world's most disaster-prone nations. Additionally, civil unrest also affects roughly one third of the nation."
    }
];

export default function ProgramsOverview() {
    return (
        <section className={styles.programsSection}>
            <div className="container">
                <div className="section-header">
                    <h2>Our Programs</h2>
                    <div className="wave-underline"></div>
                </div>

                <div className={styles.grid}>
                    {PROGRAMS.map((program, index) => (
                        <div key={index} className={styles.programCard}>
                            <h3>{program.title}</h3>
                            <div className={styles.imageBox}>
                                <img src={program.image} alt={program.title} />
                            </div>
                            <p>{program.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

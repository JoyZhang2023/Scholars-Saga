import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";


export default function Home() {
    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <p>
                    Get started by editing&nbsp;
                    <code className={styles.code}>app/page.tsx</code>
                </p>
                <Link href="student-dashboard">Student Dashboard</Link>
            </div>
        </main>
    );
}

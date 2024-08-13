<<<<<<< HEAD
'use client'

=======
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
        <Link href="counselor-dashboard">Counselor Dashboard</Link>
        <Link href="student-search">Student Search</Link>
      </div>
    </main>
  );
'use client'

>>>>>>> f7cf6d60c88759ba6a4a177f6ecbfdab89e8f56e
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/home');
  }, [router]);

  return null;
}

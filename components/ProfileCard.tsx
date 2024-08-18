import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './styles/ProfileCard.module.css';

const ProfileCard: React.FC = () => {
  return (
    <div className={styles.profileCard}>
      <div className={styles.profilePicture}>
        <Image
          src="/generic_profile_pic.png"
          alt="Profile Picture"
          width={100}
          height={100}
        />
      </div>
      <div className={styles.profileButtons}>
        <Link href="/login" className={styles.profileButton}>
          Login
        </Link>
        <Link href="/signup" className={`${styles.profileButton} ${styles.newAccountButton}`}>
          New Account
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;

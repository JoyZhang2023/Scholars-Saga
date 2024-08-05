import { useState } from 'react';
import styles from '../../styles/page.module.css';
import NavbarAdmin from '@/components/Navbar_admin';

const ManageClasses: React.FC = () => {
  const [className, setClassName] = useState<string>('');

  const handleClassSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle class creation logic here
    alert(`Creating class: ${className}`);
  };

  return (
    <main className={styles.main}>
      <NavbarAdmin header="Manage Classes"/>
      <div className={styles.container}>
        <h1 className={styles.header}>Manage Classes</h1>
        <form onSubmit={handleClassSubmit}>
          <label>
            Class Name:
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Create Class</button>
        </form>
      </div>
    </main>
  );
};

export default ManageClasses;

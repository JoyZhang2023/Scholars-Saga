import { useState } from 'react';
import styles from '../../styles/page.module.css';
import NavbarAdmin from '@/components/Navbar_admin';

const CreateUser: React.FC = () => {
  const [userType, setUserType] = useState<string>('');
  const [userName, setUserName] = useState<string>('');

  const handleUserSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle user creation logic here
    alert(`Creating ${userType}: ${userName}`);
  };

  return (
    <main className={styles.main}>
      <NavbarAdmin header="Create New User"/>
      <div className={styles.container}>
        <h1 className={styles.header}>Create New User</h1>
        <form onSubmit={handleUserSubmit}>
          <label>
            User Type:
            <select value={userType} onChange={(e) => setUserType(e.target.value)} required>
              <option value="">Select user type</option>
              <option value="student">Student</option>
              <option value="counselor">Counselor</option>
              <option value="admin">Admin</option>
            </select>
          </label>
          <br />
          <label>
            User Name:
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </label>
          <br />
          <button type="submit">Create User</button>
        </form>
      </div>
    </main>
  );
};

export default CreateUser;

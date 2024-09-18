import { Pool } from 'pg';

const pool = new Pool({
  user: 'scholarpostgre',
  host: 'scholars-database-1.c1sisaccevwf.us-east-2.rds.amazonaws.com',
  database: 'scholarpostgre',
  password: 'C0d3Day_$ch0lar$',
  port: 5432,
});

export const getClassInfo = async (query: string) => {
  try {
    const client = await pool.connect();
    const res = await client.query(
      'SELECT class_name, professor, class_day FROM classes WHERE class_name ILIKE $1 OR professor ILIKE $1',
      [`%${query}%`]
    );
    client.release();
    return res.rows;
  } catch (error) {
    console.error('Error fetching class data:', error);
    throw error;
  }
};

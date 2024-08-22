import React, { useState, useEffect } from 'react';

const BulletinsCard = () => {
  const [bulletins, setBulletins] = useState([
    "Welcome to the Admin Dashboard!",
    "Please check the system updates.",
    "Next staff meeting scheduled for 3 PM."
  ]);

  useEffect(() => {
    // You can fetch bulletins from your data source here
    // Example: fetch('/api/bulletins').then(response => response.json()).then(data => setBulletins(data));
  }, []);

  return (
    <div className="bulletins-card">
      <h2>Bulletins</h2>
      <ul>
        {bulletins.map((bulletin, index) => (
          <li key={index}>{bulletin}</li>
        ))}
      </ul>
    </div>
  );
};

export default BulletinsCard;

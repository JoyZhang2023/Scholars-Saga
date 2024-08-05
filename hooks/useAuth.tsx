import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState<{ role: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate an async user fetch
    setTimeout(() => {
      // Mock user data
      setUser({ role: 'admin' }); // Change this to simulate different roles
      setIsLoading(false);
    }, 1000);
  }, []);

  return { user, isLoading };
};

'use client';

import { useState, useEffect } from 'react';
import { GetCurrentUser } from '../../utils/db/get-current-user';

const Header = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await GetCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header>
        {user ? `Welcome, ${user.name || 'User'}` : 'No user found.'}
      </header>
    </div>
  );
};

export default Header;
'use client';

import { useState, useEffect } from 'react';
import { GetCurrentUser } from '../../utils/db/get-current-user';

const Header = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData = await GetCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
    fetchUser();
  }, []);

  return (
    <div>
      <header>
        {user ? `Welcome, ${user.name || 'User'}` : 'No user found.'}
      </header>
    </div>
  );
};

export default Header;
'use client';

import { useUser } from "@clerk/nextjs";

export async function GetCurrentUser() {
  const { isSignedIn, isLoaded, user } = useUser();

  if (!isLoaded || !isSignedIn || !user) {
    return null;
  }

  console.log(user); 

  try {
    const response = await fetch('/api/getCurrentUser', {
      headers: {
        'X-User-Id': user.id
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }

    const userData = await response.json();
    return userData;
  } catch (err) {
    console.error('Error fetching user data:', err);
    return null;
  }
}
'use client';

import { SignIn, useUser } from "@clerk/nextjs";
import { useEffect, useState, useCallback } from "react";

export default function SignInPage() {
  const [status, setStatus] = useState<string>('');
  const { isSignedIn, user } = useUser(); // useUser hook from Clerk

  const handleSignInComplete = useCallback(async (user: any) => {
    try {
      setStatus('Signing you in...');
      const response = await fetch('/api/checkAndSetupUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          name: `${user.firstName} ${user.lastName}`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to log sign-in');
      }

      setStatus('Sign-in successful!');
    } catch (error) {
      console.error('Error during sign-in:', error);
      setStatus('Error during sign-in.');
    }
  }, []);

  useEffect(() => {
    if (isSignedIn && user) {
      handleSignInComplete(user);
    }
  }, [isSignedIn, user, handleSignInComplete]);

  return (
    <div>
      <SignIn />
      {status && <p className="text-center mt-4">{status}</p>}
    </div>
  );
}

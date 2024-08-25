'use client';

import { SignUp, useUser } from "@clerk/nextjs";
import { useEffect, useState, useCallback } from "react";

export default function SignUpPage() {
  const [status, setStatus] = useState<string>('');
  const { isSignedIn, user } = useUser();

  const handleSignUpComplete = useCallback(async (user: any) => {
    try {
      setStatus('Setting up your account...');
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
        throw new Error('Failed to setup user');
      }

      setStatus('Account setup complete!');
    } catch (error) {
      console.error('Error setting up user:', error);
      setStatus('Error setting up account.');
    }
  }, []);

  useEffect(() => {
    if (isSignedIn && user) {
      handleSignUpComplete(user);
    }
  }, [isSignedIn, user, handleSignUpComplete]);

  return (
    <div>
      <SignUp />
      {status && <p className="text-center mt-4">{status}</p>}
    </div>
  );
}

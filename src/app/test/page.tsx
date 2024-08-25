'use client';
import { useState, useEffect } from 'react';

export default function Test() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/testDynamoDB', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pk: '2',
            sk: '2',
            firstName: 'Cole',
            lastName: 'Kralicek'
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new TypeError("No JSON");
        }

        const data = await response.json();
        setResult(data);
      } catch (e) {
        if (e instanceof SyntaxError && e.message.includes('JSON')) {
          setError("Received invalid JSON data from the server");
        } else if (e instanceof TypeError) {
          setError(e.message);
        } else {
            if (e instanceof Error) {
                setError(`An error occurred: ${e.message}`);
            }
        }
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1>Test</h1>
      {error && <p style={{color: 'red'}}>Error: {error}</p>}
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
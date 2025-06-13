"use client";
import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [hasMounted, setHasMounted] = useState(false);
  const toastShownRef = useRef(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl || "");
    } else {
      setError('No verification token found in the URL.');
      toast.error('No verification token found in the URL.');
    }
  }, []);

  // To prevent dehydration (hydration mismatch => different code on client and server)
  // we check if the component has mounted (as useEffect only run on the client side [after hydration]) 
  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (token) {
      verifyUserEmail();
    }
  }, [token]);

  const verifyUserEmail = async () => {
    try {
      setError('');
      setIsVerified(false);

      const response = await axios.post('/api/users/verifyemail', { token });

      if (response.status === 200) {
        setIsVerified(true);
        if (!toastShownRef.current) {
          toast.success('Email verified successfully!');
          toastShownRef.current = true;
        }
      } else {
        setError('Email verification failed.');
        if (!toastShownRef.current) {
          toast.error('Email verification failed.');
          toastShownRef.current = true;
        }
      }
    } catch (err: any) {
      console.log(err); // err for dev
      const errMsg = `An error occurred while verifying the email.\n`; // err for client
      setError(errMsg);
      if (!toastShownRef.current) {
        toast.error(errMsg);
        toastShownRef.current = true;
      }
    }
  };

  if (!hasMounted) return null;


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      <h1 className="text-2xl font-bold mb-4">Verify Email</h1>

      {/* Show token info */}
      {token && (
        <div className="bg-gray-800 rounded p-4 mb-4 max-w-md w-full text-sm text-gray-300">
          Verifying email with token: <span className="break-all">{token}</span>
        </div>
      )}

      {/* Status output */}
      {error ? (
        <div className="bg-red-600 rounded p-4 max-w-md w-full text-white">
          {error}
        </div>
      ) : isVerified ? (
        <div className="bg-green-600 rounded p-4 max-w-md w-full text-white">
          Email verified successfully!
        </div>
      ) : (
        <div className="bg-gray-800 rounded p-4 max-w-md w-full text-gray-300">
          Please wait while we verify your email...
        </div>
      )}

      <p className='mt-4'>Go to <span>
        <Link href="/login" className="text-blue-500 hover:underline mt-4">
          Login
        </Link>
      </span>
      </p>
    </div>
  );
}

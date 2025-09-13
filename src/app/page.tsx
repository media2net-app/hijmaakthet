'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('demo@hijmaakthet.nl');
  const [password, setPassword] = useState('demo123');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simuleer login proces
    setTimeout(() => {
      setIsLoading(false);
      // Navigeer naar dashboard
      window.location.href = '/dashboard';
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-20 w-20 bg-gray-800 rounded-full flex items-center justify-center mb-6 p-2 border border-gray-700">
            <img 
              src="/svg/hij-maakt-het.svg" 
              alt="Hij Maakt Het Logo" 
              className="h-full w-full object-contain"
            />
          </div>
          <h2 className="text-center text-3xl font-bold text-white">
            Welkom bij Hij Maakt Het
          </h2>
          <p className="mt-2 text-center text-sm text-gray-300">
            Log in op je account
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                E-mailadres
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="je@email.nl"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                Wachtwoord
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-3 border border-gray-600 placeholder-gray-400 text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Je wachtwoord"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-600 rounded bg-gray-800"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                Onthoud mij
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-white hover:text-gray-300 transition-colors">
                Wachtwoord vergeten?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Inloggen...
                </div>
              ) : (
                'Inloggen'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-400">
              Nog geen account?{' '}
              <a href="#" className="font-medium text-white hover:text-gray-300 transition-colors">
                Registreer hier
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

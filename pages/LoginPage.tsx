import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error: any) {
      alert(`Login failed: ${error.message}`);
      console.error('Login failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-surface rounded-xl shadow-lg border border-zinc-700">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary-light">SkillConnect</h1>
          <p className="mt-2 text-text-muted">Connect, Learn, and Grow Your Career.</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-text-muted">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mt-1 bg-background border border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-text"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-text-muted"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 bg-background border border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-text"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 px-4 text-white bg-primary rounded-md font-semibold hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:bg-gray-600 transition-colors"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
           <div className="text-sm text-center">
              <p className="text-text-muted">
                Don't have an account?{' '}
                <Link to="/register" className="font-medium text-primary-light hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }
    setIsLoading(true);
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (error: any) {
      alert(`Registration failed: ${error.message}`);
      console.error('Registration failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 bg-surface rounded-xl shadow-lg border border-zinc-700">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-primary-light">Create an Account</h1>
          <p className="mt-2 text-text-muted">Join SkillConnect to start learning.</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="text-sm font-medium text-text-muted">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 mt-1 bg-background border border-zinc-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-text"
            />
          </div>
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
              autoComplete="new-password"
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
              className="w-full py-2 px-4 text-white bg-primary rounded-md font-semibold hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-primary disabled:bg-gray-600 transition-colors"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </div>
           <div className="text-sm text-center">
              <p className="text-text-muted">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-primary-light hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
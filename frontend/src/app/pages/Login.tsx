import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate, useSearchParams } from 'react-router';
import { requestMagicLink, setAuthSession, verifyMagicLink } from '../lib/api';
import { useEffect } from 'react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [magicLink, setMagicLink] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) return;

    const consumeMagicLink = async () => {
      setIsLoading(true);
      setError('');
      try {
        const result = await verifyMagicLink(token);
        setAuthSession(result.token, result.user);
        navigate(result.user.role === 'admin' ? '/admin' : '/');
      } catch (consumeError) {
        setError(consumeError instanceof Error ? consumeError.message : 'Invalid magic link');
      } finally {
        setIsLoading(false);
      }
    };

    consumeMagicLink();
  }, [navigate, searchParams]);

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setInfo('');
    setMagicLink('');
    setIsLoading(true);
    try {
      const result = await requestMagicLink(email);
      setInfo(result.message || 'Email confirmed.');
      if (result.token && result.user) {
        setAuthSession(result.token, result.user);
        navigate(result.user.role === 'admin' ? '/admin' : '/');
        return;
      }
      if (result.magicLink) setMagicLink(result.magicLink);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Failed to send magic link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="pt-32 pb-24 bg-[#0B0B0B] min-h-screen">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 border border-white/10 bg-zinc-950 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-zinc-900 to-black border-r border-white/10"
          >
            <div>
              <p className="text-primary text-xs uppercase tracking-[0.5em] mb-4 font-bold">Maison de Luxe</p>
              <h1 className="text-5xl text-white font-serif leading-tight">Welcome Back</h1>
              <p className="text-white/50 mt-6 max-w-md">
                Sign in to manage orders, products, and your premium fragrance collection experience.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 sm:p-10 lg:p-12"
          >
            <p className="text-primary text-xs uppercase tracking-[0.5em] mb-4 font-bold">Authentication</p>
            <h2 className="text-4xl text-white font-serif mb-8">Login</h2>

            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-white/60 text-xs uppercase tracking-widest">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full bg-black border border-white/15 px-5 py-3 text-white outline-none focus:border-primary"
                  required
                />
              </div>

              {error && <p className="text-destructive text-sm">{error}</p>}
              {info && <p className="text-primary text-sm">{info}</p>}
              {magicLink && (
                <a
                  href={magicLink}
                  className="inline-block text-primary text-xs underline underline-offset-4 break-all"
                >
                  Open Magic Link
                </a>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-black py-4 uppercase tracking-[0.2em] font-bold text-xs hover:bg-primary/90 disabled:opacity-60"
              >
                {isLoading ? 'Please wait...' : 'Send Magic Link'}
              </button>
            </form>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

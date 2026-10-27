'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const signUp = async () => {
    setMsg('Please wait...');
    const { error } = await supabase.auth.signUp({ email: email.trim(), password });
    if (error) setMsg(error.message);
    else window.location.href = '/dashboard';
  };

  const signIn = async () => {
    setMsg('Please wait...');
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    if (error) setMsg(error.message);
    else window.location.href = '/dashboard';
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <h2>Welcome back</h2>
        <p className="sub">Log in to write and manage your posts</p>
        <input placeholder="Email" autoComplete="off" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password (min 6)" autoComplete="new-password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={signIn}>Log in</button>
        <button className="secondary" onClick={signUp}>Create account</button>
        <p style={{ color: 'crimson', margin: 0, textAlign: 'center' }}>{msg}</p>
      </div>
    </div>
  );
}
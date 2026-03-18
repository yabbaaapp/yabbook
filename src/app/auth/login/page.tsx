'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MessageCircle, Mail, Lock } from 'lucide-react';
import { supabase } from '@/utils/supabase';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setErrorMessage('');
  };

  async function handleAuth(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Lütfen e-posta ve şifrenizi girin.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    let error;

    if (isRegistering) {
      const { error: signUpErr, data } = await supabase.auth.signUp({
        email,
        password,
      });
      error = signUpErr;

      // Create initial profile record if signup was successful
      if (!error && data?.user?.id) {
        await supabase.from('users').insert([
          { 
            id: data.user.id, 
            email: email,
            name: email.split('@')[0],
            username: `@${email.split('@')[0]}`,
            avatar_url: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`
          }
        ]);
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      error = signInError;
    }

    if (error) {
      setErrorMessage(error.message);
    } else if (isRegistering) {
      alert('Kayıt Başarılı. Hesabınız oluşturuldu.');
      setIsRegistering(false);
    } else {
      // Login successful
      router.replace('/feed');
    }
    
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 rounded-2xl bg-[#38BDF8]/10 flex items-center justify-center mb-4">
            <MessageCircle className="w-10 h-10 text-[#38BDF8]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Yabbok Web</h1>
          <p className="text-[#94A3B8] text-center">
            {isRegistering 
              ? 'Aramıza katılın ve mesajlaşmaya başlayın' 
              : 'Giriş yapın ve sohbete kaldığınız yerden devam edin'}
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-sm rounded-lg">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleAuth} className="flex flex-col gap-4">
          <div>
            <label className="block text-[#94A3B8] text-sm font-medium mb-2 ml-1">E-posta</label>
            <div className="flex items-center bg-[#1E293B] rounded-xl px-4 border border-[#334155] focus-within:border-[#38BDF8] transition-colors">
              <Mail className="w-5 h-5 text-[#64748B]" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ornek@email.com"
                disabled={loading}
                required
                className="flex-1 bg-transparent py-4 pl-3 text-white text-[15px] outline-none placeholder-[#64748B]"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#94A3B8] text-sm font-medium mb-2 ml-1">Şifre</label>
            <div className="flex items-center bg-[#1E293B] rounded-xl px-4 border border-[#334155] focus-within:border-[#38BDF8] transition-colors">
              <Lock className="w-5 h-5 text-[#64748B]" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******"
                disabled={loading}
                required
                className="flex-1 bg-transparent py-4 pl-3 text-white text-[15px] outline-none placeholder-[#64748B]"
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl flex items-center justify-center mt-3 text-white text-base font-bold transition-all ${
              loading ? 'bg-[#475569]' : 'bg-[#38BDF8] hover:bg-[#0284C7]'
            }`}
          >
            {loading ? 'Bekleniyor...' : (isRegistering ? 'Hesap Oluştur' : 'Giriş Yap')}
          </button>
        </form>

        <div className="flex flex-row justify-center mt-8 text-sm">
          <span className="text-[#94A3B8]">
            {isRegistering ? 'Zaten hesabınız var mı? ' : 'Hesabınız yok mu? '}
          </span>
          <button 
            type="button" 
            onClick={toggleMode} 
            disabled={loading}
            className="text-[#38BDF8] font-bold ml-1 hover:underline disabled:opacity-50"
          >
            {isRegistering ? 'Giriş Yap' : 'Kayıt Ol'}
          </button>
        </div>
      </div>
    </div>
  );
}

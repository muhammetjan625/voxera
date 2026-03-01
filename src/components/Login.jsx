import React from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { Volume2 } from 'lucide-react'; // Eksik olan buydu!

export default function Login() {
  const signIn = () => signInWithPopup(auth, provider).catch(err => console.log(err));

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#1e1f22]">
      <div className="bg-[#2b2d31] p-10 rounded-2xl shadow-2xl flex flex-col items-center border border-white/5">
        <div className="w-20 h-20 bg-[#5865f2] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20">
          <Volume2 size={40} className="text-white" />
        </div>
        <h1 className="text-3xl font-black text-white mb-2 tracking-tight italic">VOXERA</h1>
        <p className="text-gray-400 mb-8 text-center text-sm px-4">Topluluğunla anlık konuşmaya başla.</p>
        <button 
          onClick={signIn}
          className="bg-[#5865f2] hover:bg-[#4752c4] text-white font-bold py-3 px-10 rounded-lg transition-all transform active:scale-95 shadow-md"
        >
          Google ile Devam Et
        </button>
      </div>
    </div>
  );
}
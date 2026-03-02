import React from 'react';
import { Disc } from 'lucide-react';

export default function Login({ handleGoogleLogin }) {
  return (
    <div className="min-h-screen bg-[#313338] flex items-center justify-center bg-gradient-to-br from-[#1e1f22] to-[#2b2d31]">
      <div className="bg-[#1e1f22]/95 backdrop-blur-md p-10 rounded-2xl shadow-2xl w-[400px] text-center border border-white/5">
        <div className="w-20 h-20 bg-[#5865f2] rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_#5865f244] animate-pulse">
            <Disc size={48} className="text-white animate-spin-slow" />
        </div>
        <h1 className="text-3xl font-black text-white italic uppercase mb-2 tracking-tighter">Voxera AI</h1>
        <p className="text-gray-400 text-sm mb-8 font-medium">Cızırtısız, pürüzsüz ses deneyimine hoş geldin.</p>
        <button 
          onClick={handleGoogleLogin} 
          className="w-full py-4 bg-[#5865f2] hover:bg-[#4752c4] text-white font-bold rounded-lg flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/layout/google.svg" className="w-5 h-5 bg-white rounded-full p-0.5" alt="" />
          Google ile Giriş Yap
        </button>
      </div>
    </div>
  );
}
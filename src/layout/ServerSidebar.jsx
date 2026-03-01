// src/layout/ServerSidebar.jsx
import React from 'react';
import { Plus, Disc, Home, Settings } from 'lucide-react';

export default function ServerSidebar() {
  return (
    <div className="w-18 h-full bg-[#1e1f22] flex flex-col items-center py-4 gap-3 shrink-0 border-r border-black/20">
      {/* Ana Logo Butonu */}
      <div className="w-12 h-12 bg-[#5865f2] text-white rounded-2xl flex items-center justify-center cursor-pointer hover:rounded-xl transition-all shadow-lg shadow-indigo-500/20 group">
        <Disc size={28} className="group-hover:rotate-90 transition-transform" />
      </div>

      <div className="w-8 h-[2px] bg-white/5 rounded-full" />

      {/* Sunucu Simgeleri (Temsili) */}
      <div className="w-12 h-12 bg-[#313338] text-[#23a559] rounded-3xl flex items-center justify-center cursor-pointer hover:bg-[#23a559] hover:text-white hover:rounded-xl transition-all group">
        <Home size={24} />
      </div>

      <div className="mt-auto flex flex-col gap-3">
        <div className="w-12 h-12 bg-[#313338] text-gray-400 rounded-3xl flex items-center justify-center cursor-pointer hover:bg-white/5 hover:text-white hover:rounded-xl transition-all">
          <Settings size={22} />
        </div>
        <div className="w-12 h-12 bg-[#313338] text-[#23a559] rounded-3xl flex items-center justify-center cursor-pointer hover:bg-[#23a559] hover:text-white hover:rounded-xl transition-all">
          <Plus size={24} />
        </div>
      </div>
    </div>
  );
}
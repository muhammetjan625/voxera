// src/layout/ChannelSidebar.jsx
import React from 'react';
import { Hash, Volume2, LogOut, Disc, ChevronDown } from 'lucide-react';
import { auth } from '../firebase';

export default function ChannelSidebar({ activeTextChannel, setActiveTextChannel, activeVoiceRoom, setActiveVoiceRoom, user }) {
  const textChannels = [
    { id: 'genel', name: 'genel-sohbet' },
    { id: 'voxera-lab', name: 'voxera-lab' }
  ];

  const voiceChannels = [
    { id: 'sesli-kafe', name: 'Sohbet Odası' },
    { id: 'gaming', name: 'Gaming Zone' }
  ];

  return (
    <div className="w-64 bg-[#2b2d31] h-full flex flex-col shrink-0 border-r border-black/10">
      {/* Üst Başlık */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-black/10 shadow-sm shrink-0">
        <span className="font-black text-lg text-white tracking-tighter italic flex items-center">
          VOXERA <span className="w-1 h-1 bg-[#7289da] rounded-full ml-1" />
        </span>
        <ChevronDown size={18} className="text-gray-400" />
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        {/* Metin Kanalları Bölümü */}
        <div>
          <h3 className="text-[10px] font-bold text-gray-500 uppercase px-2 mb-2 tracking-widest flex items-center">
            <ChevronDown size={12} className="mr-1" /> Metin Kanalları
          </h3>
          {textChannels.map(ch => (
            <div 
              key={ch.id} 
              onClick={() => setActiveTextChannel(ch)}
              className={`flex items-center p-2 rounded-lg cursor-pointer mb-1 transition-all group
              ${activeTextChannel?.id === ch.id ? 'bg-[#404249] text-white' : 'text-gray-400 hover:bg-[#35373c] hover:text-gray-200'}`}
            >
              <Hash size={18} className={`mr-2 ${activeTextChannel?.id === ch.id ? 'text-white' : 'text-gray-500'}`} /> 
              <span className="text-sm font-semibold">{ch.name}</span>
            </div>
          ))}
        </div>

        {/* Sesli Kanallar Bölümü */}
        <div>
          <h3 className="text-[10px] font-bold text-gray-500 uppercase px-2 mb-2 tracking-widest flex items-center">
            <ChevronDown size={12} className="mr-1" /> Sesli Kanallar
          </h3>
          {voiceChannels.map(vc => (
            <div 
              key={vc.id} 
              onClick={() => setActiveVoiceRoom(vc.id)}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer mb-1 transition-all 
              ${activeVoiceRoom === vc.id ? 'text-[#00d97e] bg-[#00d97e]/5' : 'text-gray-400 hover:bg-[#35373c] hover:text-gray-200'}`}
            >
              <div className="flex items-center"><Volume2 size={18} className="mr-2" /> <span className="text-sm font-semibold">{vc.name}</span></div>
              {activeVoiceRoom === vc.id && (
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-[#00d97e] rounded-full animate-pulse shadow-[0_0_8px_#00d97e]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Alt Kullanıcı Paneli */}
      <div className="p-2 bg-[#232428] flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 hover:bg-white/5 p-1 rounded-lg transition-colors cursor-pointer flex-1 min-w-0 mr-2">
          <div className="relative">
            <img src={user?.photoURL} className="w-8 h-8 rounded-full" alt="" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#23a559] border-[2px] border-[#232428] rounded-full" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-bold text-white truncate leading-none">{user?.displayName?.split(' ')[0]}</p>
            <p className="text-[9px] text-gray-400 truncate">#çevrimiçi</p>
          </div>
        </div>
        <LogOut 
          size={18} 
          className="text-gray-400 hover:text-red-400 cursor-pointer transition-colors p-1" 
          onClick={() => auth.signOut()} 
        />
      </div>
    </div>
  );
}
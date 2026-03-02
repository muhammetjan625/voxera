import React from 'react';
import { Volume2, MicOff, Mic, User, PhoneOff, Disc, Settings } from 'lucide-react';
import { useVoice } from '../hooks/useVoice';

export default function ChannelSidebar({ activeVoiceRoom, setActiveVoiceRoom, user }) {
  const { remoteUsers, isMuted, toggleMute, localLevel, leaveRoom } = useVoice(activeVoiceRoom, user, setActiveVoiceRoom);

  const amISpeaking = localLevel > 10 && !isMuted;

  return (
    <div className="flex flex-col w-[240px] h-full bg-[#1e1f22] text-[#949ba4] select-none border-r border-black/20">
      <div className="flex items-center h-12 px-4 shadow-sm border-b border-black/20 shrink-0">
        <Disc className={`text-[#7289da] ${amISpeaking ? 'animate-spin' : ''}`} size={20} />
        <span className="font-black italic text-lg text-white uppercase ml-2 tracking-tighter">VOXERA</span>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <div onClick={() => setActiveVoiceRoom('genel')} className={`flex items-center gap-2 p-2 rounded cursor-pointer mb-2 transition-all ${activeVoiceRoom ? 'bg-white/10 text-white' : 'hover:bg-white/5'}`}>
          <Volume2 size={18} /> <span className="text-sm font-semibold italic uppercase">Sohbet Odası</span>
        </div>

        {activeVoiceRoom && (
          <div className="ml-4 space-y-3">
            <div className="flex items-center gap-2 py-1">
              <div className="relative">
                <img src={user?.photoURL} className={`w-7 h-7 rounded-full border-2 transition-all ${amISpeaking ? 'border-[#23a559] shadow-[0_0_12px_#23a559] scale-105' : 'border-transparent opacity-80'}`} alt="" />
                {isMuted && <MicOff size={10} className="absolute -bottom-1 -right-1 text-red-500 bg-[#1e1f22] rounded-full p-0.5" />}
              </div>
              <span className={`text-[13px] font-medium transition-colors ${amISpeaking ? 'text-white' : 'text-gray-400'}`}>Siz</span>
            </div>
            {remoteUsers.map(u => (
              <div key={u.uid.toString()} className="flex items-center gap-2 py-1">
                <div className={`w-7 h-7 rounded-full bg-[#313338] flex items-center justify-center border-2 transition-all ${u.isSpeaking ? 'border-[#23a559] shadow-[0_0_12px_#23a559] scale-105' : 'border-transparent opacity-60'}`}>
                  <User size={14} className="text-gray-400" />
                </div>
                <span className={`text-[13px] font-medium transition-colors ${u.isSpeaking ? 'text-white' : 'text-gray-500'}`}>User-{u.uid.toString().slice(-4)}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="bg-[#232428] p-2 flex flex-col gap-2 shrink-0">
        {activeVoiceRoom && (
          <div className="flex items-center justify-between p-2 bg-[#1e1f22] rounded shadow-lg border border-white/5">
            <div className="flex flex-col leading-tight"><span className="text-[10px] text-[#23a559] font-black uppercase italic">Voice On</span></div>
            <button onClick={leaveRoom} className="p-1.5 hover:bg-red-500/20 text-red-500 rounded transition-all active:scale-90"><PhoneOff size={18} /></button>
          </div>
        )}
        <div className="flex items-center justify-between px-1 bg-[#1e1f22]/40 p-1.5 rounded-lg border border-white/5">
          <div className="flex items-center gap-2">
            <img src={user?.photoURL} className="w-8 h-8 rounded-full shadow-sm" alt="" />
            <span className="text-xs font-bold text-white truncate w-16 italic">{user?.displayName?.split(' ')[0]}</span>
          </div>
          <div className="flex gap-1">
            <button onClick={toggleMute} className={`p-1.5 rounded transition-all ${isMuted ? 'text-red-500 bg-white/5' : 'text-gray-400 hover:bg-white/5'}`}>{isMuted ? <MicOff size={18} /> : <Mic size={18} />}</button>
            <button className="p-1.5 rounded text-gray-400 hover:bg-white/5"><Settings size={18} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
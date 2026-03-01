import React, { useState, useEffect, useRef } from 'react';
import { Paperclip, Send, Hash, FileText, Volume2, Users } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, where } from 'firebase/firestore';
import { useVoice } from '../hooks/useVoice';

export default function Chat({ user, activeTextChannel, activeVoiceRoom }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const { remoteUsers } = useVoice(activeVoiceRoom, user); // Ses mantığı burada
  const endRef = useRef(null);

  useEffect(() => {
    if (!activeTextChannel?.id) return;
    const q = query(collection(db, 'messages'), where('roomId', '==', activeTextChannel.id), orderBy('timestamp', 'asc'));
    return onSnapshot(q, (snapshot) => setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))));
  }, [activeTextChannel?.id]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file || file.size > 800000) return alert("Dosya 1MB altı olmalı!");
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      await addDoc(collection(db, 'messages'), {
        text: file.name,
        fileData: reader.result, // Base64 Firestore'a
        fileType: file.type.split('/')[0],
        user: user.displayName,
        photo: user.photoURL,
        roomId: activeTextChannel.id,
        timestamp: serverTimestamp(),
      });
    };
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    await addDoc(collection(db, 'messages'), {
      text: input, user: user.displayName, photo: user.photoURL,
      roomId: activeTextChannel.id, timestamp: serverTimestamp(),
    });
    setInput('');
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#313338] min-w-0">
      <div className="h-16 flex items-center justify-between px-6 border-b border-black/20 shrink-0">
        <div className="flex items-center text-white font-bold">
          <Hash size={20} className="mr-2 text-gray-400" /> {activeTextChannel?.name}
        </div>
        
        {activeVoiceRoom && (
          <div className="flex items-center gap-2 bg-black/20 px-3 py-1 rounded-lg border border-white/5">
            <Volume2 size={14} className="text-[#00d97e] animate-pulse" />
            <span className="text-[10px] text-gray-300 font-bold uppercase">{activeVoiceRoom}</span>
            <div className="w-[1px] h-3 bg-white/10 mx-1" />
            <Users size={12} className="text-[#00d97e]" />
            <span className="text-[10px] text-white font-bold">{remoteUsers.length + 1}</span>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="flex items-start gap-4">
            <img src={msg.photo} className="w-10 h-10 rounded-full" alt="" />
            <div className="min-w-0 flex-1">
              <span className="font-bold text-white text-sm">{msg.user}</span>
              <p className="text-gray-300 text-sm break-words">{msg.text}</p>
              {msg.fileData && (
                <div className="mt-2 max-w-sm rounded-lg border border-white/5 overflow-hidden">
                  {msg.fileType === 'image' ? <img src={msg.fileData} alt="" /> : <div className="p-3 bg-black/20 text-xs text-blue-400">Dosya: {msg.text}</div>}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <form onSubmit={sendMessage} className="p-4">
        <div className="bg-[#383a40] rounded-xl flex items-center px-4 py-2 gap-4">
          <label className="cursor-pointer text-gray-400 hover:text-white">
            <Paperclip size={20} />
            <input type="file" className="hidden" onChange={handleFileUpload} />
          </label>
          <input 
            type="text" value={input} onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-gray-200 outline-none"
            placeholder={`${activeTextChannel?.name} kanalına yaz...`}
          />
        </div>
      </form>
    </div>
  );
}
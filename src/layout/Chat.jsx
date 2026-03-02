import React, { useState, useEffect, useRef } from 'react';
import { Hash, Send } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, doc, deleteDoc } from 'firebase/firestore';

export default function Chat({ user }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, msgId: null });
  const endRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
    return onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (err) => console.error("Firebase Hatası:", err));
  }, []);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    await addDoc(collection(db, 'messages'), {
      text: input, user: user.displayName, photo: user.photoURL, timestamp: serverTimestamp(), roomId: "global"
    });
    setInput('');
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'messages', id));
      setContextMenu({ ...contextMenu, visible: false });
    } catch (err) { console.error("Silme hatası:", err); }
  };

  return (
    <div className="flex flex-col flex-1 h-full bg-[#313338] min-w-0 overflow-hidden" onClick={() => setContextMenu({ visible: false })}>
      <div className="flex items-center h-16 px-4 border-b border-black/20 shrink-0 bg-[#313338] z-10 shadow-sm">
        <Hash className="text-gray-400 mr-2" size={24} />
        <span className="font-bold text-white text-lg tracking-tight uppercase italic">Genel Sohbet</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className="flex gap-4 group relative hover:bg-black/5 p-1 rounded-md transition-colors"
            onContextMenu={(e) => {
              e.preventDefault();
              setContextMenu({ visible: true, x: e.pageX, y: e.pageY, msgId: msg.id });
            }}
          >
            <img src={msg.photo} className="w-10 h-10 rounded-full mt-0.5 shrink-0 shadow-sm" alt="" />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#7289da] text-[15px] italic">{msg.user}</span>
                <span className="text-[10px] text-gray-500 font-bold">
                  {msg.timestamp?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-[#dcddde] text-[14px] leading-relaxed break-words">{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {contextMenu.visible && (
        <div className="fixed bg-[#111214] border border-white/5 p-1 rounded shadow-2xl z-[100]" style={{ top: contextMenu.y, left: contextMenu.x }}>
          <button onClick={() => handleDelete(contextMenu.msgId)} className="text-red-400 text-xs font-bold px-6 py-2 hover:bg-red-500 hover:text-white rounded transition-all w-full text-left">Mesajı Sil</button>
        </div>
      )}

      <div className="p-4 bg-[#313338] shrink-0">
        <form onSubmit={sendMessage} className="flex items-center gap-4 bg-[#383a40] px-4 py-2.5 rounded-xl border border-white/5 shadow-inner">
          <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Mesaj yaz..." className="flex-1 bg-transparent outline-none text-gray-200 text-sm placeholder:italic" />
          <button type="submit" className="text-[#7289da] hover:scale-110 transition-transform"><Send size={22} /></button>
        </form>
      </div>
    </div>
  );
}
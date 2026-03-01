import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import ServerSidebar from './layout/ServerSidebar';
import ChannelSidebar from './layout/ChannelSidebar';
import Chat from './layout/Chat';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);
  const [activeTextChannel, setActiveTextChannel] = useState({ id: 'genel', name: 'genel-sohbet' });
  const [activeVoiceRoom, setActiveVoiceRoom] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser || null);
    });
    return () => unsubscribe();
  }, []);

  if (!user) return <Login />;

  return (
    <div className="flex h-screen w-full bg-[#121315] overflow-hidden">
      <ServerSidebar />
      <ChannelSidebar 
        user={user}
        activeTextChannel={activeTextChannel} 
        setActiveTextChannel={setActiveTextChannel}
        activeVoiceRoom={activeVoiceRoom}
        setActiveVoiceRoom={setActiveVoiceRoom}
      />
      <Chat 
        user={user} 
        activeTextChannel={activeTextChannel} 
        activeVoiceRoom={activeVoiceRoom} 
      />
    </div>
  );
}

export default App;
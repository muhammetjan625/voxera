import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Login from './components/Login';
import ChannelSidebar from './layout/ChannelSidebar';
import Chat from './layout/Chat';

function App() {
  const [user, setUser] = useState(null);
  const [activeVoiceRoom, setActiveVoiceRoom] = useState(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => setUser(u));
  }, []);

  if (!user) return <Login />;

  return (
    <div className="flex flex-row w-full h-screen bg-black overflow-hidden font-sans antialiased">
      <ChannelSidebar 
        user={user}
        activeVoiceRoom={activeVoiceRoom}
        setActiveVoiceRoom={setActiveVoiceRoom}
      />
      <Chat 
        user={user} 
        activeVoiceRoom={activeVoiceRoom} 
      />
    </div>
  );
}

export default App;
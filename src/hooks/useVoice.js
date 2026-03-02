import { useState, useEffect, useRef, useCallback } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

// Sadece temel client, macera aramıyoruz
const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
const APP_ID = "7a4d5a3141744e74abdca8ef64c35e95";

export function useVoice(activeVoiceRoom, user, setActiveVoiceRoom) {
  const [remoteUsers, setRemoteUsers] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [localLevel, setLocalLevel] = useState(0);
  const localAudioTrackRef = useRef(null);

  const leaveRoom = useCallback(async () => {
    if (localAudioTrackRef.current) {
      localAudioTrackRef.current.stop();
      localAudioTrackRef.current.close();
    }
    if (client.connectionState === "CONNECTED") await client.leave();
    setRemoteUsers([]);
    setLocalLevel(0);
    if (setActiveVoiceRoom) setActiveVoiceRoom(null);
  }, [setActiveVoiceRoom]);

  const toggleMute = async () => {
    if (localAudioTrackRef.current) {
      const newState = !isMuted;
      await localAudioTrackRef.current.setEnabled(!newState);
      setIsMuted(newState);
      if (newState) setLocalLevel(0);
    }
  };

  useEffect(() => {
    if (!activeVoiceRoom || !user?.uid) return;

    const initVoice = async () => {
      try {
        if (client.connectionState !== "DISCONNECTED") await client.leave();

        // Ses seviyesi takibi (Parlama için)
        client.enableAudioVolumeIndicator();
        client.on("volume-indicator", (volumes) => {
          // Kendi seviyeni bul
          const me = volumes.find(v => v.level > 5); 
          if (me) setLocalLevel(me.level);

          // Başkalarını güncelle
          setRemoteUsers(prev => prev.map(u => {
            const vol = volumes.find(v => v.uid === u.uid);
            return { ...u, isSpeaking: vol ? vol.level > 10 : false };
          }));
        });

        // Başka cihazda anında görünme garantisi
        client.on('user-joined', (remoteUser) => {
          setRemoteUsers(prev => [...prev.filter(u => u.uid !== remoteUser.uid), { ...remoteUser, isSpeaking: false }]);
        });

        client.on('user-published', async (remoteUser, mediaType) => {
          await client.subscribe(remoteUser, mediaType);
          if (mediaType === 'audio') {
            remoteUser.audioTrack.play();
            setRemoteUsers(prev => prev.map(u => u.uid === remoteUser.uid ? { ...u, isSpeaking: false } : u));
          }
        });

        client.on('user-unpublished', (u) => {
          setRemoteUsers(prev => prev.filter(user => user.uid !== u.uid));
        });

        // Sayısal ID karmaşasını Agora halletsin diye null geçiyoruz
        await client.join(APP_ID, activeVoiceRoom, null, null);

        const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        localAudioTrackRef.current = audioTrack;
        await client.publish(audioTrack);
      } catch (err) { console.error("Kritik Ses Hatası:", err); }
    };

    initVoice();
    return () => { leaveRoom(); };
  }, [activeVoiceRoom, user?.uid, leaveRoom]);

  return { remoteUsers, isMuted, toggleMute, localLevel, leaveRoom };
}
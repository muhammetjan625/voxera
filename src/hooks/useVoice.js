import { useState, useEffect } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';

const client = AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' });
const APP_ID = "7a4d5a3141744e74abdca8ef64c35e95"; // Yeni App ID

export function useVoice(activeVoiceRoom, user) {
  const [remoteUsers, setRemoteUsers] = useState([]);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);

  useEffect(() => {
    if (!activeVoiceRoom || !user?.uid) return;

    const init = async () => {
      try {
        if (client.connectionState !== "DISCONNECTED") await client.leave();

        client.on('user-published', async (remoteUser, mediaType) => {
          await client.subscribe(remoteUser, mediaType);
          if (mediaType === 'audio') {
            remoteUser.audioTrack.play();
            setRemoteUsers(prev => [...prev.filter(u => u.uid !== remoteUser.uid), remoteUser]);
          }
        });

        client.on('user-unpublished', (u) => setRemoteUsers(p => p.filter(user => user.uid !== u.uid)));

        // Testing Mode olduğu için token null
        await client.join(APP_ID, activeVoiceRoom, null, user.uid);
        
        const audioTrack = await AgoraRTC.createMicrophoneAudioTrack({
          ANS: true, AEC: true, AGC: true // Gürültü engelleme aktif
        });
        await client.publish(audioTrack);
        setLocalAudioTrack(audioTrack);
      } catch (e) { console.error("Agora Hatası:", e); }
    };

    init();
    return () => {
      localAudioTrack?.stop();
      localAudioTrack?.close();
      client.leave().catch(() => {});
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeVoiceRoom, user?.uid]);

  return { remoteUsers };
}
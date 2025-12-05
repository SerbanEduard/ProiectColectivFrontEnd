import { useEffect, useState, useRef } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useVoiceStore } from "@/services/stores/useVoiceStore";
import { buildJoinWsUrl } from "@/services/react-query/voice";
import { useAuthStore } from "@/services/stores/useAuthStore";
import { DefaultApi, Configuration } from "@/api";

export function PrivateVoiceRoom({ autoJoin, onCallEnded }: { autoJoin?: boolean, onCallEnded?: () => void } = { autoJoin: false }) {
  const { selectedRoomId, users, addUser, removeUser, setWs, ws, setUsers, setSpeaking, speaking } = useVoiceStore();
  const { user, token } = useAuthStore();
  const [joined, setJoined] = useState(false);
  const pcRefs = useRef<Record<string, RTCPeerConnection>>({});
  const pcOfferTimersRef = useRef<Record<string, number>>({});
  const cleanupTimerRef = useRef<number | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const audioCtxRef = useRef<any | null>(null);
  const audioElsRef = useRef<Record<string, HTMLAudioElement>>({});

  const stopAllRemoteAudio = (clearSrc = true) => {
    try {
      Object.values(audioElsRef.current).forEach((el) => {
        try {
          el.pause();
          el.muted = true;
          if (clearSrc) {
            try { (el as any).srcObject = null; } catch {};
          }
        } catch {}
      });
    } catch {}
  };
  
  // Create API instance for fetching user data
  const apiRef = useRef<DefaultApi | null>(null);
  useEffect(() => {
    if (token) {
      const basePath = import.meta.env.VITE_API_URL || 'http://localhost:8080';
      const config = new Configuration({ 
        apiKey: `Bearer ${token}`,
        basePath: basePath
      });
      apiRef.current = new DefaultApi(config);
      console.log('[PrivateVoice] API configured with basePath:', basePath);
    }
  }, [token]);

  useEffect(() => {
    if (!ws) setJoined(false);
  }, [ws]);

  const sanitizeName = (raw: any, uid: string) => {
    try {
      if (!raw && raw !== 0) return `User ${String(uid).slice(-4)}`;
      if (typeof raw === 'string') return raw;
      if (typeof raw === 'number' || typeof raw === 'boolean') return String(raw);
      if (typeof raw === 'object') {
        const cand = raw.username || raw.name || raw.displayName || uid;
        if (cand && typeof cand === 'string' && cand.length > 0) return cand;
        const parts = [] as string[];
        if (raw.firstname) parts.push(String(raw.firstname));
        if (raw.lastname) parts.push(String(raw.lastname));
        if (parts.length) return parts.join(' ');
        return `User ${String(uid).slice(-4)}`;
      }
      return String(raw);
    } catch (e) {
      return `User ${String(uid).slice(-4)}`;
    }
  };

  // Helper to fetch and update user info
  const fetchAndUpdateUserInfo = async (userId: string) => {
    if (!apiRef.current) {
      console.log('[PrivateVoice] API not ready for', userId);
      const current = useVoiceStore.getState().users;
      if (!current.some((u) => String(u.userId) === String(userId))) {
        setUsers([...current, { userId: String(userId), username: `User ${String(userId).slice(-4)}` }]);
      }
      return;
    }
    try {
      console.log('[PrivateVoice] fetching user info for', userId);
      const resp = await apiRef.current.usersIdGet(userId);
      console.log('[PrivateVoice] got response for', userId, resp);
      const userData = (resp as any)?.data || resp;
      console.log('[PrivateVoice] userData extracted:', userData);

      if (userData && (userData.username || userData.firstname)) {
        console.log('[PrivateVoice] updating with username:', userData.username || userData.firstname);
        const current = useVoiceStore.getState().users;
        const updated = current.map((u) => 
          String(u.userId) === String(userId) 
            ? { ...u, username: userData.username || userData.firstname || u.username }
            : u
        );
        if (!updated.some((u) => String(u.userId) === String(userId))) {
          updated.push({ userId: String(userId), username: userData.username || userData.firstname });
        }
        setUsers(updated);
      } else {
        console.log('[PrivateVoice] no username/firstname in userData, applying fallback display name');
        const current = useVoiceStore.getState().users;
        const updated = current.map((u) => (String(u.userId) === String(userId) ? { ...u, username: `User ${String(userId).slice(-4)}` } : u));
        if (!updated.some((u) => String(u.userId) === String(userId))) updated.push({ userId: String(userId), username: `User ${String(userId).slice(-4)}` });
        setUsers(updated);
      }
    } catch (e) {
      console.error('[PrivateVoice] fetch user info failed for', userId, e);
      try {
        const current = useVoiceStore.getState().users;
        const fallback = `User ${String(userId).slice(-4)}`;
        if (!current.some((u) => String(u.userId) === String(userId))) {
          setUsers([...current, { userId: String(userId), username: fallback }]);
        } else {
          const updated = current.map((u) => (String(u.userId) === String(userId) ? { ...u, username: fallback } : u));
          setUsers(updated);
        }
      } catch {}
    }
  };

  useEffect(() => {
    // cleanup when switching rooms: schedule a delayed cleanup (grace) so quick rejoin can reuse streams
    setUsers([]);
    setJoined(false);
    if (ws) { try { ws.close(); } catch {} setWs(undefined); }
    try {
      stopAllRemoteAudio(true);
      try { if (cleanupTimerRef.current) { clearTimeout(cleanupTimerRef.current); } } catch {}
      cleanupTimerRef.current = window.setTimeout(() => {
        try {
          Object.values(pcRefs.current).forEach((p) => { try { p.close(); } catch {} });
          pcRefs.current = {};
          try { Object.values(audioElsRef.current).forEach((el) => { try { el.pause(); } catch {} }); } catch {}
        } catch (e) { console.warn('[PrivateVoice] delayed cleanup failed', e); }
        cleanupTimerRef.current = null;
      }, 4000);
    } catch {}
  }, [selectedRoomId]);

  const doJoin = async () => {
    if (!selectedRoomId || !user?.id) return;
    
    // Ensure a single AudioContext instance and resume it on user gesture to allow autoplay
    try {
      const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
        try { await audioCtxRef.current.resume(); } catch {}
        try {
          const osc = audioCtxRef.current.createOscillator();
          const gain = audioCtxRef.current.createGain();
          gain.gain.value = 0;
          osc.connect(gain);
          gain.connect(audioCtxRef.current.destination);
          osc.start();
          setTimeout(() => { try { osc.stop(); osc.disconnect(); gain.disconnect(); } catch {} }, 50);
        } catch (e) {}
      }
    } catch (e) {
      // ignore
    }
    
    const base = buildJoinWsUrl(selectedRoomId, String(user.id));
    const url = token ? `${base}&token=${encodeURIComponent(token)}` : base;
    const conn = new WebSocket(url);
    setWs(conn);
    try { if (cleanupTimerRef.current) { clearTimeout(cleanupTimerRef.current); cleanupTimerRef.current = null; } } catch {}

    let vadRunning = false;
    function sendSafe(payload: any) {
      try {
        const ready = conn && conn.readyState;
        console.log('[PrivateVoice] sendSafe, ws.readyState=', ready);
        if (conn && conn.readyState === WebSocket.OPEN) {
          conn.send(typeof payload === 'string' ? payload : JSON.stringify(payload));
        } else {
          console.warn('[PrivateVoice] ws not open');
        }
      } catch {}
    }

    conn.onopen = async () => {
      console.log('PrivateVoice: ws onopen fired, readyState=', conn.readyState);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('PrivateVoice: obtained local media stream', stream);
        localStreamRef.current = stream;
        setJoined(true);
        addUser({ userId: String(user.id), username: (user as any).username || `You` });
        try { sendSafe({ type: 'ready' }); } catch {}

        // simple VAD: analyze audio levels and notify peers
        try {
          const AudioCtx = (window as any).AudioContext || (window as any).webkitAudioContext;
          const audioCtx = new AudioCtx();
          const source = audioCtx.createMediaStreamSource(stream);
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 2048;
          source.connect(analyser);
          const data = new Uint8Array(analyser.frequencyBinCount);
          let speakingState = false;
          vadRunning = true;
          const sample = () => {
            if (!vadRunning) return;
            analyser.getByteTimeDomainData(data);
            let sum = 0;
            for (let i = 0; i < data.length; i++) {
              const v = (data[i] - 128) / 128;
              sum += v * v;
            }
            const rms = Math.sqrt(sum / data.length);
            const isSpeaking = rms > 0.02;
            if (isSpeaking !== speakingState) {
              speakingState = isSpeaking;
              try { setSpeaking && setSpeaking(String(user.id), isSpeaking); } catch {}
              try { sendSafe({ type: 'activity', active: isSpeaking }); } catch {}
            }
            requestAnimationFrame(sample);
          };
          sample();
        } catch (e) {
          // ignore vad errors
        }
      } catch (e) { console.error('getUserMedia failed', e); }
    };

    conn.onmessage = async (evt) => {
      try {
        console.log('PrivateVoice: raw ws message', evt.data);
        const msg = JSON.parse(evt.data);
        // handle call-ended messages for private calls
        if (msg.type === 'call-ended') {
          try { conn.close(); } catch {}
          setJoined(false);
          setWs(undefined);
          setUsers([]);
          try { if (onCallEnded) onCallEnded(); } catch {}
          return;
        }
        const from = msg.from;
        if (msg.type === 'room-info' && Array.isArray(msg.users)) {
          // msg.users can be either an array of userId strings OR an array of user objects
            const normalized = msg.users.map((entry: any) => {
            if (entry && typeof entry === 'object') {
              const uid = String(entry.userId ?? entry.id ?? entry.user ?? '');
              const username = entry.username ?? entry.name ?? entry.displayName ?? uid;
              // if this is the current user, prefer the auth-provided username
              if (String(uid) === String(user?.id) && (user as any)?.username) {
                return { userId: uid, username: (user as any).username };
              }
              return { userId: uid, username };
            }
            return { userId: String(entry), username: String(entry) };
          });
          console.log('[PrivateVoice] room-info received with users (normalized):', normalized);
          setUsers(normalized);
          // Fetch missing usernames for entries where username equals id or is empty
          normalized.forEach((u: any) => {
            if (String(user?.id) !== String(u.userId) && (!u.username || u.username === u.userId)) {
              console.log('[PrivateVoice] triggering fetch for', u.userId);
              fetchAndUpdateUserInfo(String(u.userId));
            }
          });
          return;
        }
        if (msg.type === 'ready' && from) {
          // immediately show the user in participant list
          console.log('[PrivateVoice] ready message from', from);
          addUser(String(from));
          // fetch their username from API
          fetchAndUpdateUserInfo(String(from));
          if (!pcRefs.current[from]) {
            const pc = new RTCPeerConnection({
              iceServers: [
                { urls: "stun:stun.l.google.com:19302" },
              ],
            });
            // set a fallback timer: if the other side doesn't send SDP, create an offer after a short delay
            if (pcOfferTimersRef.current[from]) {
              try { clearTimeout(pcOfferTimersRef.current[from]); } catch {}
            }
            pcOfferTimersRef.current[from] = window.setTimeout(async () => {
              try {
                const existingPc = pcRefs.current[from];
                if (!existingPc) return;
                const hasRemote = !!existingPc.remoteDescription;
                if (!hasRemote) {
                  console.log('[PrivateVoice] fallback: creating offer for', from);
                  const offer = await existingPc.createOffer();
                  await existingPc.setLocalDescription(offer);
                  try { conn.send(JSON.stringify({ type: 'sdp', sdp: offer, to: from })); } catch (err) { console.warn('[PrivateVoice] fallback send sdp failed', err); }
                }
              } catch (e) { console.warn('[PrivateVoice] fallback offer failed', e); }
            }, 700);
            pcRefs.current[from] = pc;
            if (localStreamRef.current) {
              localStreamRef.current.getTracks().forEach((t) => {
                try {
                  pc.addTrack(t, localStreamRef.current!);
                  console.log('PrivateVoice: added local track', t.kind, t.id, 'to pc for', from);
                } catch (e) { console.warn('PrivateVoice: addTrack failed', e); }
              });
              try { console.log('PrivateVoice: pc.getSenders after addTrack', pc.getSenders().map(s => ({trackKind: s.track?.kind, id: s.track?.id}))); } catch (e) {}
            }
            pc.ontrack = (ev) => {
              console.log('[PrivateVoice] ontrack fired for', from, 'track:', ev.track.kind, ev.streams.length, 'streams');
              const remoteStream = ev.streams && ev.streams[0] ? ev.streams[0] : new MediaStream([ev.track]);
              console.log('[PrivateVoice] remoteStream:', remoteStream.id, 'active:', remoteStream.active, 'audioTracks:', remoteStream.getAudioTracks().length);
              
              let audioEl = audioElsRef.current[from];
              if (!audioEl) {
                audioEl = document.createElement('audio');
                audioEl.autoplay = true;
                // start muted until we ensure audio context/resume, then unmute when play allowed
                audioEl.muted = true;
                audioEl.volume = 1.0;
                audioEl.setAttribute('playsinline', '');
                audioEl.style.display = 'none';
                document.body.appendChild(audioEl);
                audioElsRef.current[from] = audioEl;
                console.log('[PrivateVoice] created audio element for', from);
              }
              audioEl.srcObject = remoteStream;
              console.log('[PrivateVoice] assigned srcObject to audio element');
              
              // Retry play with more aggressive timing and a longer backoff
              const tryPlay = async (retries = 10, delay = 150) => {
                try {
                  if (audioCtxRef.current) {
                    try { await audioCtxRef.current.resume(); } catch {}
                  }
                } catch {}
                for (let i = 0; i < retries; i++) {
                  try {
                    console.log('[PrivateVoice] attempting play for', from, 'attempt', i + 1);
                    const playPromise = audioEl.play();
                    if (playPromise) {
                      await playPromise;
                    }
                    // Unmute only after successful play to avoid autoplay blocks
                    try { audioEl.muted = false; } catch {}
                    console.log('[PrivateVoice] audio playing successfully for', from);
                    return true;
                  } catch (err: any) {
                    console.warn('[PrivateVoice] play attempt', i + 1, 'failed for', from, ':', err?.message);
                    if (i < retries - 1) {
                      await new Promise(r => setTimeout(r, delay));
                    }
                  }
                }
                console.error('[PrivateVoice] all play attempts failed for', from, '— user gesture may be required.');
                return false;
              };
              tryPlay();
              addUser(String(from));
            };
            pc.onicecandidate = (e) => { if (e.candidate) { try { console.log('PrivateVoice: sending ice to', from, e.candidate); conn.send(JSON.stringify({ type: 'ice', candidate: e.candidate, to: from })); } catch (err) { console.warn('send ice failed', err); } } };
            pc.oniceconnectionstatechange = () => { console.log('PrivateVoice: iceConnectionState for', from, pc.iceConnectionState); };
            pc.onconnectionstatechange = () => { console.log('PrivateVoice: connectionState for', from, pc.connectionState); };
            if (String(user.id) > String(from)) {
              try {
                console.log('[PrivateVoice] creating offer for', from, '(user.id=', user.id, '> from=', from, ')');
                const offer = await pc.createOffer();
                await pc.setLocalDescription(offer);
                console.log('[PrivateVoice] created and set local offer for', from, 'type=', offer.type, 'sdpLen=', (offer.sdp || '').length);
                try {
                  console.log('[PrivateVoice] sending sdp offer to', from, 'type=', offer.type);
                  conn.send(JSON.stringify({ type: 'sdp', sdp: offer, to: from }));
                  // clear fallback timer if we proactively created an offer
                  try { if (pcOfferTimersRef.current[from]) { clearTimeout(pcOfferTimersRef.current[from]); delete pcOfferTimersRef.current[from]; } } catch {}
                } catch (err) { console.warn('[PrivateVoice] send sdp offer failed', err); }
              } catch (e) { console.error('[PrivateVoice] offer creation error', e); }
            } else {
              console.log('[PrivateVoice] NOT creating offer (user.id=', user.id, '<=', from, ')');
            }
          }
          return;
        }
        if (msg.type === 'sdp' && msg.sdp && from) {
          // clear any fallback offer timer since we received SDP from peer
          try { if (pcOfferTimersRef.current[from]) { clearTimeout(pcOfferTimersRef.current[from]); delete pcOfferTimersRef.current[from]; } } catch {}
          if (!pcRefs.current[from]) {
            const pc = new RTCPeerConnection({
              iceServers: [
                { urls: "stun:stun.l.google.com:19302" },
              ],
            });
            pcRefs.current[from] = pc;
            if (localStreamRef.current) localStreamRef.current.getTracks().forEach((t) => pc.addTrack(t, localStreamRef.current!));
            pc.ontrack = (ev) => {
              console.log('[PrivateVoice] ontrack (sdp) fired for', from, 'track:', ev.track.kind, ev.streams.length, 'streams');
              const remoteStream = ev.streams && ev.streams[0] ? ev.streams[0] : new MediaStream([ev.track]);
              console.log('[PrivateVoice] remoteStream (sdp):', remoteStream.id, 'active:', remoteStream.active, 'audioTracks:', remoteStream.getAudioTracks().length);
              
              let audioEl = audioElsRef.current[from];
              if (!audioEl) {
                audioEl = document.createElement('audio');
                audioEl.autoplay = true;
                audioEl.muted = true;
                audioEl.volume = 1.0;
                audioEl.setAttribute('playsinline', '');
                audioEl.style.display = 'none';
                document.body.appendChild(audioEl);
                audioElsRef.current[from] = audioEl;
                console.log('[PrivateVoice] created audio element (sdp) for', from);
              }
              audioEl.srcObject = remoteStream;
              console.log('[PrivateVoice] assigned srcObject to audio element (sdp)');
              
              // Retry play with more aggressive timing and a longer backoff
              const tryPlay = async (retries = 10, delay = 150) => {
                try {
                  if (audioCtxRef.current) {
                    try { await audioCtxRef.current.resume(); } catch {}
                  }
                } catch {}
                for (let i = 0; i < retries; i++) {
                  try {
                    console.log('[PrivateVoice] attempting play (sdp) for', from, 'attempt', i + 1);
                    const playPromise = audioEl.play();
                    if (playPromise) {
                      await playPromise;
                    }
                    try { audioEl.muted = false; } catch {}
                    console.log('[PrivateVoice] audio playing successfully (sdp) for', from);
                    return true;
                  } catch (err: any) {
                    console.warn('[PrivateVoice] play attempt (sdp)', i + 1, 'failed for', from, ':', err?.message);
                    if (i < retries - 1) {
                      await new Promise(r => setTimeout(r, delay));
                    }
                  }
                }
                console.error('[PrivateVoice] all play attempts (sdp) failed for', from, '— user gesture may be required.');
                return false;
              };
              tryPlay();
              addUser(String(from));
            };
            pc.onicecandidate = (e) => { if (e.candidate) { try { console.log('PrivateVoiceRoom: sending ice (sdp path) to', from, e.candidate); conn.send(JSON.stringify({ type: 'ice', candidate: e.candidate, to: from })); } catch (err) { console.warn('send ice failed', err); } } };
            pc.oniceconnectionstatechange = () => { console.log('PrivateVoiceRoom: iceConnectionState (sdp path) for', from, pc.iceConnectionState); };
            pc.onconnectionstatechange = () => { console.log('PrivateVoiceRoom: connectionState (sdp path) for', from, pc.connectionState); };
          }
          const pc = pcRefs.current[from];
          const remoteDesc = new RTCSessionDescription(msg.sdp);
          await pc.setRemoteDescription(remoteDesc);
          console.log('PrivateVoiceRoom: setRemoteDescription for', from, 'type=', remoteDesc.type);
          if (remoteDesc.type === 'offer') {
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            console.log('PrivateVoiceRoom: created answer for', from, 'type=', answer.type);
            try {
              conn.send(JSON.stringify({ type: 'sdp', sdp: answer, to: from }));
              try { if (pcOfferTimersRef.current[from]) { clearTimeout(pcOfferTimersRef.current[from]); delete pcOfferTimersRef.current[from]; } } catch {}
            } catch (err) { console.warn('PrivateVoiceRoom: send sdp answer failed', err); }
          }
          return;
        }
        if (msg.type === 'ice' && msg.candidate && from) {
          const pc = pcRefs.current[from];
          if (pc) {
            try {
              await pc.addIceCandidate(msg.candidate);
              console.log('PrivateVoiceRoom: addIceCandidate success for', from);
            } catch (e) { console.warn('PrivateVoiceRoom: addIceCandidate failed for', from, e); }
          }
          return;
        }
        if (msg.type === 'activity' && from) {
          // speaking/activity indicator
          try { setSpeaking && setSpeaking(String(from), !!msg.active); } catch {}
          addUser(String(from));
          return;
        }
        if (msg.type === 'user-left' && msg.userId) {
          removeUser(String(msg.userId));
          return;
        }
      } catch (e) { console.error('ws msg parse', e); }
    };

    conn.onclose = () => {
      setJoined(false);
      setWs(undefined);
      try { vadRunning = false; } catch {}
      try {
        if (cleanupTimerRef.current) { clearTimeout(cleanupTimerRef.current); }
      } catch {}
      // stop audio immediately when the ws closes so user doesn't hear remote audio after leaving
      stopAllRemoteAudio(true);
      cleanupTimerRef.current = window.setTimeout(() => {
        try {
          Object.values(pcRefs.current).forEach((p) => { try { p.close(); } catch {} });
          pcRefs.current = {};
          try { Object.values(audioElsRef.current).forEach((el) => { try { el.pause(); } catch {} }); } catch {}
        } catch (e) { console.warn('[PrivateVoice] cleanup after close failed', e); }
        cleanupTimerRef.current = null;
      }, 4000);
    };
  };

  useEffect(() => { if (autoJoin && selectedRoomId && !joined) doJoin(); }, [autoJoin, selectedRoomId]);

  const doLeave = () => {
    try {
      if (onCallEnded) { onCallEnded(); return; }
    } catch (e) {}
    if (ws) { try { ws.close(); } catch {} setWs(undefined); }
    setJoined(false);
  };

  const displayName = (id: string) => {
    const found = users.find((u) => String(u.userId) === String(id));
    if (found && (found as any).username) return sanitizeName((found as any).username, id);
    if (user && String(user.id) === id) return (user as any).username || id;
    return id;
  };

  const userCount = users.length;
  const cols = userCount <= 1 ? 1 : Math.ceil(Math.sqrt(userCount));

  return (
    <div className="w-full h-full p-2">
      {!joined && (
        <div className="flex flex-col items-center justify-center h-full gap-4">
          <p className="text-lg font-semibold">Not joined to call</p>
          <Button size="lg" onClick={() => doJoin()} disabled={!selectedRoomId || !user?.id}>Join Call</Button>
        </div>
      )}

      {joined && (
        <div className="h-full w-full flex flex-col">
          <div className="flex justify-end mb-2">
            <Button variant="ghost" onClick={doLeave}>Leave</Button>
          </div>
          <div className="grid gap-4 w-full h-full items-stretch overflow-auto" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`, gridAutoRows: '1fr' }}>
            {users.map((u) => (
              <div key={u.userId} className="flex flex-col items-center justify-center w-full h-full p-2">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-full" style={{ maxWidth: 'clamp(120px, 30vmin, 360px)' }}>
                    <div className="aspect-square w-full flex items-center justify-center">
                      <Avatar className={`w-full h-full ${speaking && speaking[String(u.userId)] ? 'ring-4 ring-green-400' : ''}`}>
                        <AvatarFallback>{String(u.userId).slice(0,2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </div>
                  </div>
                </div>
                <div className="mt-2 text-sm text-center break-words">{displayName(u.userId)}</div>
              </div>
            ))}
            {users.length === 0 && (<div className="text-muted-foreground">No users in call yet</div>)}
          </div>
        </div>
      )}
    </div>
  );
}

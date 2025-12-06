import { fetchAndUpdateUserInfo, stopAllRemoteAudio, normalizeRoomUsers } from './voiceHelpers';
import { useVoiceStore } from '@/services/stores/useVoiceStore';
import { ensurePeerConnectionForReady, handleSdpMessage, addIceCandidateToPc } from './voicePcManager';
import { buildJoinWsUrl } from './voice';

export function createSignalingConnection(params: {
  selectedRoomId: string;
  userId: string | number;
  token?: string | null;
  authUser?: any | null;
  setWs: (ws?: WebSocket) => void;
  setJoined: (v: boolean) => void;
  setUsers: (u: any[]) => void;
  setSpeaking?: (id: string, val: boolean) => void;
  addUser: (u: any) => void;
  removeUser: (id: string) => void;
  pcRefs: Record<string, RTCPeerConnection>;
  pcOfferTimersRef: Record<string, number>;
  localStreamRef: { current: MediaStream | null };
  audioElsRef: Record<string, HTMLAudioElement>;
  audioCtxRef: { current: any } | null;
  apiRef: { current: any } | null;
  onCallEnded?: () => void;
}) {
  const { selectedRoomId, userId, token, authUser, setWs, setJoined, setUsers, setSpeaking, addUser, removeUser, pcRefs, pcOfferTimersRef, localStreamRef, audioElsRef, audioCtxRef, apiRef, onCallEnded } = params;
  console.log('[voiceSignaling] createSignalingConnection params:', { selectedRoomId, userId, token });
  // Build a join URL that matches backend route: /voice/join/{roomId}?userId={userId}
  const base = buildJoinWsUrl(String(selectedRoomId), String(userId));
  const url = token ? `${base}&token=${encodeURIComponent(token)}` : base;
  console.log('[voiceSignaling] connecting to ws url=', url);
  let conn: WebSocket | null = null;
  try {
    conn = new WebSocket(url);
    setWs(conn);
  } catch (err) {
    console.error('[voiceSignaling] WebSocket construction failed', err);
    throw err;
  }

  conn.onerror = (ev) => { console.error('[voiceSignaling] ws error', ev); };

  let vadRunning = false;

  function sendSafe(payload: any) {
    try {
      if (conn && conn.readyState === WebSocket.OPEN) {
        conn.send(typeof payload === 'string' ? payload : JSON.stringify(payload));
      }
    } catch {}
  }

  conn.onopen = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      localStreamRef.current = stream;
      setJoined(true);
      // prefer authenticated username when available
      const localName = (authUser && (authUser.username || authUser.name)) ? (authUser.username || authUser.name) : `You`;
      addUser({ userId: String(userId), username: localName });
      try { sendSafe({ type: 'ready' }); } catch {}

      // VAD
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
            try { setSpeaking && setSpeaking(String(userId), isSpeaking); } catch {}
            try { sendSafe({ type: 'activity', active: isSpeaking }); } catch {}
          }
          requestAnimationFrame(sample);
        };
        sample();
      } catch (e) {}
    } catch (e) { console.error('getUserMedia failed', e); }
  };

  conn.onmessage = async (evt) => {
    try {
      const msg = JSON.parse(evt.data);
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
        // normalize and prefer authenticated user's username when present
        const normalized = normalizeRoomUsers(msg.users, authUser || { id: userId });
        setUsers(normalized);
        normalized.forEach((u: any) => {
          if (String(userId) !== String(u.userId) && (!u.username || u.username === u.userId)) {
            fetchAndUpdateUserInfo(apiRef ? apiRef.current : null, String(u.userId), setUsers);
          }
        });
        return;
      }
      if (msg.type === 'ready' && from) {
        addUser(String(from));
        fetchAndUpdateUserInfo(apiRef ? apiRef.current : null, String(from), setUsers);
        try {
          ensurePeerConnectionForReady(String(from), {
            pcRefs,
            pcOfferTimersRef,
            localStreamRef: localStreamRef.current,
            audioElsRef,
            audioCtxRef,
            conn,
            user: { id: userId },
            addUser,
            fetchAndUpdateUserInfo,
            setUsers,
            setSpeaking,
          });
        } catch (e) { console.warn('ensurePeerConnectionForReady failed', e); }
        return;
      }
      if (msg.type === 'sdp' && msg.sdp && from) {
        try { await handleSdpMessage(String(from), msg.sdp, { pcRefs, localStreamRef: localStreamRef.current, pcOfferTimersRef, conn, audioElsRef, audioCtxRef, addUser }); } catch (e) { console.warn('handleSdpMessage failed', e); }
        return;
      }
      if (msg.type === 'ice' && msg.candidate && from) {
        try { await addIceCandidateToPc(String(from), msg.candidate, { pcRefs }); } catch (e) { console.warn('addIceCandidate failed', e); }
        return;
      }
      if (msg.type === 'activity' && from) {
        try { setSpeaking && setSpeaking(String(from), !!msg.active); } catch {}
        addUser(String(from));
        return;
      }
      if (msg.type === 'user-left' && msg.userId) {
        try {
          // update store users immediately
          try { removeUser(String(msg.userId)); } catch {}
          try {
            const current = useVoiceStore.getState().users || [];
            const updated = current.filter((u: any) => String(u.userId) !== String(msg.userId));
            setUsers(updated);
          } catch (e) {}
          // clear any remote audio element for that user and speaking flag
          try {
            try { setSpeaking && setSpeaking(String(msg.userId), false); } catch {}
            const audEl = audioElsRef && audioElsRef[String(msg.userId)];
            if (audEl) {
              try { audEl.pause(); } catch {}
              try { audEl.muted = true; } catch {}
              try { (audEl as any).srcObject = null; } catch {}
              try { if (audEl.parentNode) audEl.parentNode.removeChild(audEl); } catch {}
              try { delete audioElsRef[String(msg.userId)]; } catch {}
            }
          } catch (e) { console.warn('[voiceSignaling] cleanup audio on user-left failed', e); }
        } catch (e) { console.warn('[voiceSignaling] user-left handling failed', e); }
        return;
      }
    } catch (e) { console.error('ws msg parse', e); }
  };

  conn.onclose = () => {
    setJoined(false);
    setWs(undefined);
    try { vadRunning = false; } catch {}
    try { stopAllRemoteAudio(audioElsRef, true); } catch {}
    try {
      Object.values(pcRefs).forEach((p) => { try { p.close(); } catch {} });
    } catch (e) {}
  };

  return conn;
}

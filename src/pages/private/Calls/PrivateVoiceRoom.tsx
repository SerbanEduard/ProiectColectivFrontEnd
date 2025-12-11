import { useEffect, useState, useRef } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useVoiceStore } from "@/services/stores/useVoiceStore";
// buildJoinWsUrl removed; use centralized signaling helper instead
import { useAuthStore } from "@/services/stores/useAuthStore";
import { DefaultApi } from "@/api";
import { makeApi, stopAllRemoteAudio } from '@/services/react-query/voiceHelpers';
import { sanitizeName } from './privateVoiceUtils';
import { createSignalingConnection } from '@/services/react-query/voiceSignaling';

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

  // stopAllRemoteAudio provided by voiceHelpers
  
  // Create API instance for fetching user data
  const apiRef = useRef<DefaultApi | null>(null);
  useEffect(() => {
    if (token) {
      apiRef.current = makeApi(token);
      console.log('[PrivateVoice] API configured via voiceHelpers');
    }
  }, [token]);

  useEffect(() => {
    if (!ws) setJoined(false);
  }, [ws]);

  

  // fetchAndUpdateUserInfo provided by voiceHelpers

  useEffect(() => {
    // cleanup when switching rooms: schedule a delayed cleanup (grace) so quick rejoin can reuse streams
    setUsers([]);
    setJoined(false);
    if (ws) { try { ws.close(); } catch {} setWs(undefined); }
    try {
      stopAllRemoteAudio(audioElsRef.current, true);
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
    
    // use shared signaling setup to keep technical logic out of the UI component
    try {
      createSignalingConnection({
        selectedRoomId: selectedRoomId as string,
        userId: user.id as string,
        authUser: user,
        token: token,
        setWs: setWs,
        setJoined: setJoined,
        setUsers: setUsers,
        setSpeaking: setSpeaking,
        addUser: addUser,
        removeUser: removeUser,
        pcRefs: pcRefs.current,
        pcOfferTimersRef: pcOfferTimersRef.current,
        localStreamRef: localStreamRef,
        audioElsRef: audioElsRef.current,
        audioCtxRef: audioCtxRef,
        apiRef: apiRef,
        onCallEnded: onCallEnded,
      });
    } catch (e) { console.warn('[PrivateVoice] createSignalingConnection failed', e); }
  };

  useEffect(() => { if (autoJoin && selectedRoomId && !joined) doJoin(); }, [autoJoin, selectedRoomId]);

  const doLeave = () => {
    try {
      if (onCallEnded) { onCallEnded(); return; }
    } catch (e) {}
    if (ws) { try { ws.close(); } catch {} setWs(undefined); }
    try { stopAllRemoteAudio(audioElsRef.current, true); } catch {}
    try { setUsers([]); } catch {}
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

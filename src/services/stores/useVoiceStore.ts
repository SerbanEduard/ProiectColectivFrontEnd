import { create } from "zustand";
import type { RoomResponse } from "../react-query/voice";

type VoiceUser = { userId: string; username?: string };

type VoiceState = {
  rooms: RoomResponse[];
  selectedRoomId?: string;
  users: VoiceUser[];
  ws?: WebSocket;
  speaking: Record<string, boolean>;
  setRooms: (rooms: RoomResponse[]) => void;
  selectRoom: (roomId?: string) => void;
  setUsers: (users: VoiceUser[]) => void;
  addUser: (user: string | VoiceUser) => void;
  removeUser: (userId: string) => void;
  setWs: (ws?: WebSocket) => void;
  setSpeaking: (userId: string, val: boolean) => void;
  reset: () => void;
};

export const useVoiceStore = create<VoiceState>((set, get) => ({
  rooms: [],
  selectedRoomId: undefined,
  users: [],
  ws: undefined,
  speaking: {},
  setRooms: (rooms) => set({ rooms }),
  selectRoom: (roomId) => set({ selectedRoomId: roomId, users: [] }),
  setUsers: (users) => set({ users }),
  addUser: (user) => set((s) => {
    const maybeObj: VoiceUser = typeof user === 'string' ? { userId: user } : user;
    if (s.users.some((u) => u.userId === maybeObj.userId)) return s;
    return { users: [...s.users, maybeObj] };
  }),
  removeUser: (userId) => set((s) => ({ users: s.users.filter((u) => u.userId !== userId) })),
  setWs: (ws) => set({ ws }),
  setSpeaking: (userId, val) => set((s) => ({ speaking: { ...(s.speaking || {}), [userId]: val } })),
  reset: () => {
    try {
      const current = get();
      if (current.ws) {
        try { current.ws.close(); } catch {}
      }
    } catch {}
    set({ rooms: [], selectedRoomId: undefined, users: [], ws: undefined, speaking: {} });
  },
}));

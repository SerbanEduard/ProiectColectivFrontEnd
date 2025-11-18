import type { DtoUserResponse } from '@/api';
import { create } from 'zustand';

interface FriendState {
	friends: DtoUserResponse[];
	setFriends: (f: DtoUserResponse[]) => void;
	addFriend: (u: DtoUserResponse) => void;
}

export const useFriendStore = create<FriendState>((set) => ({
	friends: [],
	setFriends: (f) => set({ friends: f }),
	addFriend: (u) => set((s) => ({ friends: [...s.friends, u] })),
}));


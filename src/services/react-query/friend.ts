import { api as generatedApi } from './api';
import type { DtoFriendRequestResponse, DtoUserResponse } from '@/api';

export type EnrichedPending = {
	request: DtoFriendRequestResponse;
	user?: DtoUserResponse;
};

export async function getPendingRequestsForUser(userId: string): Promise<EnrichedPending[]> {
	const resp = await generatedApi.friendRequestsUserIdGet(userId);
	const data = (resp && (resp as any).data) || {};
	const requests: DtoFriendRequestResponse[] = data.requests || [];

	// enrich each request with the requester user object when possible
	const enriched = await Promise.all(requests.map(async (r) => {
		try {
			const uResp = await generatedApi.usersIdGet(r.fromUserId || '');
			const user = (uResp && (uResp as any).data) as DtoUserResponse;
			return { request: r, user } as EnrichedPending;
		} catch (e) {
			return { request: r } as EnrichedPending;
		}
	}));

	return enriched;
}

export function useGetPendingRequests() {
	return {
		mutate: (userId: string, opts?: { onSuccess?: (d: EnrichedPending[]) => void; onError?: (e: any) => void }) => {
			getPendingRequestsForUser(userId).then((d) => opts?.onSuccess?.(d)).catch((e) => opts?.onError?.(e));
		}
	};
}

export function useSendFriendRequest() {
	return {
		mutateAsync: async ({ fromUserId, toUserId }: { fromUserId: string; toUserId: string }) => {
			return generatedApi.friendRequestsFromUserIdToUserIdPost(fromUserId, toUserId);
		}
	};
}

export function useRespondFriendRequest() {
	return {
		mutateAsync: async ({ fromUserId, toUserId, accept }: { fromUserId: string; toUserId: string; accept: boolean }) => {
			return generatedApi.friendRequestsFromUserIdToUserIdPut(fromUserId, toUserId, { accept });
		}
	};
}

export function useSearchUsers() {
	return {
		mutate: async (opts: { query: string }, cb?: { onSuccess?: (res: DtoUserResponse[]) => void }) => {
			try {
				const resp = await generatedApi.usersGet();
				const users = (resp && (resp as any).data) || [];
				const q = (opts.query || '').toLowerCase().trim();
				if (!q) { cb?.onSuccess?.([]); return; }
				const filtered = (users as DtoUserResponse[]).filter((u) => {
					return !!(
						(u.username && u.username.toLowerCase().includes(q)) ||
						(u.email && u.email.toLowerCase().includes(q)) ||
						((u.firstname || '').toLowerCase().includes(q)) ||
						((u.lastname || '').toLowerCase().includes(q))
					);
				});
				cb?.onSuccess?.(filtered as DtoUserResponse[]);
			} catch (e) {
				cb?.onSuccess?.([]);
			}
		}
	};
}

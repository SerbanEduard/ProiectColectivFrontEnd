export const API_BASE = import.meta.env.VITE_API_BASE || ''

export type FriendRequest = {
  id: number
  fromUserId: number
  toUserId: number
  status?: string
}

export async function getPendingRequests(userId: number) {
  const res = await fetch(`${API_BASE}/friend-requests/pending/${userId}`)
  if (!res.ok) throw new Error('Failed to fetch pending requests')
  return res.json()
}

export async function sendFriendRequest(fromUserId: number, toUserId: number) {
  const res = await fetch(`${API_BASE}/friend-requests/${fromUserId}/${toUserId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  })
  if (!res.ok) throw new Error('Failed to send friend request')
  return res.json()
}

export async function respondToFriendRequest(fromUserId: number, toUserId: number, accept: boolean) {
  const res = await fetch(`${API_BASE}/friend-requests/${fromUserId}/${toUserId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ accepted: accept })
  })
  if (!res.ok) throw new Error('Failed to respond to friend request')
  return res.json()
}

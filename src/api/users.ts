export const API_BASE = import.meta.env.VITE_API_BASE || ''

export type User = {
  id: number
  name: string
  email?: string
  bio?: string
}

export async function getAllUsers() {
  const res = await fetch(`${API_BASE}/users`)
  if (!res.ok) throw new Error('Failed to fetch users')
  return res.json() as Promise<User[]>
}

export async function getUser(id: number) {
  const res = await fetch(`${API_BASE}/users/${id}`)
  if (!res.ok) throw new Error('Failed to fetch user')
  return res.json() as Promise<User>
}

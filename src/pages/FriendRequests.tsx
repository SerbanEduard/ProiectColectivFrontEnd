import { useEffect, useState } from 'react'
import './FriendRequests.css'

type User = {
  id: number
  name: string
  email?: string
  bio?: string
}

type FriendRequest = {
  id: number
  fromUserId: number
  toUserId: number
  fromUser: User
}

// NOTE: This component assumes a current user id is available.
// It checks localStorage for `userId` (number). If not found, it falls back to 1.
function getCurrentUserId() {
  const v = localStorage.getItem('userId')
  const id = v ? Number(v) : 1
  return id
}

export default function FriendRequests() {
  // ID-ul userului logat se ia automat din localStorage (sau va fi luat din context/backend pe viitor)
  const [currentUserId] = useState<number>(() => {
    const v = localStorage.getItem('userId')
    return v ? Number(v) : 99
  })
  const [pending, setPending] = useState<FriendRequest[]>([])
  const [query, setQuery] = useState('')
  const [searchResults, setSearchResults] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  // mock users
  const mockUsers: User[] = [
    { id: 1, name: 'Andrei Popescu', email: 'andrei@exemplu.com', bio: 'Student la info' },
    { id: 2, name: 'Maria Ionescu', email: 'maria@exemplu.com', bio: 'Front-end developer' },
    { id: 3, name: 'Vlad Georgescu', email: 'vlad@exemplu.com', bio: 'Backend enthusiast' },
    { id: 4, name: 'Ioana Dumitrescu', email: 'ioana@exemplu.com', bio: 'Designer' },
    { id: 99, name: 'Tu (user logat)', email: 'tu@exemplu.com', bio: 'Userul curent, pentru test' },
  ]

  // mock pending requests (to current user)
  function getMockPending(userId: number): FriendRequest[] {
    return [
      { id: 101, fromUserId: 1, toUserId: userId, fromUser: mockUsers[0] },
      { id: 102, fromUserId: 2, toUserId: userId, fromUser: mockUsers[1] },
    ]
  }

  useEffect(() => {
    setPending(getMockPending(currentUserId))
  }, [currentUserId])

  function onRespond(fromUserId: number, accept: boolean) {
    setPending(prev => prev.filter(r => r.fromUserId !== fromUserId))
  }

  function onSearch(e?: any) {
    if (e) e.preventDefault()
    const q = query.trim().toLowerCase()
    // exclude user logat din rezultate
    const results = mockUsers.filter(u => u.name.toLowerCase().includes(q) && u.id !== currentUserId)
    setSearchResults(results)
  }

  function viewProfile(userId: number) {
    const u = mockUsers.find(u => u.id === userId) || null
    setSelectedUser(u)
  }

  function onAddFriend(toUserId: number) {
    alert('Friend request sent de la user ' + currentUserId + ' către user ' + toUserId)
  }

  return (
    <div className="fr-root">
      <h2>Friend Requests</h2>
      {/* Userul logat este preluat automat din localStorage sau va fi setat din backend/context pe viitor */}

      <section className="fr-section">
        <h3>Pending requests</h3>
        {pending.length === 0 && <div>No pending requests</div>}
        <ul className="fr-list">
          {pending.map((r: FriendRequest) => (
            <li key={r.id} className="fr-item">
              <div className="fr-item-left">
                <strong>{r.fromUser?.name ?? `User ${r.fromUserId}`}</strong>
                <div className="fr-sub">{r.fromUser?.email}</div>
              </div>
              <div className="fr-item-actions">
                <button className="btn-accept" onClick={() => onRespond(r.fromUserId, true)}>Accept</button>
                <button className="btn-reject" onClick={() => onRespond(r.fromUserId, false)}>Reject</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="fr-section">
        <h3>Find users</h3>
        <form onSubmit={onSearch} className="fr-search">
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search by name..." />
          <button type="submit">Search</button>
        </form>

        <div className="fr-results">
          {searchResults.map(u => (
            <div key={u.id} className="fr-result">
              <div>
                <strong>{u.name}</strong>
                <div className="fr-sub">{u.email}</div>
              </div>
              <div>
                <button onClick={() => viewProfile(u.id)}>View profile</button>
                <button onClick={() => onAddFriend(u.id)}>Add friend</button>
              </div>
            </div>
          ))}
        </div>

        {selectedUser && (
          <div className="fr-profile">
            <h4>Profile — {selectedUser.name}</h4>
            <p>Email: {selectedUser.email}</p>
            <p>{selectedUser.bio}</p>
            <button onClick={() => onAddFriend(selectedUser.id)}>Add friend</button>
            <button onClick={() => setSelectedUser(null)}>Close</button>
          </div>
        )}
      </section>
    </div>
  )
}

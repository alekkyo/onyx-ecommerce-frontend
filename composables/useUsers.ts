import { defineStore } from 'pinia'

export type UserRole = 'ADMIN' | 'MANAGER' | 'EDITOR'
export type UserStatus = 'ACTIVE' | 'INACTIVE'

export type User = {
  id: number
  name: string
  email: string
  role: UserRole
  status: UserStatus
  createdAt: string
  lastLogin: string | null
}

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'ADMIN',
      status: 'ACTIVE',
      createdAt: '2024-01-01T00:00:00Z',
      lastLogin: '2024-04-03T10:00:00Z'
    },
    {
      id: 2,
      name: 'John Manager',
      email: 'john.manager@example.com',
      role: 'MANAGER',
      status: 'ACTIVE',
      createdAt: '2024-02-15T00:00:00Z',
      lastLogin: '2024-04-02T15:30:00Z'
    },
    {
      id: 3,
      name: 'Sarah Editor',
      email: 'sarah.editor@example.com',
      role: 'EDITOR',
      status: 'ACTIVE',
      createdAt: '2024-03-01T00:00:00Z',
      lastLogin: '2024-04-01T09:15:00Z'
    },
    {
      id: 4,
      name: 'Inactive User',
      email: 'inactive@example.com',
      role: 'EDITOR',
      status: 'INACTIVE',
      createdAt: '2024-01-20T00:00:00Z',
      lastLogin: '2024-03-15T14:20:00Z'
    }
  ])

  const searchTerm = ref('')
  const roleFilter = ref<UserRole | 'ALL'>('ALL')
  const statusFilter = ref<UserStatus | 'ALL'>('ALL')

  const filteredUsers = computed(() => {
    return users.value.filter(user => {
      const matchesSearch = 
        user.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.value.toLowerCase())
      const matchesRole = roleFilter.value === 'ALL' || user.role === roleFilter.value
      const matchesStatus = statusFilter.value === 'ALL' || user.status === statusFilter.value

      return matchesSearch && matchesRole && matchesStatus
    })
  })

  const addUser = (user: Omit<User, 'id' | 'createdAt' | 'lastLogin'>) => {
    const newUser: User = {
      ...user,
      id: Math.max(...users.value.map(u => u.id)) + 1,
      createdAt: new Date().toISOString(),
      lastLogin: null
    }
    users.value.push(newUser)
  }

  const updateUser = (id: number, updates: Partial<User>) => {
    const index = users.value.findIndex(u => u.id === id)
    if (index !== -1) {
      users.value[index] = { ...users.value[index], ...updates }
    }
  }

  const deleteUser = (id: number) => {
    const index = users.value.findIndex(u => u.id === id)
    if (index !== -1) {
      users.value.splice(index, 1)
    }
  }

  const toggleUserStatus = (id: number) => {
    const user = users.value.find(u => u.id === id)
    if (user) {
      user.status = user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
    }
  }

  return {
    users,
    searchTerm,
    roleFilter,
    statusFilter,
    filteredUsers,
    addUser,
    updateUser,
    deleteUser,
    toggleUserStatus
  }
})
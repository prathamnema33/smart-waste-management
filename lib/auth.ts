export type UserRole = "citizen" | "worker" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

// Mock user data for demonstration
const mockUsers: User[] = [
  {
    id: "1",
    name: "John Citizen",
    email: "john@example.com",
    role: "citizen",
    avatar: "/citizen-avatar.jpg",
  },
  {
    id: "2",
    name: "Sarah Worker",
    email: "sarah@example.com",
    role: "worker",
    avatar: "/worker-avatar.jpg",
  },
  {
    id: "3",
    name: "Mike Admin",
    email: "mike@example.com",
    role: "admin",
    avatar: "/admin-avatar.png",
  },
]

export class AuthService {
  private static currentUser: User | null = null

  static async login(email: string, password: string): Promise<User | null> {
    // Mock authentication - in real app, this would call an API
    const user = mockUsers.find((u) => u.email === email)
    if (user && password === "password") {
      this.currentUser = user
      localStorage.setItem("currentUser", JSON.stringify(user))
      return user
    }
    return null
  }

  static logout(): void {
    this.currentUser = null
    localStorage.removeItem("currentUser")
  }

  static getCurrentUser(): User | null {
    if (this.currentUser) return this.currentUser

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("currentUser")
      if (stored) {
        this.currentUser = JSON.parse(stored)
        return this.currentUser
      }
    }
    return null
  }

  static isAuthenticated(): boolean {
    return this.getCurrentUser() !== null
  }

  static hasRole(role: UserRole): boolean {
    const user = this.getCurrentUser()
    return user?.role === role
  }

  static switchRole(newRole: UserRole): User | null {
    const roleUsers = {
      citizen: mockUsers[0],
      worker: mockUsers[1],
      admin: mockUsers[2],
    }

    const newUser = roleUsers[newRole]
    if (newUser) {
      this.currentUser = newUser
      localStorage.setItem("currentUser", JSON.stringify(newUser))
      return newUser
    }
    return null
  }

  static getAvailableRoles(): { role: UserRole; user: User }[] {
    return mockUsers.map((user) => ({ role: user.role, user }))
  }
}

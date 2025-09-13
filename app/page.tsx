"use client"

import { useState, useEffect } from "react"
import { AuthService, type User } from "@/lib/auth"
import { LoginForm } from "@/components/auth/login-form"
import { CitizenDashboard } from "@/components/dashboards/citizen-dashboard"
import { WorkerDashboard } from "@/components/dashboards/worker-dashboard"
import { AdminDashboard } from "@/components/dashboards/admin-dashboard"

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser()
    setUser(currentUser)
    setIsLoading(false)
  }, [])

  const handleLogin = () => {
    const currentUser = AuthService.getCurrentUser()
    setUser(currentUser)
  }

  const handleLogout = () => {
    AuthService.logout()
    setUser(null)
  }

  const handleRoleSwitch = (newUser: User) => {
    setUser(newUser)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm onLogin={handleLogin} />
  }

  // Render appropriate dashboard based on user role
  switch (user.role) {
    case "citizen":
      return <CitizenDashboard user={user} onLogout={handleLogout} onRoleSwitch={handleRoleSwitch} />
    case "worker":
      return <WorkerDashboard user={user} onLogout={handleLogout} onRoleSwitch={handleRoleSwitch} />
    case "admin":
      return <AdminDashboard user={user} onLogout={handleLogout} onRoleSwitch={handleRoleSwitch} />
    default:
      return <LoginForm onLogin={handleLogin} />
  }
}

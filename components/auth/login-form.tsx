"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AuthService, type UserRole } from "@/lib/auth"
import { Leaf, Recycle } from "lucide-react"

interface LoginFormProps {
  onLogin: () => void
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [selectedRole, setSelectedRole] = useState<UserRole>("citizen")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleQuickLogin = async (role: UserRole) => {
    setIsLoading(true)
    setError("")

    const roleEmails = {
      citizen: "john@example.com",
      worker: "sarah@example.com",
      admin: "mike@example.com",
    }

    const user = await AuthService.login(roleEmails[role], "password")

    if (user) {
      onLogin()
    } else {
      setError("Login failed")
    }

    setIsLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const user = await AuthService.login(email, password)

    if (user) {
      onLogin()
    } else {
      setError("Invalid credentials")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 bg-primary rounded-full">
              <Recycle className="h-6 w-6 text-primary-foreground" />
            </div>
            <Leaf className="h-8 w-8 text-secondary" />
          </div>
          <CardTitle className="text-2xl font-bold text-balance">Smart Waste Management</CardTitle>
          <CardDescription>Sign in to keep your city clean</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Quick Login Options */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Quick Login (Demo)</Label>
            <div className="grid gap-2">
              <Button
                variant="outline"
                onClick={() => handleQuickLogin("citizen")}
                disabled={isLoading}
                className="justify-start"
              >
                Login as Citizen
              </Button>
              <Button
                variant="outline"
                onClick={() => handleQuickLogin("worker")}
                disabled={isLoading}
                className="justify-start"
              >
                Login as Worker
              </Button>
              <Button
                variant="outline"
                onClick={() => handleQuickLogin("admin")}
                disabled={isLoading}
                className="justify-start"
              >
                Login as Admin/Monitor
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Manual Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="text-sm text-destructive text-center">{error}</div>}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <div className="text-xs text-center text-muted-foreground">
            Demo credentials: any email with password "password"
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

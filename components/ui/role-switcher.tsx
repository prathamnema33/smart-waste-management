"use client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { AuthService, type User, type UserRole } from "@/lib/auth"
import { ChevronDown, UserIcon, Briefcase, Shield } from "lucide-react"

interface RoleSwitcherProps {
  currentUser: User
  onRoleSwitch: (newUser: User) => void
}

export function RoleSwitcher({ currentUser, onRoleSwitch }: RoleSwitcherProps) {
  const availableRoles = AuthService.getAvailableRoles()

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "citizen":
        return <UserIcon className="h-4 w-4" />
      case "worker":
        return <Briefcase className="h-4 w-4" />
      case "admin":
        return <Shield className="h-4 w-4" />
    }
  }

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case "citizen":
        return "Citizen"
      case "worker":
        return "Worker"
      case "admin":
        return "Admin/Monitor"
    }
  }

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case "citizen":
        return "secondary"
      case "worker":
        return "default"
      case "admin":
        return "destructive"
    }
  }

  const handleRoleSwitch = (role: UserRole) => {
    const newUser = AuthService.switchRole(role)
    if (newUser) {
      onRoleSwitch(newUser)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          {getRoleIcon(currentUser.role)}
          <Badge variant={getRoleBadgeVariant(currentUser.role)}>{getRoleLabel(currentUser.role)}</Badge>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Switch Role (Demo)</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {availableRoles.map(({ role, user }) => (
          <DropdownMenuItem
            key={role}
            onClick={() => handleRoleSwitch(role)}
            className={`flex items-center gap-3 ${currentUser.role === role ? "bg-muted" : ""}`}
          >
            {getRoleIcon(role)}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">{getRoleLabel(role)}</span>
                {currentUser.role === role && (
                  <Badge variant="outline" className="text-xs">
                    Current
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{user.name}</p>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

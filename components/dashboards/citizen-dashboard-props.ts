import type { User as AuthUser } from "@/lib/auth"

export interface CitizenDashboardProps {
  user: AuthUser
  onLogout: () => void
  onRoleSwitch?: (newUser: AuthUser) => void
}

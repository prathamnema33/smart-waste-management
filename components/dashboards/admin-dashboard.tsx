"use client"

import React, { lazy, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { RoleSwitcher } from "@/components/ui/role-switcher"
import { Chatbot } from "@/components/ui/chatbot"
import {
  BarChart3,
  FileText,
  MapPin,
  AlertTriangle,
  Trophy,
  HardHat,
  LogOut,
  Settings,
  Users,
  TrendingUp,
  TrendingDown,
  Activity,
  Truck,
  CheckCircle,
  Clock,
  Star,
  MessageSquare,
} from "lucide-react"
import type { User as AuthUser } from "@/lib/auth"

const AdminComplaints = lazy(() =>
  import("@/components/screens/admin-complaints").then((m) => ({ default: m.AdminComplaints })),
)
const AdminReports = lazy(() => import("@/components/screens/admin-reports").then((m) => ({ default: m.AdminReports })))
const AdminWorkers = lazy(() => import("@/components/screens/admin-workers").then((m) => ({ default: m.AdminWorkers })))
const AdminSettings = lazy(() =>
  import("@/components/screens/admin-settings").then((m) => ({ default: m.AdminSettings })),
)

interface AdminDashboardProps {
  user: AuthUser
  onLogout: () => void
  onRoleSwitch?: (newUser: AuthUser) => void
}

export function AdminDashboard({ user, onLogout, onRoleSwitch }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = React.useState("dashboard")

  // Mock data for admin
  const adminData = {
    segregationCompliance: 87,
    avgHouseholdRating: 4.2,
    complaintsPending: 23,
    workerPerformance: 92,
    activeTrucks: 12,
    totalWorkers: 45,
    dailyWasteCollected: 2340,
    cityZones: 8,
  }

  const kpiCards = [
    {
      title: "Segregation Compliance",
      value: `${adminData.segregationCompliance}%`,
      change: "+5.2%",
      trend: "up",
      icon: CheckCircle,
      color: "text-secondary",
    },
    {
      title: "Avg Household Rating",
      value: adminData.avgHouseholdRating.toFixed(1),
      change: "+0.3",
      trend: "up",
      icon: Star,
      color: "text-primary",
    },
    {
      title: "Complaints Pending",
      value: adminData.complaintsPending,
      change: "-12",
      trend: "down",
      icon: MessageSquare,
      color: "text-destructive",
    },
    {
      title: "Worker Performance",
      value: `${adminData.workerPerformance}%`,
      change: "+2.1%",
      trend: "up",
      icon: Users,
      color: "text-accent",
    },
  ]

  const modules = [
    {
      id: "tracking",
      title: "Live Tracking",
      icon: MapPin,
      color: "bg-primary",
      description: "Real-time truck monitoring",
      count: adminData.activeTrucks,
    },
    {
      id: "complaints",
      title: "Complaints Management",
      icon: FileText,
      color: "bg-destructive",
      description: "Handle citizen reports",
      count: adminData.complaintsPending,
    },
    {
      id: "analytics",
      title: "Analytics",
      icon: BarChart3,
      color: "bg-secondary",
      description: "Performance insights",
      count: null,
    },
    {
      id: "escalations",
      title: "Escalations",
      icon: AlertTriangle,
      color: "bg-orange-500",
      description: "Priority issues",
      count: 5,
    },
    {
      id: "competitions",
      title: "City Competitions",
      icon: Trophy,
      color: "bg-yellow-500",
      description: "Zone competitions",
      count: adminData.cityZones,
    },
    {
      id: "performance",
      title: "Worker Performance",
      icon: HardHat,
      color: "bg-accent",
      description: "Staff evaluation",
      count: adminData.totalWorkers,
    },
  ]

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: Activity },
    { id: "complaints", label: "Complaints", icon: MessageSquare },
    { id: "reports", label: "Reports", icon: BarChart3 },
    { id: "workers", label: "Workers", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
  ]

  const recentActivities = [
    {
      type: "success",
      message: "Route A-12 completed successfully",
      time: "2 min ago",
      icon: CheckCircle,
    },
    {
      type: "warning",
      message: "Complaint filed in Zone 3",
      time: "5 min ago",
      icon: AlertTriangle,
    },
    {
      type: "info",
      message: "New worker Sarah joined team",
      time: "1 hour ago",
      icon: Users,
    },
  ]

  if (activeTab === "complaints") {
    return (
      <Suspense
        fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}
      >
        <AdminComplaints onBack={() => setActiveTab("dashboard")} />
      </Suspense>
    )
  }

  if (activeTab === "reports") {
    return (
      <Suspense
        fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}
      >
        <AdminReports onBack={() => setActiveTab("dashboard")} />
      </Suspense>
    )
  }

  if (activeTab === "workers") {
    return (
      <Suspense
        fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}
      >
        <AdminWorkers onBack={() => setActiveTab("dashboard")} />
      </Suspense>
    )
  }

  if (activeTab === "settings") {
    return (
      <Suspense
        fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}
      >
        <AdminSettings onBack={() => setActiveTab("dashboard")} />
      </Suspense>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-4 text-primary-foreground">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary-foreground/20">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold">City Control Center</h1>
              <p className="text-primary-foreground/80 text-sm">Welcome back, {user.name.split(" ")[0]}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onRoleSwitch && <RoleSwitcher currentUser={user} onRoleSwitch={onRoleSwitch} />}
            <Button
              variant="ghost"
              size="icon"
              onClick={onLogout}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-primary-foreground/10 border-primary-foreground/20">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary-foreground" />
                <div>
                  <p className="text-xs text-primary-foreground/80">Active Trucks</p>
                  <p className="text-lg font-bold text-primary-foreground">{adminData.activeTrucks}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-primary-foreground/10 border-primary-foreground/20">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary-foreground" />
                <div>
                  <p className="text-xs text-primary-foreground/80">Daily Collection</p>
                  <p className="text-lg font-bold text-primary-foreground">{adminData.dailyWasteCollected}kg</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* City Overview Map */}
      <div className="p-4">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              City Overview Map
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="h-48 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-b-lg flex items-center justify-center relative overflow-hidden">
              {/* Mock city map with moving trucks */}
              <div className="absolute inset-0">
                <div className="absolute top-4 left-8 animate-pulse">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                </div>
                <div className="absolute top-12 right-12 animate-bounce">
                  <div className="w-3 h-3 bg-secondary rounded-full"></div>
                </div>
                <div className="absolute bottom-8 left-16 animate-pulse">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                </div>
                <div className="absolute bottom-16 right-8 animate-bounce">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                </div>
              </div>
              <div className="text-center z-10">
                <Activity className="h-12 w-12 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-muted-foreground">Real-time City Monitoring</p>
                <p className="text-xs text-muted-foreground">{adminData.activeTrucks} trucks active</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPI Cards */}
      <div className="px-4 mb-6">
        <div className="grid grid-cols-2 gap-4">
          {kpiCards.map((kpi, index) => {
            const IconComponent = kpi.icon
            const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown
            return (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <IconComponent className={`h-5 w-5 ${kpi.color}`} />
                    <div
                      className={`flex items-center gap-1 text-xs ${
                        kpi.trend === "up" ? "text-secondary" : "text-destructive"
                      }`}
                    >
                      <TrendIcon className="h-3 w-3" />
                      {kpi.change}
                    </div>
                  </div>
                  <p className="text-2xl font-bold mb-1">{kpi.value}</p>
                  <p className="text-xs text-muted-foreground">{kpi.title}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Main Modules */}
      <div className="px-4 space-y-4 pb-20">
        <h2 className="text-lg font-bold mb-4">Management Modules</h2>
        <div className="grid grid-cols-2 gap-4">
          {modules.map((module) => {
            const IconComponent = module.icon
            return (
              <Card key={module.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center relative">
                  {module.count && (
                    <Badge
                      variant={module.id === "complaints" || module.id === "escalations" ? "destructive" : "secondary"}
                      className="absolute -top-2 -right-2 text-xs"
                    >
                      {module.count}
                    </Badge>
                  )}
                  <div
                    className={`${module.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-sm mb-1">{module.title}</h3>
                  <p className="text-xs text-muted-foreground">{module.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Clock className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => {
                const IconComponent = activity.icon
                const colorClass = {
                  success: "text-secondary",
                  warning: "text-orange-500",
                  info: "text-primary",
                }[activity.type]

                return (
                  <div key={index} className="flex items-center gap-3 p-2 bg-muted rounded-lg">
                    <IconComponent className={`h-4 w-4 ${colorClass}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart3 className="h-5 w-5 text-secondary" />
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Efficiency</span>
                  <span className="font-semibold">{adminData.workerPerformance}%</span>
                </div>
                <Progress value={adminData.workerPerformance} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Segregation Compliance</span>
                  <span className="font-semibold">{adminData.segregationCompliance}%</span>
                </div>
                <Progress value={adminData.segregationCompliance} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Citizen Satisfaction</span>
                  <span className="font-semibold">{Math.round(adminData.avgHouseholdRating * 20)}%</span>
                </div>
                <Progress value={adminData.avgHouseholdRating * 20} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="flex items-center justify-around py-2">
          {navigationItems.map((item) => {
            const IconComponent = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                  isActive ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <IconComponent className="h-5 w-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Chatbot widget for admin role */}
      <Chatbot userRole="admin" />
    </div>
  )
}

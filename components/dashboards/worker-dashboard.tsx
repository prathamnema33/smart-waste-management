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
  MapPin,
  Star,
  Calendar,
  Bell,
  Route,
  History,
  User,
  LogOut,
  Navigation,
  Clock,
  Shield,
  Heart,
  CheckCircle,
  AlertCircle,
  Truck,
} from "lucide-react"
import type { User as AuthUser } from "@/lib/auth"

interface WorkerDashboardProps {
  user: AuthUser
  onLogout: () => void
  onRoleSwitch?: (newUser: AuthUser) => void
}

const WorkerRate = lazy(() => import("@/components/screens/worker-rate").then((m) => ({ default: m.WorkerRate })))
const WorkerHistory = lazy(() =>
  import("@/components/screens/worker-history").then((m) => ({ default: m.WorkerHistory })),
)
const WorkerProfile = lazy(() =>
  import("@/components/screens/worker-profile").then((m) => ({ default: m.WorkerProfile })),
)

export function WorkerDashboard({ user, onLogout, onRoleSwitch }: WorkerDashboardProps) {
  const [activeTab, setActiveTab] = React.useState("route")

  // Mock data for worker
  const workerData = {
    currentRoute: "Route A-12",
    nextStop: "House #12",
    distance: "500m",
    completedStops: 8,
    totalStops: 15,
    efficiency: 92,
    notifications: 3,
    workHours: "6.5h",
    healthScore: 85,
    insuranceStatus: "Active",
  }

  const features = [
    {
      id: "route",
      title: "Today's Route",
      icon: MapPin,
      color: "bg-primary",
      description: "View assigned route",
      badge: `${workerData.completedStops}/${workerData.totalStops}`,
    },
    {
      id: "rate",
      title: "Rate Household",
      icon: Star,
      color: "bg-secondary",
      description: "Rate collection quality",
      badge: "4.8★",
    },
    {
      id: "log",
      title: "Work Log",
      icon: Calendar,
      color: "bg-accent",
      description: "Track daily activities",
      badge: workerData.workHours,
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: Bell,
      color: "bg-destructive",
      description: "Important updates",
      badge: workerData.notifications > 0 ? workerData.notifications.toString() : null,
    },
  ]

  const navigationItems = [
    { id: "route", label: "Route", icon: Route },
    { id: "rate", label: "Rate", icon: Star },
    { id: "history", label: "History", icon: History },
    { id: "profile", label: "Profile", icon: User },
  ]

  if (activeTab === "rate") {
    return (
      <Suspense
        fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}
      >
        <WorkerRate onBack={() => setActiveTab("route")} />
      </Suspense>
    )
  }

  if (activeTab === "history") {
    return (
      <Suspense
        fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}
      >
        <WorkerHistory onBack={() => setActiveTab("route")} />
      </Suspense>
    )
  }

  if (activeTab === "profile") {
    return (
      <Suspense
        fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}
      >
        <WorkerProfile user={user} onBack={() => setActiveTab("route")} />
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
              <h1 className="text-xl font-bold">Good morning, {user.name.split(" ")[0]}</h1>
              <p className="text-primary-foreground/80 text-sm">Ready for today's route?</p>
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

        {/* Route Progress */}
        <Card className="bg-primary-foreground/10 border-primary-foreground/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary-foreground" />
                <span className="font-semibold text-primary-foreground">{workerData.currentRoute}</span>
              </div>
              <Badge variant="secondary">
                {workerData.completedStops}/{workerData.totalStops} stops
              </Badge>
            </div>
            <Progress
              value={(workerData.completedStops / workerData.totalStops) * 100}
              className="mb-2 bg-primary-foreground/20"
            />
            <p className="text-sm text-primary-foreground/80">
              {Math.round((workerData.completedStops / workerData.totalStops) * 100)}% complete
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Map Section */}
      <div className="p-4">
        <Card className="mb-4">
          <CardContent className="p-0">
            <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-t-lg flex items-center justify-center relative overflow-hidden">
              {/* Mock map visualization */}
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full bg-gradient-to-r from-primary via-secondary to-primary animate-pulse"></div>
              </div>
              <div className="text-center z-10">
                <Navigation className="h-12 w-12 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium text-muted-foreground">Interactive Route Map</p>
                <p className="text-xs text-muted-foreground">GPS tracking active</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary/20 rounded-full">
                    <MapPin className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold">Next Stop: {workerData.nextStop}</p>
                    <p className="text-sm text-muted-foreground">{workerData.distance} ahead</p>
                  </div>
                </div>
                <Button size="sm" className="font-semibold">
                  Navigate
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="px-4 space-y-4 pb-20">
        {/* Feature Buttons */}
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature) => {
            const IconComponent = feature.icon
            return (
              <Card key={feature.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center relative">
                  {feature.badge && (
                    <Badge
                      variant={
                        feature.id === "notifications" && workerData.notifications > 0 ? "destructive" : "secondary"
                      }
                      className="absolute -top-2 -right-2 text-xs"
                    >
                      {feature.badge}
                    </Badge>
                  )}
                  <div
                    className={`${feature.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-bold text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary/20 rounded-full">
                  <Clock className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Work Hours</p>
                  <p className="font-bold text-lg">{workerData.workHours}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-full">
                  <CheckCircle className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Efficiency</p>
                  <p className="font-bold text-lg">{workerData.efficiency}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Health & Insurance Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5 text-primary" />
              Health & Insurance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Heart className="h-5 w-5 text-destructive" />
                  <span className="text-sm font-medium">Health Score</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">{workerData.healthScore}%</span>
                  <Badge variant="secondary">Good</Badge>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Insurance Status</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-secondary" />
                  <span className="font-bold text-secondary">{workerData.insuranceStatus}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Notifications */}
        {workerData.notifications > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bell className="h-5 w-5 text-destructive" />
                Recent Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 bg-destructive/10 rounded-lg">
                  <AlertCircle className="h-4 w-4 text-destructive" />
                  <span className="text-sm">Route change: House #15 added to today's route</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-primary/10 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span className="text-sm">Excellent rating received from House #8</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
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
                <span className="text-xs font-bold">{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Chatbot widget for worker role */}
      <Chatbot userRole="worker" />
    </div>
  )
}

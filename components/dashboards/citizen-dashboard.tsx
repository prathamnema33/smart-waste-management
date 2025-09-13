"use client"

import React, { lazy, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RoleSwitcher } from "@/components/ui/role-switcher"
import { Chatbot } from "@/components/ui/chatbot"
import {
  Camera,
  Star,
  ShoppingBag,
  Megaphone,
  Home,
  History,
  Coins,
  Leaf,
  Recycle,
  TreePine,
  Award,
  LogOut,
  User,
} from "lucide-react"
import type { User as AuthUser } from "@/lib/auth"

interface CitizenDashboardProps {
  user: AuthUser
  onLogout: () => void
  onRoleSwitch?: (newUser: AuthUser) => void
}

const CitizenShop = lazy(() => import("@/components/screens/citizen-shop").then((m) => ({ default: m.CitizenShop })))
const CitizenHistory = lazy(() =>
  import("@/components/screens/citizen-history").then((m) => ({ default: m.CitizenHistory })),
)
const CitizenProfile = lazy(() =>
  import("@/components/screens/citizen-profile").then((m) => ({ default: m.CitizenProfile })),
)

export function CitizenDashboard({ user, onLogout, onRoleSwitch }: CitizenDashboardProps) {
  const [activeTab, setActiveTab] = React.useState("home")

  // Mock data for citizen
  const citizenData = {
    greenPoints: 1250,
    wasteSegregated: 45,
    co2Saved: 12.5,
    pointsEarned: 320,
    rating: 4.8,
    level: "Eco Warrior",
  }

  const features = [
    {
      id: "scan",
      title: "Scan Waste",
      icon: Camera,
      color: "bg-primary",
      description: "Scan and categorize waste",
    },
    {
      id: "rating",
      title: "My Rating",
      icon: Star,
      color: "bg-secondary",
      description: "View your eco rating",
    },
    {
      id: "shop",
      title: "Green Shop",
      icon: ShoppingBag,
      color: "bg-accent",
      description: "Redeem eco-friendly rewards",
    },
    {
      id: "complaint",
      title: "Complaint Box",
      icon: Megaphone,
      color: "bg-destructive",
      description: "Report waste issues",
    },
  ]

  const contributions = [
    {
      label: "Waste Segregated",
      value: `${citizenData.wasteSegregated} kg`,
      icon: Recycle,
      color: "text-primary",
    },
    {
      label: "CO₂ Saved",
      value: `${citizenData.co2Saved} kg`,
      icon: TreePine,
      color: "text-secondary",
    },
    {
      label: "Points Earned",
      value: citizenData.pointsEarned,
      icon: Award,
      color: "text-accent",
    },
  ]

  const navigationItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "shop", label: "Shop", icon: ShoppingBag },
    { id: "history", label: "History", icon: History },
    { id: "profile", label: "Profile", icon: User },
  ]

  if (activeTab === "shop") {
    return (
      <Suspense
        fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}
      >
        <CitizenShop greenPoints={citizenData.greenPoints} onBack={() => setActiveTab("home")} />
      </Suspense>
    )
  }

  if (activeTab === "history") {
    return (
      <Suspense
        fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}
      >
        <CitizenHistory onBack={() => setActiveTab("home")} />
      </Suspense>
    )
  }

  if (activeTab === "profile") {
    return (
      <Suspense
        fallback={<div className="min-h-screen bg-background flex items-center justify-center">Loading...</div>}
      >
        <CitizenProfile user={user} onBack={() => setActiveTab("home")} />
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
              <h1 className="text-xl font-bold text-balance">Hello, {user.name.split(" ")[0]} 👋</h1>
              <p className="text-primary-foreground/80 text-sm">Keep your city clean today!</p>
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

        {/* Green Points Wallet */}
        <Card className="bg-primary-foreground/10 border-primary-foreground/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary rounded-full">
                  <Coins className="h-6 w-6 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-primary-foreground/80 text-sm">Green Points</p>
                  <p className="text-2xl font-bold text-primary-foreground">
                    {citizenData.greenPoints.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <Badge variant="secondary" className="mb-2">
                  {citizenData.level}
                </Badge>
                <Button size="sm" variant="secondary">
                  Redeem
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-6 pb-20">
        {/* Feature Buttons */}
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature) => {
            const IconComponent = feature.icon
            return (
              <Card key={feature.id} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <div
                    className={`${feature.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Contribution Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Leaf className="h-5 w-5 text-secondary" />
              Your Contribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {contributions.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center gap-3">
                      <IconComponent className={`h-5 w-5 ${item.color}`} />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                    <span className="font-bold text-lg">{item.value}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Rating Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary/20 rounded-full">
                  <Star className="h-5 w-5 text-secondary fill-current" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Your Eco Rating</p>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= Math.floor(citizenData.rating)
                            ? "text-secondary fill-current"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                    <span className="ml-2 font-semibold">{citizenData.rating}</span>
                  </div>
                </div>
              </div>
              <Badge variant="outline" className="text-secondary border-secondary">
                Top 10%
              </Badge>
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

      {/* Chatbot widget */}
      <Chatbot userRole="citizen" />
    </div>
  )
}

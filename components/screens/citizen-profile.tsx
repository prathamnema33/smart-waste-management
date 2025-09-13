"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { User, MapPin, Star, Coins, MessageSquare, Bell, Globe, Shield, Edit, Award } from "lucide-react"
import type { User as AuthUser } from "@/lib/auth"

interface CitizenProfileProps {
  user: AuthUser
  onBack: () => void
}

export function CitizenProfile({ user, onBack }: CitizenProfileProps) {
  const [notifications, setNotifications] = React.useState(true)
  const [language, setLanguage] = React.useState("English")

  const profileData = {
    householdId: "HH-2024-001234",
    address: "123 Green Street, Eco Colony, Mumbai - 400001",
    totalPoints: 1250,
    avgRating: 4.8,
    joinDate: "January 2024",
    level: "Eco Warrior",
    completedPickups: 45,
    missedPickups: 3,
  }

  const complaints = [
    {
      id: 1,
      date: "2024-01-10",
      subject: "Missed pickup on scheduled day",
      status: "resolved",
    },
    {
      id: 2,
      date: "2024-01-05",
      subject: "Worker arrived very late",
      status: "pending",
    },
  ]

  const achievements = [
    { name: "First Pickup", icon: Award, earned: true },
    { name: "Perfect Week", icon: Star, earned: true },
    { name: "Eco Champion", icon: Shield, earned: false },
    { name: "Green Warrior", icon: Globe, earned: true },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-4 text-primary-foreground">
        <div className="flex items-center gap-3 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="text-primary-foreground hover:bg-primary-foreground/20"
          >
            <User className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Profile</h1>
            <p className="text-primary-foreground/80 text-sm">Manage your account</p>
          </div>
        </div>

        {/* Profile Card */}
        <Card className="bg-primary-foreground/10 border-primary-foreground/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary-foreground/20">
                <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="bg-primary-foreground/20 text-primary-foreground text-lg">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-lg font-bold text-primary-foreground">{user.name}</h2>
                <p className="text-primary-foreground/80 text-sm">{profileData.householdId}</p>
                <Badge variant="secondary" className="mt-1">
                  {profileData.level}
                </Badge>
              </div>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
                <Edit className="h-5 w-5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content */}
      <div className="p-4 space-y-6 pb-20">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <Coins className="h-5 w-5 text-secondary" />
                <span className="text-2xl font-bold">{profileData.totalPoints}</span>
              </div>
              <p className="text-sm text-muted-foreground">Total Points</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <Star className="h-5 w-5 text-secondary fill-current" />
                <span className="text-2xl font-bold">{profileData.avgRating}</span>
              </div>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Address */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="h-5 w-5" />
              Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{profileData.address}</p>
            <Button variant="outline" size="sm" className="mt-3 bg-transparent">
              Update Address
            </Button>
          </CardContent>
        </Card>

        {/* Pickup Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Pickup Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{profileData.completedPickups}</p>
                <p className="text-sm text-green-600">Completed</p>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <p className="text-2xl font-bold text-red-600">{profileData.missedPickups}</p>
                <p className="text-sm text-red-600">Missed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Award className="h-5 w-5" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-2 p-3 rounded-lg ${
                      achievement.earned ? "bg-secondary/20 text-secondary" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <IconComponent className="h-5 w-5" />
                    <span className="text-sm font-medium">{achievement.name}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Complaints */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageSquare className="h-5 w-5" />
              Recent Complaints
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {complaints.map((complaint) => (
                <div key={complaint.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{complaint.subject}</p>
                    <p className="text-xs text-muted-foreground">{complaint.date}</p>
                  </div>
                  <Badge variant={complaint.status === "resolved" ? "secondary" : "destructive"}>
                    {complaint.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Push Notifications</span>
              </div>
              <Switch checked={notifications} onCheckedChange={setNotifications} />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Language</span>
              </div>
              <Button variant="outline" size="sm">
                {language}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

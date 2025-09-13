"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import {
  User,
  MapPin,
  Star,
  Shield,
  Heart,
  Phone,
  Mail,
  Calendar,
  Award,
  TrendingUp,
  Bell,
  Globe,
  Edit,
  CheckCircle,
} from "lucide-react"
import type { User as AuthUser } from "@/lib/auth"

interface WorkerProfileProps {
  user: AuthUser
  onBack: () => void
}

export function WorkerProfile({ user, onBack }: WorkerProfileProps) {
  const [notifications, setNotifications] = React.useState(true)
  const [language, setLanguage] = React.useState("English")

  const workerData = {
    workerId: "WK-2024-5678",
    area: "Zone A - Central District",
    joinDate: "March 2023",
    totalRoutes: 245,
    avgEfficiency: 92,
    avgRating: 4.6,
    totalHouseholds: 3680,
    healthScore: 85,
    insuranceStatus: "Active",
    emergencyContact: "+91 98765 43210",
    email: "rajesh.worker@wastemanagement.com",
  }

  const performanceMetrics = [
    {
      label: "Punctuality",
      value: 96,
      color: "bg-green-500",
      description: "On-time route starts",
    },
    {
      label: "Completion Rate",
      value: 98,
      color: "bg-blue-500",
      description: "Routes completed successfully",
    },
    {
      label: "Citizen Satisfaction",
      value: 92,
      color: "bg-purple-500",
      description: "Positive feedback from citizens",
    },
    {
      label: "Safety Compliance",
      value: 100,
      color: "bg-green-600",
      description: "Safety protocols followed",
    },
  ]

  const achievements = [
    { name: "Perfect Week", icon: Award, earned: true, date: "Jan 2024" },
    { name: "Top Performer", icon: Star, earned: true, date: "Dec 2023" },
    { name: "Safety Champion", icon: Shield, earned: true, date: "Nov 2023" },
    { name: "Efficiency Expert", icon: TrendingUp, earned: false, date: "Pending" },
  ]

  const healthInsurance = {
    provider: "National Health Insurance",
    policyNumber: "NHI-WM-2024-5678",
    coverage: "Comprehensive",
    validUntil: "March 2025",
    benefits: ["Medical Checkups", "Emergency Care", "Accident Coverage", "Mental Health Support"],
  }

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
            <h1 className="text-xl font-bold">Worker Profile</h1>
            <p className="text-primary-foreground/80 text-sm">Manage your account and performance</p>
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
                <p className="text-primary-foreground/80 text-sm">{workerData.workerId}</p>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3 text-primary-foreground/80" />
                  <span className="text-xs text-primary-foreground/80">{workerData.area}</span>
                </div>
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
        {/* Performance Overview */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <Star className="h-5 w-5 text-secondary fill-current" />
                <span className="text-2xl font-bold">{workerData.avgRating}</span>
              </div>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-1 mb-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span className="text-2xl font-bold">{workerData.avgEfficiency}%</span>
              </div>
              <p className="text-sm text-muted-foreground">Efficiency</p>
            </CardContent>
          </Card>
        </div>

        {/* Work Statistics */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Work Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-primary/10 rounded-lg">
                <p className="text-2xl font-bold text-primary">{workerData.totalRoutes}</p>
                <p className="text-sm text-primary">Total Routes</p>
              </div>
              <div className="text-center p-3 bg-secondary/10 rounded-lg">
                <p className="text-2xl font-bold text-secondary">{workerData.totalHouseholds}</p>
                <p className="text-sm text-secondary">Households Served</p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <div className="flex items-center gap-2 justify-center text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Working since {workerData.joinDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {performanceMetrics.map((metric, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{metric.label}</span>
                  <span className="text-sm font-bold">{metric.value}%</span>
                </div>
                <Progress value={metric.value} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
              </div>
            ))}
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
            <div className="grid grid-cols-1 gap-3">
              {achievements.map((achievement, index) => {
                const IconComponent = achievement.icon
                return (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-3 rounded-lg ${
                      achievement.earned ? "bg-secondary/20" : "bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent
                        className={`h-5 w-5 ${achievement.earned ? "text-secondary" : "text-muted-foreground"}`}
                      />
                      <div>
                        <span className={`text-sm font-medium ${achievement.earned ? "" : "text-muted-foreground"}`}>
                          {achievement.name}
                        </span>
                        <p className="text-xs text-muted-foreground">{achievement.date}</p>
                      </div>
                    </div>
                    {achievement.earned && <CheckCircle className="h-4 w-4 text-secondary" />}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Health & Insurance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Shield className="h-5 w-5" />
              Health & Insurance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Heart className="h-5 w-5 text-green-600" />
                <div>
                  <span className="text-sm font-medium">Health Score</span>
                  <p className="text-xs text-muted-foreground">Based on regular checkups</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-green-600">{workerData.healthScore}%</span>
                <p className="text-xs text-green-600">Excellent</p>
              </div>
            </div>

            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-semibold">Insurance Details</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Provider:</span>
                  <span>{healthInsurance.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Policy:</span>
                  <span>{healthInsurance.policyNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valid Until:</span>
                  <span>{healthInsurance.validUntil}</span>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-sm font-medium mb-2">Coverage Benefits:</p>
                <div className="grid grid-cols-2 gap-2">
                  {healthInsurance.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 text-green-600" />
                      <span className="text-xs">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">{workerData.emergencyContact}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">{workerData.email}</span>
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

"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Search, Star, Award, AlertTriangle, Clock, CheckCircle } from "lucide-react"

interface AdminWorkersProps {
  onBack: () => void
}

export function AdminWorkers({ onBack }: AdminWorkersProps) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [filterZone, setFilterZone] = React.useState("all")
  const [sortBy, setSortBy] = React.useState("performance")

  const workers = [
    {
      id: "WK-001",
      name: "Rajesh Kumar",
      avatar: "/worker-avatar.jpg",
      zone: "Zone A",
      efficiency: 98,
      rating: 4.8,
      routesCompleted: 22,
      punctuality: 96,
      complaints: 1,
      violations: 0,
      joinDate: "2023-03-15",
      status: "active",
      performance: "excellent",
      lastActive: "2 hours ago",
    },
    {
      id: "WK-002",
      name: "Amit Singh",
      avatar: "/worker-avatar.jpg",
      zone: "Zone A",
      efficiency: 95,
      rating: 4.6,
      routesCompleted: 20,
      punctuality: 94,
      complaints: 2,
      violations: 1,
      joinDate: "2023-01-20",
      status: "active",
      performance: "excellent",
      lastActive: "1 hour ago",
    },
    {
      id: "WK-003",
      name: "Sunita Devi",
      avatar: "/worker-avatar.jpg",
      zone: "Zone B",
      efficiency: 92,
      rating: 4.4,
      routesCompleted: 18,
      punctuality: 98,
      complaints: 0,
      violations: 0,
      joinDate: "2023-05-10",
      status: "active",
      performance: "good",
      lastActive: "30 min ago",
    },
    {
      id: "WK-004",
      name: "Priya Sharma",
      avatar: "/worker-avatar.jpg",
      zone: "Zone B",
      efficiency: 89,
      rating: 4.2,
      routesCompleted: 19,
      punctuality: 91,
      complaints: 3,
      violations: 2,
      joinDate: "2023-02-28",
      status: "active",
      performance: "good",
      lastActive: "4 hours ago",
    },
    {
      id: "WK-005",
      name: "Mohan Lal",
      avatar: "/worker-avatar.jpg",
      zone: "Zone C",
      efficiency: 85,
      rating: 3.9,
      routesCompleted: 17,
      punctuality: 88,
      complaints: 5,
      violations: 4,
      joinDate: "2022-11-12",
      status: "warning",
      performance: "needs_improvement",
      lastActive: "6 hours ago",
    },
    {
      id: "WK-006",
      name: "Ravi Sharma",
      avatar: "/worker-avatar.jpg",
      zone: "Zone C",
      efficiency: 82,
      rating: 3.7,
      routesCompleted: 15,
      punctuality: 85,
      complaints: 7,
      violations: 6,
      joinDate: "2022-09-05",
      status: "probation",
      performance: "poor",
      lastActive: "1 day ago",
    },
  ]

  const getPerformanceBadge = (performance: string) => {
    const variants = {
      excellent: "default",
      good: "secondary",
      needs_improvement: "secondary",
      poor: "destructive",
    }
    return <Badge variant={variants[performance as keyof typeof variants]}>{performance.replace("_", " ")}</Badge>
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "default",
      warning: "secondary",
      probation: "destructive",
    }
    return <Badge variant={variants[status as keyof typeof variants]}>{status}</Badge>
  }

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "excellent":
        return "text-green-600"
      case "good":
        return "text-blue-600"
      case "needs_improvement":
        return "text-yellow-600"
      case "poor":
        return "text-red-600"
      default:
        return "text-muted-foreground"
    }
  }

  const filteredWorkers = workers
    .filter((worker) => {
      const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesZone = filterZone === "all" || worker.zone === filterZone
      return matchesSearch && matchesZone
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "performance":
          return b.efficiency - a.efficiency
        case "rating":
          return b.rating - a.rating
        case "complaints":
          return a.complaints - b.complaints
        default:
          return 0
      }
    })

  const topPerformers = workers.filter((w) => w.performance === "excellent").slice(0, 3)
  const needsAttention = workers.filter((w) => w.performance === "poor" || w.status === "probation")

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
            <Users className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Worker Management</h1>
            <p className="text-primary-foreground/80 text-sm">Monitor and manage workforce performance</p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-primary-foreground/10 border-primary-foreground/20">
            <CardContent className="p-3 text-center">
              <p className="text-lg font-bold text-primary-foreground">{workers.length}</p>
              <p className="text-xs text-primary-foreground/80">Total Workers</p>
            </CardContent>
          </Card>
          <Card className="bg-primary-foreground/10 border-primary-foreground/20">
            <CardContent className="p-3 text-center">
              <p className="text-lg font-bold text-primary-foreground">{topPerformers.length}</p>
              <p className="text-xs text-primary-foreground/80">Top Performers</p>
            </CardContent>
          </Card>
          <Card className="bg-primary-foreground/10 border-primary-foreground/20">
            <CardContent className="p-3 text-center">
              <p className="text-lg font-bold text-primary-foreground">{needsAttention.length}</p>
              <p className="text-xs text-primary-foreground/80">Need Attention</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filters */}
      <div className="p-4 space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search workers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Select value={filterZone} onValueChange={setFilterZone}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Zone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Zones</SelectItem>
              <SelectItem value="Zone A">Zone A</SelectItem>
              <SelectItem value="Zone B">Zone B</SelectItem>
              <SelectItem value="Zone C">Zone C</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="performance">Performance</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="complaints">Complaints</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pb-20">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all">All Workers</TabsTrigger>
            <TabsTrigger value="top">Top Performers</TabsTrigger>
            <TabsTrigger value="attention">Need Attention</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredWorkers.map((worker) => (
              <Card key={worker.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={worker.avatar || "/placeholder.svg"} alt={worker.name} />
                      <AvatarFallback>
                        {worker.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-sm">{worker.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {worker.id} • {worker.zone}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          {getPerformanceBadge(worker.performance)}
                          {getStatusBadge(worker.status)}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span>Efficiency</span>
                            <span className="font-semibold">{worker.efficiency}%</span>
                          </div>
                          <Progress value={worker.efficiency} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span>Rating</span>
                            <span className="font-semibold">{worker.rating}/5</span>
                          </div>
                          <Progress value={(worker.rating / 5) * 100} className="h-2" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            <span>{worker.routesCompleted} routes</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-blue-600" />
                            <span>{worker.punctuality}% punctual</span>
                          </div>
                          {worker.complaints > 0 && (
                            <div className="flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3 text-red-600" />
                              <span>{worker.complaints} complaints</span>
                            </div>
                          )}
                        </div>
                        <span className="text-muted-foreground">Active {worker.lastActive}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="top" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-secondary" />
                  Top Performers This Month
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((worker, index) => (
                    <div key={worker.id} className="flex items-center gap-4 p-3 bg-secondary/10 rounded-lg">
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-secondary-foreground">{index + 1}</span>
                      </div>
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={worker.avatar || "/placeholder.svg"} alt={worker.name} />
                        <AvatarFallback>
                          {worker.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{worker.name}</h4>
                        <p className="text-xs text-muted-foreground">{worker.zone}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-secondary fill-current" />
                          <span className="font-bold text-secondary">{worker.rating}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{worker.efficiency}% efficiency</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attention" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Workers Needing Attention
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {needsAttention.map((worker) => (
                    <div key={worker.id} className="flex items-center gap-4 p-3 bg-destructive/10 rounded-lg">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={worker.avatar || "/placeholder.svg"} alt={worker.name} />
                        <AvatarFallback>
                          {worker.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{worker.name}</h4>
                        <p className="text-xs text-muted-foreground">{worker.zone}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-destructive">{worker.complaints} complaints</span>
                          <span className="text-xs text-destructive">{worker.violations} violations</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${getPerformanceColor(worker.performance)}`}>{worker.efficiency}%</p>
                        <p className="text-xs text-muted-foreground">Efficiency</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 rounded-lg">
                    <p className="font-medium text-sm">Schedule Training Session</p>
                    <p className="text-xs text-muted-foreground">
                      2 workers need additional waste segregation training
                    </p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <p className="font-medium text-sm">Performance Review</p>
                    <p className="text-xs text-muted-foreground">1 worker requires immediate performance review</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-sm">Route Reassignment</p>
                    <p className="text-xs text-muted-foreground">Consider reassigning routes for better efficiency</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

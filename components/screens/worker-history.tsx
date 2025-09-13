"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { History, Calendar, Clock, MapPin, Star, CheckCircle, Route, AlertTriangle } from "lucide-react"

interface WorkerHistoryProps {
  onBack: () => void
}

export function WorkerHistory({ onBack }: WorkerHistoryProps) {
  const routeHistory = [
    {
      id: 1,
      date: "2024-01-15",
      route: "Route A-12",
      startTime: "08:00 AM",
      endTime: "02:30 PM",
      duration: "6h 30m",
      householdsCompleted: 15,
      householdsTotal: 15,
      efficiency: 98,
      avgRating: 4.6,
      status: "completed",
    },
    {
      id: 2,
      date: "2024-01-12",
      route: "Route A-12",
      startTime: "08:00 AM",
      endTime: "03:00 PM",
      duration: "7h 00m",
      householdsCompleted: 14,
      householdsTotal: 15,
      efficiency: 85,
      avgRating: 4.2,
      status: "completed",
    },
    {
      id: 3,
      date: "2024-01-10",
      route: "Route B-08",
      startTime: "08:00 AM",
      endTime: "02:15 PM",
      duration: "6h 15m",
      householdsCompleted: 12,
      householdsTotal: 12,
      efficiency: 95,
      avgRating: 4.8,
      status: "completed",
    },
  ]

  const ratingsGiven = [
    {
      id: 1,
      date: "2024-01-15",
      household: "Sharma Family",
      address: "123 Green Street",
      rating: 5,
      notes: "Excellent segregation, all categories properly separated",
      violation: false,
    },
    {
      id: 2,
      date: "2024-01-15",
      household: "Patel Residence",
      address: "456 Eco Lane",
      rating: 4,
      notes: "Good segregation, minor improvements needed in plastic sorting",
      violation: false,
    },
    {
      id: 3,
      date: "2024-01-15",
      household: "Kumar House",
      address: "789 Clean Avenue",
      rating: 2,
      notes: "Poor segregation, organic waste mixed with plastic",
      violation: true,
    },
    {
      id: 4,
      date: "2024-01-12",
      household: "Singh Family",
      address: "321 Waste Way",
      rating: 5,
      notes: "Perfect waste management, exemplary household",
      violation: false,
    },
  ]

  const pendingTasks = [
    {
      id: 1,
      task: "Submit violation report for Kumar House",
      priority: "high",
      dueDate: "2024-01-16",
    },
    {
      id: 2,
      task: "Complete route efficiency report",
      priority: "medium",
      dueDate: "2024-01-17",
    },
    {
      id: 3,
      task: "Attend safety training session",
      priority: "low",
      dueDate: "2024-01-20",
    },
  ]

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 95) return "text-green-600"
    if (efficiency >= 85) return "text-yellow-600"
    return "text-red-600"
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      default:
        return "outline"
    }
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
            <History className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Work History</h1>
            <p className="text-primary-foreground/80 text-sm">Track your performance and activities</p>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-primary-foreground/10 border-primary-foreground/20">
            <CardContent className="p-3 text-center">
              <p className="text-lg font-bold text-primary-foreground">15</p>
              <p className="text-xs text-primary-foreground/80">Routes This Month</p>
            </CardContent>
          </Card>
          <Card className="bg-primary-foreground/10 border-primary-foreground/20">
            <CardContent className="p-3 text-center">
              <p className="text-lg font-bold text-primary-foreground">92%</p>
              <p className="text-xs text-primary-foreground/80">Avg Efficiency</p>
            </CardContent>
          </Card>
          <Card className="bg-primary-foreground/10 border-primary-foreground/20">
            <CardContent className="p-3 text-center">
              <p className="text-lg font-bold text-primary-foreground">4.5</p>
              <p className="text-xs text-primary-foreground/80">Avg Rating</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-20">
        <Tabs defaultValue="routes" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="routes" className="flex items-center gap-2">
              <Route className="h-4 w-4" />
              <span className="hidden sm:inline">Routes</span>
            </TabsTrigger>
            <TabsTrigger value="ratings" className="flex items-center gap-2">
              <Star className="h-4 w-4" />
              <span className="hidden sm:inline">Ratings</span>
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Tasks</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="routes" className="space-y-4">
            {routeHistory.map((route) => (
              <Card key={route.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/20 rounded-full">
                        <Route className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{route.route}</h3>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{route.date}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{route.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">
                        {route.householdsCompleted}/{route.householdsTotal} households
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className={`font-bold ${getEfficiencyColor(route.efficiency)}`}>{route.efficiency}%</p>
                        <p className="text-xs text-muted-foreground">Efficiency</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-secondary fill-current" />
                          <span className="font-bold">{route.avgRating}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">Avg Rating</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="ratings" className="space-y-4">
            {ratingsGiven.map((rating) => (
              <Card key={rating.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-secondary/20 rounded-full">
                        <MapPin className="h-4 w-4 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{rating.household}</h3>
                        <p className="text-xs text-muted-foreground">{rating.address}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="h-4 w-4 text-secondary fill-current" />
                        <span className="font-bold">{rating.rating}/5</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{rating.date}</p>
                    </div>
                  </div>

                  {rating.violation && (
                    <div className="flex items-center gap-2 mb-3 p-2 bg-destructive/10 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <span className="text-sm text-destructive font-medium">Violation Reported</span>
                    </div>
                  )}

                  <div className="bg-muted rounded-lg p-3">
                    <p className="text-sm text-muted-foreground mb-1">Notes:</p>
                    <p className="text-sm">{rating.notes}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            {pendingTasks.map((task) => (
              <Card key={task.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-accent/20 rounded-full">
                        <Calendar className="h-4 w-4 text-accent-foreground" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm">{task.task}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">Due: {task.dueDate}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={getPriorityColor(task.priority)}>{task.priority}</Badge>
                  </div>
                  <Button size="sm" className="w-full">
                    Mark Complete
                  </Button>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

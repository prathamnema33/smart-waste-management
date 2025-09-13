"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { History, CheckCircle, XCircle, Star, Coins, Calendar, Clock } from "lucide-react"

interface CitizenHistoryProps {
  onBack: () => void
}

export function CitizenHistory({ onBack }: CitizenHistoryProps) {
  const pickupHistory = [
    {
      id: 1,
      date: "2024-01-15",
      time: "08:30 AM",
      status: "collected",
      rating: 5,
      points: 25,
      worker: "Rajesh Kumar",
      notes: "Excellent segregation",
    },
    {
      id: 2,
      date: "2024-01-12",
      time: "09:15 AM",
      status: "collected",
      rating: 4,
      points: 20,
      worker: "Priya Sharma",
      notes: "Good segregation, minor improvements needed",
    },
    {
      id: 3,
      date: "2024-01-10",
      time: "08:45 AM",
      status: "missed",
      rating: 0,
      points: 0,
      worker: "N/A",
      notes: "Household not available",
    },
    {
      id: 4,
      date: "2024-01-08",
      time: "09:00 AM",
      status: "collected",
      rating: 5,
      points: 25,
      worker: "Amit Singh",
      notes: "Perfect waste segregation",
    },
    {
      id: 5,
      date: "2024-01-05",
      time: "08:20 AM",
      status: "collected",
      rating: 3,
      points: 15,
      worker: "Sunita Devi",
      notes: "Needs better plastic segregation",
    },
  ]

  const totalPoints = pickupHistory.reduce((sum, pickup) => sum + pickup.points, 0)
  const avgRating =
    pickupHistory.filter((p) => p.status === "collected").reduce((sum, pickup) => sum + pickup.rating, 0) /
    pickupHistory.filter((p) => p.status === "collected").length

  const getStatusIcon = (status: string) => {
    return status === "collected" ? (
      <CheckCircle className="h-5 w-5 text-green-500" />
    ) : (
      <XCircle className="h-5 w-5 text-red-500" />
    )
  }

  const getStatusBadge = (status: string) => {
    return status === "collected" ? (
      <Badge variant="secondary" className="bg-green-100 text-green-800">
        Collected
      </Badge>
    ) : (
      <Badge variant="destructive">Missed</Badge>
    )
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
            <h1 className="text-xl font-bold">Pickup History</h1>
            <p className="text-primary-foreground/80 text-sm">Track your waste collection journey</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-primary-foreground/10 border-primary-foreground/20">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-xs text-primary-foreground/80">Total Points</p>
                  <p className="text-lg font-bold text-primary-foreground">{totalPoints}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-primary-foreground/10 border-primary-foreground/20">
            <CardContent className="p-3">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-secondary fill-current" />
                <div>
                  <p className="text-xs text-primary-foreground/80">Avg Rating</p>
                  <p className="text-lg font-bold text-primary-foreground">{avgRating.toFixed(1)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* History List */}
      <div className="p-4 space-y-4 pb-20">
        {pickupHistory.map((pickup) => (
          <Card key={pickup.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {getStatusIcon(pickup.status)}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="font-semibold text-sm">{pickup.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{pickup.time}</span>
                    </div>
                  </div>
                </div>
                {getStatusBadge(pickup.status)}
              </div>

              {pickup.status === "collected" && (
                <>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Worker:</span>
                      <span className="text-sm font-medium">{pickup.worker}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Coins className="h-4 w-4 text-secondary" />
                      <span className="font-semibold text-secondary">+{pickup.points}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-muted-foreground">Rating:</span>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= pickup.rating ? "text-secondary fill-current" : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              <div className="bg-muted rounded-lg p-3">
                <p className="text-sm text-muted-foreground">Notes:</p>
                <p className="text-sm font-medium">{pickup.notes}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

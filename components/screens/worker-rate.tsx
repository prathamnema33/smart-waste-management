"use client"

import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Star, AlertTriangle, CheckCircle, Clock, MapPin, Flag } from "lucide-react"

interface WorkerRateProps {
  onBack: () => void
}

export function WorkerRate({ onBack }: WorkerRateProps) {
  const [ratings, setRatings] = React.useState<Record<string, number>>({})
  const [violations, setViolations] = React.useState<Record<string, boolean>>({})
  const [notes, setNotes] = React.useState<Record<string, string>>({})

  const householdsCollected = [
    {
      id: "HH-001",
      address: "123 Green Street",
      name: "Sharma Family",
      time: "08:30 AM",
      status: "completed",
      wasteTypes: ["Organic", "Plastic", "Paper"],
    },
    {
      id: "HH-002",
      address: "456 Eco Lane",
      name: "Patel Residence",
      time: "08:45 AM",
      status: "completed",
      wasteTypes: ["Organic", "Glass", "Metal"],
    },
    {
      id: "HH-003",
      address: "789 Clean Avenue",
      name: "Kumar House",
      time: "09:00 AM",
      status: "completed",
      wasteTypes: ["Organic", "Plastic"],
    },
    {
      id: "HH-004",
      address: "321 Waste Way",
      name: "Singh Family",
      time: "09:15 AM",
      status: "pending",
      wasteTypes: ["Mixed"],
    },
    {
      id: "HH-005",
      address: "654 Recycle Road",
      name: "Gupta Residence",
      time: "09:30 AM",
      status: "completed",
      wasteTypes: ["Organic", "Paper", "Plastic"],
    },
  ]

  const setRating = (householdId: string, rating: number) => {
    setRatings((prev) => ({ ...prev, [householdId]: rating }))
  }

  const toggleViolation = (householdId: string) => {
    setViolations((prev) => ({ ...prev, [householdId]: !prev[householdId] }))
  }

  const updateNotes = (householdId: string, note: string) => {
    setNotes((prev) => ({ ...prev, [householdId]: note }))
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-600"
    if (rating >= 3) return "text-yellow-600"
    return "text-red-600"
  }

  const completedCount = householdsCollected.filter((h) => h.status === "completed").length
  const ratedCount = Object.keys(ratings).length

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
            <Star className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Rate Households</h1>
            <p className="text-primary-foreground/80 text-sm">Rate waste segregation quality</p>
          </div>
        </div>

        {/* Progress Summary */}
        <Card className="bg-primary-foreground/10 border-primary-foreground/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-primary-foreground/80 text-sm">Today's Collections</p>
                <p className="text-2xl font-bold text-primary-foreground">{completedCount}</p>
              </div>
              <div className="text-right">
                <p className="text-primary-foreground/80 text-sm">Rated</p>
                <p className="text-2xl font-bold text-primary-foreground">{ratedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Households List */}
      <div className="p-4 space-y-4 pb-20">
        {householdsCollected.map((household) => (
          <Card key={household.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/20 rounded-full">
                    <MapPin className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{household.name}</h3>
                    <p className="text-xs text-muted-foreground">{household.address}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 mb-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{household.time}</span>
                  </div>
                  <Badge variant={household.status === "completed" ? "secondary" : "outline"}>{household.status}</Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Waste Types */}
              <div>
                <p className="text-sm font-medium mb-2">Waste Types:</p>
                <div className="flex flex-wrap gap-2">
                  {household.wasteTypes.map((type) => (
                    <Badge key={type} variant="outline" className="text-xs">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>

              {household.status === "completed" && (
                <>
                  {/* Rating */}
                  <div>
                    <p className="text-sm font-medium mb-2">Segregation Rating:</p>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} onClick={() => setRating(household.id, star)} className="transition-colors">
                          <Star
                            className={`h-6 w-6 ${
                              star <= (ratings[household.id] || 0)
                                ? "text-secondary fill-current"
                                : "text-muted-foreground"
                            }`}
                          />
                        </button>
                      ))}
                      {ratings[household.id] && (
                        <span className={`ml-2 font-semibold ${getRatingColor(ratings[household.id])}`}>
                          {ratings[household.id]}/5
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Violation Report */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">Report Violation:</p>
                      <Button
                        variant={violations[household.id] ? "destructive" : "outline"}
                        size="sm"
                        onClick={() => toggleViolation(household.id)}
                        className="flex items-center gap-2"
                      >
                        <Flag className="h-4 w-4" />
                        {violations[household.id] ? "Violation Reported" : "Report Issue"}
                      </Button>
                    </div>
                    {violations[household.id] && (
                      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="h-4 w-4 text-destructive" />
                          <span className="text-sm font-medium text-destructive">Violation Details</span>
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">
                          This will be reported to the monitoring team and may result in a fine.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  <div>
                    <p className="text-sm font-medium mb-2">Additional Notes:</p>
                    <Textarea
                      placeholder="Add any additional comments about the collection..."
                      value={notes[household.id] || ""}
                      onChange={(e) => updateNotes(household.id, e.target.value)}
                      className="min-h-[60px] text-sm"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    className="w-full"
                    disabled={!ratings[household.id]}
                    onClick={() => {
                      // Handle submission
                      console.log("Submitting rating for", household.id, {
                        rating: ratings[household.id],
                        violation: violations[household.id],
                        notes: notes[household.id],
                      })
                    }}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Submit Rating
                  </Button>
                </>
              )}

              {household.status === "pending" && (
                <div className="text-center py-4">
                  <Clock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Collection pending</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

"use client"

import React from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Search, Filter, Clock, CheckCircle, AlertTriangle, User, MapPin, Calendar } from "lucide-react"

interface AdminComplaintsProps {
  onBack: () => void
}

export function AdminComplaints({ onBack }: AdminComplaintsProps) {
  const [searchTerm, setSearchTerm] = React.useState("")
  const [filterStatus, setFilterStatus] = React.useState("all")
  const [filterArea, setFilterArea] = React.useState("all")

  const complaints = [
    {
      id: "CMP-001",
      title: "Missed pickup on scheduled day",
      description: "Waste collection truck did not arrive on the scheduled pickup day. Waste is accumulating.",
      citizen: "Rajesh Sharma",
      household: "HH-2024-001234",
      address: "123 Green Street, Zone A",
      worker: "Amit Singh",
      status: "open",
      priority: "high",
      createdAt: "2024-01-15 09:30 AM",
      updatedAt: "2024-01-15 09:30 AM",
      category: "missed_pickup",
    },
    {
      id: "CMP-002",
      title: "Worker arrived very late",
      description: "Collection worker arrived 3 hours late, causing inconvenience to the household.",
      citizen: "Priya Patel",
      household: "HH-2024-005678",
      address: "456 Eco Lane, Zone B",
      worker: "Rajesh Kumar",
      status: "in_progress",
      priority: "medium",
      createdAt: "2024-01-14 02:15 PM",
      updatedAt: "2024-01-15 10:00 AM",
      category: "timing",
    },
    {
      id: "CMP-003",
      title: "Waste not properly collected",
      description: "Some waste bags were left behind and not collected during the pickup.",
      citizen: "Kumar Singh",
      household: "HH-2024-009876",
      address: "789 Clean Avenue, Zone A",
      worker: "Sunita Devi",
      status: "resolved",
      priority: "low",
      createdAt: "2024-01-13 11:45 AM",
      updatedAt: "2024-01-14 03:30 PM",
      category: "incomplete_collection",
    },
    {
      id: "CMP-004",
      title: "Rude behavior from worker",
      description: "Worker was rude and unprofessional during waste collection. Need immediate action.",
      citizen: "Anita Gupta",
      household: "HH-2024-004321",
      address: "321 Waste Way, Zone C",
      worker: "Mohan Lal",
      status: "open",
      priority: "high",
      createdAt: "2024-01-15 08:20 AM",
      updatedAt: "2024-01-15 08:20 AM",
      category: "behavior",
    },
    {
      id: "CMP-005",
      title: "Damaged property during collection",
      description: "Worker accidentally damaged the gate while collecting waste. Compensation requested.",
      citizen: "Deepak Verma",
      household: "HH-2024-007890",
      address: "654 Recycle Road, Zone B",
      worker: "Ravi Sharma",
      status: "in_progress",
      priority: "medium",
      createdAt: "2024-01-12 04:00 PM",
      updatedAt: "2024-01-14 11:15 AM",
      category: "property_damage",
    },
  ]

  const getStatusBadge = (status: string) => {
    const variants = {
      open: "destructive",
      in_progress: "secondary",
      resolved: "default",
    }
    return <Badge variant={variants[status as keyof typeof variants]}>{status.replace("_", " ")}</Badge>
  }

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: "destructive",
      medium: "secondary",
      low: "outline",
    }
    return <Badge variant={variants[priority as keyof typeof variants]}>{priority}</Badge>
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      case "in_progress":
        return <Clock className="h-4 w-4 text-secondary" />
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      default:
        return <AlertTriangle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.citizen.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.household.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || complaint.status === filterStatus
    const matchesArea = filterArea === "all" || complaint.address.includes(filterArea)
    return matchesSearch && matchesStatus && matchesArea
  })

  const statusCounts = {
    all: complaints.length,
    open: complaints.filter((c) => c.status === "open").length,
    in_progress: complaints.filter((c) => c.status === "in_progress").length,
    resolved: complaints.filter((c) => c.status === "resolved").length,
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
            <MessageSquare className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Complaints Management</h1>
            <p className="text-primary-foreground/80 text-sm">Handle citizen reports and issues</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-primary-foreground/10 border-primary-foreground/20">
            <CardContent className="p-3 text-center">
              <p className="text-lg font-bold text-primary-foreground">{statusCounts.open}</p>
              <p className="text-xs text-primary-foreground/80">Open</p>
            </CardContent>
          </Card>
          <Card className="bg-primary-foreground/10 border-primary-foreground/20">
            <CardContent className="p-3 text-center">
              <p className="text-lg font-bold text-primary-foreground">{statusCounts.in_progress}</p>
              <p className="text-xs text-primary-foreground/80">In Progress</p>
            </CardContent>
          </Card>
          <Card className="bg-primary-foreground/10 border-primary-foreground/20">
            <CardContent className="p-3 text-center">
              <p className="text-lg font-bold text-primary-foreground">{statusCounts.resolved}</p>
              <p className="text-xs text-primary-foreground/80">Resolved</p>
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
              placeholder="Search complaints..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex gap-2">
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterArea} onValueChange={setFilterArea}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Area" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Areas</SelectItem>
              <SelectItem value="Zone A">Zone A</SelectItem>
              <SelectItem value="Zone B">Zone B</SelectItem>
              <SelectItem value="Zone C">Zone C</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Complaints List */}
      <div className="px-4 pb-20">
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="priority">Priority View</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            {filteredComplaints.map((complaint) => (
              <Card key={complaint.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(complaint.status)}
                      <div>
                        <h3 className="font-semibold text-sm">{complaint.title}</h3>
                        <p className="text-xs text-muted-foreground">ID: {complaint.id}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {getPriorityBadge(complaint.priority)}
                      {getStatusBadge(complaint.status)}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{complaint.description}</p>

                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3 text-muted-foreground" />
                      <span className="font-medium">{complaint.citizen}</span>
                      <span className="text-muted-foreground">({complaint.household})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span>{complaint.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span>Created: {complaint.createdAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="text-xs text-muted-foreground">
                      Worker: <span className="font-medium">{complaint.worker}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      {complaint.status !== "resolved" && <Button size="sm">Update Status</Button>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="priority" className="space-y-4">
            {["high", "medium", "low"].map((priority) => {
              const priorityComplaints = filteredComplaints.filter((c) => c.priority === priority)
              if (priorityComplaints.length === 0) return null

              return (
                <div key={priority}>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="font-semibold capitalize">{priority} Priority</h3>
                    <Badge
                      variant={priority === "high" ? "destructive" : priority === "medium" ? "secondary" : "outline"}
                    >
                      {priorityComplaints.length}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    {priorityComplaints.map((complaint) => (
                      <Card key={complaint.id} className="p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(complaint.status)}
                            <div>
                              <h4 className="font-medium text-sm">{complaint.title}</h4>
                              <p className="text-xs text-muted-foreground">
                                {complaint.citizen} • {complaint.createdAt}
                              </p>
                            </div>
                          </div>
                          {getStatusBadge(complaint.status)}
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            })}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

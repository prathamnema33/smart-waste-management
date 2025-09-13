"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, Download, TrendingUp, TrendingDown, FileText, Calendar, Target, Award } from "lucide-react"

interface AdminReportsProps {
  onBack: () => void
}

export function AdminReports({ onBack }: AdminReportsProps) {
  const [timeRange, setTimeRange] = React.useState("month")
  const [reportType, setReportType] = React.useState("overview")

  const performanceData = {
    segregationCompliance: {
      current: 87,
      previous: 82,
      trend: "up",
      target: 90,
    },
    avgRating: {
      current: 4.2,
      previous: 4.0,
      trend: "up",
      target: 4.5,
    },
    collectionEfficiency: {
      current: 94,
      previous: 91,
      trend: "up",
      target: 95,
    },
    citizenSatisfaction: {
      current: 88,
      previous: 85,
      trend: "up",
      target: 92,
    },
  }

  const zoneComparison = [
    { zone: "Zone A", compliance: 92, rating: 4.5, efficiency: 96, households: 1250 },
    { zone: "Zone B", compliance: 85, rating: 4.1, efficiency: 93, households: 1100 },
    { zone: "Zone C", compliance: 83, rating: 3.9, efficiency: 91, households: 980 },
    { zone: "Zone D", compliance: 89, rating: 4.3, efficiency: 95, households: 1350 },
  ]

  const monthlyTrends = [
    { month: "Oct", segregation: 78, rating: 3.8, complaints: 45 },
    { month: "Nov", segregation: 82, rating: 4.0, complaints: 38 },
    { month: "Dec", segregation: 85, rating: 4.1, complaints: 32 },
    { month: "Jan", segregation: 87, rating: 4.2, complaints: 28 },
  ]

  const workerPerformance = [
    { name: "Rajesh Kumar", efficiency: 98, rating: 4.8, routes: 22, violations: 1 },
    { name: "Amit Singh", efficiency: 95, rating: 4.6, routes: 20, violations: 2 },
    { name: "Sunita Devi", efficiency: 92, rating: 4.4, routes: 18, violations: 0 },
    { name: "Priya Sharma", efficiency: 89, rating: 4.2, routes: 19, violations: 3 },
    { name: "Mohan Lal", efficiency: 85, rating: 3.9, routes: 17, violations: 5 },
  ]

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    )
  }

  const getPerformanceColor = (current: number, target: number) => {
    const percentage = (current / target) * 100
    if (percentage >= 95) return "text-green-600"
    if (percentage >= 80) return "text-yellow-600"
    return "text-red-600"
  }

  const downloadReport = (format: string) => {
    // Mock download functionality
    console.log(`Downloading ${reportType} report in ${format} format for ${timeRange}`)
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
            <BarChart3 className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Analytics & Reports</h1>
            <p className="text-primary-foreground/80 text-sm">Performance insights and data visualization</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-2 mb-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>

          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-32 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">Overview</SelectItem>
              <SelectItem value="performance">Performance</SelectItem>
              <SelectItem value="compliance">Compliance</SelectItem>
              <SelectItem value="workers">Workers</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Download Buttons */}
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => downloadReport("pdf")}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            PDF
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => downloadReport("excel")}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Excel
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-20">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="zones">Zone Comparison</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(performanceData).map(([key, data]) => (
                <Card key={key}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                      </div>
                      {getTrendIcon(data.trend)}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <span className={`text-2xl font-bold ${getPerformanceColor(data.current, data.target)}`}>
                          {typeof data.current === "number" && data.current < 10
                            ? data.current.toFixed(1)
                            : data.current}
                          {key !== "avgRating" && "%"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Target: {data.target}
                          {key !== "avgRating" && "%"}
                        </span>
                      </div>
                      <Progress value={key === "avgRating" ? (data.current / 5) * 100 : data.current} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-secondary" />
                  Top Performing Workers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {workerPerformance.slice(0, 3).map((worker, index) => (
                    <div key={worker.name} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold text-secondary-foreground">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{worker.name}</p>
                          <p className="text-xs text-muted-foreground">{worker.routes} routes completed</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-secondary">{worker.efficiency}%</p>
                        <p className="text-xs text-muted-foreground">Efficiency</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="zones" className="space-y-4">
            {zoneComparison.map((zone) => (
              <Card key={zone.zone}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{zone.zone}</CardTitle>
                    <Badge variant="outline">{zone.households} households</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-primary">{zone.compliance}%</p>
                      <p className="text-xs text-muted-foreground">Compliance</p>
                      <Progress value={zone.compliance} className="h-2 mt-2" />
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-secondary">{zone.rating}</p>
                      <p className="text-xs text-muted-foreground">Avg Rating</p>
                      <Progress value={(zone.rating / 5) * 100} className="h-2 mt-2" />
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-accent">{zone.efficiency}%</p>
                      <p className="text-xs text-muted-foreground">Efficiency</p>
                      <Progress value={zone.efficiency} className="h-2 mt-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            {/* Monthly Trends Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Monthly Performance Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyTrends.map((month) => (
                    <div key={month.month} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="font-medium">{month.month}</div>
                      <div className="flex items-center gap-6 text-sm">
                        <div className="text-center">
                          <p className="font-bold text-primary">{month.segregation}%</p>
                          <p className="text-xs text-muted-foreground">Segregation</p>
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-secondary">{month.rating}</p>
                          <p className="text-xs text-muted-foreground">Rating</p>
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-destructive">{month.complaints}</p>
                          <p className="text-xs text-muted-foreground">Complaints</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Improvement Areas */}
            <Card>
              <CardHeader>
                <CardTitle>Areas for Improvement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Zone C Compliance</p>
                      <p className="text-xs text-muted-foreground">Below target by 7%</p>
                    </div>
                    <Badge variant="destructive">Priority</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Worker Training</p>
                      <p className="text-xs text-muted-foreground">5 workers need additional training</p>
                    </div>
                    <Badge variant="secondary">Medium</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Citizen Education</p>
                      <p className="text-xs text-muted-foreground">Increase awareness campaigns</p>
                    </div>
                    <Badge variant="outline">Low</Badge>
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

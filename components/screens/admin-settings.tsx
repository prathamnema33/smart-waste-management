"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, DollarSign, Bell, Shield, Save, Plus, Edit, Trash2 } from "lucide-react"

interface AdminSettingsProps {
  onBack: () => void
}

export function AdminSettings({ onBack }: AdminSettingsProps) {
  const [zones, setZones] = React.useState([
    { id: "zone-a", name: "Zone A", households: 1250, workers: 12, routes: 8 },
    { id: "zone-b", name: "Zone B", households: 1100, workers: 10, routes: 7 },
    { id: "zone-c", name: "Zone C", households: 980, workers: 8, routes: 6 },
    { id: "zone-d", name: "Zone D", households: 1350, workers: 15, routes: 9 },
  ])

  const [fines, setFines] = React.useState([
    { id: "fine-1", violation: "Poor Segregation", amount: 100, description: "Improper waste segregation" },
    { id: "fine-2", violation: "Missed Pickup", amount: 50, description: "Household not available during pickup" },
    { id: "fine-3", violation: "Contaminated Waste", amount: 200, description: "Hazardous materials in regular waste" },
    { id: "fine-4", violation: "Overweight Bags", amount: 75, description: "Waste bags exceeding weight limit" },
  ])

  const [notifications, setNotifications] = React.useState({
    emailAlerts: true,
    smsAlerts: false,
    pushNotifications: true,
    weeklyReports: true,
  })

  const [systemSettings, setSystemSettings] = React.useState({
    autoAssignRoutes: true,
    enableGpsTracking: true,
    allowWorkerRating: true,
    requirePhotoProof: false,
  })

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
            <Settings className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">System Settings</h1>
            <p className="text-primary-foreground/80 text-sm">Manage zones, routes, fines and policies</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-20">
        <Tabs defaultValue="zones" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="zones">Zones</TabsTrigger>
            <TabsTrigger value="fines">Fines</TabsTrigger>
            <TabsTrigger value="notifications">Alerts</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="zones" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Zone Management</h2>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Zone
              </Button>
            </div>

            {zones.map((zone) => (
              <Card key={zone.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{zone.name}</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-primary/10 rounded-lg">
                      <p className="text-2xl font-bold text-primary">{zone.households}</p>
                      <p className="text-sm text-primary">Households</p>
                    </div>
                    <div className="text-center p-3 bg-secondary/10 rounded-lg">
                      <p className="text-2xl font-bold text-secondary">{zone.workers}</p>
                      <p className="text-sm text-secondary">Workers</p>
                    </div>
                    <div className="text-center p-3 bg-accent/10 rounded-lg">
                      <p className="text-2xl font-bold text-accent-foreground">{zone.routes}</p>
                      <p className="text-sm text-accent-foreground">Routes</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label htmlFor={`zone-${zone.id}-name`}>Zone Name</Label>
                      <Input id={`zone-${zone.id}-name`} value={zone.name} className="mt-1" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor={`zone-${zone.id}-households`}>Households</Label>
                        <Input
                          id={`zone-${zone.id}-households`}
                          type="number"
                          value={zone.households}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor={`zone-${zone.id}-workers`}>Assigned Workers</Label>
                        <Input id={`zone-${zone.id}-workers`} type="number" value={zone.workers} className="mt-1" />
                      </div>
                    </div>
                    <Button className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="fines" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Fine Management</h2>
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Add Fine
              </Button>
            </div>

            {fines.map((fine) => (
              <Card key={fine.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-sm">{fine.violation}</h3>
                      <p className="text-xs text-muted-foreground">{fine.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />₹{fine.amount}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <Label htmlFor={`fine-${fine.id}-violation`}>Violation Type</Label>
                      <Input id={`fine-${fine.id}-violation`} value={fine.violation} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor={`fine-${fine.id}-amount`}>Fine Amount (₹)</Label>
                      <Input id={`fine-${fine.id}-amount`} type="number" value={fine.amount} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor={`fine-${fine.id}-description`}>Description</Label>
                      <Textarea
                        id={`fine-${fine.id}-description`}
                        value={fine.description}
                        className="mt-1 min-h-[60px]"
                      />
                    </div>
                    <Button className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Update Fine
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-alerts">Email Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive important updates via email</p>
                  </div>
                  <Switch
                    id="email-alerts"
                    checked={notifications.emailAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, emailAlerts: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-alerts">SMS Alerts</Label>
                    <p className="text-sm text-muted-foreground">Receive critical alerts via SMS</p>
                  </div>
                  <Switch
                    id="sms-alerts"
                    checked={notifications.smsAlerts}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, smsAlerts: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Real-time notifications in the app</p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={notifications.pushNotifications}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekly-reports">Weekly Reports</Label>
                    <p className="text-sm text-muted-foreground">Automated weekly performance reports</p>
                  </div>
                  <Switch
                    id="weekly-reports"
                    checked={notifications.weeklyReports}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Thresholds</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="complaint-threshold">Complaint Alert Threshold</Label>
                  <Select defaultValue="5">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 complaints</SelectItem>
                      <SelectItem value="5">5 complaints</SelectItem>
                      <SelectItem value="10">10 complaints</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="efficiency-threshold">Low Efficiency Alert (%)</Label>
                  <Input id="efficiency-threshold" type="number" defaultValue="80" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="rating-threshold">Low Rating Alert</Label>
                  <Input id="rating-threshold" type="number" step="0.1" defaultValue="3.5" className="mt-1" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  System Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-assign">Auto-assign Routes</Label>
                    <p className="text-sm text-muted-foreground">Automatically assign routes to workers</p>
                  </div>
                  <Switch
                    id="auto-assign"
                    checked={systemSettings.autoAssignRoutes}
                    onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, autoAssignRoutes: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="gps-tracking">GPS Tracking</Label>
                    <p className="text-sm text-muted-foreground">Enable real-time GPS tracking for workers</p>
                  </div>
                  <Switch
                    id="gps-tracking"
                    checked={systemSettings.enableGpsTracking}
                    onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, enableGpsTracking: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="worker-rating">Worker Rating System</Label>
                    <p className="text-sm text-muted-foreground">Allow citizens to rate workers</p>
                  </div>
                  <Switch
                    id="worker-rating"
                    checked={systemSettings.allowWorkerRating}
                    onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, allowWorkerRating: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="photo-proof">Photo Proof Requirement</Label>
                    <p className="text-sm text-muted-foreground">Require photo proof for waste collection</p>
                  </div>
                  <Switch
                    id="photo-proof"
                    checked={systemSettings.requirePhotoProof}
                    onCheckedChange={(checked) => setSystemSettings({ ...systemSettings, requirePhotoProof: checked })}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Working Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start-time">Start Time</Label>
                    <Input id="start-time" type="time" defaultValue="08:00" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="end-time">End Time</Label>
                    <Input id="end-time" type="time" defaultValue="17:00" className="mt-1" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="working-days">Working Days</Label>
                  <Select defaultValue="6">
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">Monday to Friday</SelectItem>
                      <SelectItem value="6">Monday to Saturday</SelectItem>
                      <SelectItem value="7">All days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Export System Data</p>
                    <p className="text-xs text-muted-foreground">Download complete system data backup</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Export
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <p className="font-medium text-sm">Clear Old Data</p>
                    <p className="text-xs text-muted-foreground">Remove data older than 2 years</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Clean Up
                  </Button>
                </div>

                <div className="flex items-center justify-between p-3 bg-destructive/10 rounded-lg">
                  <div>
                    <p className="font-medium text-sm text-destructive">Reset System</p>
                    <p className="text-xs text-muted-foreground">Reset all settings to default</p>
                  </div>
                  <Button variant="destructive" size="sm">
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

"use client"

import React, { lazy, Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent } from "@/components/ui/tabs"
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
  Play,
  Clock,
  MapPin,
  Target,
  BookOpen,
  Trophy,
  Zap,
  CheckCircle,
  XCircle,
  Trash2,
  Upload,
} from "lucide-react"
import type { CitizenDashboardProps } from "./citizen-dashboard-props"

const CitizenShop = lazy(() => import("@/components/screens/citizen-shop").then((m) => ({ default: m.CitizenShop })))
const CitizenHistory = lazy(() =>
  import("@/components/screens/citizen-history").then((m) => ({ default: m.CitizenHistory })),
)
const CitizenProfile = lazy(() =>
  import("@/components/screens/citizen-profile").then((m) => ({ default: m.CitizenProfile })),
)

export function CitizenDashboard({ user, onLogout, onRoleSwitch }: CitizenDashboardProps) {
  const [activeTab, setActiveTab] = React.useState("home")
  const [currentGreenPoints, setCurrentGreenPoints] = React.useState(0)
  const [currentVideo, setCurrentVideo] = React.useState<string | null>(null)
  const [currentQuiz, setCurrentQuiz] = React.useState(0)
  const [quizScore, setQuizScore] = React.useState(0)
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(null)
  const [showResult, setShowResult] = React.useState(false)
  const [isScanning, setIsScanning] = React.useState(false)
  const [scannedItems, setScannedItems] = React.useState<any[]>([])

  // Mock data for citizen
  const citizenData = {
    greenPoints: 1250,
    wasteSegregated: 45,
    co2Saved: 12.5,
    pointsEarned: 320,
    rating: 4.8,
    level: "Eco Warrior",
  }

  React.useEffect(() => {
    setCurrentGreenPoints(citizenData.greenPoints)
  }, [])

  const dustbins = [
    {
      type: "organic",
      name: "Organic Waste",
      color: "bg-green-500",
      icon: <Leaf className="h-8 w-8 text-white" />,
      description: "Food scraps, garden waste",
      examples: ["Fruit peels", "Vegetable waste", "Tea bags", "Flowers"],
    },
    {
      type: "recyclable",
      name: "Recyclable",
      color: "bg-blue-500",
      icon: <Recycle className="h-8 w-8 text-white" />,
      description: "Paper, plastic, metal, glass",
      examples: ["Newspapers", "Plastic bottles", "Cans", "Glass jars"],
    },
    {
      type: "hazardous",
      name: "Hazardous",
      color: "bg-red-500",
      icon: <Trash2 className="h-8 w-8 text-white" />,
      description: "Batteries, chemicals, e-waste",
      examples: ["Batteries", "Paint", "Electronics", "Medicines"],
    },
  ]

  const trainingVideos = [
    {
      id: "segregation",
      title: "Waste Segregation Basics",
      duration: "3:45",
      thumbnail: "/placeholder-c9vup.png",
      description: "Learn the fundamentals of proper waste segregation",
      language: "English",
    },
    {
      id: "composting",
      title: "Home Composting Guide",
      duration: "5:20",
      thumbnail: "/placeholder-5frvk.png",
      description: "Step-by-step guide to composting at home",
      language: "Hindi",
    },
    {
      id: "recycling",
      title: "Recycling Best Practices",
      duration: "4:15",
      thumbnail: "/placeholder-wuqyf.png",
      description: "Maximize your recycling impact",
      language: "English",
    },
  ]

  const quizQuestions = [
    {
      id: "q1",
      question: "Where should banana peels go?",
      options: [
        { id: "organic", text: "Organic", icon: <Leaf className="h-6 w-6" />, correct: true },
        { id: "recyclable", text: "Recyclable", icon: <Recycle className="h-6 w-6" />, correct: false },
        { id: "hazardous", text: "Hazardous", icon: <Trash2 className="h-6 w-6" />, correct: false },
      ],
      explanation: "Banana peels are organic waste and can be composted to create nutrient-rich soil.",
    },
    {
      id: "q2",
      question: "Where do plastic bottles belong?",
      options: [
        { id: "organic", text: "Organic", icon: <Leaf className="h-6 w-6" />, correct: false },
        { id: "recyclable", text: "Recyclable", icon: <Recycle className="h-6 w-6" />, correct: true },
        { id: "hazardous", text: "Hazardous", icon: <Trash2 className="h-6 w-6" />, correct: false },
      ],
      explanation: "Plastic bottles can be recycled into new products, reducing environmental impact.",
    },
  ]

  const nearbyShops = [
    {
      name: "Green Recyclers",
      distance: "0.5 km",
      type: "Paper, Plastic",
      rating: 4.5,
      price: "₹15/kg",
    },
    {
      name: "Eco Scrap Center",
      distance: "1.2 km",
      type: "Metal, E-waste",
      rating: 4.8,
      price: "₹25/kg",
    },
    {
      name: "City Kabadiwala",
      distance: "0.8 km",
      type: "All types",
      rating: 4.2,
      price: "₹12/kg",
    },
  ]

  const features = [
    {
      id: "scan",
      title: "Scan Waste",
      icon: Camera,
      color: "bg-gradient-to-br from-emerald-500 to-green-600",
      description: "Scan and categorize waste",
    },
    {
      id: "rating",
      title: "My Rating",
      icon: Star,
      color: "bg-gradient-to-br from-amber-500 to-orange-600",
      description: "View your eco rating",
    },
    {
      id: "shop",
      title: "Green Shop",
      icon: ShoppingBag,
      color: "bg-gradient-to-br from-blue-500 to-indigo-600",
      description: "Redeem eco-friendly rewards",
    },
    {
      id: "complaint",
      title: "Complaint Box",
      icon: Megaphone,
      color: "bg-gradient-to-br from-red-500 to-pink-600",
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
    { id: "shops", label: "Shops", icon: MapPin },
    { id: "history", label: "History", icon: History },
    { id: "profile", label: "Profile", icon: User },
  ]

  const handleScan = () => {
    setIsScanning(true)
    setTimeout(() => {
      const mockItems = [
        { id: "1", name: "Plastic Bottle", category: "recyclable", points: 10, confidence: 95 },
        { id: "2", name: "Banana Peel", category: "organic", points: 5, confidence: 88 },
      ]
      setScannedItems(mockItems)
      setIsScanning(false)
      const totalPoints = mockItems.reduce((sum, item) => sum + item.points, 0)
      setCurrentGreenPoints(currentGreenPoints + totalPoints)
    }, 2000)
  }

  const handleQuizAnswer = (answerId: string) => {
    setSelectedAnswer(answerId)
    setShowResult(true)

    const currentQuestion = quizQuestions[currentQuiz]
    const isCorrect = currentQuestion.options.find((opt) => opt.id === answerId)?.correct

    if (isCorrect) {
      setQuizScore(quizScore + 10)
      setCurrentGreenPoints(currentGreenPoints + 5)
    }

    setTimeout(() => {
      if (currentQuiz < quizQuestions.length - 1) {
        setCurrentQuiz(currentQuiz + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      }
    }, 2000)
  }

  const handleFeatureClick = (featureId: string) => {
    if (featureId === "scan") {
      setActiveTab("scan")
    }
    // Handle other features as needed
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
      <div className="bg-primary p-4">
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
              <h1 className="text-xl font-bold text-balance text-primary-foreground">
                Hello, {user.name.split(" ")[0]} 👋
              </h1>
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
        <Card className="bg-gradient-to-r from-emerald-500/20 to-green-600/20 border-emerald-500/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full">
                  <Coins className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-foreground/80 text-sm">Green Points</p>
                  <p className="text-2xl font-bold text-foreground">{currentGreenPoints.toLocaleString()}</p>
                </div>
              </div>
              <div className="text-right">
                <Badge
                  variant="secondary"
                  className="mb-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white border-0"
                >
                  {citizenData.level}
                </Badge>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white border-0"
                >
                  Redeem
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content with Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        {/* Tab Content */}
        <div className="p-4 space-y-6 pb-20">
          {/* Home Tab */}
          <TabsContent value="home" className="space-y-6 mt-0">
            {/* Feature Buttons */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature) => {
                const IconComponent = feature.icon
                return (
                  <Card
                    key={feature.id}
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleFeatureClick(feature.id)}
                  >
                    <CardContent className="p-4 text-center">
                      <div
                        className={`${feature.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}
                      >
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-sm mb-1 text-foreground">{feature.title}</h3>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Training Videos Section */}
            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Training Videos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {trainingVideos.map((video) => (
                    <div
                      key={video.id}
                      className="flex gap-3 p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors"
                    >
                      <div className="relative flex-shrink-0">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-16 h-12 object-cover rounded"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button size="icon" variant="secondary" className="h-6 w-6">
                            <Play className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{video.title}</h4>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {video.duration}
                          </span>
                          <Badge variant="outline" className="text-xs py-0">
                            {video.language}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quiz Section */}
            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                  <Target className="h-5 w-5 text-purple-600" />
                  Quick Quiz
                </CardTitle>
              </CardHeader>
              <CardContent>
                {currentQuiz < quizQuestions.length ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1">
                        <Zap className="h-4 w-4 text-yellow-500" />
                        Score: {quizScore}
                      </span>
                      <span className="text-muted-foreground">
                        {currentQuiz + 1} / {quizQuestions.length}
                      </span>
                    </div>
                    <Progress value={((currentQuiz + 1) / quizQuestions.length) * 100} className="mb-3" />

                    <div className="p-3 bg-muted rounded-lg">
                      <h4 className="font-medium mb-3">{quizQuestions[currentQuiz].question}</h4>
                      <div className="grid gap-2">
                        {quizQuestions[currentQuiz].options.map((option) => (
                          <Button
                            key={option.id}
                            variant={selectedAnswer === option.id ? "default" : "outline"}
                            className="justify-start h-auto p-3"
                            onClick={() => handleQuizAnswer(option.id)}
                            disabled={showResult}
                            size="sm"
                          >
                            <div className="flex items-center gap-2">
                              {option.icon}
                              <span className="text-sm">{option.text}</span>
                              {showResult && option.correct && (
                                <CheckCircle className="h-4 w-4 text-green-500 ml-auto" />
                              )}
                              {showResult && selectedAnswer === option.id && !option.correct && (
                                <XCircle className="h-4 w-4 text-red-500 ml-auto" />
                              )}
                            </div>
                          </Button>
                        ))}
                      </div>

                      {showResult && (
                        <div className="mt-3 p-3 bg-background rounded text-sm">
                          {quizQuestions[currentQuiz].explanation}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Trophy className="h-12 w-12 mx-auto text-yellow-500 mb-2" />
                    <h4 className="font-semibold mb-1">Quiz Complete!</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      Final Score: {quizScore} / {quizQuestions.length * 10}
                    </p>
                    <Button
                      size="sm"
                      onClick={() => {
                        setCurrentQuiz(0)
                        setQuizScore(0)
                        setSelectedAnswer(null)
                        setShowResult(false)
                      }}
                    >
                      Retake Quiz
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contribution Section */}
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-foreground">
                  <Leaf className="h-5 w-5 text-green-600" />
                  Your Contribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-4">
                  {contributions.map((item, index) => {
                    const IconComponent = item.icon
                    const gradientColors = [
                      "bg-gradient-to-r from-blue-500 to-cyan-600",
                      "bg-gradient-to-r from-green-500 to-emerald-600",
                      "bg-gradient-to-r from-amber-500 to-orange-600",
                    ]
                    return (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-3 ${gradientColors[index]} rounded-lg text-white`}
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className="h-5 w-5 text-white" />
                          <span className="text-sm font-medium text-white">{item.label}</span>
                        </div>
                        <span className="font-bold text-lg text-white">{item.value}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Rating Card */}
            <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-full">
                      <Star className="h-5 w-5 text-white fill-current" />
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
                        <span className="ml-2 font-semibold text-foreground">{citizenData.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-secondary border-secondary">
                    Top 10%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scan" className="space-y-6 mt-0">
            {/* Dustbin Graphics */}
            <div className="grid grid-cols-1 gap-4">
              <h2 className="text-lg font-semibold text-center mb-4">Choose the Right Dustbin</h2>
              {dustbins.map((dustbin) => (
                <Card key={dustbin.type} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className={`${dustbin.color} p-4 rounded-full flex-shrink-0`}>{dustbin.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{dustbin.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{dustbin.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {dustbin.examples.map((example, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {example}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Camera Section */}
            <Card>
              <CardContent className="p-6 text-center">
                <div className="mb-4">
                  <div className="w-32 h-32 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
                    <Camera className="h-16 w-16 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Scan Your Waste</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Point your camera at waste items to get instant categorization
                  </p>
                </div>

                <div className="flex gap-3 justify-center">
                  <Button onClick={handleScan} disabled={isScanning} className="flex-1 max-w-xs">
                    {isScanning ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Scanning...
                      </>
                    ) : (
                      <>
                        <Camera className="h-4 w-4 mr-2" />
                        Scan Now
                      </>
                    )}
                  </Button>
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Scan Results */}
            {scannedItems.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Scan Results
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {scannedItems.map((item) => {
                    const dustbin = dustbins.find((d) => d.type === item.category)
                    return (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`${dustbin?.color} p-2 rounded-full`}>{dustbin?.icon}</div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Goes to: {dustbin?.name} ({item.confidence}% confident)
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-green-600">
                            <Coins className="h-4 w-4" />
                            <span className="font-semibold">+{item.points}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="shops" className="space-y-6 mt-0">
            <div className="text-center mb-6">
              <MapPin className="h-12 w-12 mx-auto text-primary mb-2" />
              <h2 className="text-xl font-semibold">Nearby Recycling Shops</h2>
              <p className="text-muted-foreground">Find scrap dealers and recycling centers</p>
            </div>

            {/* Map placeholder */}
            <Card>
              <CardContent className="p-0">
                <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Interactive Map</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shop List */}
            <div className="space-y-4">
              {nearbyShops.map((shop, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{shop.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{shop.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {shop.distance}
                      </span>
                      <span className="font-medium text-green-600">{shop.price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{shop.type}</Badge>
                      <Button size="sm">Book Pickup</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </div>

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
                    isActive ? "text-primary-foreground bg-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </Tabs>

      {/* Chatbot widget */}
      <Chatbot userRole="citizen" />
    </div>
  )
}

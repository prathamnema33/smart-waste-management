"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Camera,
  Upload,
  Trash2,
  Recycle,
  Leaf,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Award,
  Star,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Coins,
  Trophy,
  Share2,
  BookOpen,
  Target,
  Zap,
} from "lucide-react"

interface ScanWasteProps {
  onBack: () => void
  greenPoints: number
  onPointsUpdate: (points: number) => void
}

interface WasteItem {
  id: string
  name: string
  category: "organic" | "recyclable" | "hazardous"
  points: number
  confidence: number
}

interface QuizQuestion {
  id: string
  question: string
  options: Array<{
    id: string
    text: string
    icon: React.ReactNode
    correct: boolean
  }>
  explanation: string
}

export function ScanWaste({ onBack, greenPoints, onPointsUpdate }: ScanWasteProps) {
  const [activeTab, setActiveTab] = useState("scan")
  const [scannedItems, setScannedItems] = useState<WasteItem[]>([])
  const [isScanning, setIsScanning] = useState(false)
  const [currentVideo, setCurrentVideo] = useState<string | null>(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentQuiz, setCurrentQuiz] = useState(0)
  const [quizScore, setQuizScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [userLevel, setUserLevel] = useState("Beginner")
  const [badges, setBadges] = useState(["First Scan", "Quick Learner"])
  const videoRef = useRef<HTMLVideoElement>(null)

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

  const quizQuestions: QuizQuestion[] = [
    {
      id: "q1",
      question: "Where should banana peels go?",
      options: [
        {
          id: "organic",
          text: "Organic",
          icon: <Leaf className="h-6 w-6" />,
          correct: true,
        },
        {
          id: "recyclable",
          text: "Recyclable",
          icon: <Recycle className="h-6 w-6" />,
          correct: false,
        },
        {
          id: "hazardous",
          text: "Hazardous",
          icon: <Trash2 className="h-6 w-6" />,
          correct: false,
        },
      ],
      explanation: "Banana peels are organic waste and can be composted to create nutrient-rich soil.",
    },
    {
      id: "q2",
      question: "Where do plastic bottles belong?",
      options: [
        {
          id: "organic",
          text: "Organic",
          icon: <Leaf className="h-6 w-6" />,
          correct: false,
        },
        {
          id: "recyclable",
          text: "Recyclable",
          icon: <Recycle className="h-6 w-6" />,
          correct: true,
        },
        {
          id: "hazardous",
          text: "Hazardous",
          icon: <Trash2 className="h-6 w-6" />,
          correct: false,
        },
      ],
      explanation: "Plastic bottles can be recycled into new products, reducing environmental impact.",
    },
    {
      id: "q3",
      question: "Where should old batteries go?",
      options: [
        {
          id: "organic",
          text: "Organic",
          icon: <Leaf className="h-6 w-6" />,
          correct: false,
        },
        {
          id: "recyclable",
          text: "Recyclable",
          icon: <Recycle className="h-6 w-6" />,
          correct: false,
        },
        {
          id: "hazardous",
          text: "Hazardous",
          icon: <Trash2 className="h-6 w-6" />,
          correct: true,
        },
      ],
      explanation: "Batteries contain harmful chemicals and need special disposal at authorized centers.",
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

  const handleScan = () => {
    setIsScanning(true)
    // Simulate scanning process
    setTimeout(() => {
      const mockItems: WasteItem[] = [
        {
          id: "1",
          name: "Plastic Bottle",
          category: "recyclable",
          points: 10,
          confidence: 95,
        },
        {
          id: "2",
          name: "Banana Peel",
          category: "organic",
          points: 5,
          confidence: 88,
        },
      ]
      setScannedItems(mockItems)
      setIsScanning(false)
      const totalPoints = mockItems.reduce((sum, item) => sum + item.points, 0)
      onPointsUpdate(greenPoints + totalPoints)
    }, 2000)
  }

  const handleQuizAnswer = (answerId: string) => {
    setSelectedAnswer(answerId)
    setShowResult(true)

    const currentQuestion = quizQuestions[currentQuiz]
    const isCorrect = currentQuestion.options.find((opt) => opt.id === answerId)?.correct

    if (isCorrect) {
      setQuizScore(quizScore + 10)
      onPointsUpdate(greenPoints + 5) // Bonus points for correct answers
    }

    setTimeout(() => {
      if (currentQuiz < quizQuestions.length - 1) {
        setCurrentQuiz(currentQuiz + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        // Quiz completed
        if (quizScore >= 20) {
          setBadges([...badges, "Quiz Master"])
        }
      }
    }, 2000)
  }

  const playVideo = (videoId: string) => {
    setCurrentVideo(videoId)
    setIsVideoPlaying(true)
  }

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
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
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold">Smart Waste Scanner</h1>
            <p className="text-primary-foreground/80 text-sm">Learn, scan, and earn rewards</p>
          </div>
        </div>

        {/* Points & Level */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5" />
              <span className="font-semibold">{greenPoints}</span>
            </div>
            <Badge variant="secondary">{userLevel}</Badge>
          </div>
          <div className="flex gap-1">
            {badges.slice(0, 3).map((badge, index) => (
              <Award key={index} className="h-5 w-5 text-yellow-400" />
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="p-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="scan">Scan</TabsTrigger>
          <TabsTrigger value="learn">Learn</TabsTrigger>
          <TabsTrigger value="quiz">Quiz</TabsTrigger>
          <TabsTrigger value="shops">Shops</TabsTrigger>
        </TabsList>

        {/* Scan Tab */}
        <TabsContent value="scan" className="space-y-6 mt-6">
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

        {/* Learn Tab */}
        <TabsContent value="learn" className="space-y-6 mt-6">
          <div className="text-center mb-6">
            <BookOpen className="h-12 w-12 mx-auto text-primary mb-2" />
            <h2 className="text-xl font-semibold">Training Videos</h2>
            <p className="text-muted-foreground">Master waste management with expert guidance</p>
          </div>

          {currentVideo ? (
            <Card>
              <CardContent className="p-0">
                <div className="relative">
                  <video
                    ref={videoRef}
                    className="w-full h-48 bg-black rounded-t-lg"
                    poster="/modern-video-player.png"
                  >
                    <source src="/placeholder-video.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <Button variant="secondary" size="icon" onClick={toggleVideoPlayback}>
                      {isVideoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button variant="secondary" size="icon" onClick={() => setIsMuted(!isMuted)}>
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <Button variant="outline" onClick={() => setCurrentVideo(null)}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Videos
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {trainingVideos.map((video) => (
                <Card key={video.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="relative flex-shrink-0">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-24 h-16 object-cover rounded"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Button
                            size="icon"
                            variant="secondary"
                            className="h-8 w-8"
                            onClick={() => playVideo(video.id)}
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{video.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{video.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {video.duration}
                          </span>
                          <Badge variant="outline">{video.language}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Quiz Tab */}
        <TabsContent value="quiz" className="space-y-6 mt-6">
          <div className="text-center mb-6">
            <Target className="h-12 w-12 mx-auto text-primary mb-2" />
            <h2 className="text-xl font-semibold">Gamified Quiz</h2>
            <p className="text-muted-foreground">Test your knowledge and earn bonus points</p>
          </div>

          {/* Quiz Progress */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">
                  {currentQuiz + 1} / {quizQuestions.length}
                </span>
              </div>
              <Progress value={((currentQuiz + 1) / quizQuestions.length) * 100} className="mb-2" />
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  Score: {quizScore}
                </span>
                <span className="flex items-center gap-1">
                  <Coins className="h-4 w-4 text-green-500" />
                  Bonus Points Available
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Current Question */}
          {currentQuiz < quizQuestions.length && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">{quizQuestions[currentQuiz].question}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quizQuestions[currentQuiz].options.map((option) => (
                  <Button
                    key={option.id}
                    variant={selectedAnswer === option.id ? "default" : "outline"}
                    className="w-full justify-start h-auto p-4"
                    onClick={() => handleQuizAnswer(option.id)}
                    disabled={showResult}
                  >
                    <div className="flex items-center gap-3">
                      {option.icon}
                      <span>{option.text}</span>
                      {showResult && option.correct && <CheckCircle className="h-5 w-5 text-green-500 ml-auto" />}
                      {showResult && selectedAnswer === option.id && !option.correct && (
                        <XCircle className="h-5 w-5 text-red-500 ml-auto" />
                      )}
                    </div>
                  </Button>
                ))}

                {showResult && (
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="text-sm">{quizQuestions[currentQuiz].explanation}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Quiz Complete */}
          {currentQuiz >= quizQuestions.length && (
            <Card>
              <CardContent className="p-6 text-center">
                <Trophy className="h-16 w-16 mx-auto text-yellow-500 mb-4" />
                <h3 className="text-xl font-semibold mb-2">Quiz Complete!</h3>
                <p className="text-muted-foreground mb-4">
                  Final Score: {quizScore} / {quizQuestions.length * 10}
                </p>
                <div className="flex gap-3 justify-center">
                  <Button
                    onClick={() => {
                      setCurrentQuiz(0)
                      setQuizScore(0)
                      setSelectedAnswer(null)
                      setShowResult(false)
                    }}
                  >
                    Retake Quiz
                  </Button>
                  <Button variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Score
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Shops Tab */}
        <TabsContent value="shops" className="space-y-6 mt-6">
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
      </Tabs>
    </div>
  )
}

"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

interface ChatbotProps {
  userRole: "citizen" | "worker" | "admin"
}

export function Chatbot({ userRole }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm your Smart Waste Management assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getQuickReplies = () => {
    const commonReplies = ["Collection schedule", "Waste segregation guide", "Green points info", "Report an issue"]

    const roleSpecificReplies = {
      citizen: ["Redeem points", "My rating", "Complaint status"],
      worker: ["Today's route", "Rate household", "Performance stats"],
      admin: ["City overview", "Worker management", "Analytics"],
    }

    return [...commonReplies, ...roleSpecificReplies[userRole]]
  }

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    // Common responses
    if (message.includes("schedule") || message.includes("collection")) {
      return "Waste collection happens every Tuesday, Thursday, and Saturday from 6 AM to 10 AM. You'll receive notifications 30 minutes before pickup."
    }

    if (message.includes("segregation") || message.includes("separate")) {
      return "Please separate waste into: 🟢 Organic (food waste, garden waste), 🔵 Recyclable (paper, plastic, metal), 🔴 Hazardous (batteries, chemicals). Mixed waste reduces your eco rating."
    }

    if (message.includes("points") || message.includes("green")) {
      return "Green Points are earned by proper waste segregation (10 pts), timely disposal (5 pts), and community participation (15 pts). Redeem them in the Green Shop!"
    }

    if (message.includes("report") || message.includes("issue") || message.includes("problem")) {
      return "You can report issues through the Complaint Box. Include photos and location details for faster resolution. Average response time is 24 hours."
    }

    // Role-specific responses
    if (userRole === "citizen") {
      if (message.includes("rating") || message.includes("score")) {
        return "Your eco rating is based on segregation quality (40%), pickup compliance (30%), and community engagement (30%). Maintain 4+ stars for premium benefits!"
      }
      if (message.includes("redeem") || message.includes("shop")) {
        return "Visit the Green Shop to redeem points for compost, upcycled items, and waste utilities. New items added weekly!"
      }
    }

    if (userRole === "worker") {
      if (message.includes("route") || message.includes("path")) {
        return "Your route is optimized daily based on traffic and priority areas. Check 'Today's Route' for real-time updates and navigation."
      }
      if (message.includes("rate") || message.includes("household")) {
        return "Rate households based on segregation quality. Poor segregation affects citizen ratings and helps improve city-wide compliance."
      }
    }

    if (userRole === "admin") {
      if (message.includes("overview") || message.includes("city")) {
        return "City dashboard shows real-time collection status, compliance rates, and worker performance. Use filters to drill down by area or time period."
      }
      if (message.includes("worker") || message.includes("performance")) {
        return "Worker performance is tracked via route completion, punctuality, and citizen ratings. Top performers get recognition and incentives."
      }
    }

    // Default responses
    const defaultResponses = [
      "I'm here to help with waste management queries. Try asking about collection schedules, segregation guidelines, or your specific role features.",
      "For detailed assistance, you can also contact our support team at support@smartwaste.city or call 1800-WASTE-HELP.",
      "Is there something specific about waste management you'd like to know? I can help with schedules, guidelines, points, and more!",
    ]

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(
      () => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: getBotResponse(text),
          sender: "bot",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botResponse])
        setIsTyping(false)
      },
      1000 + Math.random() * 1000,
    )
  }

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-20 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all duration-200 bg-primary hover:bg-primary/90"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        <Badge className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground">Help</Badge>
      </div>
    )
  }

  return (
    <div className="fixed bottom-20 right-4 z-50 w-80 max-w-[calc(100vw-2rem)]">
      <Card className="shadow-xl border-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bot className="h-5 w-5 text-primary" />
              Waste Assistant
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Badge variant="secondary" className="w-fit text-xs">
            {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Support
          </Badge>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-80 px-4">
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.sender === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[70%] rounded-lg px-3 py-2 text-sm ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {message.text}
                  </div>
                  {message.sender === "user" && (
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="h-4 w-4 text-secondary" />
                    </div>
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-2 justify-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                  <div className="bg-muted text-muted-foreground rounded-lg px-3 py-2 text-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-current rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-current rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-current rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Quick Replies */}
          <div className="px-4 py-2 border-t">
            <div className="flex flex-wrap gap-1 mb-3">
              {getQuickReplies()
                .slice(0, 3)
                .map((reply) => (
                  <Button
                    key={reply}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs h-7"
                  >
                    {reply}
                  </Button>
                ))}
            </div>
          </div>

          {/* Input */}
          <div className="px-4 pb-4">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about waste management..."
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSendMessage(inputValue)
                  }
                }}
                className="text-sm"
              />
              <Button
                onClick={() => handleSendMessage(inputValue)}
                size="icon"
                disabled={!inputValue.trim() || isTyping}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

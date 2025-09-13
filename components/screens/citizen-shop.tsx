"use client"

import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Coins, Leaf, Package, Trash2, Star, Plus, Minus } from "lucide-react"

interface CitizenShopProps {
  greenPoints: number
  onBack: () => void
}

export function CitizenShop({ greenPoints, onBack }: CitizenShopProps) {
  const [cart, setCart] = React.useState<Record<string, number>>({})

  const shopItems = {
    compost: [
      {
        id: "compost-1",
        name: "Premium Compost",
        price: 150,
        originalPrice: 200,
        image: "/compost-bag.png",
        rating: 4.8,
        description: "Rich organic compost made from kitchen waste",
      },
      {
        id: "manure-1",
        name: "Organic Manure",
        price: 100,
        originalPrice: 150,
        image: "/organic-manure.jpg",
        rating: 4.6,
        description: "Natural fertilizer for your garden",
      },
    ],
    decorative: [
      {
        id: "deco-1",
        name: "Upcycled Planter",
        price: 300,
        originalPrice: 500,
        image: "/upcycled-planter.jpg",
        rating: 4.9,
        description: "Beautiful planter made from recycled materials",
      },
      {
        id: "deco-2",
        name: "Bottle Art Lamp",
        price: 250,
        originalPrice: 400,
        image: "/bottle-art-lamp.jpg",
        rating: 4.7,
        description: "Decorative lamp crafted from glass bottles",
      },
    ],
    utilities: [
      {
        id: "util-1",
        name: "Smart Dustbin",
        price: 800,
        originalPrice: 1200,
        image: "/smart-dustbin.jpg",
        rating: 4.5,
        description: "IoT-enabled waste segregation bin",
      },
      {
        id: "util-2",
        name: "Compost Kit",
        price: 400,
        originalPrice: 600,
        image: "/compost-kit.jpg",
        rating: 4.8,
        description: "Complete home composting solution",
      },
    ],
  }

  const addToCart = (itemId: string) => {
    setCart((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }))
  }

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const newCart = { ...prev }
      if (newCart[itemId] > 1) {
        newCart[itemId]--
      } else {
        delete newCart[itemId]
      }
      return newCart
    })
  }

  const getTotalItems = () => Object.values(cart).reduce((sum, qty) => sum + qty, 0)
  const getTotalPoints = () => {
    let total = 0
    Object.entries(cart).forEach(([itemId, qty]) => {
      const allItems = [...shopItems.compost, ...shopItems.decorative, ...shopItems.utilities]
      const item = allItems.find((i) => i.id === itemId)
      if (item) total += item.price * qty
    })
    return total
  }

  const renderItems = (items: typeof shopItems.compost) => (
    <div className="grid grid-cols-1 gap-4">
      {items.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <img
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover bg-muted"
              />
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-sm">{item.name}</h3>
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-3 w-3 text-secondary fill-current" />
                      <span className="text-xs text-muted-foreground">{item.rating}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1">
                      <Coins className="h-4 w-4 text-secondary" />
                      <span className="font-bold text-secondary">{item.price}</span>
                    </div>
                    {item.originalPrice > item.price && (
                      <span className="text-xs text-muted-foreground line-through">{item.originalPrice}</span>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-3">{item.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                  </Badge>
                  <div className="flex items-center gap-2">
                    {cart[item.id] ? (
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFromCart(item.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">{cart[item.id]}</span>
                        <Button size="sm" onClick={() => addToCart(item.id)} className="h-8 w-8 p-0">
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <Button size="sm" onClick={() => addToCart(item.id)}>
                        Add to Cart
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-secondary p-4 text-primary-foreground">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <Package className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">Green Shop</h1>
              <p className="text-primary-foreground/80 text-sm">Redeem eco-friendly rewards</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-primary-foreground/20 px-3 py-1 rounded-full">
              <Coins className="h-4 w-4" />
              <span className="font-semibold">{greenPoints.toLocaleString()}</span>
            </div>
            {getTotalItems() > 0 && (
              <div className="relative">
                <ShoppingCart className="h-6 w-6" />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {getTotalItems()}
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-24">
        <Tabs defaultValue="compost" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="compost" className="flex items-center gap-2">
              <Leaf className="h-4 w-4" />
              <span className="hidden sm:inline">Compost</span>
            </TabsTrigger>
            <TabsTrigger value="decorative" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Decorative</span>
            </TabsTrigger>
            <TabsTrigger value="utilities" className="flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              <span className="hidden sm:inline">Utilities</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="compost">{renderItems(shopItems.compost)}</TabsContent>

          <TabsContent value="decorative">{renderItems(shopItems.decorative)}</TabsContent>

          <TabsContent value="utilities">{renderItems(shopItems.utilities)}</TabsContent>
        </Tabs>
      </div>

      {/* Checkout Bar */}
      {getTotalItems() > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm text-muted-foreground">{getTotalItems()} items in cart</p>
              <div className="flex items-center gap-1">
                <Coins className="h-4 w-4 text-secondary" />
                <span className="font-bold text-lg">{getTotalPoints()}</span>
                <span className="text-sm text-muted-foreground">points</span>
              </div>
            </div>
            <Button className="px-8" disabled={getTotalPoints() > greenPoints}>
              {getTotalPoints() > greenPoints ? "Insufficient Points" : "Checkout"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import { Users, TrendingUp } from "lucide-react"

export function InteractiveMap() {
  const [activeRegion, setActiveRegion] = useState<string | null>(null)

  const regions = [
    { id: "west", name: "West Coast", buyers: 1247, deals: 89, x: "15%", y: "40%" },
    { id: "central", name: "Central", buyers: 892, deals: 67, x: "45%", y: "35%" },
    { id: "east", name: "East Coast", buyers: 1456, deals: 112, x: "75%", y: "30%" },
    { id: "south", name: "South", buyers: 734, deals: 45, x: "55%", y: "65%" },
  ]

  return (
    <div className="relative w-full h-96 bg-gradient-to-br from-muted to-background rounded-xl border border-border overflow-hidden">
      {/* Map Background */}
      <div className="absolute inset-0 opacity-10">
        <svg viewBox="0 0 400 200" className="w-full h-full">
          <path
            d="M50,50 Q100,30 150,50 T250,60 Q300,70 350,50 L350,150 Q300,130 250,140 T150,150 Q100,160 50,150 Z"
            fill="currentColor"
            className="text-primary"
          />
        </svg>
      </div>

      {/* Interactive Regions */}
      {regions.map((region) => (
        <div
          key={region.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
          style={{ left: region.x, top: region.y }}
          onMouseEnter={() => setActiveRegion(region.id)}
          onMouseLeave={() => setActiveRegion(null)}
        >
          <div className="relative">
            <div
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                activeRegion === region.id
                  ? "bg-primary scale-150 pulse-glow"
                  : "bg-primary/60 hover:bg-primary hover:scale-125"
              }`}
            />

            {activeRegion === region.id && (
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg p-3 shadow-lg min-w-48 slide-in-up">
                <h4 className="font-semibold text-card-foreground mb-2">{region.name}</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Users className="h-3 w-3 text-primary" />
                    <span className="text-muted-foreground">{region.buyers} Active Buyers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-3 w-3 text-primary" />
                    <span className="text-muted-foreground">{region.deals} Deals This Month</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-card-foreground">Active Markets</span>
        </div>
      </div>
    </div>
  )
}

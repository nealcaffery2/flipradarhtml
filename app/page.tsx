"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Search, Users, Zap, Star, CheckCircle, Target, BarChart3 } from "lucide-react"
import { TypingText } from "@/components/typing-text"
import { InteractiveMap } from "@/components/interactive-map"
import { MouseFollower } from "@/components/mouse-follower"
import { useState, useEffect } from "react"

export default function FlipRadarLanding() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-background relative">
      <MouseFollower />

      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center float-animation">
                  <Target className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">Flip Radar</span>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105"
              >
                Features
              </a>
              <a
                href="#map"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105"
              >
                Market Map
              </a>
              <a
                href="#testimonials"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105"
              >
                Reviews
              </a>
              <Button
                variant="outline"
                size="sm"
                className="hover:scale-105 transition-transform duration-300 bg-transparent"
              >
                Sign In
              </Button>
              <Button size="sm" className="hover:scale-105 transition-transform duration-300 pulse-glow">
                Get Started
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-background via-background to-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className={`mb-6 pulse-glow ${isVisible ? "slide-in-up" : "opacity-0"}`}>
              <Zap className="h-3 w-3 mr-1" />
              AI-Powered Real Estate Intelligence
            </Badge>
            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance ${isVisible ? "slide-in-up animate-delay-100" : "opacity-0"}`}
            >
              Find End Buyers with{" "}
              <span className="text-primary">
                <TypingText text="AI Precision" speed={150} />
              </span>
            </h1>
            <p
              className={`text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty ${isVisible ? "slide-in-up animate-delay-200" : "opacity-0"}`}
            >
              Flip Radar uses advanced AI to instantly connect real estate investors with qualified end buyers and their
              contact information. Close deals faster than ever before.
            </p>
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center ${isVisible ? "slide-in-up animate-delay-300" : "opacity-0"}`}
            >
              <Button size="lg" className="text-lg px-8 hover:scale-105 transition-all duration-300 pulse-glow">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 bg-transparent hover:scale-105 transition-all duration-300"
              >
                Watch Demo
              </Button>
            </div>
            <p
              className={`text-sm text-muted-foreground mt-4 ${isVisible ? "slide-in-up animate-delay-400" : "opacity-0"}`}
            >
              No credit card required • 14-day free trial
            </p>
          </div>
        </div>
      </section>

      <section id="map" className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Live Market Intelligence</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See real-time buyer activity across different markets. Hover over regions to explore opportunities.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <InteractiveMap />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Close More Deals
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform streamlines your entire disposition process
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border hover:shadow-xl hover:scale-105 transition-all duration-300 group cursor-pointer">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300 float-animation">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors duration-300">
                  AI Buyer Matching
                </CardTitle>
                <CardDescription>
                  Our AI analyzes property details and instantly matches you with qualified end buyers in your market
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-xl hover:scale-105 transition-all duration-300 group cursor-pointer animate-delay-100">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300 float-animation">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors duration-300">
                  Contact Intelligence
                </CardTitle>
                <CardDescription>
                  Get verified contact information including phone numbers, emails, and preferred communication methods
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-xl hover:scale-105 transition-all duration-300 group cursor-pointer animate-delay-200">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300 float-animation">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors duration-300">
                  Market Analytics
                </CardTitle>
                <CardDescription>
                  Real-time market data and buyer behavior insights to optimize your pricing and timing strategies
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-xl hover:scale-105 transition-all duration-300 group cursor-pointer animate-delay-300">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300 float-animation">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors duration-300">
                  Automated Outreach
                </CardTitle>
                <CardDescription>
                  Send personalized messages to multiple buyers simultaneously with our smart automation tools
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-xl hover:scale-105 transition-all duration-300 group cursor-pointer animate-delay-400">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300 float-animation">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors duration-300">Deal Tracking</CardTitle>
                <CardDescription>
                  Monitor all your deals in one dashboard with real-time updates and progress tracking
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border hover:shadow-xl hover:scale-105 transition-all duration-300 group cursor-pointer animate-delay-500">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-300 float-animation">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="group-hover:text-primary transition-colors duration-300">
                  Instant Notifications
                </CardTitle>
                <CardDescription>
                  Get alerted immediately when new qualified buyers enter your market or show interest
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-muted">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Trusted by Real Estate Professionals
            </h2>
            <p className="text-xl text-muted-foreground">See what our users are saying about Flip Radar</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card border-border hover:shadow-xl hover:scale-105 transition-all duration-300 pulse-glow">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary animate-pulse"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
                <p className="text-card-foreground mb-4">
                  "Flip Radar cut my disposition time from weeks to days. The AI matching is incredibly accurate."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 float-animation">
                    <span className="text-sm font-medium text-primary">MJ</span>
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">Mike Johnson</p>
                    <p className="text-sm text-muted-foreground">Real Estate Investor</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-xl hover:scale-105 transition-all duration-300 pulse-glow animate-delay-200">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary animate-pulse"
                      style={{ animationDelay: `${i * 0.1 + 0.2}s` }}
                    />
                  ))}
                </div>
                <p className="text-card-foreground mb-4">
                  "The contact intelligence feature is a game-changer. I'm closing 3x more deals now."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 float-animation">
                    <span className="text-sm font-medium text-primary">SC</span>
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">Sarah Chen</p>
                    <p className="text-sm text-muted-foreground">Wholesaler</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border hover:shadow-xl hover:scale-105 transition-all duration-300 pulse-glow animate-delay-400">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-primary text-primary animate-pulse"
                      style={{ animationDelay: `${i * 0.1 + 0.4}s` }}
                    />
                  ))}
                </div>
                <p className="text-card-foreground mb-4">
                  "Finally, a tool that understands the real estate market. ROI was immediate."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3 float-animation">
                    <span className="text-sm font-medium text-primary">DR</span>
                  </div>
                  <div>
                    <p className="font-medium text-card-foreground">David Rodriguez</p>
                    <p className="text-sm text-muted-foreground">Real Estate Agent</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border border-primary-foreground rounded-full float-animation" />
          <div className="absolute top-32 right-20 w-16 h-16 border border-primary-foreground rounded-full float-animation animate-delay-300" />
          <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-primary-foreground rounded-full float-animation animate-delay-500" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">
              Ready to Transform Your Real Estate Business?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Join thousands of real estate professionals who are closing more deals with Flip Radar's AI-powered
              platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                className="text-lg px-8 hover:scale-105 transition-all duration-300 pulse-glow"
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent hover:scale-105 transition-all duration-300"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center float-animation">
                  <Target className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">Flip Radar</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                AI-powered real estate disposition tool helping investors, wholesalers, and agents find qualified end
                buyers faster.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground">© 2024 Flip Radar. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

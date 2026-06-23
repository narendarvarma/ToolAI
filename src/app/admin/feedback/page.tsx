"use client"

import { useState, useEffect } from "react"
import { MessageSquare, Lightbulb, Megaphone, Trash2, RefreshCw, Filter, Lock, LogOut } from "lucide-react"
import Link from "next/link"

interface FeedbackEntry {
  id: string
  timestamp: string
  name: string
  email: string
  type: "problem" | "suggestion" | "promotion"
  subject: string
  message: string
  toolName: string
  status: string
}

export default function AdminFeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<FeedbackEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "problem" | "suggestion" | "promotion">("all")
  const [error, setError] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [authError, setAuthError] = useState("")

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/auth")
      const data = await res.json()
      setIsAuthenticated(data.authenticated)
      if (data.authenticated) {
        loadFeedbacks()
      }
    } catch (err) {
      setIsAuthenticated(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError("")
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      })
      const data = await res.json()
      if (data.success) {
        setIsAuthenticated(true)
        loadFeedbacks()
      } else {
        setAuthError("Invalid password")
      }
    } catch (err) {
      setAuthError("Authentication failed")
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" })
      setIsAuthenticated(false)
      setFeedbacks([])
    } catch (err) {
      console.error("Logout failed", err)
    }
  }

  const loadFeedbacks = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/feedback")
      if (!res.ok) throw new Error("Failed to load feedback")
      const data = await res.json()
      setFeedbacks(data)
    } catch (err: any) {
      setError(err.message || "Failed to load feedback")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  const filteredFeedbacks = feedbacks.filter(f => 
    filter === "all" || f.type === filter
  )

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "problem": return <MessageSquare className="h-4 w-4" />
      case "suggestion": return <Lightbulb className="h-4 w-4" />
      case "promotion": return <Megaphone className="h-4 w-4" />
      default: return null
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "problem": return "text-red-400 bg-red-500/20 border-red-500/30"
      case "suggestion": return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30"
      case "promotion": return "text-[#00E5FF] bg-[#00E5FF]/20 border-[#00E5FF]/30"
      default: return "text-gray-400 bg-gray-500/20 border-gray-500/30"
    }
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto">
            <div className="bg-[#111827] rounded-2xl p-8 border border-white/8">
              <div className="flex items-center justify-center mb-6">
                <Lock className="h-12 w-12 text-[#00E5FF]" />
              </div>
              <h1 className="text-2xl font-bold text-white text-center mb-2">Admin Access</h1>
              <p className="text-gray-400 text-center mb-6">Enter password to access feedback dashboard</p>
              
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0F1A] border border-white/8 text-white placeholder-gray-500 focus:border-[#00E5FF] focus:outline-none transition-colors"
                  />
                </div>
                {authError && (
                  <p className="text-red-400 text-sm mb-4">{authError}</p>
                )}
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform"
                >
                  Access Dashboard
                </button>
              </form>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <div>
                <Link href="/" className="text-[#00E5FF] hover:underline inline-block mb-2">
                  ← Back to Home
                </Link>
                <h1 className="text-3xl font-bold text-white">Feedback Dashboard</h1>
                <p className="text-gray-400">View and manage user feedback</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={loadFeedbacks}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/8 text-white hover:border-[#00E5FF] transition-colors"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>

            {/* Filter */}
            <div className="mb-6 flex items-center gap-3">
              <Filter className="h-5 w-5 text-gray-400" />
              <div className="flex gap-2">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 rounded-xl text-sm transition-all ${
                    filter === "all"
                      ? "bg-[#00E5FF] text-black font-semibold"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  All ({feedbacks.length})
                </button>
                <button
                  onClick={() => setFilter("problem")}
                  className={`px-4 py-2 rounded-xl text-sm transition-all ${
                    filter === "problem"
                      ? "bg-red-500 text-white font-semibold"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  Problems ({feedbacks.filter(f => f.type === "problem").length})
                </button>
                <button
                  onClick={() => setFilter("suggestion")}
                  className={`px-4 py-2 rounded-xl text-sm transition-all ${
                    filter === "suggestion"
                      ? "bg-yellow-500 text-white font-semibold"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  Suggestions ({feedbacks.filter(f => f.type === "suggestion").length})
                </button>
                <button
                  onClick={() => setFilter("promotion")}
                  className={`px-4 py-2 rounded-xl text-sm transition-all ${
                    filter === "promotion"
                      ? "bg-[#00E5FF] text-black font-semibold"
                      : "bg-white/5 text-gray-400 hover:bg-white/10"
                  }`}
                >
                  Promotions ({feedbacks.filter(f => f.type === "promotion").length})
                </button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-[#00E5FF] border-t-transparent"></div>
                <p className="text-gray-400 mt-4">Loading feedback...</p>
              </div>
            ) : error ? (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 text-center">
                <p className="text-red-400">{error}</p>
              </div>
            ) : filteredFeedbacks.length === 0 ? (
              <div className="bg-[#111827] rounded-2xl p-12 text-center border border-white/8">
                <p className="text-gray-400">No feedback submissions yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFeedbacks.map((feedback) => (
                  <div
                    key={feedback.id}
                    className="bg-[#111827] rounded-2xl p-6 border border-white/8 hover:border-white/20 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg border ${getTypeColor(feedback.type)}`}>
                          {getTypeIcon(feedback.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{feedback.subject}</h3>
                          <p className="text-sm text-gray-400">
                            {feedback.name} • {formatDate(feedback.timestamp)}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getTypeColor(feedback.type)}`}>
                        {feedback.type}
                      </span>
                    </div>

                    {feedback.toolName && feedback.toolName !== "N/A" && (
                      <div className="mb-3">
                        <span className="text-sm text-gray-400">Tool: </span>
                        <span className="text-sm text-[#00E5FF]">{feedback.toolName}</span>
                      </div>
                    )}

                    <p className="text-gray-300 mb-4 whitespace-pre-wrap">{feedback.message}</p>

                    <div className="flex items-center justify-between text-sm">
                      <div className="text-gray-400">
                        <span>{feedback.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          feedback.status === "new" 
                            ? "bg-green-500/20 text-green-400" 
                            : "bg-gray-500/20 text-gray-400"
                        }`}>
                          {feedback.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

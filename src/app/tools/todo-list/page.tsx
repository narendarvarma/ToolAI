"use client"

import { useState } from "react"
import { Plus, Trash2, Check } from "lucide-react"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function TodoList() {
  const [todos, setTodos] = useState<{ id: number; text: string; completed: boolean }[]>([])
  const [input, setInput] = useState("")

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }])
      setInput("")
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  }

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Todo List</h1>
        <p className="text-gray-400 text-base text-center mb-8">Manage your tasks efficiently</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Input */}
          <div className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTodo()}
                className="flex-1 px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                placeholder="Add a new task"
              />
              <button
                onClick={addTodo}
                className="px-4 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Todo List */}
          {todos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No tasks yet. Add one above!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todos.map(todo => (
                <div
                  key={todo.id}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    todo.completed
                      ? "bg-white/5 border-[#00E5FF]/20 opacity-60"
                      : "bg-white/5 border-white/8 hover:border-[#00E5FF]/50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        todo.completed
                          ? "bg-[#3B82F6] border-[#3B82F6]"
                          : "border-[#00E5FF]/50 hover:border-[#3B82F6]"
                      }`}
                    >
                      {todo.completed && <Check className="h-4 w-4 text-white" />}
                    </button>
                    <span className={`flex-1 ${todo.completed ? "line-through text-gray-500" : "text-white"}`}>
                      {todo.text}
                    </span>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Single bottom ad */}
        <div className="flex justify-center mt-8">
          <div className="ad-slot mt-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        </div>

        <button
          onClick={() => window.location.href = "/"}
          className="mt-6 text-[#00E5FF] hover:underline"
        >
          ← Back to Home
        </button>
      </div>
    </div>
  )
}





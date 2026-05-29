"use client"

import { useState } from "react"
import { Plus, Trash2, DollarSign } from "lucide-react"
import AdSlot from "@/components/ad-slot"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<{ id: number; description: string; amount: number; category: string }[]>([])
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("Food")

  const addExpense = () => {
    if (description && amount) {
      setExpenses([...expenses, { id: Date.now(), description, amount: parseFloat(amount), category }])
      setDescription("")
      setAmount("")
    }
  }

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id))
  }

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">Expense Tracker</h1>
        <p className="text-gray-400 text-base text-center mb-8">Track your spending efficiently</p>

        {/* Ad below tool title */}
        <div className="ad-slot mb-8" style={{width: '100%', minHeight: '90px', background: '#f5f5f5', border: '1px dashed #ccc', textAlign: 'center', padding: '10px', margin: '16px 0', fontSize: '12px', color: '#999'}}>
          Advertisement
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Total Display */}
          <div className="mb-6 p-4 bg-gradient-to-r from-[#3B82F6]/20 to-[#7C3AED]/20 rounded-xl border border-[#3B82F6]/30">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-[#00E5FF]" />
              <div>
                <p className="text-sm text-gray-400">Total Expenses</p>
                <p className="text-2xl font-bold text-white">${total.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Add Expense Form */}
          <div className="mb-6 space-y-4">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              placeholder="Description"
            />
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
              placeholder="Amount"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
            >
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Other">Other</option>
            </select>
            <button
              onClick={addExpense}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20"
            >
              <div className="flex items-center justify-center gap-2">
                <Plus className="h-5 w-5" />
                Add Expense
              </div>
            </button>
          </div>

          {/* Expense List */}
          {expenses.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">No expenses yet. Add one above!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {expenses.map(expense => (
                <div
                  key={expense.id}
                  className="p-4 rounded-xl bg-white/5 border border-white/8 hover:border-[#00E5FF]/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">{expense.description}</p>
                      <p className="text-sm text-gray-400">{expense.category}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <p className="font-semibold text-white">${expense.amount.toFixed(2)}</p>
                      <button
                        onClick={() => deleteExpense(expense.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
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





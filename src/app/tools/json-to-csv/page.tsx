"use client"

import { useState } from "react"
import { FileSpreadsheet, Copy, Download, ArrowUpDown } from "lucide-react"
import AdSlot from "@/components/ad-slot"

export default function JSONToCSV() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [mode, setMode] = useState("jsonToCsv")

  const jsonToCSV = () => {
    if (!input) return

    try {
      const data = JSON.parse(input)
      const arr = Array.isArray(data) ? data : [data]
      
      if (arr.length === 0) {
        setOutput("")
        return
      }

      const headers = Object.keys(arr[0])
      const csvRows = [headers.join(",")]

      for (const row of arr) {
        const values = headers.map(header => {
          const value = row[header]
          const escaped = String(value).replace(/"/g, '""')
          return `"${escaped}"`
        })
        csvRows.push(values.join(","))
      }

      setOutput(csvRows.join("\n"))
    } catch (error) {
      setOutput("Error: Invalid JSON format")
    }
  }

  const csvToJSON = () => {
    if (!input) return

    try {
      const lines = input.trim().split("\n")
      const headers = lines[0].split(",").map(h => h.trim().replace(/"/g, ""))
      const result = []

      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(",").map(v => v.trim().replace(/"/g, ""))
        const obj: any = {}
        headers.forEach((header, index) => {
          obj[header] = values[index] || ""
        })
        result.push(obj)
      }

      setOutput(JSON.stringify(result, null, 2))
    } catch (error) {
      setOutput("Error: Invalid CSV format")
    }
  }

  const handleConvert = () => {
    if (mode === "jsonToCsv") {
      jsonToCSV()
    } else {
      csvToJSON()
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    alert("Output copied to clipboard!")
  }

  const downloadOutput = () => {
    const blob = new Blob([output], { type: mode === "jsonToCsv" ? "text/csv" : "application/json" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = mode === "jsonToCsv" ? "converted.csv" : "converted.json"
    link.click()
    URL.revokeObjectURL(url)
  }

  const swapMode = () => {
    setMode(mode === "jsonToCsv" ? "csvToJson" : "jsonToCsv")
    setInput(output)
    setOutput("")
  }

  const clearAll = () => {
    setInput("")
    setOutput("")
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">JSON to CSV Converter</h1>
        <p className="text-gray-400 text-base text-center mb-8">Convert between JSON and CSV formats</p>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* Mode Toggle */}
          <div className="mb-6">
            <div className="flex gap-3">
              <button
                onClick={() => setMode("jsonToCsv")}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${mode === "jsonToCsv" ? "bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white" : "bg-white/5 border border-white/8 text-gray-400 hover:text-white"}`}
              >
                JSON to CSV
              </button>
              <button
                onClick={() => setMode("csvToJson")}
                className={`flex-1 py-3 rounded-xl font-semibold transition-all ${mode === "csvToJson" ? "bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white" : "bg-white/5 border border-white/8 text-gray-400 hover:text-white"}`}
              >
                CSV to JSON
              </button>
            </div>
          </div>

          {/* Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">
              {mode === "jsonToCsv" ? "JSON Input" : "CSV Input"}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all h-48 resize-none font-mono text-sm"
              placeholder={mode === "jsonToCsv" ? '[{"name": "John", "age": 30}]' : 'name,age\nJohn,30\nJane,25' }
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleConvert}
              disabled={!input}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 disabled:shadow-none"
            >
              <div className="flex items-center justify-center gap-2">
                <FileSpreadsheet className="h-5 w-5" />
                Convert
              </div>
            </button>
            <button
              onClick={swapMode}
              disabled={!input || !output}
              className="py-3 px-6 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#00E5FF] transition-colors disabled:opacity-50"
            >
              <ArrowUpDown className="h-5 w-5" />
            </button>
            <button
              onClick={clearAll}
              disabled={!input}
              className="py-3 px-6 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#FF4DB6] transition-colors disabled:opacity-50"
            >
              Clear
            </button>
          </div>

          {/* Output */}
          {output && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-white">
                {mode === "jsonToCsv" ? "CSV Output" : "JSON Output"}
              </label>
              <div className="p-4 bg-white/5 rounded-xl border border-white/8">
                <pre className="text-green-400 whitespace-pre-wrap font-mono text-sm break-all">{output}</pre>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={copyToClipboard}
                  className="flex-1 py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#3B82F6] transition-colors"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Copy className="h-5 w-5" />
                    Copy
                  </div>
                </button>
                <button
                  onClick={downloadOutput}
                  className="flex-1 py-3 rounded-xl bg-white/5 border border-white/8 text-white font-semibold hover:border-[#3B82F6] transition-colors"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Download className="h-5 w-5" />
                    Download
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Single bottom ad */}
        <div className="flex justify-center mt-8">
          <AdSlot adSlot="4000000005" className="w-full max-w-2xl" />
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

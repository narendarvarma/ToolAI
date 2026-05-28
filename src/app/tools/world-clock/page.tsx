"use client"

import { useState, useEffect } from "react"
import { Globe, Copy } from "lucide-react"
import AdSlot from "@/components/ad-slot"

const cities = [
  { name: "New York", timezone: "America/New_York", country: "USA" },
  { name: "Los Angeles", timezone: "America/Los_Angeles", country: "USA" },
  { name: "London", timezone: "Europe/London", country: "UK" },
  { name: "Paris", timezone: "Europe/Paris", country: "France" },
  { name: "Berlin", timezone: "Europe/Berlin", country: "Germany" },
  { name: "Tokyo", timezone: "Asia/Tokyo", country: "Japan" },
  { name: "Sydney", timezone: "Australia/Sydney", country: "Australia" },
  { name: "Dubai", timezone: "Asia/Dubai", country: "UAE" },
  { name: "Mumbai", timezone: "Asia/Kolkata", country: "India" },
  { name: "Singapore", timezone: "Asia/Singapore", country: "Singapore" },
  { name: "Hong Kong", timezone: "Asia/Hong_Kong", country: "Hong Kong" },
  { name: "Moscow", timezone: "Europe/Moscow", country: "Russia" },
]

export default function WorldClock() {
  const [selectedCities, setSelectedCities] = useState<string[]>(["New York", "London", "Tokyo"])
  const [times, setTimes] = useState<Record<string, string>>({})

  useEffect(() => {
    const updateTimes = () => {
      const newTimes: Record<string, string> = {}
      selectedCities.forEach(cityName => {
        const city = cities.find(c => c.name === cityName)
        if (city) {
          const time = new Date().toLocaleTimeString('en-US', {
            timeZone: city.timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          })
          const date = new Date().toLocaleDateString('en-US', {
            timeZone: city.timezone,
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          })
          newTimes[cityName] = `${time} • ${date}`
        }
      })
      setTimes(newTimes)
    }

    updateTimes()
    const interval = setInterval(updateTimes, 1000)

    return () => clearInterval(interval)
  }, [selectedCities])

  const toggleCity = (cityName: string) => {
    if (selectedCities.includes(cityName)) {
      if (selectedCities.length > 1) {
        setSelectedCities(selectedCities.filter(c => c !== cityName))
      }
    } else {
      setSelectedCities([...selectedCities, cityName])
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">World Clock</h1>
        <p className="text-gray-400 text-base text-center mb-8">Track time across multiple cities</p>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">
          {/* City Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Select Cities</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {cities.map(city => (
                <button
                  key={city.name}
                  onClick={() => toggleCity(city.name)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCities.includes(city.name)
                      ? "bg-[#00E5FF] text-black"
                      : "bg-white/5 border border-white/8 text-gray-400 hover:text-white"
                  }`}
                >
                  {city.name}
                </button>
              ))}
            </div>
          </div>

          {/* Clock Display */}
          <div className="space-y-3">
            {selectedCities.map(cityName => {
              const city = cities.find(c => c.name === cityName)
              return (
                <div
                  key={cityName}
                  className="p-4 bg-white/5 rounded-xl border border-white/8 flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-white font-semibold">{cityName}</h3>
                    <p className="text-gray-400 text-sm">{city?.country}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#00E5FF] font-mono">
                      {times[cityName]?.split(' • ')[0]}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {times[cityName]?.split(' • ')[1]}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
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

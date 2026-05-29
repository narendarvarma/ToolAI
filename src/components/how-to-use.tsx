interface HowToUseProps {
  steps: string[]
}

export default function HowToUse({ steps }: HowToUseProps) {
  return (
    <div className="mt-8 bg-[#111827] rounded-2xl p-6 border border-white/8">
      <h2 className="text-xl font-semibold mb-4 text-white">How to Use</h2>
      <ol className="space-y-3 text-gray-300">
        {steps.map((step, index) => (
          <li key={index} className="flex gap-3">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00E5FF]/20 text-[#00E5FF] flex items-center justify-center text-sm font-semibold">
              {index + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}

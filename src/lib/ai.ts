export async function callAI(prompt: string, system = ""): Promise<string> {
  const res = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [{ role: "user", content: prompt }],
      system,
    }),
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || "AI request failed")
  return data.result
}

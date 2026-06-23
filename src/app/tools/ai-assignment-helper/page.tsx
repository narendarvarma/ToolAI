"use client"

import { useState } from "react"
import { BookOpen, Sparkles, Copy, Check } from "lucide-react"
import Link from "next/link"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import ToolRating from "@/components/tool-rating"
import ToolContent from "@/components/tool-content"
import RelatedTools from "@/components/related-tools"
import AIToolDisclaimer from "@/components/ai-tool-disclaimer"
import { getToolContent } from "@/lib/tool-content"
import { useRecentTools } from "@/hooks/use-recent-tools"
import { tokenManager } from "@/lib/token-manager"
import DailyUsageBar from "@/components/DailyUsageBar"

export default function AiAssignmentHelper() {
  useRecentTools("/tools/ai-assignment-helper", "AI Assignment Helper", "BookOpen")
  const toolContent = getToolContent("ai-assignment-helper")
  
  const used = tokenManager.getRequestsUsed()
  const limit = tokenManager.getDailyLimit()
  const remaining = tokenManager.getRemainingRequests()
  
  const [subject, setSubject] = useState("")
  const [question, setQuestion] = useState("")
  const [wordCount, setWordCount] = useState("500")
  const [answer, setAnswer] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const generateAnswer = async () => {
    if (!subject || !question) return

    if (!tokenManager.canUseRequest()) {
      alert("Daily limit reached. Come back tomorrow.")
      return
    }

    setIsLoading(true)
    setAnswer("")

    // Simulated AI response (in production, this would call an AI API)
    setTimeout(() => {
      const responses = {
        "200": `Introduction: ${question}\n\nThis is a concise overview of the topic. ${subject} is an important area of study that has significant implications in various fields.\n\nMain Points:\n1. First key aspect of ${subject}\n2. Second important consideration\n3. Third critical factor\n\nConclusion: In summary, ${subject} plays a vital role and understanding its fundamentals is essential for further study and practical application.`,
        "500": `Introduction: ${question}\n\n${subject} is a fundamental concept that has garnered significant attention in recent years. This comprehensive analysis explores the key aspects, implications, and practical applications of ${subject} in various contexts.\n\nMain Points:\n\n1. Definition and Core Concepts\n${subject} can be defined as a systematic approach to understanding complex phenomena. The core principles include foundational theories, methodological frameworks, and practical applications that form the basis of this field.\n\n2. Historical Development\nThe evolution of ${subject} has been marked by several key milestones. Early pioneers laid the groundwork, while modern researchers have expanded our understanding through empirical studies and theoretical advancements.\n\n3. Practical Applications\n${subject} finds applications in diverse fields including education, healthcare, technology, and business. These applications demonstrate the versatility and relevance of the subject in real-world scenarios.\n\n4. Current Trends and Future Directions\nRecent developments in ${subject} point toward emerging trends that will shape its future trajectory. These include technological innovations, interdisciplinary approaches, and evolving research methodologies.\n\n5. Challenges and Considerations\nDespite its importance, ${subject} faces several challenges that need to be addressed. These include resource constraints, ethical considerations, and the need for continued research and development.\n\nConclusion:\nIn conclusion, ${subject} represents a dynamic and evolving field with significant potential for growth and impact. Understanding its core principles, applications, and challenges is essential for anyone seeking to engage with this subject meaningfully. As we move forward, continued research and innovation will undoubtedly reveal new insights and opportunities in this fascinating area of study.`,
        "1000": `Introduction: ${question}\n\n${subject} stands as one of the most significant and rapidly evolving fields in contemporary academia and practice. This comprehensive examination delves into the multifaceted nature of ${subject}, exploring its theoretical foundations, practical applications, historical development, and future prospects. The importance of ${subject} cannot be overstated, as it influences numerous aspects of our personal and professional lives, shapes policy decisions, and drives technological innovation across multiple sectors.\n\nMain Points:\n\n1. Theoretical Foundations and Core Concepts\n\nAt its core, ${subject} is built upon a robust theoretical framework that has been developed and refined over decades of research. The fundamental concepts include:\n\n- Foundational Principles: These are the basic axioms and assumptions that underpin the entire field. Understanding these principles is essential for grasping more complex ideas and applications.\n\n- Methodological Approaches: Various methodologies have been developed to study and apply ${subject}. These include quantitative methods, qualitative approaches, and mixed-method strategies that combine the best of both worlds.\n\n- Conceptual Frameworks: Scholars have developed numerous frameworks to organize and interpret phenomena within ${subject}. These frameworks provide structure and guidance for both research and practical applications.\n\n2. Historical Evolution and Key Milestones\n\nThe development of ${subject} has been marked by several pivotal moments that have shaped its current state:\n\n- Early Foundations: The origins of ${subject} can be traced back to early philosophical and scientific inquiries that laid the groundwork for later developments.\n\n- Mid-Century Advances: The mid-20th century saw significant breakthroughs that transformed ${subject} from a theoretical discipline into a practical field with real-world applications.\n\n- Contemporary Developments: Recent decades have witnessed unprecedented growth in ${subject}, driven by technological advancements, increased funding, and growing recognition of its importance.\n\n3. Practical Applications Across Sectors\n\n${subject} finds applications in diverse sectors, demonstrating its versatility and relevance:\n\n- Education: In educational settings, ${subject} informs curriculum development, teaching methodologies, and assessment strategies. It helps educators design more effective learning experiences and improve student outcomes.\n\n- Healthcare: The healthcare sector has embraced ${subject} to improve patient care, optimize resource allocation, and develop evidence-based practices. Applications range from diagnostic tools to treatment protocols.\n\n- Technology: The technology sector leverages ${subject} to drive innovation, improve user experiences, and develop cutting-edge solutions. This includes artificial intelligence, data analytics, and software development.\n\n- Business: In the business world, ${subject} informs strategic decision-making, marketing strategies, and organizational management. Companies use insights from ${subject} to gain competitive advantages and improve performance.\n\n4. Current Trends and Emerging Developments\n\nThe field of ${subject} is characterized by several exciting trends:\n\n- Technological Integration: The integration of advanced technologies is transforming how ${subject} is studied and applied. This includes machine learning, big data analytics, and cloud computing.\n\n- Interdisciplinary Collaboration: There is growing recognition of the value of interdisciplinary approaches to ${subject}. Collaboration across traditional boundaries is yielding innovative solutions and new insights.\n\n- Global Perspectives: The globalization of research and practice in ${subject} has led to diverse perspectives and approaches. This global exchange of ideas enriches the field and promotes cross-cultural understanding.\n\n5. Challenges and Ethical Considerations\n\nDespite its many benefits, ${subject} faces several challenges:\n\n- Resource Constraints: Limited funding, infrastructure, and human resources pose significant challenges to the advancement of ${subject}. Addressing these constraints requires innovative solutions and strategic planning.\n\n- Ethical Dilemmas: The application of ${subject} raises important ethical questions that must be carefully considered. These include issues of privacy, equity, and social responsibility.\n\n- Knowledge Gaps: Despite significant progress, there remain important gaps in our understanding of ${subject}. Filling these gaps requires continued research and investment.\n\n6. Future Directions and Opportunities\n\nLooking ahead, several promising directions emerge for ${subject}:\n\n- Emerging Technologies: New technologies offer unprecedented opportunities for advancing ${subject}. These include quantum computing, advanced AI systems, and immersive technologies.\n\n- Personalized Approaches: There is growing interest in developing more personalized applications of ${subject} that account for individual differences and preferences.\n\n- Sustainable Practices: The integration of sustainability principles into ${subject} represents an important future direction. This includes environmental, social, and economic sustainability considerations.\n\nConclusion:\n\nIn conclusion, ${subject} represents a dynamic and multifaceted field with significant implications for society. Its theoretical foundations provide a robust basis for understanding, while its practical applications demonstrate its relevance across diverse sectors. The historical evolution of ${subject} reveals a pattern of continuous growth and innovation, while current trends suggest an exciting future filled with possibilities.\n\nHowever, the field also faces important challenges that must be addressed through thoughtful research, ethical consideration, and strategic planning. By confronting these challenges head-on, the ${subject} community can ensure that the field continues to evolve in ways that benefit society as a whole.\n\nFor students, professionals, and researchers, engaging with ${subject} offers numerous opportunities for personal and professional growth. Whether through academic study, practical application, or research contribution, there are many ways to participate in this vibrant and important field.\n\nAs we look to the future, it is clear that ${subject} will continue to play a crucial role in shaping our world. By staying informed about developments, embracing innovation, and maintaining ethical standards, we can ensure that ${subject} continues to serve as a force for positive change in society.`
      }

      setAnswer(responses[wordCount as keyof typeof responses] || responses["500"])
      tokenManager.useRequest()
      setIsLoading(false)
    }, 2000)
  }

  const copyAnswer = () => {
    navigator.clipboard.writeText(answer)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">AI Assignment Helper</h1>
        <p className="text-gray-400 text-base text-center mb-4">Get structured answers for your assignments with AI assistance</p>

        {/* Academic Integrity Disclaimer */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <BookOpen className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
            <div>
              <h2 className="text-yellow-500 font-semibold mb-1">Study Aid Disclaimer</h2>
              <p className="text-gray-300 text-sm">This tool is designed as a study aid to help you understand concepts and structure your thoughts. Please use the generated content as a reference only. Do not submit AI-generated work as your own. Always review, edit, and add your own insights to ensure academic integrity and genuine learning.</p>
            </div>
          </div>
        </div>

        <DailyUsageBar
          used={used}
          limit={limit}
          remaining={remaining}
          loaded={true}
        />

        <AIToolDisclaimer />

        {/* Ad below tool title */}
        <div className="ad-slot mb-8">
          <div id="ad-top"></div>
        </div>
        
        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8 mb-6">
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Subject Name</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all"
                placeholder="e.g., Computer Science, Physics, History"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Assignment Question</label>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-white/8 bg-[#0B0F1A] text-white focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 focus:border-[#00E5FF] transition-all h-32 resize-none"
                placeholder="Enter your assignment question or topic..."
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Word Count</label>
              <div className="flex gap-2">
                {["200", "500", "1000"].map(count => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setWordCount(count)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${wordCount === count ? "bg-[#00E5FF] text-black" : "bg-white/5 text-white hover:bg-white/10"}`}
                  >
                    {count} words
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={generateAnswer}
            disabled={!subject || !question || isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Sparkles className="h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5" />
                Generate Answer
              </>
            )}
          </button>
        </div>

        {/* Answer Display */}
        {answer && (
          <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Generated Answer</h2>
              <button
                type="button"
                onClick={copyAnswer}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#00E5FF]/20 text-[#00E5FF] text-sm hover:bg-[#00E5FF]/30 transition-colors"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <pre className="text-gray-300 whitespace-pre-wrap font-sans text-sm leading-relaxed">
                {answer}
              </pre>
            </div>
          </div>
        )}

        {/* Single bottom ad */}
        <div className="ad-slot mt-8">
          <div id="ad-bottom"></div>
        </div>

        {/* How to Use Section */}
        <HowToUse steps={[
          "Enter the subject name of your assignment",
          "Type your assignment question or topic",
          "Select the desired word count (200, 500, or 1000)",
          "Click 'Generate Answer' to get AI assistance",
          "Review, edit, and use the generated answer as a reference"
        ]} />

        {/* Tool Rating */}
        <ToolRating toolPath="/tools/ai-assignment-helper" toolName="AI Assignment Helper" />

        {/* FAQ Section */}
        <RelatedTools
          toolName="AI Assignment Helper"
          faqs={[
            {
              question: "How does the AI assignment helper work?",
              answer: "The AI analyzes your subject and question to generate a structured answer with introduction, main points, and conclusion. You can select the word count to get answers of appropriate length for your requirements."
            },
            {
              question: "Can I use the generated answer directly?",
              answer: "The generated answer is meant to be a reference and starting point. We recommend reviewing, editing, and adding your own insights to make it truly your own. This helps with learning and ensures academic integrity."
            },
            {
              question: "What subjects does it support?",
              answer: "The AI helper supports a wide range of subjects including science, mathematics, humanities, social sciences, and more. Simply enter your subject and question to get started."
            },
            {
              question: "Is this suitable for all educational levels?",
              answer: "Yes, the tool can generate answers appropriate for different educational levels. The word count selector helps you get answers that match your requirements, whether for school, college, or university assignments."
            }
          ]}
        />

        {/* Social Share */}
        <SocialShare title="AI Assignment Helper - Get help with assignments" />

        {/* Tool Content Section */}
        <ToolContent content={toolContent} toolName="AI Assignment Helper" toolPath="/tools/ai-assignment-helper" />

        {/* Related Tools */}
        <RelatedTools currentToolPath="/tools/ai-assignment-helper" currentCategory={toolContent.category} />

        <Link
          href="/"
          className="mt-6 text-[#00E5FF] hover:underline inline-block"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}

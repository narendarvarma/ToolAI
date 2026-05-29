"use client"

import { useState } from "react"
import { Upload, Download, FileText as FileIcon, Image } from "lucide-react"
import HowToUse from "@/components/how-to-use"
import SocialShare from "@/components/social-share"
import { useRecentTools } from "@/hooks/use-recent-tools"

export default function PDFToImage() {
  useRecentTools("/tools/pdf-to-image", "PDF to Image", "PDF Tools")
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [error, setError] = useState("")
  const [progress, setProgress] = useState(0)

  const handlePDFUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setPdfFile(file)
      setImages([])
      setError("")
      setProgress(0)
    } else {
      setError("Please upload a valid PDF file.")
    }
  }

  const convertToImages = async () => {
    if (!pdfFile) return
    setIsProcessing(true)
    setImages([])
    setError("")
    setProgress(0)

    try {
      // Dynamically import PDF.js legacy build
      const pdfjsLib = await import("pdfjs-dist/legacy/build/pdf")
      pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"

      const arrayBuffer = await pdfFile.arrayBuffer()
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      const totalPages = pdf.numPages
      const generatedImages: string[] = []

      for (let i = 1; i <= totalPages; i++) {
        const page = await pdf.getPage(i)
        const viewport = page.getViewport({ scale: 2.0 }) // scale 2 = high quality

        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")!
        canvas.width = viewport.width
        canvas.height = viewport.height

        await page.render({ canvasContext: ctx, viewport }).promise

        const dataUrl = canvas.toDataURL("image/png")
        generatedImages.push(dataUrl)
        setProgress(Math.round((i / totalPages) * 100))
      }

      setImages(generatedImages)
    } catch (err) {
      console.error(err)
      setError("Failed to convert PDF. Please try a different file.")
    }

    setIsProcessing(false)
  }

  const downloadImage = (dataUrl: string, pageNum: number) => {
    const link = document.createElement("a")
    link.href = dataUrl
    link.download = `${pdfFile?.name.replace(".pdf", "")}-page-${pageNum}.png`
    link.click()
  }

  const downloadAll = () => {
    images.forEach((img, i) => downloadImage(img, i + 1))
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-3 text-center text-white">PDF to Image</h1>
        <p className="text-gray-400 text-base text-center mb-8">Convert PDF pages to high-quality PNG images</p>

        <div className="ad-slot mb-8" style={{width:"100%",minHeight:"90px",background:"#f5f5f5",border:"1px dashed #ccc",textAlign:"center",padding:"10px",fontSize:"12px",color:"#999"}}>
          Advertisement
        </div>

        <div className="bg-[#111827] rounded-2xl p-6 shadow-lg border border-white/8">

          {/* Upload */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2 text-white">Upload PDF File</label>
            <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-[#00E5FF] hover:bg-[#00E5FF]/5 transition-all cursor-pointer">
              <input type="file" accept=".pdf" onChange={handlePDFUpload} className="hidden" id="pdf-upload" />
              <label htmlFor="pdf-upload" className="cursor-pointer">
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-300 font-medium">Click to upload PDF</p>
                <p className="text-gray-500 text-sm mt-1">Supports all PDF files</p>
              </label>
            </div>
          </div>

          {/* File Info */}
          {pdfFile && (
            <div className="mb-6 p-4 bg-white/5 rounded-xl border border-[#00E5FF]/20 flex items-center gap-3">
              <FileIcon className="h-8 w-8 text-[#00E5FF] shrink-0" />
              <div>
                <p className="font-medium text-white">{pdfFile.name}</p>
                <p className="text-sm text-gray-400">{(pdfFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Convert Button */}
          <button
            type="button"
            onClick={convertToImages}
            disabled={!pdfFile || isProcessing}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white font-semibold hover:scale-[1.02] transition-transform shadow-lg disabled:opacity-50 disabled:hover:scale-100"
          >
            {isProcessing ? `Converting... ${progress}%` : "Convert to Images"}
          </button>

          {/* Progress Bar */}
          {isProcessing && (
            <div className="mt-4 w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}

          {/* Results */}
          {images.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-white font-semibold">
                  ✅ {images.length} page{images.length > 1 ? "s" : ""} converted!
                </p>
                {images.length > 1 && (
                  <button
                    type="button"
                    onClick={downloadAll}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-[#00E5FF] to-[#7C4DFF] text-white text-sm font-semibold"
                  >
                    <Download className="h-4 w-4" />
                    Download All
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {images.map((img, i) => (
                  <div key={i} className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                    <img src={img} alt={`Page ${i + 1}`} className="w-full object-contain max-h-64" />
                    <div className="p-3 flex items-center justify-between">
                      <span className="text-gray-400 text-sm">Page {i + 1}</span>
                      <button
                        type="button"
                        onClick={() => downloadImage(img, i + 1)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#00E5FF]/20 text-[#00E5FF] text-sm hover:bg-[#00E5FF]/30 transition-colors"
                      >
                        <Download className="h-3 w-3" />
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Share after result */}
              <div className="mt-4 p-4 bg-white/5 rounded-xl border border-white/10 text-center">
                <p className="text-gray-300 text-sm mb-3">🎉 Found this useful? Share ToolHub AI!</p>
                <div className="flex gap-2 justify-center">
                  <a href={`https://wa.me/?text=Convert PDF to Image free at https://gettoolai.in/tools/pdf-to-image`} target="_blank" rel="noreferrer"
                    className="px-3 py-1.5 bg-green-600/20 text-green-400 rounded-lg text-sm hover:bg-green-600/30">
                    📱 WhatsApp
                  </a>
                  <button type="button" onClick={() => navigator.clipboard.writeText("https://gettoolai.in/tools/pdf-to-image")}
                    className="px-3 py-1.5 bg-white/10 text-white rounded-lg text-sm hover:bg-white/20">
                    🔗 Copy Link
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="ad-slot mt-8" style={{width:"100%",minHeight:"90px",background:"#f5f5f5",border:"1px dashed #ccc",textAlign:"center",padding:"10px",fontSize:"12px",color:"#999"}}>
          Advertisement
        </div>

        <HowToUse steps={[
          "Click 'Upload PDF' and select your PDF file",
          "Click 'Convert to Images' button",
          "Wait for all pages to be converted (progress bar shows status)",
          "Preview each page as an image",
          "Click Download on individual pages or Download All"
        ]} />

        <SocialShare title="PDF to Image Converter - Convert PDF pages to PNG images" />

        <button onClick={() => window.location.href = "/"} className="mt-6 text-[#00E5FF] hover:underline">
          ← Back to Home
        </button>
      </div>
    </div>
  )
}
import { BASE_URL } from "./config"

export const toolMetadata: Record<string, {
  title: string
  description: string
  keywords: string
  category: string
  applicationCategory: string
}> = {
  "doc-to-pdf": {
    title: "Doc to PDF Converter Online Free | GetTool AI",
    description: "Convert documents and images to PDF instantly with our free online converter. Supports JPG, PNG, TXT, HTML, RTF. Try it now for fast, secure results.",
    keywords: "doc to pdf, convert doc to pdf, document to pdf, file to pdf converter",
    category: "PDF Tools",
    applicationCategory: "PDFApplication"
  },
  "pdf-to-image": {
    title: "PDF to Image Converter Online Free | GetTool AI",
    description: "Convert PDF pages to images easily with our free PDF to Image converter. Extract pages as JPG or PNG. Fast and secure. Try it now for fast, secure results.",
    keywords: "pdf to image, convert pdf to jpg, pdf to png, pdf image converter",
    category: "PDF Tools",
    applicationCategory: "PDFApplication"
  },
  "merge-pdf": {
    title: "Merge PDF Files Online Free | GetTool AI",
    description: "Combine multiple PDF files into one document with our free PDF merger. Upload, arrange, and merge PDFs instantly. Try it now for fast, secure results.",
    keywords: "merge pdf, combine pdf, join pdf, pdf merger, pdf combiner",
    category: "PDF Tools",
    applicationCategory: "PDFApplication"
  },
  "split-pdf": {
    title: "Split PDF Online Free | GetTool AI",
    description: "Split PDF files into separate documents with our free PDF splitter. Extract pages or ranges easily. No installation needed.",
    keywords: "split pdf, pdf splitter, extract pdf pages, separate pdf",
    category: "PDF Tools",
    applicationCategory: "PDFApplication"
  },
  "compress-pdf": {
    title: "Compress PDF Online Free | GetTool AI",
    description: "Reduce PDF file size without losing quality with our free PDF compressor. Optimize PDFs for email and web sharing. Try it now for fast, secure results.",
    keywords: "compress pdf, reduce pdf size, pdf compressor, optimize pdf",
    category: "PDF Tools",
    applicationCategory: "PDFApplication"
  },
  "add-watermark": {
    title: "Add Watermark to PDF Online Free | GetTool AI",
    description: "Add text or image watermarks to PDF documents with our free online tool. Protect your PDFs with custom watermarks. Try it now for fast, secure results.",
    keywords: "add watermark to pdf, pdf watermark, watermark pdf, protect pdf",
    category: "PDF Tools",
    applicationCategory: "PDFApplication"
  },
  "remove-pages": {
    title: "Remove Pages from PDF Online Free | GetTool AI",
    description: "Delete specific pages from PDF files with our free online tool. Remove unwanted pages quickly and easily. Try it now for fast, secure results.",
    keywords: "remove pdf pages, delete pdf pages, pdf page remover",
    category: "PDF Tools",
    applicationCategory: "PDFApplication"
  },
  "rotate-pdf": {
    title: "Rotate PDF Pages Online Free | GetTool AI",
    description: "Rotate PDF pages to correct orientation with our free online tool. Fix upside-down or sideways PDF pages instantly. Try it now for fast, secure results.",
    keywords: "rotate pdf, pdf rotation, rotate pdf pages, fix pdf orientation",
    category: "PDF Tools",
    applicationCategory: "PDFApplication"
  },
  "background-remover": {
    title: "Remove Image Background Online Free | GetTool AI",
    description: "Remove backgrounds from images instantly with our free AI background remover. Get transparent PNG images in seconds. Try it now for fast, secure results.",
    keywords: "remove background, background remover, image background remover, transparent background",
    category: "Image Tools",
    applicationCategory: "DesignApplication"
  },
  "image-compressor": {
    title: "Compress Images Online Free | GetTool AI",
    description: "Reduce image file size without losing quality with our free image compressor. Optimize JPG, PNG, and WebP images. Try it now for fast, secure results.",
    keywords: "compress image, image compressor, reduce image size, optimize image",
    category: "Image Tools",
    applicationCategory: "DesignApplication"
  },
  "resize-image": {
    title: "Resize Images Online Free | GetTool AI",
    description: "Resize images to custom dimensions with our free online image resizer. Change image size for any purpose. Try it now for fast, secure results.",
    keywords: "resize image, image resizer, change image size, resize photo",
    category: "Image Tools",
    applicationCategory: "DesignApplication"
  },
  "convert-format": {
    title: "Convert Image Format Online Free | GetTool AI",
    description: "Convert between image formats with our free online converter. Change JPG to PNG, WebP, GIF and more. Try it now for fast, secure results.",
    keywords: "convert image format, image converter, jpg to png, png to jpg",
    category: "Image Tools",
    applicationCategory: "DesignApplication"
  },
  "ai-image-enhancer": {
    title: "AI Image Enhancer Online Free | GetTool AI",
    description: "Enhance and improve image quality with AI. Get professional image enhancement suggestions using advanced AI technology. Get results in seconds.",
    keywords: "ai image enhancer, enhance image, image improvement, ai photo enhancer",
    category: "Image Tools",
    applicationCategory: "DesignApplication"
  },
  "qr-generator": {
    title: "QR Code Generator Online Free | GetTool AI",
    description: "Generate QR codes instantly with our free QR code generator. Create custom QR codes for URLs, text, and more. Try it now for fast, secure results.",
    keywords: "qr code generator, create qr code, free qr generator, qr code maker",
    category: "Image Tools",
    applicationCategory: "DesignApplication"
  },
  "meme-generator": {
    title: "Meme Generator Online Free | GetTool AI",
    description: "Create memes instantly with our free meme generator. Add text to images and share funny memes online. Try it now for fast, secure results.",
    keywords: "meme generator, create meme, meme maker, funny meme creator",
    category: "Image Tools",
    applicationCategory: "DesignApplication"
  },
  "ai-resume-builder": {
    title: "AI Resume Builder Online Free | GetTool AI",
    description: "Build professional resumes with AI assistance. Create ATS-friendly resumes that get you hired. Free and easy to use. Try it now for fast, secure results.",
    keywords: "ai resume builder, resume maker, create resume, professional resume",
    category: "AI Tools",
    applicationCategory: "AIApplication"
  },
  "ai-email-writer": {
    title: "AI Email Writer Online Free | GetTool AI",
    description: "Write professional emails with AI assistance. Generate well-structured emails for any purpose instantly. Try it now for fast, secure results.",
    keywords: "ai email writer, email generator, write emails, professional email",
    category: "AI Tools",
    applicationCategory: "AIApplication"
  },
  "ai-notes-summarizer": {
    title: "AI Notes Summarizer Online Free | GetTool AI",
    description: "Summarize your notes with AI. Condense lengthy notes into key points and summaries instantly. Try it now for fast, secure results.",
    keywords: "ai notes summarizer, summarize notes, note summarizer, ai summary",
    category: "AI Tools",
    applicationCategory: "AIApplication"
  },
  "ai-caption-generator": {
    title: "AI Caption Generator Online Free | GetTool AI",
    description: "Generate social media captions with AI. Create engaging captions for Instagram, Twitter, and more. Try it now for fast, secure results.",
    keywords: "ai caption generator, caption generator, social media captions, ai captions",
    category: "AI Tools",
    applicationCategory: "AIApplication"
  },
  "ai-study-assistant": {
    title: "AI Study Assistant Online Free | GetTool AI",
    description: "Get help with your studies from AI. Ask questions, get explanations, and improve your learning. Try it now for fast, secure results.",
    keywords: "ai study assistant, study help, ai tutor, learning assistant",
    category: "AI Tools",
    applicationCategory: "AIApplication"
  },
  "ai-code-helper": {
    title: "AI Code Helper Online Free | GetTool AI",
    description: "Generate and debug code with AI assistance. Get code snippets, explanations, and solutions. Try it now for fast, secure results.",
    keywords: "ai code helper, code generator, ai coding, code assistant",
    category: "AI Tools",
    applicationCategory: "AIApplication"
  },
  "ai-blog-generator": {
    title: "AI Blog Generator Online Free | GetTool AI",
    description: "Generate blog posts with AI. Create engaging content for your blog in minutes. Try it now for fast, secure results. Use it instantly in your browser.",
    keywords: "ai blog generator, blog writer, content generator, ai writing",
    category: "AI Tools",
    applicationCategory: "AIApplication"
  },
  "ai-text-rewriter": {
    title: "AI Text Rewriter Online Free | GetTool AI",
    description: "Rewrite text with AI. Paraphrase, improve clarity, and adjust tone for any content. Try it now for fast, secure results.",
    keywords: "ai text rewriter, paraphrase tool, text paraphraser, rewrite text",
    category: "AI Tools",
    applicationCategory: "AIApplication"
  },
  "internship-finder": {
    title: "Internship Finder Online Free | GetTool AI",
    description: "Find internships matched to your skills with AI. Get personalized internship recommendations with real apply links. Try it now for fast, secure results.",
    keywords: "internship finder, find internships, ai internship search, internship recommendations",
    category: "AI Tools",
    applicationCategory: "AIApplication"
  },
  "cgpa-calculator": {
    title: "CGPA Calculator Online Free | GetTool AI",
    description: "Calculate your CGPA instantly with our free online CGPA calculator. Add courses, credits, and grades to get accurate results.",
    keywords: "cgpa calculator, calculate cgpa, gpa calculator, cumulative grade point average",
    category: "Student Tools",
    applicationCategory: "EducationalApplication"
  },
  "attendance-calculator": {
    title: "Attendance Calculator Online Free | GetTool AI",
    description: "Calculate your attendance percentage with our free online calculator. Track present days and get attendance status. Try it now for fast, secure results.",
    keywords: "attendance calculator, calculate attendance, attendance percentage, attendance tracker",
    category: "Student Tools",
    applicationCategory: "EducationalApplication"
  },
  "study-planner": {
    title: "Study Planner Online Free | GetTool AI",
    description: "Plan your study sessions with our free study planner. Organize your schedule and boost productivity. Try it now for fast, secure results.",
    keywords: "study planner, study schedule, study organizer, academic planner",
    category: "Student Tools",
    applicationCategory: "EducationalApplication"
  },
  "pomodoro-timer": {
    title: "Pomodoro Timer Online Free | GetTool AI",
    description: "Boost focus with our free Pomodoro timer. Use the Pomodoro technique to study more effectively. Try it now for fast, secure results.",
    keywords: "pomodoro timer, pomodoro technique, focus timer, study timer",
    category: "Student Tools",
    applicationCategory: "EducationalApplication"
  },
  "unit-converter": {
    title: "Unit Converter Online Free | GetTool AI",
    description: "Convert units easily with our free online unit converter. Length, weight, temperature, and more. Try it now for fast, secure results.",
    keywords: "unit converter, convert units, measurement converter, online converter",
    category: "Student Tools",
    applicationCategory: "EducationalApplication"
  },
  "notes-organizer": {
    title: "Notes Organizer Online Free | GetTool AI",
    description: "Organize your notes with our free online tool. Categorize, search, and manage your study notes efficiently. Try it now for fast, secure results.",
    keywords: "notes organizer, organize notes, note management, study notes",
    category: "Student Tools",
    applicationCategory: "EducationalApplication"
  },
  "timetable-generator": {
    title: "Timetable Generator Online Free | GetTool AI",
    description: "Create weekly schedules with our free timetable generator. Plan your week and stay organized. Try it now for fast, secure results.",
    keywords: "timetable generator, weekly schedule, class schedule, schedule maker",
    category: "Student Tools",
    applicationCategory: "EducationalApplication"
  },
  "flashcard-generator": {
    title: "Flashcard Generator Online Free | GetTool AI",
    description: "Create and study flashcards with our free generator. Improve memorization and learning efficiency. Try it now for fast, secure results.",
    keywords: "flashcard generator, create flashcards, study flashcards, digital flashcards",
    category: "Student Tools",
    applicationCategory: "EducationalApplication"
  },
  "digital-notes": {
    title: "Digital Notes Online Free | GetTool AI",
    description: "Take digital notes with our free online notepad. Write, save, and access your notes from anywhere. Try it now for fast, secure results.",
    keywords: "digital notes, online notepad, take notes, web notes",
    category: "Student Tools",
    applicationCategory: "EducationalApplication"
  },
  "todo-list": {
    title: "To-Do List Online Free | GetTool AI",
    description: "Manage your tasks with our free online to-do list. Stay organized and boost productivity. Try it now for fast, secure results.",
    keywords: "to do list, task manager, online todo, task list",
    category: "Productivity Tools",
    applicationCategory: "ProductivityApplication"
  },
  "expense-tracker": {
    title: "Expense Tracker Online Free | GetTool AI",
    description: "Track your expenses with our free online expense tracker. Monitor spending and manage your budget. Try it now for fast, secure results.",
    keywords: "expense tracker, track expenses, budget tracker, expense manager",
    category: "Productivity Tools",
    applicationCategory: "ProductivityApplication"
  },
  "password-generator": {
    title: "Password Generator Online Free | GetTool AI",
    description: "Generate secure passwords with our free password generator. Create strong, random passwords instantly. Try it now for fast, secure results.",
    keywords: "password generator, secure password, random password, strong password",
    category: "Productivity Tools",
    applicationCategory: "ProductivityApplication"
  },
  "calendar-planner": {
    title: "Calendar Planner Online Free | GetTool AI",
    description: "Plan your schedule with our free calendar planner. Organize events and manage your time effectively. Try it now for fast, secure results.",
    keywords: "calendar planner, online calendar, schedule planner, event planner",
    category: "Productivity Tools",
    applicationCategory: "ProductivityApplication"
  },
  "habit-tracker": {
    title: "Habit Tracker Online Free | GetTool AI",
    description: "Track your habits with our free online habit tracker. Build good habits and break bad ones. Try it now for fast, secure results.",
    keywords: "habit tracker, track habits, habit builder, daily habits",
    category: "Productivity Tools",
    applicationCategory: "ProductivityApplication"
  },
  "daily-goals": {
    title: "Daily Goals Online Free | GetTool AI",
    description: "Set and track daily goals with our free online tool. Achieve more every day with goal tracking. Try it now for fast, secure results.",
    keywords: "daily goals, goal tracker, set goals, daily objectives",
    category: "Productivity Tools",
    applicationCategory: "ProductivityApplication"
  },
  "text-to-speech": {
    title: "Text to Speech Online Free | GetTool AI",
    description: "Convert text to speech with our free online TTS tool. Listen to any text in natural voice. Try it now for fast, secure results.",
    keywords: "text to speech, tts, voice generator, text reader",
    category: "Utility Tools",
    applicationCategory: "UtilityApplication"
  },
  "speech-to-text": {
    title: "Speech to Text Online Free | GetTool AI",
    description: "Convert speech to text with our free online tool. Transcribe audio and voice to text instantly. Try it now for fast, secure results.",
    keywords: "speech to text, voice to text, audio transcription, speech recognition",
    category: "Utility Tools",
    applicationCategory: "UtilityApplication"
  },
  "currency-converter": {
    title: "Currency Converter Online Free | GetTool AI",
    description: "Convert currencies with our free online currency converter. Real-time exchange rates for 180+ currencies. Try it now for fast, secure results.",
    keywords: "currency converter, exchange rate, money converter, forex converter",
    category: "Utility Tools",
    applicationCategory: "UtilityApplication"
  },
  "age-calculator": {
    title: "Age Calculator Online Free | GetTool AI",
    description: "Calculate your exact age with our free online age calculator. Get age in years, months, and days. Try it now for fast, secure results.",
    keywords: "age calculator, calculate age, birthday calculator, age in years",
    category: "Utility Tools",
    applicationCategory: "UtilityApplication"
  },
  "bmi-calculator": {
    title: "BMI Calculator Online Free | GetTool AI",
    description: "Calculate your BMI with our free online BMI calculator. Check your body mass index and health category. Try it now for fast, secure results.",
    keywords: "bmi calculator, body mass index, calculate bmi, health calculator",
    category: "Utility Tools",
    applicationCategory: "UtilityApplication"
  },
  "internet-speed-test": {
    title: "Internet Speed Test Online Free | GetTool AI",
    description: "Test your internet speed with our free online speed test. Check download, upload, and ping speeds. Try it now for fast, secure results.",
    keywords: "internet speed test, speed test, network speed, broadband test",
    category: "Utility Tools",
    applicationCategory: "UtilityApplication"
  },
  "file-sharing": {
    title: "File Sharing Online Free | GetTool AI",
    description: "Share files easily with our free online file sharing tool. Transfer files securely without size limits. Try it now for fast, secure results.",
    keywords: "file sharing, share files, file transfer, send files",
    category: "Utility Tools",
    applicationCategory: "UtilityApplication"
  },
  "word-counter": {
    title: "Word Counter Online Free | GetTool AI",
    description: "Count words and characters with our free online word counter. Get real-time statistics for your text. Try it now for fast, secure results.",
    keywords: "word counter, count words, character counter, word count tool",
    category: "Utility Tools",
    applicationCategory: "UtilityApplication"
  },
  "json-formatter": {
    title: "JSON Formatter Online Free | GetTool AI",
    description: "Format and validate JSON with our free online JSON formatter. Beautify and debug JSON data instantly. Try it now for fast, secure results.",
    keywords: "json formatter, format json, json beautifier, json validator",
    category: "Utility Tools",
    applicationCategory: "UtilityApplication"
  },
  "color-picker": {
    title: "Color Picker Online Free | GetTool AI",
    description: "Pick and convert colors with our free online color picker. Get HEX, RGB, and HSL values. Try it now for fast, secure results.",
    keywords: "color picker, pick color, color converter, hex color",
    category: "Utility Tools",
    applicationCategory: "UtilityApplication"
  },
  "case-converter": {
    title: "Case Converter Online Free | GetTool AI",
    description: "Convert text cases with our free online case converter. Change to uppercase, lowercase, title case, and more. Try it now for fast, secure results.",
    keywords: "case converter, text case, convert case, uppercase lowercase",
    category: "Utility Tools",
    applicationCategory: "UtilityApplication"
  },
  "lorem-ipsum": {
    title: "Lorem Ipsum Generator Online Free | GetTool AI",
    description: "Generate placeholder text with our free Lorem Ipsum generator. Create dummy text for designs. Try it now for fast, secure results.",
    keywords: "lorem ipsum, placeholder text, dummy text, lorem generator",
    category: "Utility Tools",
    applicationCategory: "UtilityApplication"
  },
  "base64-encoder": {
    title: "Base64 Encoder Online Free | GetTool AI",
    description: "Encode and decode Base64 with our free online tool. Convert text to Base64 and vice versa. Try it now for fast, secure results.",
    keywords: "base64 encoder, base64 decoder, encode base64, decode base64",
    category: "Utility Tools",
    applicationCategory: "UtilityApplication"
  },
  "url-encoder": {
    title: "URL Encoder Online Free | GetTool AI",
    description: "Encode and decode URLs with our free online tool. Make URLs safe for web use. Try it now for fast, secure results. Use it instantly in your browser.",
    keywords: "url encoder, url decoder, encode url, decode url",
    category: "Utility Tools",
    applicationCategory: "UtilityApplication"
  },
  "timezone-converter": {
    title: "Time Zone Converter Online Free | GetTool AI",
    description: "Convert time zones with our free online converter. Find time differences between cities worldwide. Try it now for fast, secure results.",
    keywords: "timezone converter, time zone, convert time, world clock",
    category: "Utility Tools",
    applicationCategory: "UtilityApplication"
  },
  "date-calculator": {
    title: "Date Calculator Online Free | GetTool AI",
    description: "Calculate dates with our free online date calculator. Add/subtract days and find date differences. Try it now for fast, secure results.",
    keywords: "date calculator, calculate dates, date difference, date math",
    category: "Utility Tools",
    applicationCategory: "UtilityApplication"
  },
  "tip-calculator": {
    title: "Tip Calculator Online Free | GetTool AI",
    description: "Calculate tips and split bills with our free online tip calculator. Quick and easy tip calculations. Try it now for fast, secure results.",
    keywords: "tip calculator, calculate tip, split bill, tip splitter",
    category: "Utility Tools",
    applicationCategory: "UtilityApplication"
  },
  "regex-tester": {
    title: "Regex Tester Online Free | GetTool AI",
    description: "Test regular expressions with our free online regex tester. Debug and validate regex patterns. Try it now for fast, secure results.",
    keywords: "regex tester, regular expression, test regex, regex debugger",
    category: "Utility Tools",
    applicationCategory: "UtilityApplication"
  },
  "uuid-generator": {
    title: "UUID Generator Online Free | GetTool AI",
    description: "Generate unique UUIDs with our free online UUID generator. Create random identifiers instantly. Try it now for fast, secure results.",
    keywords: "uuid generator, generate uuid, unique id, guid generator",
    category: "Utility Tools",
    applicationCategory: "UtilityApplication"
  },
  "unix-timestamp": {
    title: "Unix Timestamp Converter Online Free | GetTool AI",
    description: "Convert Unix timestamps with our free online tool. Convert epoch time to human-readable dates. Try it now for fast, secure results.",
    keywords: "unix timestamp, epoch time, timestamp converter, unix time",
    category: "Utility Tools",
    applicationCategory: "UtilityApplication"
  },
  "html-entity-encoder": {
    title: "HTML Entity Encoder Online Free | GetTool AI",
    description: "Encode and decode HTML entities with our free online tool. Escape special characters for HTML. Try it now for fast, secure results.",
    keywords: "html entity encoder, html escape, encode html, html entities",
    category: "Utility Tools",
    applicationCategory: "UtilityApplication"
  },
  "markdown-to-html": {
    title: "Markdown to HTML Converter Online Free | GetTool AI",
    description: "Convert Markdown to HTML with our free online converter. Transform Markdown syntax to HTML. Try it now for fast, secure results.",
    keywords: "markdown to html, convert markdown, markdown converter, md to html",
    category: "Utility Tools",
    applicationCategory: "UtilityApplication"
  },
  "json-to-csv": {
    title: "JSON to CSV Converter Online Free | GetTool AI",
    description: "Convert JSON to CSV with our free online converter. Transform JSON data to CSV format. Try it now for fast, secure results.",
    keywords: "json to csv, convert json, json csv converter, json spreadsheet",
    category: "Utility Tools",
    applicationCategory: "UtilityApplication"
  },
  "password-strength": {
    title: "Password Strength Checker Online Free | GetTool AI",
    description: "Check password strength with our free online tool. Analyze password security and get improvement tips. Try it now for fast, secure results.",
    keywords: "password strength, check password, password security, password analyzer",
    category: "Utility Tools",
    applicationCategory: "UtilityApplication"
  },
  "countdown-timer": {
    title: "Countdown Timer Online Free | GetTool AI",
    description: "Set countdown timers with our free online tool. Track time remaining for events and deadlines. Try it now for fast, secure results.",
    keywords: "countdown timer, timer, countdown, event timer",
    category: "Utility Tools",
    applicationCategory: "UtilityApplication"
  },
  "stopwatch": {
    title: "Stopwatch Online Free | GetTool AI",
    description: "Track time precisely with our free online stopwatch. Start, stop, and lap timing. Try it now for fast, secure results. Use it instantly in your browser.",
    keywords: "stopwatch, timer, chronometer, time tracker",
    category: "Utility Tools",
    applicationCategory: "UtilityApplication"
  },
  "world-clock": {
    title: "World Clock Online Free | GetTool AI",
    description: "Track time across cities with our free online world clock. See current time in multiple time zones. Try it now for fast, secure results.",
    keywords: "world clock, international clock, global time, time zones",
    category: "Utility Tools",
    applicationCategory: "UtilityApplication"
  },
  "calorie-calculator": {
    title: "Calorie Calculator Online Free | GetTool AI",
    description: "Calculate daily calorie needs with our free online calorie calculator. Plan your diet based on your goals. Try it now for fast, secure results.",
    keywords: "calorie calculator, calculate calories, daily calories, diet calculator",
    category: "Utility Tools",
    applicationCategory: "UtilityApplication"
  }
}

export function getToolMetadata(toolSlug: string) {
  const metadata = toolMetadata[toolSlug] || {
    title: "Free Online Tools | GetTool AI",
    description: "Professional online tools for PDF, images, AI, students, productivity, and utilities. Try it now for fast, secure results.",
    keywords: "online tools, free tools, productivity tools"
  }

  return {
    ...metadata,
    canonical: `${BASE_URL}/tools/${toolSlug}`,
    ogUrl: `${BASE_URL}/tools/${toolSlug}`
  }
}

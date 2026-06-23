# 🚀 GetTool AI

<div align="center">

![GetTool AI](https://img.shields.io/badge/GetTool-AI-00E5FF?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjEwIi8+PHBvbHlnb24gcG9pbnRzPSIxMiA4IDggMTIgMTIgMTYgMTYgMTIiLz48L3N2Zz4=)
![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A comprehensive AI-powered tools platform with 66+ professional tools**

[Live Demo](#) • [Report Bug](#) • [Request Feature](#)

</div>

---

## ✨ Features

GetTool AI is a modern, full-stack "Everything Tools" website - a clean, fast, mobile-friendly platform containing useful daily tools for students, creators, office workers, and general users.

### 🎯 Key Highlights

- **66+ Professional Tools** across 6 categories
- **AI-Powered** with OpenRouter integration for intelligent processing
- **Dark Theme** with stunning gradient accents
- **Fully Responsive** design for all devices
- **Real-time Processing** with instant results
- **No Authentication Required** - completely free to use
- **Modern UI/UX** inspired by Canva, iLovePDF, and Notion

### 📦 Tool Categories

#### 📄 PDF Tools (8 tools)
- Image to PDF, PDF to Image, Merge PDF, Split PDF
- Compress PDF, Add Watermark, Remove Pages, Rotate PDF

#### 🎨 Image Tools (7 tools)
- Background Remover, Image Compressor, Resize Image
- Convert Format, AI Image Enhancer, QR Code Generator, Meme Generator

#### 🤖 AI Tools (8 tools)
- AI Resume Builder, AI Email Writer, AI Notes Summarizer
- AI Caption Generator, AI Study Assistant, AI Code Helper
- AI Blog Generator, AI Text Rewriter

#### 📚 Student Tools (9 tools)
- CGPA Calculator, Attendance Calculator, Study Planner
- Pomodoro Timer, Unit Converter, Notes Organizer
- Timetable Generator, Flashcard Generator, Digital Notes

#### ⚡ Productivity Tools (6 tools)
- To-Do List, Expense Tracker, Password Generator
- Calendar Planner, Habit Tracker, Daily Goals

#### 🛠️ Utility Tools (28 tools)
- Text to Speech, Speech to Text, Currency Converter
- Age Calculator, BMI Calculator, Internet Speed Test
- File Sharing, Word Counter, JSON Formatter
- Color Picker, Case Converter, Lorem Ipsum Generator
- Base64 Encoder, URL Encoder, Time Zone Converter
- Date Calculator, Tip Calculator, Regex Tester
- UUID Generator, Unix Timestamp, HTML Entity Encoder
- Markdown to HTML, JSON to CSV, Password Strength
- Countdown Timer, Stopwatch, World Clock, Calorie Calculator

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14.2 with App Router
- **Language**: TypeScript 5.0
- **Styling**: TailwindCSS 3.4
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **AI Integration**: OpenRouter API
- **PDF Processing**: pdf-lib
- **UI Components**: Custom components with modern design patterns

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- OpenRouter API Key (for AI features)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/narendarvarma/ToolAI.git
cd ToolAI
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Add your OpenRouter API key to `.env.local`:
```env
NEXT_PUBLIC_OPENROUTER_API_KEY=your_api_key_here
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
gettool-ai/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── tools/
│   │       ├── pdf-tools/
│   │       ├── image-tools/
│   │       ├── ai-tools/
│   │       ├── student-tools/
│   │       ├── productivity-tools/
│   │       └── utility-tools/
│   ├── components/
│   │   ├── navbar.tsx
│   │   ├── ad-slot.tsx
│   │   └── ...
│   └── lib/
│       └── utils.ts
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

---

## 🎨 Design Philosophy

- **Dark Theme**: Professional dark theme with #0B0F1A background
- **Gradient Accents**: Cyan (#00E5FF) and Purple (#7C4DFF) gradients
- **Smooth Animations**: Framer Motion for fluid transitions
- **Responsive**: Mobile-first approach with breakpoints
- **Accessibility**: High contrast ratios and clear typography

---

## 🔧 Configuration

### OpenRouter API Setup

1. Get your API key from [OpenRouter](https://openrouter.ai/)
2. Add it to your `.env.local` file:
```env
NEXT_PUBLIC_OPENROUTER_API_KEY=your_api_key_here
```

### Ad Integration

The platform includes minimal ad slots for monetization:
- Homepage hero section
- AI Tools section
- Individual tool pages
- Footer

---

## 🌟 Key Features

### AI-Powered Tools
- **AI Image Enhancer**: Uses Claude 3.5 Sonnet with vision capabilities
- **AI Text Rewriter**: Intelligent text transformation
- **AI Resume Builder**: Professional resume generation
- **AI Email Writer**: Contextual email composition
- **AI Study Assistant**: Educational support
- **AI Code Helper**: Code generation and explanation

### Student-Focused Tools
- **Flashcard Generator**: Create and study flashcards with spaced repetition
- **Digital Notes**: Note-taking similar to GoodNotes
- **CGPA Calculator**: Academic performance tracking
- **Pomodoro Timer**: Focus and productivity

### Developer Utilities
- **JSON Formatter**: Validate and beautify JSON
- **Regex Tester**: Test regular expressions
- **Base64 Encoder**: Encode/decode Base64
- **HTML Entity Encoder**: Handle HTML special characters
- **Markdown to HTML**: Convert Markdown syntax

### Time & Date Tools
- **World Clock**: Track time across multiple cities
- **Countdown Timer**: Set countdowns for events
- **Stopwatch**: Precise time tracking with laps
- **Time Zone Converter**: Convert between time zones
- **Date Calculator**: Calculate date differences

---

## 📊 Tool Count by Category

| Category | Tool Count |
|----------|-----------|
| PDF Tools | 8 |
| Image Tools | 7 |
| AI Tools | 8 |
| Student Tools | 9 |
| Productivity Tools | 6 |
| Utility Tools | 28 |
| **Total** | **66** |

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Narendar Varma**

- GitHub: [@narendarvarma](https://github.com/narendarvarma)
- Project: [GetTool AI](https://github.com/narendarvarma/ToolAI)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide](https://lucide.dev/) - Beautiful icons
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [OpenRouter](https://openrouter.ai/) - AI API integration

---

<div align="center">

**⭐ If you like this project, please give it a star! ⭐**

Made with ❤️ by [Narendar Varma](https://github.com/narendarvarma)

</div>

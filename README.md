<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🧪 PromptAlchemy

**Transmute simple project ideas into high-fidelity, professional-grade AI engineering prompts.**

PromptAlchemy is a futuristic web interface that leverages **Google Gemini 3** to take a vague, one-line project idea and turn it into a comprehensive, structured system prompt — ready to be fed into any capable LLM (Claude, Gemini, GPT-4o, etc.) to actually build the application.

View the app in AI Studio: https://ai.studio/apps/drive/15-e8720scvPQ359nGCnFjoJ380bZXX7c

---

## ✨ Features

- **Idea → Blueprint** — Enter a rough concept and receive a detailed, Markdown-formatted engineering prompt.
- **Structured output** — Every generated prompt includes Project Identity, User Persona, Core Features, Tech Stack, UI/UX Design Philosophy, Data Structure, a Step-by-Step Implementation Plan, and Constraints & Rules.
- **Powered by Gemini 3 Pro** — Uses the `gemini-3-pro-preview` model tuned for structured, technically precise output.
- **Neon / cyberpunk UI** — Animated background, glassmorphic sections, and a responsive React interface.

## 🛠 Tech Stack

- **React 19** + **TypeScript**
- **Vite 6** for dev server and bundling
- **Tailwind CSS** (via CDN) for styling
- **lucide-react** for icons
- **@google/genai** SDK for the Gemini API

## 📁 Project Structure

```
├── App.tsx              # Root component & view-state orchestration
├── index.tsx            # React entry point
├── index.html           # HTML shell, Tailwind config, import map
├── types.ts             # Shared types (ViewState, AppState, PromptRequest)
├── components/          # UI components
│   ├── Background.tsx
│   ├── Header.tsx
│   ├── InputSection.tsx
│   └── ResultSection.tsx
├── services/
│   └── gemini.ts        # Gemini API client & prompt-enhancement logic
└── vite.config.ts       # Vite config (injects the API key)
```

## 🚀 Run Locally

**Prerequisites:** [Node.js](https://nodejs.org/)

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set your Gemini API key in [.env.local](.env.local):
   ```
   GEMINI_API_KEY=your_api_key_here
   ```
   You can get a key from [Google AI Studio](https://aistudio.google.com/app/apikey).
3. Start the dev server:
   ```bash
   npm run dev
   ```
   The app runs at [http://localhost:3000](http://localhost:3000).

## 📦 Available Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start the Vite development server        |
| `npm run build`   | Build the app for production             |
| `npm run preview` | Preview the production build locally     |

## 🔑 How It Works

1. You type a short idea (e.g. *"a habit tracker with streaks"*) into the input.
2. `services/gemini.ts` sends it to Gemini 3 Pro with a system instruction that casts the model as an elite Senior Technical Product Manager & Prompt Engineer.
3. The model returns a complete, structured Markdown prompt that you can copy and hand off to another LLM to build the real app.

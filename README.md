# VHS Portfolio - Zohair Omar

A VHS/DVD-menu themed portfolio website built with Next.js 14, featuring a retro aesthetic with modern UX and accessibility.

## Features

- **VHS/DVD Menu Aesthetic**: Scanlines, CRT effects, film grain, and nostalgic UI
- **Keyboard Navigation**: Full keyboard support with arrow keys, Enter, and number shortcuts
- **Responsive Design**: Works on all devices from mobile to desktop
- **Accessibility**: Respects `prefers-reduced-motion`, ARIA labels, and contrast-safe themes
- **LaTeX Resume Parsing**: Automatically converts your LaTeX resume to JSON
- **Customizable Settings**: Toggle effects, themes, and sound from the Settings page
- **Fast & Lightweight**: CSS-first effects with minimal JavaScript

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + tailwindcss-animate
- **UI Components**: shadcn/ui (Dialog, Tabs, Switch, Slider, Tooltip, Accordion, Button)
- **Fonts**: VT323 (display), Inter (body), JetBrains Mono (code)

## Quick Start

```bash
# Install dependencies
npm install

# Parse resume and start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Project Structure

```
portfolio-vhs/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home (DVD Main Menu)
│   ├── trailer/           # About page
│   ├── scenes/            # Projects page
│   ├── behind/            # Experience & Education
│   ├── bonus/             # Lessons & Bloopers
│   ├── subscribe/         # Contact & Resume download
│   ├── settings/          # Visual preferences
│   ├── resume/            # Printable resume
│   └── not-found.tsx      # 404 page
├── components/
│   ├── menu/              # DVD menu, quick nav, header
│   ├── ui/                # shadcn/ui components
│   └── vhs/               # VHS effect components
├── content/
│   ├── resume.tex         # Your LaTeX resume (edit this!)
│   ├── resume.json        # Auto-generated from resume.tex
│   ├── resume.manual.json # Fallback if parsing fails
│   └── projects.json      # Auto-generated projects list
├── hooks/                  # React hooks (settings, keyboard, sound)
├── lib/                    # Utilities
├── scripts/
│   └── parse-resume.ts    # LaTeX to JSON parser
├── types/                  # TypeScript types
└── public/
    └── resume.pdf         # Your PDF resume (add this!)
```

## Adding Your Resume

1. **Replace the LaTeX resume**:
   - Open `content/resume.tex`
   - Replace the placeholder content with your actual LaTeX resume
   - The parser expects these LaTeX structures:
     - `\sectiontitle{...}` for section headers
     - `\textbf{...}` for bold text
     - `\href{url}{text}` for links
     - `\hfill` for right-aligned dates
     - `\textit{...}` for italic text (locations)
     - `\begin{itemize}...\end{itemize}` for bullet lists

2. **Run the parser**:
   ```bash
   npm run parse:resume
   ```

3. **Add your PDF**:
   - Place your resume PDF at `public/resume.pdf`

4. **Fallback option**:
   - If parsing fails, edit `content/resume.manual.json` directly
   - The parser will use this as a fallback

## Customization

### Themes

Three built-in themes available in Settings:
- **CRT Blue** (default): Classic blue CRT monitor aesthetic
- **VHS Purple**: 80s synthwave vibes
- **Test Card White**: High contrast TV test pattern style

### Effects

Configurable in Settings:
- **Effects Master**: Toggle all VHS effects on/off
- **Grain**: Enable/disable film grain overlay
- **Flicker**: Low/Medium/High intensity
- **Sound Effects**: Optional navigation sounds (off by default)
- **Subtitles**: Show/hide hint text

### Project Categories

Projects are auto-categorized based on their tech stack:
- **Full-Stack**: React, Next.js, Node, etc.
- **Data/BI**: Power BI, Streamlit, Pandas, R, etc.
- **Hackathon**: Projects with "hack" in name or bullets

Override categories in `content/projects.overrides.json`:
```json
{
  "project-slug": {
    "category": "hackathon"
  }
}
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | DVD Main Menu (home) |
| `/trailer` | About Me |
| `/scenes` | Projects |
| `/behind` | Experience & Education |
| `/bonus` | Lessons & Bloopers |
| `/subscribe` | Contact & Resume Download |
| `/settings` | Visual Preferences |
| `/resume` | Clean Printable Resume |

## Keyboard Shortcuts

- **Arrow Up/Down** or **J/K**: Navigate menu items
- **Enter** or **Space**: Select item
- **1-6**: Quick select menu item
- **Escape**: Open Quick Nav overlay (from any page)

## Development

```bash
# Run parser separately
npm run parse:resume

# Lint code
npm run lint
```

## Deployment

Works with any Next.js-compatible host:
- **Vercel**: `vercel deploy`
- **Netlify**: Connect repo, use `npm run build`
- **Docker**: Build with standard Next.js Dockerfile

## Accessibility

- Full keyboard navigation
- ARIA labels on interactive elements
- Respects `prefers-reduced-motion`
- Contrast-safe color themes
- Focus indicators on all interactive elements

## License

MIT - Feel free to use this as a template for your own portfolio!

---

Built with retro love by Zohair Omar

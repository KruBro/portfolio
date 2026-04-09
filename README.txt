SHAHAD KURUNGADAN - EMBEDDED SYSTEMS ENGINEER PORTFOLIO

===============================================================================
SETUP INSTRUCTIONS
===============================================================================

1. Install dependencies:
   npm install

2. Run development server:
   npm run dev

3. Open in browser:
   http://localhost:3000

4. Build for production:
   npm run build
   
   This creates an /out folder with static files ready for deployment

===============================================================================
IMPORTANT - BEFORE DEPLOYING
===============================================================================

1. RESUME PDF:
   - Replace public/resume.pdf with your actual resume PDF file
   - Keep the filename as "resume.pdf" or update the link in app/page.tsx

2. STATIC EXPORT:
   - Site is configured for static export (output: 'export' in next.config.js)
   - Deploy the /out folder after running npm run build
   - Compatible with: Vercel, Netlify, GitHub Pages, any static host

===============================================================================
TECH STACK
===============================================================================

- Next.js 14.2.35 (App Router)
- React 18
- TypeScript
- Tailwind CSS (Custom GitHub-inspired dark theme)
- Framer Motion (Minimal animations)
- JetBrains Mono font (Google Fonts)

===============================================================================
SITE FEATURES
===============================================================================

1. RESPONSIVE NAVIGATION BAR
   - Fixed top navigation with smooth scrolling
   - Desktop: Horizontal menu
   - Mobile: Hamburger menu with slide-down animation
   - Sections: About, Skills, Projects, Publications, Contact

2. HEADER / ABOUT ME
   - Full name and contact information
   - Professional summary in conversational tone
   - Links to phone and email

3. TECHNICAL SKILLS MATRIX
   - 3 categories: Microcontroller & Firmware, Systems & Linux, Software Architecture
   - Structured table layout (no progress bars or percentages)
   - Proof projects linked

4. FEATURED ENGINEERING PROJECTS
   - 4 projects with technical wins
   - Direct GitHub repository links
   - Automated Testing badge on LSB Steganography Tool
   - Technology tags

5. PUBLICATIONS
   - 2 IJIRT Journal publications listed

6. RESUME DOWNLOAD
   - Prominent download button for Technical CV

7. FOOTER
   - Email, LinkedIn, GitHub links with icons

8. FAVICON
   - Custom "SK" initials favicon in brand colors

===============================================================================
DESIGN SPECIFICATIONS
===============================================================================

COLORS:
- Background: #0d1117 (GitHub dark)
- Text: Light gray / white
- Accent Green: #238636
- Accent Blue: #58a6ff

TYPOGRAPHY:
- Monospaced font throughout (JetBrains Mono)
- Engineering-first aesthetic

TONE:
- Serious, minimal, technical
- No progress bars, no skill percentages, no fluff
- Conversational professional voice

===============================================================================
DEPLOYMENT OPTIONS
===============================================================================

VERCEL (Recommended):
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

NETLIFY:
1. npm run build
2. Drag /out folder to Netlify
3. Deploy

GITHUB PAGES:
1. npm run build
2. Push /out folder to gh-pages branch
3. Enable GitHub Pages in repo settings

===============================================================================
PROJECT STRUCTURE
===============================================================================

app/
  ├── layout.tsx          # Root layout with metadata
  ├── page.tsx            # Main portfolio page
  ├── globals.css         # Global styles
  └── components/
      └── Icons.tsx       # SVG icon components

public/
  ├── resume.pdf          # Your resume (replace this!)
  └── favicon.svg         # SK initials favicon

Configuration files:
  ├── package.json
  ├── tsconfig.json
  ├── tailwind.config.js
  ├── next.config.js
  └── postcss.config.js

===============================================================================
CONTACT
===============================================================================

Shahad Kurungadan
Email: shahadkurungadan7@gmail.com
Phone: +91 8714230350
Location: Bengaluru, India
LinkedIn: linkedin.com/in/shahad-kurungadan
GitHub: github.com/KruBro

===============================================================================

import {
  SiCanva,
  SiClaude,
  SiCss,
  SiDjango,
  SiGoogledocs,
  SiGoogledrive,
  SiGoogleforms,
  SiGooglegemini,
  SiGooglesheets,
  SiHtml5,
  SiJavascript,
  SiOpenai,
  SiPhp,
  SiPython,
  SiReact,
} from 'react-icons/si'
import {
  FiBriefcase,
  FiCode,
  FiFileText,
  FiGrid,
  FiImage,
} from 'react-icons/fi'

export const toolCategories = [
  {
    title: 'Design Tools',
    eyebrow: 'Main creative tools',
    summary:
      'The core tools for posters, social graphics, brand visuals, packaging mockups, and fast layout experiments.',
    accent: 'from-silver/35 to-white/10',
    featured: true,
    rotation: 'lg:-rotate-1',
    tools: [
      {
        name: 'Adobe Photoshop',
        logo: '/icons/photoshop.svg',
        color: 'var(--color-copy)',
        tone: 'from-line to-panel',
      },
      {
        name: 'Adobe Illustrator',
        logo: '/icons/illustrator.svg',
        color: 'var(--color-copy)',
        tone: 'from-line to-panel',
      },
      {
        name: 'Canva',
        icon: SiCanva,
        color: 'var(--color-copy)',
        iconBackground: 'bg-canvas/65',
        iconGlow: 'drop-shadow-[0_0_14px_rgba(var(--studio-rgb),0.303)]',
        tone: 'from-line to-panel',
      },
    ],
  },
  {
    title: 'Web Tools',
    eyebrow: 'For digital builds',
    summary: 'Frontend and backend tools for turning design ideas into useful web experiences.',
    accent: 'from-silver/35 to-white/10',
    rotation: 'lg:rotate-1',
    tools: [
      { name: 'HTML', icon: SiHtml5, tone: 'from-line to-panel' },
      { name: 'CSS', icon: SiCss, tone: 'from-line to-panel' },
      { name: 'JavaScript', icon: SiJavascript, tone: 'from-line to-panel' },
      { name: 'React', icon: SiReact, tone: 'from-line to-panel' },
      { name: 'PHP', icon: SiPhp, tone: 'from-line to-panel' },
      { name: 'Python', icon: SiPython, tone: 'from-line to-panel' },
      { name: 'Django', icon: SiDjango, tone: 'from-line to-panel' },
    ],
  },
  {
    title: 'Productivity Tools',
    eyebrow: 'For organized work',
    summary: 'Document, file, form, and task tools that keep creative work clean and easy to hand off.',
    accent: 'from-silver/35 to-white/10',
    rotation: 'lg:-rotate-1',
    tools: [
      { name: 'Microsoft Office', icon: FiBriefcase, tone: 'from-line to-panel' },
      { name: 'Google Docs', icon: SiGoogledocs, tone: 'from-line to-panel' },
      { name: 'Google Sheets', icon: SiGooglesheets, tone: 'from-line to-panel' },
      { name: 'Google Drive', icon: SiGoogledrive, tone: 'from-line to-panel' },
      { name: 'Google Forms', icon: SiGoogleforms, tone: 'from-line to-panel' },
    ],
  },
  {
    title: 'AI Tools',
    eyebrow: 'For smarter workflows',
    summary: 'AI helpers for research, writing, coding, ideation, and faster creative direction.',
    accent: 'from-silver/35 to-white/10',
    rotation: 'lg:rotate-1',
    tools: [
      { name: 'ChatGPT', icon: SiOpenai, tone: 'from-line to-panel' },
      { name: 'Codex', icon: FiCode, tone: 'from-line to-panel' },
      { name: 'Gemini', icon: SiGooglegemini, tone: 'from-line to-panel' },
      { name: 'Claude', icon: SiClaude, tone: 'from-line to-panel' },
    ],
  },
]

export const toolboxNotes = [
  { label: 'Layouts', icon: FiGrid },
  { label: 'Assets', icon: FiFileText },
  { label: 'Visuals', icon: FiImage },
]

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
    accent: 'from-blue-400/80 to-sky-400/70',
    featured: true,
    rotation: 'lg:-rotate-1',
    tools: [
      {
        name: 'Adobe Photoshop',
        logo: '/icons/photoshop.svg',
        color: '#31A8FF',
        tone: 'from-sky-400 to-blue-600',
      },
      {
        name: 'Adobe Illustrator',
        logo: '/icons/illustrator.svg',
        color: '#FF9A00',
        tone: 'from-orange-400 to-amber-600',
      },
      {
        name: 'Canva',
        icon: SiCanva,
        color: '#ffffff',
        iconBackground: 'bg-black/65',
        iconGlow: 'drop-shadow-[0_0_14px_rgba(0,196,204,0.55)]',
        tone: 'from-slate-950 to-slate-900',
      },
    ],
  },
  {
    title: 'Web Tools',
    eyebrow: 'For digital builds',
    summary: 'Frontend and backend tools for turning design ideas into useful web experiences.',
    accent: 'from-blue-300/80 to-slate-500/80',
    rotation: 'lg:rotate-1',
    tools: [
      { name: 'HTML', icon: SiHtml5, tone: 'from-orange-400 to-red-500' },
      { name: 'CSS', icon: SiCss, tone: 'from-blue-400 to-sky-600' },
      { name: 'JavaScript', icon: SiJavascript, tone: 'from-yellow-300 to-amber-500' },
      { name: 'React', icon: SiReact, tone: 'from-cyan-300 to-blue-500' },
      { name: 'PHP', icon: SiPhp, tone: 'from-indigo-300 to-violet-600' },
      { name: 'Python', icon: SiPython, tone: 'from-blue-300 to-blue-600' },
      { name: 'Django', icon: SiDjango, tone: 'from-blue-500 to-blue-800' },
    ],
  },
  {
    title: 'Productivity Tools',
    eyebrow: 'For organized work',
    summary: 'Document, file, form, and task tools that keep creative work clean and easy to hand off.',
    accent: 'from-sky-300/80 to-white/60',
    rotation: 'lg:-rotate-1',
    tools: [
      { name: 'Microsoft Office', icon: FiBriefcase, tone: 'from-orange-300 to-red-500' },
      { name: 'Google Docs', icon: SiGoogledocs, tone: 'from-blue-300 to-blue-600' },
      { name: 'Google Sheets', icon: SiGooglesheets, tone: 'from-blue-400 to-blue-600' },
      { name: 'Google Drive', icon: SiGoogledrive, tone: 'from-yellow-300 to-blue-600' },
      { name: 'Google Forms', icon: SiGoogleforms, tone: 'from-violet-300 to-purple-600' },
    ],
  },
  {
    title: 'AI Tools',
    eyebrow: 'For smarter workflows',
    summary: 'AI helpers for research, writing, coding, ideation, and faster creative direction.',
    accent: 'from-white/80 to-blue-400/60',
    rotation: 'lg:rotate-1',
    tools: [
      { name: 'ChatGPT', icon: SiOpenai, tone: 'from-slate-100 to-blue-500' },
      { name: 'Codex', icon: FiCode, tone: 'from-slate-100 to-sky-400' },
      { name: 'Gemini', icon: SiGooglegemini, tone: 'from-blue-300 to-blue-500' },
      { name: 'Claude', icon: SiClaude, tone: 'from-orange-200 to-amber-500' },
    ],
  },
]

export const toolboxNotes = [
  { label: 'Layouts', icon: FiGrid },
  { label: 'Assets', icon: FiFileText },
  { label: 'Visuals', icon: FiImage },
]

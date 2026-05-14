import { useState, useEffect, useRef } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import './index.css'
import heroImg from './assets/myPhoto.png'
import aboutImg from './assets/madmoon.png'

const MotionLink = motion(Link)

const BASE = 'https://raw.githubusercontent.com/owntarawneh/CoachingApp-frontend/main/screenshots/'
const PFMZ = 'https://raw.githubusercontent.com/owntarawneh/perfumize/main/Photos/'

// ── Variants ──────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: d } })
}
const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: (d = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: d } })
}
const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: (d = 0) => ({ opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: d } })
}

function Reveal({ children, variant = fadeUp, delay = 0, className = '', style = {} }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} className={className} style={style}
      initial="hidden" animate={inView ? 'visible' : 'hidden'}
      variants={variant} custom={delay}
    >{children}</motion.div>
  )
}

// ── Nav Icons ─────────────────────────────────────────────────────────────────
const IconHome   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
const IconUser   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
const IconFolder = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
const IconMail   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>

// ── Social Icons ──────────────────────────────────────────────────────────────
const IconEmail    = () => <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
const IconGitHub   = () => <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
const IconLinkedIn = () => <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>

// ── Skill Icons ───────────────────────────────────────────────────────────────
const SkillIconWeb     = () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><line x1="12" y1="22" x2="12" y2="15.5"/><line x1="22" y1="8.5" x2="12" y2="15.5"/><line x1="2" y1="8.5" x2="12" y2="15.5"/><line x1="12" y1="2" x2="12" y2="8.5"/><line x1="22" y1="8.5" x2="12" y2="8.5"/><line x1="2" y1="8.5" x2="12" y2="8.5"/></svg>
const SkillIconBackend = () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
const SkillIconAI      = () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
const SkillIconBA      = () => <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>

// ── Data ──────────────────────────────────────────────────────────────────────
const skillData = {
  'Web Development': {
    Icon: SkillIconWeb, desc: 'Building modern, responsive web applications',
    primary: ['React.js', 'Node.js', 'JavaScript', 'HTML5', 'CSS3'],
    secondary: ['Bootstrap', 'Flask', 'Django', 'Firebase', 'Vite'],
    infra: ['Git', 'GitHub', 'Figma', 'Postman', 'Draw.io'],
  },
  'Backend & API': {
    Icon: SkillIconBackend, desc: 'Creating robust and scalable backend services',
    primary: ['Node.js', 'Express', 'PostgreSQL', 'REST APIs', 'Python'],
    secondary: ['MySQL', 'Flask', 'C#', 'Java'],
    infra: ['Git', 'GitHub', 'Linux', 'Postman', 'Docker'],
  },
  'AI & Machine Learning': {
    Icon: SkillIconAI, desc: 'Developing intelligent solutions with ML/AI',
    primary: ['Python', 'Scikit-learn', 'Keras', 'SBERT', 'Groq API'],
    secondary: ['KNN', 'ANN', 'Random Forest', 'Feature Engineering'],
    infra: ['Jupyter', 'Git', 'Kaggle', 'Google Colab', 'GitHub'],
  },
  'Business Analysis': {
    Icon: SkillIconBA, desc: 'Translating requirements into actionable systems',
    primary: ['SRS/BRD', 'UML/BPMN', 'Use Case Analysis', 'RTM', 'SDLC'],
    secondary: ['Agile/Scrum', 'SQL', 'Power BI', 'Mermaid.js', 'Stakeholder Comm.'],
    infra: ['Draw.io', 'Figma', 'Git', 'GitHub', 'Microsoft Office'],
  },
}

const experiences = [
  {
    side: 'left', start: 'Jan 2024', end: 'Jan 2024', location: 'Amman',
    company: 'Rocket Pitch Competition – INJAZ',
    role: 'Co-Founder & Team Lead – Madmoon', badge: 'Competition',
    desc: 'Co-founded a third-party escrow fintech solution and pitched against 100+ teams to reach the Top 4 finalists. Conducted stakeholder interviews and market analysis to identify user pain points around online transaction fraud for freelancers and SMEs.',
    tags: ['Business Analysis', 'UX Prototyping', 'Figma', 'Product Strategy'],
  },
  {
    side: 'right', start: 'Feb 2025', end: 'Sep 2025', location: 'Amman',
    company: 'Deanship of Student Affairs – HTU',
    role: 'Student Volunteer & Gifted Student Support', badge: 'Volunteer',
    desc: 'Acting as a mouthpiece for students, collaborating with campus clubs and teams to foster leadership and creativity among the student body and implementing lasting changes for a better student experience.',
    tags: ['Leadership', 'Communication', 'Team Collaboration', 'Event Management'],
  },
]

const achievements = [
  { color: '#c9a227', label: '4th Place Finalist', org: 'INJAZ Rocket Pitch Competition', date: 'Jan 2024' },
  { color: '#1a2035', label: 'INJAZ Incubation Awardee', org: 'Madmoon – Fintech Escrow Platform', date: 'Jan 2024' },
  { color: '#1a2035', label: 'Gifted Student Support Volunteer', org: 'Deanship of Student Affairs – HTU', date: 'Feb 2025' },
  { color: '#888',    label: 'Certified Sports Coach & Nutritionist', org: '5+ years hands-on client experience', date: 'Ongoing' },
]

const otherProjects = [
  {
    name: 'Perfumize',
    fullName: 'Perfumize – Luxury Fragrance E-Commerce',
    year: '2024', category: 'Web Development',
    desc: 'Luxury fragrance boutique with dynamic product catalog, shopping cart, user reviews, and full MySQL database integration.',
    bg: PFMZ + 'landing_page.png',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'PHP', 'MySQL'],
    github: 'https://github.com/owntarawneh/perfumize',
  },
  {
    name: 'CMR System',
    fullName: 'CMR Management System',
    year: '2024', category: 'Web Development',
    desc: 'Enterprise-grade Car Maintenance & Repair system with multi-role dashboards, scheduling, billing, and Facade / Factory / Iterator / Strategy patterns.',
    bg: null, bgColor: 'linear-gradient(135deg,#0f1e2d,#1e3a5c)',
    tags: ['Java', 'OOP', 'Design Patterns', 'Swing', 'SOLID'],
    github: 'https://github.com/owntarawneh/CMRManagementSystem',
  },
  {
    name: 'LearnPath AI',
    fullName: 'LearnPath AI – Intelligent Course Navigator',
    year: '2025', category: 'AI & Machine Learning',
    desc: 'AI-powered platform generating personalized learning roadmaps via SBERT embeddings and Groq LLM, with visual Mermaid.js dashboards.',
    bg: null, bgColor: 'linear-gradient(135deg,#1a1a2e,#16213e)',
    tags: ['Flask', 'JavaScript', 'SBERT', 'Groq API', 'Bootstrap'],
  },
  {
    name: 'Supply Chain AI',
    fullName: 'Supply Chain Intelligence',
    year: '2025', category: 'AI & Machine Learning',
    desc: 'ML system predicting late delivery risks, shipping duration, and order profitability using KNN, Random Forest, and ANN on the DataCo dataset.',
    bg: null, bgColor: 'linear-gradient(135deg,#0d2d2a,#1a5c56)',
    tags: ['Python', 'Scikit-learn', 'Keras', 'KNN', 'Random Forest'],
    github: 'https://github.com/owntarawneh/Logistics-Predictive-Modeling',
  },
  {
    name: 'Nutrition ML',
    fullName: 'Nutrition Density Prediction',
    year: '2025', category: 'AI & Machine Learning',
    desc: 'Regression ML model predicting nutritional density of food items by analyzing macronutrients, vitamins, and minerals across merged food datasets.',
    bg: null, bgColor: 'linear-gradient(135deg,#0d2d1a,#1a5c32)',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Jupyter'],
    github: 'https://github.com/owntarawneh/Nutrition-Density-Prediction',
  },
  {
    name: 'Madmoon',
    fullName: 'Madmoon – Fintech Escrow',
    year: '2024', category: 'Other',
    desc: 'Top 4 of 100+ teams at INJAZ Rocket Pitch. Third-party escrow service for Jordanian freelancers and SMEs, earning an incubation award.',
    bgImg: aboutImg,
    tags: ['Figma', 'Business Analysis', 'Product Strategy'],
  },
  {
    name: 'FitPro SRS',
    fullName: 'FitPro – SRS Documentation',
    year: '2024', category: 'Other',
    desc: 'Full SRS with stakeholder analysis, RTM, FSM/EFSM behavioral modeling, DFDs, and SDLC model evaluation using Agile methodology.',
    bg: null, bgColor: 'linear-gradient(135deg,#1f1f2d,#3a3a5c)',
    tags: ['SRS', 'BRD', 'UML', 'Agile', 'SDLC', 'RTM'],
    github: 'https://github.com/owntarawneh/fitpro-srs',
  },
]

// ── Scroll to top on route change ─────────────────────────────────────────────
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function SideNav({ active }) {
  const { pathname } = useLocation()
  if (pathname !== '/') return null
  const items = [
    { to: '/#home',     Icon: IconHome,   id: 'home' },
    { to: '/#about',    Icon: IconUser,   id: 'about' },
    { to: '/#projects', Icon: IconFolder, id: 'projects' },
    { to: '/#contact',  Icon: IconMail,   id: 'contact' },
  ]
  return (
    <nav className="side-nav">
      {items.map(({ to, Icon, id }) => (
        <MotionLink key={id} to={to}
          className={active === id ? 'active' : ''}
          whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        ><Icon /></MotionLink>
      ))}
    </nav>
  )
}

function TopNav({ menuOpen, onMenuToggle }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const isSubPage = pathname !== '/'
  return (
    <motion.header className={`top-nav${isSubPage ? ' top-nav--sub' : ''}`}
      initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="top-nav-left">
        {isSubPage && (
          <motion.button className="back-btn" onClick={() => navigate(-1)}
            whileHover={{ x: -3 }} whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 5l-7 7 7 7"/>
            </svg>
          </motion.button>
        )}
        <Link to="/" className="brand">Own Tarawneh</Link>
      </div>
      <motion.button className="hamburger" onClick={onMenuToggle} aria-label="Menu">
        <motion.span animate={menuOpen ? { rotate: 45, y: 7 }  : { rotate: 0, y: 0 }}  transition={{ duration: 0.3 }} />
        <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3 }} />
      </motion.button>
    </motion.header>
  )
}

function MobileMenu({ open, onClose }) {
  const { pathname } = useLocation()
  useEffect(() => { onClose() }, [pathname])

  const links = [
    { label: 'Home',     to: '/#home' },
    { label: 'About',    to: '/about' },
    { label: 'Projects', to: '/projects' },
    { label: 'Contact',  to: '/#contact' },
  ]
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div className="menu-backdrop" onClick={onClose}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div className="menu-panel"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 280, damping: 30 }}
          >
            <p className="menu-title">Menu</p>
            <nav className="menu-links">
              {links.map(({ label, to }, i) => (
                <motion.div key={label}
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.4 }}
                >
                  <MotionLink to={to} className="menu-link" onClick={onClose}
                    whileHover={{ x: 8 }} transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >{label}</MotionLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ── HOME ──────────────────────────────────────────────────────────────────────
function HomeSection() {
  return (
    <section id="home">
      <div className="split-layout">
        <div>
          <motion.p className="hero-label"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >OWN TARAWNEH</motion.p>
          <motion.h1 className="hero-title"
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Business Analyst<br />&amp; Full&#8209;Stack<br />Developer
          </motion.h1>
          <motion.p className="hero-desc"
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            Hi! I'm Own, a Computer Science student at Al-Hussein Technical University
            specializing in Business Analysis and Full-Stack Development. I architect
            scalable systems — from AI-powered platforms to complete SaaS applications.
          </motion.p>
          <motion.div className="hero-btns"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.75 }}
          >
            <motion.a href="/Aon Tarawneh CV_FullStack.pdf" download="Aon Tarawneh CV_FullStack.pdf" className="btn-dark" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>Download CV</motion.a>
            <motion.a href="#contact" className="btn-outline" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>Contact Me</motion.a>
          </motion.div>
        </div>
        <motion.div className="hero-img-wrap"
          initial={{ opacity: 0, scale: 0.85, x: 40 }} animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <img src={heroImg} alt="Own Tarawneh" className="hero-img" />
        </motion.div>
      </div>
      <motion.div className="scroll-hint"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <span>SCROLL</span><div className="scroll-line" />
      </motion.div>
    </section>
  )
}

// ── ABOUT INTRO ───────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about">
      <div className="split-layout">
        <div>
          <div className="pop-box">
            <h2 className="section-heading pop-text">About Me</h2>
          </div>
          <Reveal delay={0.05}>
            <div className="section-dashes"><span /><span /></div>
          </Reveal>
          <Reveal delay={0.1}><p className="section-sub">A brief introduction to my journey as a developer and analyst.</p></Reveal>
          <Reveal delay={0.25}>
            <MotionLink to="/about" className="btn-dark"
              style={{ marginTop: '2rem', display: 'inline-flex' }}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            >Learn More</MotionLink>
          </Reveal>
        </div>
        <Reveal variant={fadeRight} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <img src={aboutImg} alt="Madmoon" className="section-img" />
        </Reveal>
      </div>
    </section>
  )
}

// ── WHO AM I ──────────────────────────────────────────────────────────────────
function WhoAmISection() {
  return (
    <section id="who-am-i" className="sub-section">
      <div style={{ width: '100%' }}>
        <Reveal>
          <div className="section-dashes"><span /><span /></div>
          <h3 className="sub-heading">Who Am I?</h3>
        </Reveal>
        <div className="who-grid">
          <Reveal variant={fadeLeft} delay={0.1}>
            <div className="photo-collage">
              <img src={heroImg}  alt="Own Tarawneh" className="pc-img pc-1" />
              <img src={aboutImg} alt="Madmoon"      className="pc-img pc-2" />
            </div>
          </Reveal>
          <Reveal variant={fadeRight} delay={0.2}>
            <div>
              <p className="who-name">Own Tarawneh</p>
              <p className="who-para">
                I am a <strong>Computer Science student at Hussein Technical University (HTU)</strong>,
                specializing in both Business Analysis and Full-Stack Development. My work bridges the
                gap between technical execution and strategic business value — from formal requirements
                documentation to production-ready SaaS platforms.
              </p>
              <p className="who-para" style={{ marginTop: '0.9rem' }}>
                I co-founded <strong>Madmoon</strong>, a fintech escrow platform that reached the{' '}
                <strong>Top 4 out of 100+ teams</strong> at INJAZ Rocket Pitch 2024, earning an
                incubation award. Outside tech, I am a{' '}
                <strong>Certified Sports Coach &amp; Nutritionist</strong> with 5+ years experience.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ── SKILLS ────────────────────────────────────────────────────────────────────
function SkillsSection() {
  const [active, setActive] = useState('Web Development')
  const cats = Object.keys(skillData)
  const cur = skillData[active]
  return (
    <section id="skills" className="sub-section skills-section">
      <div style={{ width: '100%', maxWidth: '1100px', margin: '0 auto' }}>
        <Reveal>
          <h2 className="skills-heading">Skills &amp; Expertise</h2>
          <p className="skills-sub">Explore my technical skills across different domains. Click any category to see the technologies I work with.</p>
        </Reveal>
        <div className="skill-cats">
          {cats.map((cat, i) => {
            const { Icon } = skillData[cat]
            return (
              <Reveal key={cat} delay={i * 0.08} style={{ height: '100%' }}>
                <motion.button className={`skill-cat${active === cat ? ' active' : ''}`}
                  onClick={() => setActive(cat)} whileHover={{ y: -4 }} whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }} style={{ width: '100%' }}
                >
                  <div className="skill-cat-icon"><Icon /></div>
                  <h4>{cat}</h4>
                  <p>{skillData[cat].desc}</p>
                </motion.button>
              </Reveal>
            )
          })}
        </div>
        <Reveal delay={0.1}>
          <div className="tech-box">
            <h4>Technology Stack</h4>
            <AnimatePresence mode="wait">
              <motion.div key={active} className="tag-group"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
              >
                {cur.primary.map((t, i) => (
                  <motion.span key={t} className="tag dark" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.04 }}>· {t}</motion.span>
                ))}
                {cur.secondary.map((t, i) => (
                  <motion.span key={t} className="tag" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: (cur.primary.length + i) * 0.04 }}>{t}</motion.span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="infra-box">
            <h4>INFRASTRUCTURE &amp; TOOLS</h4>
            <AnimatePresence mode="wait">
              <motion.div key={active + '_i'} className="tag-group"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
              >
                {cur.infra.map((t, i) => (
                  <motion.span key={t} className="tag" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>{t}</motion.span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── EXPERIENCE ────────────────────────────────────────────────────────────────
function ExperienceSection() {
  return (
    <section id="experience" className="sub-section exp-section">
      <div style={{ width: '100%' }}>
        <Reveal>
          <div className="section-dashes"><span /><span /></div>
          <h3 className="sub-heading">Professional Experience</h3>
        </Reveal>
        <div className="timeline-wrap">
          <div className="tl-line" />
          {experiences.map((exp, i) => (
            <div className="tl-row" key={i}>
              {exp.side === 'left' ? (
                <>
                  <Reveal variant={fadeLeft} delay={i * 0.15}>
                    <div className="tl-item">
                      <div className="tl-date-pill">
                        {[{ v: exp.start, l: 'Start' }, { v: exp.end, l: 'End' }, { v: exp.location, l: 'Location' }].map(({ v, l }, j) => (
                          <span key={j} style={{ display: 'contents' }}>
                            {j > 0 && <div className="tl-pill-div" />}
                            <div className="tl-pill-seg"><span className="tl-pv">{v}</span><span className="tl-pl">{l}</span></div>
                          </span>
                        ))}
                      </div>
                      <div className="tl-card">
                        <div className="tl-company">{exp.company}</div>
                        <div className="tl-role">{exp.role}<span className="tl-badge">{exp.badge}</span></div>
                        <p className="tl-desc">{exp.desc}</p>
                        <div className="tl-tags">{exp.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
                      </div>
                    </div>
                  </Reveal>
                  <div /><div />
                </>
              ) : (
                <>
                  <div /><div />
                  <Reveal variant={fadeRight} delay={i * 0.15}>
                    <div className="tl-item">
                      <div className="tl-date-pill">
                        {[{ v: exp.start, l: 'Start' }, { v: exp.end, l: 'End' }, { v: exp.location, l: 'Location' }].map(({ v, l }, j) => (
                          <span key={j} style={{ display: 'contents' }}>
                            {j > 0 && <div className="tl-pill-div" />}
                            <div className="tl-pill-seg"><span className="tl-pv">{v}</span><span className="tl-pl">{l}</span></div>
                          </span>
                        ))}
                      </div>
                      <div className="tl-card">
                        <div className="tl-company">{exp.company}</div>
                        <div className="tl-role">{exp.role}<span className="tl-badge">{exp.badge}</span></div>
                        <p className="tl-desc">{exp.desc}</p>
                        <div className="tl-tags">{exp.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
                      </div>
                    </div>
                  </Reveal>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── EDUCATION ─────────────────────────────────────────────────────────────────
function EducationSection() {
  return (
    <section id="education" className="sub-section">
      <div style={{ width: '100%' }}>
        <Reveal>
          <h2 className="edu-heading">Education</h2>
          <p className="edu-sub">Get to know more about my educational background.</p>
        </Reveal>
        <div className="edu-grid">
          <Reveal variant={fadeLeft} delay={0.1}>
            <div>
              <p className="edu-year">2021 – Present</p>
              <p className="edu-uni">Hussein Technical University (HTU)</p>
              <p className="edu-degree">BSc Computer Science &nbsp;·&nbsp; GPA 3.1 / 4.0</p>
              <div className="edu-photos">
                <img src={heroImg}  alt="" className="edu-photo" />
                <img src={aboutImg} alt="" className="edu-photo" />
              </div>
              <p className="edu-para">
                Pursuing a Bachelor's in Computer Science with relevant modules in{' '}
                <strong>Systems Analysis &amp; Design, SDLC, Database Systems, Advanced Programming, Business Modeling,
                and AI &amp; Intelligent Systems.</strong>
              </p>
              <p className="edu-para" style={{ marginTop: '0.8rem' }}>
                Active in entrepreneurship — finishing as <strong>4th Place Finalist</strong> at the INJAZ Rocket Pitch
                Competition 2024 and earning an <strong>INJAZ incubation award</strong> for the Madmoon escrow platform.
              </p>
            </div>
          </Reveal>
          <Reveal variant={fadeRight} delay={0.2}>
            <div>
              <p className="ach-heading">Achievements</p>
              <p className="ach-sub">Highlights from my academic journey.</p>
              <div className="ach-list">
                {achievements.map((a, i) => (
                  <motion.div key={i} className="ach-item"
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <div className="ach-icon" style={{ background: a.color }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    </div>
                    <div>
                      <p className="ach-label">{a.label}</p>
                      <p className="ach-org">{a.org}</p>
                      <p className="ach-date">{a.date}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ── PROJECTS INTRO ────────────────────────────────────────────────────────────
function ProjectsSection() {
  return (
    <section id="projects">
      <div className="split-layout">
        <div>
          <div className="pop-box">
            <h2 className="section-heading pop-text">My Projects</h2>
          </div>
          <Reveal variant={fadeLeft} delay={0.05}>
            <div className="section-dashes"><span /><span /></div>
          </Reveal>
          <Reveal variant={fadeLeft} delay={0.1}>
            <p className="section-sub">List of my projects that I have done and currently working on.</p>
          </Reveal>
          <Reveal variant={fadeLeft} delay={0.2}>
            <MotionLink to="/projects" className="btn-dark"
              style={{ marginTop: '2rem', display: 'inline-flex' }}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            >See All Projects</MotionLink>
          </Reveal>
        </div>
        <Reveal variant={fadeRight}>
          <div className="collage-wrap">
            <img src={BASE + 'landing.png'}          alt="" className="c-img c-a" />
            <img src={BASE + 'coach-dashboard.png'}  alt="" className="c-img c-b" />
            <img src={BASE + 'client-dashboard.png'} alt="" className="c-img c-c" />
            <img src={PFMZ + 'landing_page.png'}     alt="" className="c-img c-d" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ── PROJECTS HIGHLIGHT ────────────────────────────────────────────────────────
function ProjectsHighlightSection() {
  return (
    <section id="projects-highlight" className="sub-section">
      <div style={{ width: '100%' }}>
        <Reveal>
          <div className="section-dashes"><span /><span /></div>
          <h3 className="sub-heading">Highlight</h3>
        </Reveal>
        <div className="hl-layout">
          <Reveal variant={fadeLeft} delay={0.1}>
            <div className="hl-stack">
              <div className="hl-ss hl-ss-1"><img src={BASE + 'coach-dashboard.png'} alt="" /></div>
              <div className="hl-ss hl-ss-2"><img src={BASE + 'landing.png'} alt="" /></div>
              <div className="hl-ss hl-ss-3"><img src={BASE + 'client-dashboard.png'} alt="" /></div>
            </div>
          </Reveal>
          <Reveal variant={fadeRight} delay={0.2}>
            <div>
              <h3 className="hl-proj-name">OwnCoaching</h3>
              <p className="hl-proj-desc">
                OwnCoaching is a dual-portal SaaS platform built with React.js, Node.js, Express, and
                PostgreSQL. Coaches manage clients, build multi-week training plans, set nutrition macros,
                review weekly check-ins, and track client progress. Clients access personalized workout
                schedules, log nutrition, submit weekly progress photos, and view coaching feedback —
                all secured with JWT role-based authentication.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                <motion.a href="https://github.com/owntarawneh/CoachingApp-frontend" target="_blank" rel="noreferrer"
                  className="btn-dark" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>Frontend →</motion.a>
                <motion.a href="https://github.com/owntarawneh/CoachingApp-backend" target="_blank" rel="noreferrer"
                  className="btn-outline" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>Backend →</motion.a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ── PROJECT CARD ──────────────────────────────────────────────────────────────
function ProjectCard({ p }) {
  return (
    <motion.div className="pgc" style={{ background: p.bgColor || '#1a1f2e' }}
      whileHover={{ y: -6, boxShadow: '0 20px 48px rgba(0,0,0,0.18)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
    >
      {(p.bg || p.bgImg) && <img src={p.bg || p.bgImg} alt="" className="pgc-bg" />}
      <div className="pgc-overlay">
        <span className="pgc-year">{p.year}</span>
        <div style={{ flex: 1 }} />
        <h4 className="pgc-name">{p.name}</h4>
        <p className="pgc-desc">{p.desc}</p>
        <div className="pgc-tags">{p.tags.map(t => <span key={t} className="pgc-tag">{t}</span>)}</div>
        {p.github && (
          <a href={p.github} target="_blank" rel="noreferrer" className="pgc-link" onClick={e => e.stopPropagation()}>
            GitHub →
          </a>
        )}
      </div>
    </motion.div>
  )
}

// ── PROJECTS OTHER ────────────────────────────────────────────────────────────
function ProjectsOtherSection() {
  const [filter, setFilter] = useState('Web Development')
  const tabs = ['Web Development', 'AI & Machine Learning', 'Other']
  const filtered = otherProjects.filter(p => p.category === filter)
  return (
    <section id="projects-other" className="sub-section proj-other-section">
      <div style={{ width: '100%' }}>
        <Reveal><h3 className="proj-other-heading">Other Note Worthy Projects</h3></Reveal>
        <Reveal delay={0.1}>
          <div className="proj-filter-tabs">
            {tabs.map(t => (
              <motion.button key={t} className={`proj-filter-tab${filter === t ? ' active' : ''}`}
                onClick={() => setFilter(t)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              >{t}</motion.button>
            ))}
          </div>
        </Reveal>
        <AnimatePresence mode="wait">
          <motion.div key={filter} className="proj-grid"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
          >
            {filtered.map((p, i) => (
              <motion.div key={p.name}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <ProjectCard p={p} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

// ── PROJECTS CTA ──────────────────────────────────────────────────────────────
function ProjectsCTASection() {
  return (
    <section id="projects-cta" className="cta-section">
      <Reveal>
        <p className="cta-label">Want something like this?</p>
        <MotionLink to="/#contact" className="cta-link"
          whileHover={{ opacity: 0.7 }} transition={{ duration: 0.2 }}
        >
          Get In Touch
          <span className="cta-arrow-circle">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </MotionLink>
      </Reveal>
    </section>
  )
}

// ── CONTACT ───────────────────────────────────────────────────────────────────
function ContactSection() {
  const socials = [
    { href: 'mailto:owntarawneh284@gmail.com',                     Icon: IconEmail,    label: 'Email' },
    { href: 'https://github.com/owntarawneh',                      Icon: IconGitHub,   label: 'GitHub' },
    { href: 'https://www.linkedin.com/in/own-tarawneh-1715a5239/', Icon: IconLinkedIn, label: 'LinkedIn' },
  ]
  return (
    <section id="contact">
      <div className="split-layout">
        <div>
          <div className="pop-box">
            <h2 className="section-heading pop-text">Get In Touch</h2>
          </div>
          <Reveal delay={0.05}>
            <div className="section-dashes"><span /><span /></div>
          </Reveal>
          <Reveal delay={0.1}><p className="section-sub">Feel free to contact me if you have any questions or just want to say hi.</p></Reveal>
          <Reveal delay={0.2}><p className="contact-email">owntarawneh284@gmail.com</p></Reveal>
          <Reveal delay={0.3}>
            <div className="social-icons">
              {socials.map(({ href, Icon, label }) => (
                <motion.a key={label} href={href} target="_blank" rel="noreferrer"
                  className="social-icon" aria-label={label}
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                ><Icon /></motion.a>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.4}><p className="contact-location">+962 797 224 679 · Amman, Jordan</p></Reveal>
        </div>
        <Reveal variant={fadeRight} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <img src={heroImg} alt="" className="section-img" />
        </Reveal>
      </div>
    </section>
  )
}

// ── PAGES ─────────────────────────────────────────────────────────────────────
function HomePage() {
  const location = useLocation()
  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1))
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 150)
    }
  }, [location.hash])
  return (
    <>
      <HomeSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </>
  )
}

function AboutPage() {
  return (
    <>
      <WhoAmISection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsCTASection />
    </>
  )
}


function ProjectsPage() {
  return (
    <>
      <ProjectsSection />
      <ProjectsHighlightSection />
      <ProjectsOtherSection />
      <ProjectsCTASection />
    </>
  )
}

// ── PAGE TRANSITIONS ──────────────────────────────────────────────────────────
const pageVariants = {
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:    { opacity: 0, y: -16, transition: { duration: 0.3 } },
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div key={location.pathname}
        variants={pageVariants} initial="initial" animate="animate" exit="exit"
      >
        <Routes location={location}>
          <Route path="/"         element={<HomePage />} />
          <Route path="/about"    element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  )
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const html = document.documentElement
    const currentHash = hash.slice(1)

    if (pathname === '/about') {
      setActiveSection('about')
      html.removeAttribute('data-snap')
      return
    }
    if (pathname === '/projects') {
      setActiveSection('projects')
      html.removeAttribute('data-snap')
      return
    }

    // Home Page logic
    html.setAttribute('data-snap', '')
    
    // Set active section from hash if present, otherwise default to home
    const navIds = ['home', 'about', 'projects', 'contact']
    if (navIds.includes(currentHash)) {
      setActiveSection(currentHash)
    } else if (pathname === '/' && !currentHash) {
      setActiveSection('home')
    }

    let obs
    const timer = setTimeout(() => {
      obs = new IntersectionObserver(
        entries => {
          entries.forEach(e => {
            if (e.isIntersecting && e.intersectionRatio >= 0.4) {
              setActiveSection(e.target.id)
            }
          })
        },
        { threshold: [0.4, 0.6] }
      )
      navIds.forEach(id => {
        const el = document.getElementById(id)
        if (el) obs.observe(el)
      })
    }, 200)

    return () => {
      clearTimeout(timer)
      obs?.disconnect()
      html.removeAttribute('data-snap')
    }
  }, [pathname, hash])

  return (
    <div className="page-layout">
      <SideNav active={activeSection} />
      <TopNav menuOpen={menuOpen} onMenuToggle={() => setMenuOpen(o => !o)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <ScrollToTop />
      <main className={`main-content${pathname !== '/' ? ' full-width' : ''}`}>
        <AnimatedRoutes />
      </main>
    </div>
  )
}

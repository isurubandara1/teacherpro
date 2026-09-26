/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useId } from 'react';
import { 
  BookOpen, 
  Calendar, 
  Mail, 
  MapPin, 
  Phone, 
  GraduationCap, 
  Award, 
  Clock, 
  CheckCircle, 
  Download, 
  Copy, 
  Sliders, 
  Code, 
  ChevronRight, 
  FileText, 
  ExternalLink, 
  HelpCircle, 
  X, 
  Sparkles, 
  ArrowRight,
  Maximize2,
  Eye,
  Compass,
  Layers
} from 'lucide-react';

// Pre-generated editorial image assets
const HERO_PORTRAIT = '/src/assets/images/hero_math_teacher_1790430673653.jpg';
const STUDY_DESK = '/src/assets/images/math_study_desk_1790430692615.jpg';
const CHALKBOARD_LECTURE = '/src/assets/images/chalkboard_lecture_hall_1790431217026.jpg';
const STUDENTS_WORKSHOP = '/src/assets/images/students_math_workshop_1790431233382.jpg';
const GEOMETRY_TOOLS = '/src/assets/images/geometry_drafting_tools_1790431245836.jpg';
const OLYMPIAD_AWARDS = '/src/assets/images/math_olympiad_awards_1790431258781.jpg';

interface Course {
  id: string;
  code: string;
  title: string;
  level: string;
  period: string;
  room: string;
  description: string;
  prerequisites: string;
  credits: string;
  image: string;
  tagline: string;
  syllabus: string[];
  grading: { item: string; weight: string }[];
}

const COURSES: Course[] = [
  {
    id: 'ap-calc-bc',
    code: 'MATH 301',
    title: 'AP Calculus BC',
    level: 'Grades 11–12 (Advanced Placement)',
    period: 'Period 2 (MWF 08:30 – 09:50)',
    room: 'Hall 304',
    image: CHALKBOARD_LECTURE,
    tagline: 'Differential & Integral Calculus, Sequences & Taylor Series',
    description: 'An intensive, college-caliber study of rates of change, accumulation, infinite sequences, and series. Emphasizes theoretical proofs, geometric representations, and rigorous AP exam preparation.',
    prerequisites: 'Pre-Calculus Honors (B+ or higher)',
    credits: '1.0 AP Credit',
    syllabus: [
      'Limits, Continuity & Epsilon-Delta Foundations',
      'Derivatives, Mean Value Theorem & Optimization',
      'Riemann Sums & Fundamental Theorem of Calculus',
      'Advanced Integration Techniques (Parts, Partial Fractions, Trig Substitution)',
      'Parametric Equations, Polar Coordinates & Vector-Valued Functions',
      'Infinite Series, Convergence Tests, Taylor & Maclaurin Polynomials'
    ],
    grading: [
      { item: 'Problem Sets & Homework', weight: '20%' },
      { item: 'Bi-Weekly Mastery Quizzes', weight: '25%' },
      { item: 'Unit Exams & Midterms', weight: '35%' },
      { item: 'Final Cumulative AP Mock Exam', weight: '20%' }
    ]
  },
  {
    id: 'linear-algebra',
    code: 'MATH 202',
    title: 'Linear Algebra & Vectors',
    level: 'Grades 10–12 (Elective)',
    period: 'Period 4 (MWF 10:15 – 11:35)',
    room: 'Hall 304',
    image: GEOMETRY_TOOLS,
    tagline: 'Vector Spaces, Matrix Transformations & Eigen-Analysis',
    description: 'A study of vector spaces, matrix algebra, determinants, and linear transformations. Practical applications include 3D graphics rendering, computer science data algorithms, and physics modeling.',
    prerequisites: 'Algebra II or Pre-Calculus',
    credits: '1.0 Credit',
    syllabus: [
      'Systems of Linear Equations & Gaussian Elimination',
      'Matrix Operations, Inverses & Transposes',
      'Vector Spaces, Subspaces, Null Space & Column Space',
      'Linear Independence, Basis & Dimension',
      'Inner Products, Orthogonality & Gram-Schmidt Process',
      'Eigenvalues, Eigenvectors & Matrix Diagonalization'
    ],
    grading: [
      { item: 'Weekly Problem Sets', weight: '25%' },
      { item: 'Computational Lab Assignments', weight: '20%' },
      { item: 'Midterm Assessments', weight: '30%' },
      { item: 'Capstone Applied Project', weight: '25%' }
    ]
  },
  {
    id: 'statistics',
    code: 'MATH 205',
    title: 'Probability & Statistics',
    level: 'Grades 10–12 (College Prep)',
    period: 'Period 3 (TTh 09:00 – 10:20)',
    room: 'Hall 306',
    image: STUDENTS_WORKSHOP,
    tagline: 'Empirical Data Analysis, Inferential Testing & Distributions',
    description: 'Explores exploratory data analysis, probability models, random variables, hypothesis testing, and inferential statistics using real-world societal, scientific, and sports datasets.',
    prerequisites: 'Algebra I & Geometry',
    credits: '1.0 Credit',
    syllabus: [
      'Exploratory Data Analysis & Visual Summaries',
      'Probability Rules, Combinatorics & Bayes’ Theorem',
      'Discrete & Continuous Random Variables (Normal, Binomial, Poisson)',
      'Sampling Distributions & Central Limit Theorem',
      'Confidence Intervals & One/Two-Sample Hypothesis Testing',
      'Linear Regression, Residual Analysis & ANOVA Basics'
    ],
    grading: [
      { item: 'Homework & Data Labs', weight: '25%' },
      { item: 'Concept Checkpoints', weight: '20%' },
      { item: 'Statistical Research Project', weight: '30%' },
      { item: 'Semester Examination', weight: '25%' }
    ]
  },
  {
    id: 'pre-calculus',
    code: 'MATH 101',
    title: 'Honors Pre-Calculus & Trigonometry',
    level: 'Grades 9–11',
    period: 'Period 5 (TTh 10:45 – 12:05)',
    room: 'Hall 304',
    image: STUDY_DESK,
    tagline: 'Trigonometric Identities, Complex Numbers & Limit Foundations',
    description: 'Synthesizes advanced algebra and trigonometry to prepare students for calculus. Investigates the unit circle, trigonometric identities, rational and polynomial functions, and complex numbers.',
    prerequisites: 'Algebra II Honors',
    credits: '1.0 Credit',
    syllabus: [
      'Polynomial, Rational & Radical Functions',
      'Exponential & Logarithmic Equations and Applications',
      'Trigonometric Functions & The Unit Circle',
      'Analytic Trigonometry & Verifying Identities',
      'Vectors in 2D and 3D Planes',
      'Sequences, Series & Introduction to Limits'
    ],
    grading: [
      { item: 'Daily Practice & Formative Work', weight: '20%' },
      { item: 'Quizzes & Unit Assessments', weight: '35%' },
      { item: 'Midterm Examination', weight: '20%' },
      { item: 'Final Exam', weight: '25%' }
    ]
  }
];

export interface GalleryItem {
  id: string;
  title: string;
  location: string;
  tag: string;
  src: string;
  aspect: string;
  description: string;
  didYouKnow: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'chalkboard-lecture',
    title: 'The Daily Slate Blackboard: Derivations & Proofs',
    location: 'Amphitheater Hall 304',
    tag: 'Calculus & Analysis',
    src: CHALKBOARD_LECTURE,
    aspect: 'aspect-[16/10]',
    description: 'Every morning lecture unfolds on genuine slate chalkboards. Writing derivations by hand gives students time to digest rates of change, limit bounds, and differential geometry step-by-step.',
    didYouKnow: 'Studies in mathematical cognitive science show that physical chalkboard derivations enhance retention by over 40% compared to rapid slide projections.'
  },
  {
    id: 'students-workshop',
    title: 'Collaborative Problem-Solving Circles',
    location: 'Active Learning Lab',
    tag: 'Student Inquiry',
    src: STUDENTS_WORKSHOP,
    aspect: 'aspect-[4/3]',
    description: 'Students collaborate in small table pods using wooden polyhedra, curve sketches, and graph paper. Here, hypotheses are rigorously challenged, argued, and refined before formal proofs are drafted.',
    didYouKnow: 'Our weekly seminar problem sets require at least two distinct solution methods per problem to encourage versatile thinking.'
  },
  {
    id: 'geometry-drafting',
    title: 'Geometric Drafting & The Golden Spiral',
    location: 'Mathematics Drafting Corner',
    tag: 'Tactile Geometry',
    src: GEOMETRY_TOOLS,
    aspect: 'aspect-[4/3]',
    description: 'High-precision brass compasses, polar grid drafting, and Fibonacci curve constructions. Students discover that the abstract language of algebra is inextricably linked to organic patterns in nature.',
    didYouKnow: 'The golden ratio (φ ≈ 1.618) and logarithmic spirals appear in everything from Romanesque cathedral arches to sunflower seed arrangements and galactic arms.'
  },
  {
    id: 'olympiad-awards',
    title: 'Math Olympiad Accolades & Trophies',
    location: 'Oakwood Department Library',
    tag: 'Competition Excellence',
    src: OLYMPIAD_AWARDS,
    aspect: 'aspect-[16/10]',
    description: 'The trophy shelf honoring our student teams in AMC 10/12, AIME qualifiers, and Regional Math Olympiad tournaments. Mentoring competitive problem-solvers is one of my greatest teaching passions.',
    didYouKnow: 'Over the last four academic years, our student teams have secured 7 first-place regional math bowl medals and 14 individual national honor roll placements.'
  },
  {
    id: 'study-desk',
    title: 'The Math Clinic & Office Consultation Desk',
    location: 'Faculty Office 312',
    tag: 'Personal Mentorship',
    src: STUDY_DESK,
    aspect: 'aspect-[16/10]',
    description: 'A welcoming space stocked with reference texts, graph papers, and drafting supplies where students drop by during office hours to analyze homework errors and explore collegiate math topics.',
    didYouKnow: 'Every student who reviews their graded midterm during office hours receives targeted scratch-paper diagnostic feedback.'
  }
];

export default function App() {
  // Navigation mode: 'all' (seamless single-page) or focused view
  const [activeTab, setActiveTab] = useState<'all' | 'bio' | 'classes' | 'gallery' | 'schedule' | 'sandbox' | 'contact'>('all');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);
  
  // Teacher profile state (customizable by the teacher)
  const [profile, setProfile] = useState({
    name: 'Prof. Isuru Bandara',
    title: 'Mathematics Educator & Curriculum Lead',
    institution: 'Oakwood Academy · Department of Mathematics',
    email: 'isurumbandara@gmail.com',
    phone: '+1 (555) 482-9102 (Ext. 408)',
    office: 'Hall 304 / Office 312',
    officeHours: 'Tuesdays & Thursdays, 14:00 – 16:00 (or by appointment)',
    bioLead: 'Demystifying advanced mathematics through visual intuition, rigorous deduction, and genuine curiosity.',
    yearsExp: '12+ Years Teaching',
    degree: 'M.Sc. in Applied Mathematics',
    secondaryCert: 'AP & STEM Certified'
  });

  // Modal states
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    role: 'Student',
    course: 'AP Calculus BC',
    date: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Interactive Math Sandbox state (Quadratic function visualizer: f(x) = ax^2 + bx + c)
  const [paramA, setParamA] = useState(1);
  const [paramB, setParamB] = useState(-2);
  const [paramC, setParamC] = useState(-3);

  // Calculate quadratic values: vertex, discriminant, roots
  const discriminant = (paramB * paramB) - (4 * paramA * paramC);
  const vertexX = paramA !== 0 ? -paramB / (2 * paramA) : 0;
  const vertexY = paramA !== 0 ? (paramA * vertexX * vertexX) + (paramB * vertexX) + paramC : paramC;
  const hasRealRoots = discriminant >= 0 && paramA !== 0;
  const root1 = hasRealRoots ? ((-paramB + Math.sqrt(discriminant)) / (2 * paramA)).toFixed(2) : null;
  const root2 = hasRealRoots ? ((-paramB - Math.sqrt(discriminant)) / (2 * paramA)).toFixed(2) : null;

  // Handle contact form submit
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  // Generate self-contained HTML code for export
  const generateStandaloneHTML = () => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${profile.name} | Mathematics Educator Portfolio</title>
  <style>
    :root {
      --bg: #fafaf9; --surface: #ffffff; --border: #e7e5e4;
      --text: #1c1917; --muted: #57534e; --accent: #0f2d4a; --accent-hover: #164268;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: var(--bg); color: var(--text); line-height: 1.6; }
    .container { max-width: 1080px; margin: 0 auto; padding: 2rem 1.5rem; }
    header { background: rgba(255,255,255,0.95); backdrop-filter: blur(8px); border-bottom: 1px solid var(--border); padding: 1.25rem 0; position: sticky; top: 0; z-index: 50; }
    .nav { display: flex; justify-content: space-between; align-items: center; }
    .nav a { color: var(--muted); text-decoration: none; font-weight: 600; font-size: 0.9rem; margin-left: 1.5rem; transition: color 0.15s; }
    .nav a:hover { color: var(--accent); }
    .hero { padding: 4.5rem 0 3.5rem; border-bottom: 1px solid var(--border); display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 3rem; align-items: center; }
    .hero-kicker { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #78716c; margin-bottom: 0.5rem; }
    h1 { font-size: 2.75rem; color: var(--text); line-height: 1.15; margin-bottom: 1rem; }
    h2 { font-size: 1.85rem; margin: 3rem 0 1rem; color: var(--text); }
    .hero-img { width: 100%; border-radius: 8px; border: 1px solid var(--border); object-fit: cover; }
    .card { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; padding: 1.5rem; margin-bottom: 1.25rem; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
    .gallery-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; }
    .gallery-item { background: var(--surface); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
    .gallery-item img { width: 100%; height: 160px; object-fit: cover; }
    .gallery-body { padding: 1rem; }
    .gallery-tag { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--accent); }
    .gallery-title { font-weight: 700; font-size: 0.95rem; margin: 0.25rem 0; }
    .gallery-desc { font-size: 0.8rem; color: var(--muted); }
    table { width: 100%; border-collapse: collapse; background: var(--surface); border: 1px solid var(--border); margin: 1rem 0; border-radius: 8px; overflow: hidden; }
    th, td { padding: 0.85rem 1rem; border-bottom: 1px solid var(--border); text-align: left; font-size: 0.875rem; }
    th { background: #f5f5f4; font-weight: 600; }
    .badge { display: inline-block; padding: 0.25rem 0.6rem; font-size: 0.75rem; font-weight: 600; border-radius: 4px; background: #f0f4f8; color: var(--accent); }
    footer { text-align: center; padding: 3rem 0; color: var(--muted); font-size: 0.875rem; border-top: 1px solid var(--border); margin-top: 3rem; }
    @media (max-width: 768px) { .hero { grid-template-columns: 1fr; } .nav-links { display: none; } }
  </style>
</head>
<body>
  <header>
    <div class="container nav">
      <strong>${profile.name}</strong>
      <div class="nav-links">
        <a href="#bio">Bio & Philosophy</a>
        <a href="#classes">Classes</a>
        <a href="#gallery">Classroom Life</a>
        <a href="#schedule">Schedule</a>
        <a href="#contact">Contact</a>
      </div>
    </div>
  </header>
  <main class="container">
    <section class="hero">
      <div>
        <div class="hero-kicker">${profile.institution}</div>
        <h1>Building mathematical intuition before mechanical computation.</h1>
        <p style="font-size: 1.15rem; color: var(--muted); margin-bottom: 1.5rem;">${profile.bioLead}</p>
        <p><span class="badge">${profile.yearsExp}</span> · <span class="badge">${profile.degree}</span> · <span class="badge">${profile.secondaryCert}</span></p>
      </div>
      <div>
        <img src="${HERO_PORTRAIT}" alt="${profile.name}" class="hero-img">
        <p style="font-size: 0.8rem; color: var(--muted); text-align: center; margin-top: 0.5rem;">${profile.title} · Room ${profile.office}</p>
      </div>
    </section>

    <section id="bio">
      <h2>Biography & Teaching Philosophy</h2>
      <div class="card">
        <p>I have spent over a decade teaching mathematics across high school honors curricula and introductory university courses. My foundational training is in applied mathematics, but my passion has always been in the classroom—translating abstract formalisms into clear, physical, and intuitive concepts that any student can grasp.</p>
        <p style="margin-top: 1rem; font-style: italic; border-left: 3px solid var(--accent); padding-left: 1rem; color: var(--accent); font-weight: 500;">
          "We do not teach calculus so students can execute derivative shortcuts by memory; we teach calculus so they can model dynamic change, measure accumulation, and navigate uncertainty with logical rigor."
        </p>
      </div>
    </section>

    <section id="classes">
      <h2>Classes & Courses</h2>
      <div class="grid">
        <div class="card">
          <img src="${CHALKBOARD_LECTURE}" style="width:100%;height:140px;object-fit:cover;border-radius:6px;margin-bottom:0.75rem;" alt="Calculus">
          <span class="badge">MATH 301 · AP Calculus BC</span>
          <h3 style="margin: 0.5rem 0;">AP Calculus BC</h3>
          <p style="color: var(--muted); font-size: 0.85rem;">Period 2 (MWF 08:30–09:50) · Hall 304</p>
          <p style="margin-top: 0.5rem; font-size: 0.9rem;">Rates of change, integral accumulation, polar/parametric coordinates, and Taylor series.</p>
        </div>
        <div class="card">
          <img src="${GEOMETRY_TOOLS}" style="width:100%;height:140px;object-fit:cover;border-radius:6px;margin-bottom:0.75rem;" alt="Linear Algebra">
          <span class="badge">MATH 202 · Linear Algebra</span>
          <h3 style="margin: 0.5rem 0;">Linear Algebra & Vectors</h3>
          <p style="color: var(--muted); font-size: 0.85rem;">Period 4 (MWF 10:15–11:35) · Hall 304</p>
          <p style="margin-top: 0.5rem; font-size: 0.9rem;">Vector spaces, matrix transforms, determinants, eigenvalues, and computer science applications.</p>
        </div>
      </div>
    </section>

    <section id="gallery">
      <h2>Visual Chronicle: Life in the Mathematics Department</h2>
      <div class="gallery-grid">
        <div class="gallery-item">
          <img src="${CHALKBOARD_LECTURE}" alt="Blackboard">
          <div class="gallery-body">
            <span class="gallery-tag">Calculus & Analysis</span>
            <div class="gallery-title">Daily Slate Blackboard</div>
            <div class="gallery-desc">Hall 304 morning lectures with derivations drawn step-by-step.</div>
          </div>
        </div>
        <div class="gallery-item">
          <img src="${STUDENTS_WORKSHOP}" alt="Workshop">
          <div class="gallery-body">
            <span class="gallery-tag">Student Inquiry</span>
            <div class="gallery-title">Collaborative Problem Circles</div>
            <div class="gallery-desc">Students testing hypotheses with wooden polyhedra and graphs.</div>
          </div>
        </div>
        <div class="gallery-item">
          <img src="${GEOMETRY_TOOLS}" alt="Drafting">
          <div class="gallery-body">
            <span class="gallery-tag">Tactile Geometry</span>
            <div class="gallery-title">Drafting & The Golden Spiral</div>
            <div class="gallery-desc">Connecting compass geometry to natural Fibonacci spirals.</div>
          </div>
        </div>
        <div class="gallery-item">
          <img src="${OLYMPIAD_AWARDS}" alt="Awards">
          <div class="gallery-body">
            <span class="gallery-tag">Competition Honors</span>
            <div class="gallery-title">Math Olympiad Trophies</div>
            <div class="gallery-desc">Three consecutive regional championships in AMC & state bowls.</div>
          </div>
        </div>
      </div>
    </section>

    <section id="schedule">
      <h2>Office Hours & Availability</h2>
      <table>
        <thead>
          <tr><th>Day</th><th>Time</th><th>Subject / Session</th><th>Location</th></tr>
        </thead>
        <tbody>
          <tr><td>Mon & Wed</td><td>08:30 – 09:50</td><td>AP Calculus BC</td><td>Hall 304</td></tr>
          <tr><td>Mon & Wed</td><td>10:15 – 11:35</td><td>Linear Algebra</td><td>Hall 304</td></tr>
          <tr><td>Tue & Thu</td><td>14:00 – 16:00</td><td><strong>Open Math Clinic & Office Hours</strong></td><td>Office 312</td></tr>
          <tr><td>Friday</td><td>13:00 – 14:30</td><td>Math Olympiad Practice</td><td>Hall 304</td></tr>
        </tbody>
      </table>
    </section>

    <section id="contact">
      <h2>Contact Information</h2>
      <div class="card">
        <p><strong>Email:</strong> ${profile.email}</p>
        <p><strong>Office:</strong> ${profile.office}</p>
        <p><strong>Phone:</strong> ${profile.phone}</p>
        <p style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--muted);">Office hours are held every Tuesday & Thursday between 14:00 and 16:00 in Office 312.</p>
      </div>
    </section>
  </main>
  <footer>
    <p>© 2026 ${profile.name} · ${profile.institution}</p>
  </footer>
</body>
</html>`;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateStandaloneHTML());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const downloadHTMLFile = () => {
    const element = document.createElement('a');
    const file = new Blob([generateStandaloneHTML()], { type: 'text/html' });
    element.href = URL.createObjectURL(file);
    element.download = 'math-teacher-portfolio.html';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] text-[#1c1917] selection:bg-[#0f2d4a] selection:text-white">
      
      {/* Top Bar - Strictly 1 row, 3 zones */}
      <header className="sticky top-0 z-40 bg-[#fafaf9]/95 backdrop-blur-md border-b border-[#e7e5e4]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          
          {/* Zone 1: Single text element wordmark */}
          <button 
            onClick={() => setActiveTab('all')} 
            className="font-serif text-lg font-bold tracking-tight text-[#0f2d4a] hover:opacity-85 transition-opacity text-left cursor-pointer"
          >
            {profile.name}
          </button>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#57534e]">
            <button 
              onClick={() => { setActiveTab('all'); const el = document.getElementById('bio-section'); el?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`hover:text-[#0f2d4a] transition-colors cursor-pointer ${activeTab === 'bio' ? 'text-[#0f2d4a] font-semibold underline underline-offset-4' : ''}`}
            >
              Bio & Philosophy
            </button>
            <button 
              onClick={() => { setActiveTab('all'); const el = document.getElementById('classes-section'); el?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`hover:text-[#0f2d4a] transition-colors cursor-pointer ${activeTab === 'classes' ? 'text-[#0f2d4a] font-semibold underline underline-offset-4' : ''}`}
            >
              Classes & Syllabi
            </button>
            <button 
              onClick={() => { setActiveTab('all'); const el = document.getElementById('gallery-section'); el?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`hover:text-[#0f2d4a] transition-colors cursor-pointer ${activeTab === 'gallery' ? 'text-[#0f2d4a] font-semibold underline underline-offset-4' : ''}`}
            >
              Classroom Life
            </button>
            <button 
              onClick={() => { setActiveTab('all'); const el = document.getElementById('schedule-section'); el?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`hover:text-[#0f2d4a] transition-colors cursor-pointer ${activeTab === 'schedule' ? 'text-[#0f2d4a] font-semibold underline underline-offset-4' : ''}`}
            >
              Schedule & Hours
            </button>
            <button 
              onClick={() => { setActiveTab('all'); const el = document.getElementById('sandbox-section'); el?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`hover:text-[#0f2d4a] transition-colors cursor-pointer ${activeTab === 'sandbox' ? 'text-[#0f2d4a] font-semibold underline underline-offset-4' : ''}`}
            >
              Math Sandbox
            </button>
            <button 
              onClick={() => { setActiveTab('all'); const el = document.getElementById('contact-section'); el?.scrollIntoView({ behavior: 'smooth' }); }}
              className={`hover:text-[#0f2d4a] transition-colors cursor-pointer ${activeTab === 'contact' ? 'text-[#0f2d4a] font-semibold underline underline-offset-4' : ''}`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2.5">
            <button 
              onClick={() => setShowCustomizer(true)}
              title="Edit teacher profile information"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#57534e] hover:text-[#1c1917] bg-white border border-[#e7e5e4] rounded-md transition-colors cursor-pointer"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Edit Details</span>
            </button>
            
            <button 
              onClick={() => setShowExportModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#0f2d4a] hover:bg-[#164268] rounded-md transition-colors whitespace-nowrap cursor-pointer shadow-xs"
            >
              <Code className="w-3.5 h-3.5" />
              <span>Get Single HTML</span>
            </button>
          </div>

        </div>
      </header>

      {/* Quick View Filter Bar (Allows testing All-in-One vs Dedicated View) */}
      <div className="border-b border-[#e7e5e4] bg-[#f5f5f4]/80 py-2">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#78716c]">
            <span className="font-medium text-[#44403c]">View Mode:</span>
            <span>Switch between continuous portfolio or focused single-page view</span>
          </div>

          <div className="flex items-center p-0.5 bg-white border border-[#e7e5e4] rounded-lg">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${activeTab === 'all' ? 'bg-[#0f2d4a] text-white shadow-xs' : 'text-[#57534e] hover:text-[#1c1917]'}`}
            >
              All Sections
            </button>
            <button 
              onClick={() => setActiveTab('bio')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${activeTab === 'bio' ? 'bg-[#0f2d4a] text-white shadow-xs' : 'text-[#57534e] hover:text-[#1c1917]'}`}
            >
              Bio Only
            </button>
            <button 
              onClick={() => setActiveTab('classes')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${activeTab === 'classes' ? 'bg-[#0f2d4a] text-white shadow-xs' : 'text-[#57534e] hover:text-[#1c1917]'}`}
            >
              Classes Only
            </button>
            <button 
              onClick={() => setActiveTab('gallery')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${activeTab === 'gallery' ? 'bg-[#0f2d4a] text-white shadow-xs' : 'text-[#57534e] hover:text-[#1c1917]'}`}
            >
              Photo Gallery
            </button>
            <button 
              onClick={() => setActiveTab('schedule')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${activeTab === 'schedule' ? 'bg-[#0f2d4a] text-white shadow-xs' : 'text-[#57534e] hover:text-[#1c1917]'}`}
            >
              Schedule
            </button>
            <button 
              onClick={() => setActiveTab('contact')}
              className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${activeTab === 'contact' ? 'bg-[#0f2d4a] text-white shadow-xs' : 'text-[#57534e] hover:text-[#1c1917]'}`}
            >
              Contact Only
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6">

        {/* HERO SECTION */}
        {(activeTab === 'all' || activeTab === 'bio') && (
          <section className="py-14 md:py-20 border-b border-[#e7e5e4]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#e7e5e4] rounded-md text-xs font-semibold text-[#0f2d4a] mb-4 shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>{profile.institution}</span>
                </div>
                
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#1c1917] tracking-tight leading-[1.15] mb-5">
                  Building mathematical intuition before mechanical computation.
                </h1>
                
                <p className="text-base sm:text-lg text-[#57534e] leading-relaxed mb-6 max-w-2xl">
                  {profile.bioLead} Welcome to my official course portal. Here you will find current syllabi, weekly office hour schedules, problem sets, and direct contact details.
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#78716c] pt-5 border-t border-[#e7e5e4]">
                  <span className="font-medium text-[#1c1917]">{profile.yearsExp}</span>
                  <span aria-hidden="true" className="text-[#d6d3d1]">·</span>
                  <span>{profile.degree}</span>
                  <span aria-hidden="true" className="text-[#d6d3d1]">·</span>
                  <span>{profile.secondaryCert}</span>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a 
                    href="#classes-section"
                    onClick={(e) => {
                      if (activeTab !== 'all') { setActiveTab('classes'); }
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#0f2d4a] hover:bg-[#164268] rounded-md transition-colors"
                  >
                    <span>View Courses & Syllabi</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <a 
                    href="#gallery-section"
                    onClick={(e) => {
                      if (activeTab !== 'all') { setActiveTab('gallery'); }
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[#1c1917] bg-white hover:bg-[#f5f5f4] border border-[#e7e5e4] rounded-md transition-colors"
                  >
                    <Eye className="w-4 h-4 text-[#0f2d4a]" />
                    <span>Explore Photo Gallery</span>
                  </a>
                </div>
              </div>

              {/* Teacher Visual Anchor: Layered Editorial Cards */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative group">
                  <div className="overflow-hidden rounded-lg border border-[#e7e5e4] bg-white shadow-sm">
                    <img 
                      src={HERO_PORTRAIT} 
                      alt={`Portrait of ${profile.name}`}
                      referrerPolicy="no-referrer"
                      className="w-full aspect-square object-cover object-top"
                    />
                    <div className="p-4 bg-white border-t border-[#e7e5e4] flex items-center justify-between">
                      <div>
                        <div className="font-serif text-base font-bold text-[#1c1917]">
                          {profile.name}
                        </div>
                        <div className="text-xs text-[#78716c] mt-0.5">
                          {profile.title} · Room {profile.office}
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold px-2 py-0.5 bg-[#f0f4f8] text-[#0f2d4a] rounded">
                        Oakwood Faculty
                      </span>
                    </div>
                  </div>
                </div>

                {/* Attached Interactive Lecture Snapshot Banner */}
                <div 
                  onClick={() => {
                    const chalkboard = GALLERY_ITEMS.find(item => item.id === 'chalkboard-lecture');
                    if (chalkboard) setLightboxImage(chalkboard);
                  }}
                  className="group relative overflow-hidden rounded-lg border border-[#e7e5e4] bg-[#0f2d4a] cursor-pointer hover:border-[#94a3b8] transition-all shadow-2xs"
                >
                  <img 
                    src={CHALKBOARD_LECTURE} 
                    alt="Slate chalkboard in lecture hall 304"
                    referrerPolicy="no-referrer"
                    className="w-full h-28 object-cover opacity-85 group-hover:scale-103 group-hover:opacity-95 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-3 flex flex-col justify-end">
                    <div className="flex items-center justify-between text-white">
                      <div>
                        <div className="text-[11px] font-semibold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                          <span>Lecture Amphitheater 304</span>
                        </div>
                        <div className="text-xs font-serif font-bold text-white/95">
                          Daily Slate Chalkboard Derivations
                        </div>
                      </div>
                      <span className="p-1 rounded bg-white/20 text-white group-hover:bg-white/30 transition-colors">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* CURATED CLASSROOM SNAPSHOT STRIP */}
            <div className="mt-14 pt-8 border-t border-[#e7e5e4]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[#78716c]">
                  Classroom Immersion · Tap any image to examine
                </div>
                <div className="text-xs text-[#0f2d4a] font-medium flex items-center gap-1">
                  <span>Interactive High-Resolution Previews</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                {GALLERY_ITEMS.slice(0, 4).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setLightboxImage(item)}
                    className="group relative text-left overflow-hidden rounded-lg border border-[#e7e5e4] bg-white hover:border-[#94a3b8] hover:shadow-xs transition-all cursor-pointer"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                      <img 
                        src={item.src} 
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-108"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                      <div className="absolute bottom-2 left-2 right-2 text-white">
                        <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 bg-black/50 backdrop-blur-xs rounded text-amber-200">
                          {item.tag}
                        </span>
                      </div>
                    </div>
                    <div className="p-2.5 bg-white">
                      <div className="text-xs font-semibold text-[#1c1917] truncate group-hover:text-[#0f2d4a]">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-[#78716c] truncate mt-0.5">
                        {item.location}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* BIO & PHILOSOPHY SECTION */}
        {(activeTab === 'all' || activeTab === 'bio') && (
          <section id="bio-section" className="py-16 border-b border-[#e7e5e4]">
            <div className="max-w-2xl mb-10">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#78716c] mb-2">
                Pedagogical Foundations
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917] tracking-tight">
                Biography & Teaching Philosophy
              </h2>
              <p className="text-sm sm:text-base text-[#57534e] mt-2">
                A structured overview of credentials, core beliefs, and educational methodology.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Left Column: Narrative Prose */}
              <div className="lg:col-span-7 space-y-6 text-[#44403c] text-base leading-relaxed">
                <p>
                  I have spent over a decade teaching mathematics across high school honors curricula and introductory university courses. My foundational training is in applied mathematics and partial differential equations, but my true calling has always been in the classroom—translating abstract mathematical formalisms into clear, physical, and intuitive concepts that any student can grasp.
                </p>

                <p>
                  Mathematics is frequently taught as a rigid catalog of memorized algorithms: perform steps A, B, and C to solve for x. While computational fluency matters, this rote approach strips mathematics of its intrinsic wonder and makes students anxious when faced with unfamiliar problem structures.
                </p>

                {/* Editorial Quote Block */}
                <div className="border-l-3 border-[#0f2d4a] bg-white p-5 rounded-r-md border border-l-0 border-[#e7e5e4] my-6">
                  <p className="font-serif text-lg italic text-[#0f2d4a]">
                    "We do not teach calculus so students can execute derivative shortcuts by memory; we teach calculus so they can model dynamic change, measure accumulation, and navigate uncertainty with logical rigor."
                  </p>
                </div>

                <p>
                  In my classes, lessons begin with concrete visualizations, physical phenomena, or paradoxical questions. Once students build an intuitive picture of what is happening geometrically, we introduce formal algebraic syntax. This ensures that every symbol on the chalkboard carries tangible meaning.
                </p>

                <h3 className="font-serif text-xl font-bold text-[#1c1917] pt-4">
                  Three Core Pillars in My Classroom
                </h3>

                <div className="space-y-5 pt-2">
                  <div className="bg-white border border-[#e7e5e4] rounded-lg overflow-hidden">
                    <div className="p-5">
                      <div className="font-semibold text-sm text-[#1c1917] mb-1">
                        1. Intuitive Geometry Precedes Symbolic Formalism
                      </div>
                      <p className="text-sm text-[#57534e] leading-relaxed mb-3">
                        Before introducing the formal limit definition of a derivative, we explore tangent slopes physically and geometrically. Intuition anchors memory so formulas never feel arbitrary.
                      </p>
                    </div>
                    <div className="border-t border-[#e7e5e4] bg-[#fafaf9] p-3 flex items-center gap-3">
                      <img 
                        src={GEOMETRY_TOOLS} 
                        alt="Geometric drafting and golden ratio" 
                        referrerPolicy="no-referrer"
                        className="w-16 h-12 rounded object-cover border border-[#e7e5e4] shrink-0 cursor-pointer hover:opacity-85 transition-opacity"
                        onClick={() => {
                          const item = GALLERY_ITEMS.find(i => i.id === 'geometry-drafting');
                          if (item) setLightboxImage(item);
                        }}
                      />
                      <div className="text-xs text-[#78716c]">
                        <span className="font-medium text-[#1c1917]">Tactile Geometry Lab:</span> Students draft Fibonacci spirals, polyhedra, and polar graphs by hand to connect spatial patterns with equations.
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-[#e7e5e4] rounded-lg overflow-hidden">
                    <div className="p-5">
                      <div className="font-semibold text-sm text-[#1c1917] mb-1">
                        2. Productive Struggle & Collaborative Discourse
                      </div>
                      <p className="text-sm text-[#57534e] leading-relaxed mb-3">
                        Students collaborate on non-routine problem sets where multiple solution methods exist. Articulating mathematical reasoning out loud cements deep comprehension and builds communication skills.
                      </p>
                    </div>
                    <div className="border-t border-[#e7e5e4] bg-[#fafaf9] p-3 flex items-center gap-3">
                      <img 
                        src={STUDENTS_WORKSHOP} 
                        alt="Students solving math problems" 
                        referrerPolicy="no-referrer"
                        className="w-16 h-12 rounded object-cover border border-[#e7e5e4] shrink-0 cursor-pointer hover:opacity-85 transition-opacity"
                        onClick={() => {
                          const item = GALLERY_ITEMS.find(i => i.id === 'students-workshop');
                          if (item) setLightboxImage(item);
                        }}
                      />
                      <div className="text-xs text-[#78716c]">
                        <span className="font-medium text-[#1c1917]">Collaborative Problem Circles:</span> Weekly small-group debates on counterexamples, optimization puzzles, and Olympiad inquiries.
                      </div>
                    </div>
                  </div>

                  <div className="bg-white border border-[#e7e5e4] rounded-lg p-5">
                    <div className="font-semibold text-sm text-[#1c1917] mb-1">
                      3. Normalizing Error as Structural Feedback
                    </div>
                    <p className="text-sm text-[#57534e] leading-relaxed">
                      Wrong answers are treated as investigative opportunities. Analyzing where an assumption broke down reveals far more about the anatomy of a theorem than simply getting lucky on a multiple-choice question.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Credentials & Areas of Focus */}
              <div className="lg:col-span-5 space-y-6">
                
                <div className="bg-white border border-[#e7e5e4] rounded-lg p-6">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1c1917] pb-3 border-b border-[#e7e5e4]">
                    <GraduationCap className="w-4 h-4 text-[#0f2d4a]" />
                    <span>Education & Degrees</span>
                  </div>

                  <div className="mt-4 space-y-4">
                    <div>
                      <div className="font-semibold text-sm text-[#1c1917]">
                        M.Sc. in Applied Mathematics
                      </div>
                      <div className="text-xs text-[#78716c] mt-0.5">
                        University Faculty of Mathematical Sciences · 2014
                      </div>
                      <div className="text-xs text-[#57534e] mt-1">
                        Thesis focus: Numerical Solutions of Non-linear Reaction-Diffusion Equations.
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#f5f5f4]">
                      <div className="font-semibold text-sm text-[#1c1917]">
                        B.S. in Pure Mathematics (Honors)
                      </div>
                      <div className="text-xs text-[#78716c] mt-0.5">
                        Faculty of Natural Sciences · 2012
                      </div>
                      <div className="text-xs text-[#57534e] mt-1">
                        Graduated Magna Cum Laude with honors in Real Analysis and Abstract Algebra.
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#f5f5f4]">
                      <div className="font-semibold text-sm text-[#1c1917]">
                        Secondary Mathematics Teaching License
                      </div>
                      <div className="text-xs text-[#78716c] mt-0.5">
                        State Department of Education · Endorsed Grades 7–12 & AP Calculus
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-[#e7e5e4] rounded-lg p-6">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1c1917] pb-3 border-b border-[#e7e5e4]">
                    <Award className="w-4 h-4 text-[#0f2d4a]" />
                    <span>Academic Roles & Mentorship</span>
                  </div>

                  <ul className="mt-4 space-y-2.5 text-xs text-[#57534e]">
                    <li className="flex items-start gap-2">
                      <span className="text-[#0f2d4a] font-bold">·</span>
                      <span><strong>Head Coach:</strong> High School Math Olympiad & AMC 10/12 Competition Prep (3 State Regional Medals)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0f2d4a] font-bold">·</span>
                      <span><strong>Curriculum Committee:</strong> Lead designer for integrated STEM and computational algebra modules</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#0f2d4a] font-bold">·</span>
                      <span><strong>Peer Tutoring Advisor:</strong> Overseeing student-led drop-in math clinics during lunch periods</span>
                    </li>
                  </ul>
                </div>

                {/* Desk study preview */}
                <div 
                  onClick={() => {
                    const item = GALLERY_ITEMS.find(i => i.id === 'study-desk');
                    if (item) setLightboxImage(item);
                  }}
                  className="group overflow-hidden rounded-lg border border-[#e7e5e4] bg-white cursor-pointer hover:border-[#94a3b8] transition-all"
                >
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                    <img 
                      src={STUDY_DESK} 
                      alt="Mathematics classroom study desk" 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 p-1 rounded-full bg-black/40 text-white/90">
                      <Eye className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="p-3 text-xs text-[#78716c] bg-[#f5f5f4] flex items-center justify-between">
                    <span>The Mathematics Resource Room (Hall 304 / Office 312)</span>
                    <span className="font-semibold text-[#0f2d4a]">View Photo</span>
                  </div>
                </div>

              </div>

            </div>
          </section>
        )}

        {/* CLASSES & SYLLABI SECTION */}
        {(activeTab === 'all' || activeTab === 'classes') && (
          <section id="classes-section" className="py-16 border-b border-[#e7e5e4]">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#78716c] mb-2">
                  Academic Term Offerings
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917] tracking-tight">
                  Classes & Course Syllabi
                </h2>
                <p className="text-sm sm:text-base text-[#57534e] mt-1 max-w-xl">
                  Explore course descriptions, meeting schedules, core topic outlines, and grade distribution policies.
                </p>
              </div>

              <div className="text-xs text-[#78716c]">
                Click <span className="font-medium text-[#1c1917]">"View Full Syllabus"</span> for grading rubrics and exam dates
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {COURSES.map((course) => (
                <div 
                  key={course.id}
                  className="bg-white border border-[#e7e5e4] rounded-lg overflow-hidden flex flex-col justify-between hover:border-[#cbd5e1] hover:shadow-md transition-all group"
                >
                  <div>
                    {/* Course Cover Image Banner */}
                    <div className="relative h-44 overflow-hidden bg-[#0f2d4a]">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f2d4a]/90 via-[#0f2d4a]/35 to-transparent" />
                      
                      <div className="absolute top-3 right-3">
                        <button
                          onClick={() => {
                            const found = GALLERY_ITEMS.find(item => item.src === course.image);
                            if (found) setLightboxImage(found);
                          }}
                          title="View image details"
                          className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 text-white/90 backdrop-blur-xs transition-colors cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                          {course.code} · {course.credits}
                        </div>
                        <div className="text-xs text-white/90 line-clamp-1 font-medium mt-0.5">
                          {course.tagline}
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      {/* Unboxed clean metadata with separators */}
                      <div className="flex items-center gap-2 text-xs text-[#78716c] mb-2">
                        <span className="font-semibold text-[#0f2d4a]">{course.code}</span>
                        <span aria-hidden="true">·</span>
                        <span>{course.level}</span>
                        <span aria-hidden="true">·</span>
                        <span>{course.room}</span>
                      </div>

                      <h3 className="font-serif text-xl font-bold text-[#1c1917] mb-2">
                        {course.title}
                      </h3>

                      <p className="text-sm text-[#57534e] leading-relaxed mb-4">
                        {course.description}
                      </p>

                      <div className="bg-[#fafaf9] border border-[#e7e5e4] rounded-md p-3.5 mb-4">
                        <div className="text-xs font-semibold text-[#1c1917] mb-2">
                          Core Syllabus Highlights:
                        </div>
                        <ul className="text-xs text-[#57534e] space-y-1.5 list-disc pl-4">
                          {course.syllabus.slice(0, 3).map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                        <div className="text-[11px] text-[#78716c] mt-2 italic">
                          + {course.syllabus.length - 3} additional units in full syllabus
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6">
                    <div className="flex items-center justify-between text-xs text-[#78716c] pt-3 border-t border-[#e7e5e4] mb-4">
                      <span>{course.period}</span>
                      <span className="font-medium text-[#1c1917]">{course.credits}</span>
                    </div>

                    <button 
                      onClick={() => setSelectedCourse(course)}
                      className="w-full py-2 px-3 text-xs font-semibold text-[#0f2d4a] bg-[#f0f4f8] hover:bg-[#e2eaf1] rounded-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>View Full Syllabus & Grading</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* CLASSROOM LIFE & PHOTO GALLERY SECTION */}
        {(activeTab === 'all' || activeTab === 'gallery') && (
          <section id="gallery-section" className="py-16 border-b border-[#e7e5e4]">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#78716c] mb-2">
                  Academic Atmosphere & Daily Life
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917] tracking-tight">
                  Visual Chronicle: Inside the Mathematics Department
                </h2>
                <p className="text-sm sm:text-base text-[#57534e] mt-1 max-w-xl">
                  Step inside Hall 304, our active problem-solving labs, competition trophy showcases, and teacher consultation hours.
                </p>
              </div>

              <div className="text-xs text-[#78716c] flex items-center gap-1.5 bg-white border border-[#e7e5e4] px-3 py-1.5 rounded-md">
                <Maximize2 className="w-3.5 h-3.5 text-[#0f2d4a]" />
                <span>Click any photograph to view high-resolution details & pedagogical notes</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Featured Large Panoramic Card 1: Blackboard Lecture */}
              <div 
                onClick={() => setLightboxImage(GALLERY_ITEMS[0])}
                className="md:col-span-8 group relative overflow-hidden rounded-lg border border-[#e7e5e4] bg-white cursor-pointer hover:border-[#94a3b8] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                  <img 
                    src={GALLERY_ITEMS[0].src} 
                    alt={GALLERY_ITEMS[0].title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 bg-black/60 backdrop-blur-xs text-amber-300 rounded">
                      {GALLERY_ITEMS[0].tag}
                    </span>
                    <span className="text-[11px] font-medium px-2.5 py-1 bg-white/20 backdrop-blur-xs text-white rounded">
                      {GALLERY_ITEMS[0].location}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold mb-1 group-hover:text-amber-200 transition-colors">
                      {GALLERY_ITEMS[0].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/90 line-clamp-2">
                      {GALLERY_ITEMS[0].description}
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-[#fafaf9] border-t border-[#e7e5e4] flex items-center justify-between text-xs text-[#57534e]">
                  <span className="italic">💡 {GALLERY_ITEMS[0].didYouKnow}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#0f2d4a] shrink-0 ml-3">
                    <span>Enlarge</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Card 2: Student Workshop */}
              <div 
                onClick={() => setLightboxImage(GALLERY_ITEMS[1])}
                className="md:col-span-4 group relative overflow-hidden rounded-lg border border-[#e7e5e4] bg-white cursor-pointer hover:border-[#94a3b8] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                  <img 
                    src={GALLERY_ITEMS[1].src} 
                    alt={GALLERY_ITEMS[1].title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-black/60 backdrop-blur-xs text-amber-300 rounded">
                      {GALLERY_ITEMS[1].tag}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h4 className="font-serif text-base font-bold mb-0.5 group-hover:text-amber-200 transition-colors">
                      {GALLERY_ITEMS[1].title}
                    </h4>
                    <p className="text-xs text-white/85 line-clamp-2">
                      {GALLERY_ITEMS[1].description}
                    </p>
                  </div>
                </div>
                <div className="p-3.5 bg-[#fafaf9] border-t border-[#e7e5e4] text-xs text-[#57534e] flex items-center justify-between">
                  <span className="truncate">{GALLERY_ITEMS[1].location}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#0f2d4a] shrink-0">
                    <Eye className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Card 3: Geometry Drafting */}
              <div 
                onClick={() => setLightboxImage(GALLERY_ITEMS[2])}
                className="md:col-span-4 group relative overflow-hidden rounded-lg border border-[#e7e5e4] bg-white cursor-pointer hover:border-[#94a3b8] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                  <img 
                    src={GALLERY_ITEMS[2].src} 
                    alt={GALLERY_ITEMS[2].title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-black/60 backdrop-blur-xs text-amber-300 rounded">
                      {GALLERY_ITEMS[2].tag}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h4 className="font-serif text-base font-bold mb-0.5 group-hover:text-amber-200 transition-colors">
                      {GALLERY_ITEMS[2].title}
                    </h4>
                    <p className="text-xs text-white/85 line-clamp-2">
                      {GALLERY_ITEMS[2].description}
                    </p>
                  </div>
                </div>
                <div className="p-3.5 bg-[#fafaf9] border-t border-[#e7e5e4] text-xs text-[#57534e] flex items-center justify-between">
                  <span className="truncate">{GALLERY_ITEMS[2].location}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#0f2d4a] shrink-0">
                    <Eye className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Card 4: Olympiad Awards */}
              <div 
                onClick={() => setLightboxImage(GALLERY_ITEMS[3])}
                className="md:col-span-4 group relative overflow-hidden rounded-lg border border-[#e7e5e4] bg-white cursor-pointer hover:border-[#94a3b8] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                  <img 
                    src={GALLERY_ITEMS[3].src} 
                    alt={GALLERY_ITEMS[3].title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-black/60 backdrop-blur-xs text-amber-300 rounded">
                      {GALLERY_ITEMS[3].tag}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h4 className="font-serif text-base font-bold mb-0.5 group-hover:text-amber-200 transition-colors">
                      {GALLERY_ITEMS[3].title}
                    </h4>
                    <p className="text-xs text-white/85 line-clamp-2">
                      {GALLERY_ITEMS[3].description}
                    </p>
                  </div>
                </div>
                <div className="p-3.5 bg-[#fafaf9] border-t border-[#e7e5e4] text-xs text-[#57534e] flex items-center justify-between">
                  <span className="truncate">{GALLERY_ITEMS[3].location}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#0f2d4a] shrink-0">
                    <Eye className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Card 5: Faculty Study Desk */}
              <div 
                onClick={() => setLightboxImage(GALLERY_ITEMS[4])}
                className="md:col-span-4 group relative overflow-hidden rounded-lg border border-[#e7e5e4] bg-white cursor-pointer hover:border-[#94a3b8] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900">
                  <img 
                    src={GALLERY_ITEMS[4].src} 
                    alt={GALLERY_ITEMS[4].title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-black/60 backdrop-blur-xs text-amber-300 rounded">
                      {GALLERY_ITEMS[4].tag}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h4 className="font-serif text-base font-bold mb-0.5 group-hover:text-amber-200 transition-colors">
                      {GALLERY_ITEMS[4].title}
                    </h4>
                    <p className="text-xs text-white/85 line-clamp-2">
                      {GALLERY_ITEMS[4].description}
                    </p>
                  </div>
                </div>
                <div className="p-3.5 bg-[#fafaf9] border-t border-[#e7e5e4] text-xs text-[#57534e] flex items-center justify-between">
                  <span className="truncate">{GALLERY_ITEMS[4].location}</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-[#0f2d4a] shrink-0">
                    <Eye className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* INTERACTIVE MATH SANDBOX SECTION */}
        {(activeTab === 'all' || activeTab === 'sandbox') && (
          <section id="sandbox-section" className="py-16 border-b border-[#e7e5e4]">
            <div className="max-w-2xl mb-8">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#78716c] mb-2">
                Pedagogical Tool Demonstration
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917] tracking-tight">
                Interactive Graph & Curve Explorer
              </h2>
              <p className="text-sm sm:text-base text-[#57534e] mt-1">
                An interactive sample of the visual tools used in my classroom to build intuition for quadratic polynomials: <span className="font-serif italic font-bold">f(x) = ax² + bx + c</span>.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Controls Deck */}
              <div className="lg:col-span-5 bg-white border border-[#e7e5e4] rounded-lg p-6 space-y-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-[#1c1917] mb-1">
                    Function Parameters
                  </div>
                  <div className="text-xs text-[#78716c]">
                    Adjust sliders to watch real-time changes in curvature, vertex, and root intersections.
                  </div>
                </div>

                {/* Slider A */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
                    <label htmlFor="paramA">Curvature / Lead Coefficient (a):</label>
                    <span className="font-mono tabular-nums text-sm font-bold text-[#0f2d4a]">{paramA}</span>
                  </div>
                  <input 
                    id="paramA"
                    type="range" 
                    min="-4" 
                    max="4" 
                    step="0.5" 
                    value={paramA}
                    onChange={(e) => setParamA(parseFloat(e.target.value) || 0.1)}
                    className="w-full accent-[#0f2d4a] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-[#78716c] mt-0.5">
                    <span>Concave Down (-4)</span>
                    <span>Linear (0)</span>
                    <span>Concave Up (+4)</span>
                  </div>
                </div>

                {/* Slider B */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
                    <label htmlFor="paramB">Linear Slope Shift (b):</label>
                    <span className="font-mono tabular-nums text-sm font-bold text-[#0f2d4a]">{paramB}</span>
                  </div>
                  <input 
                    id="paramB"
                    type="range" 
                    min="-8" 
                    max="8" 
                    step="1" 
                    value={paramB}
                    onChange={(e) => setParamB(parseFloat(e.target.value))}
                    className="w-full accent-[#0f2d4a] cursor-pointer"
                  />
                </div>

                {/* Slider C */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
                    <label htmlFor="paramC">Vertical Y-Intercept (c):</label>
                    <span className="font-mono tabular-nums text-sm font-bold text-[#0f2d4a]">{paramC}</span>
                  </div>
                  <input 
                    id="paramC"
                    type="range" 
                    min="-10" 
                    max="10" 
                    step="1" 
                    value={paramC}
                    onChange={(e) => setParamC(parseFloat(e.target.value))}
                    className="w-full accent-[#0f2d4a] cursor-pointer"
                  />
                </div>

                {/* Mathematical Properties Card */}
                <div className="bg-[#fafaf9] border border-[#e7e5e4] rounded-md p-4 text-xs space-y-2">
                  <div className="font-semibold text-[#1c1917] border-b border-[#e7e5e4] pb-1.5">
                    Live Analytical Properties:
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#57534e]">Standard Form Equation:</span>
                    <span className="font-serif font-bold text-sm text-[#0f2d4a]">
                      y = {paramA}x² {paramB >= 0 ? `+ ${paramB}` : `- ${Math.abs(paramB)}`}x {paramC >= 0 ? `+ ${paramC}` : `- ${Math.abs(paramC)}`}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#57534e]">Discriminant (Δ = b² - 4ac):</span>
                    <span className={`font-mono font-bold tabular-nums ${discriminant > 0 ? 'text-[#15803d]' : discriminant === 0 ? 'text-[#d97706]' : 'text-[#b91c1c]'}`}>
                      {discriminant} {discriminant > 0 ? '(Two Real Roots)' : discriminant === 0 ? '(One Real Root)' : '(Complex Roots)'}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#57534e]">Vertex Coordinates (h, k):</span>
                    <span className="font-mono font-semibold tabular-nums text-[#1c1917]">
                      ({vertexX.toFixed(2)}, {vertexY.toFixed(2)})
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#57534e]">Real X-Intercepts (Roots):</span>
                    <span className="font-mono tabular-nums text-[#1c1917]">
                      {hasRealRoots ? `x ≈ ${root1}, x ≈ ${root2}` : 'No Real Intercepts'}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => { setParamA(1); setParamB(-2); setParamC(-3); }}
                    className="text-xs px-3 py-1.5 bg-[#f5f5f4] hover:bg-[#e7e5e4] text-[#57534e] rounded-md transition-colors cursor-pointer"
                  >
                    Reset Defaults
                  </button>
                  <button 
                    onClick={() => { setParamA(-1); setParamB(4); setParamC(0); }}
                    className="text-xs px-3 py-1.5 bg-[#f5f5f4] hover:bg-[#e7e5e4] text-[#57534e] rounded-md transition-colors cursor-pointer"
                  >
                    Example: Projectile Motion
                  </button>
                </div>
              </div>

              {/* Live Interactive SVG Canvas */}
              <div className="lg:col-span-7 bg-white border border-[#e7e5e4] rounded-lg p-6">
                <div className="flex items-center justify-between text-xs text-[#78716c] mb-3">
                  <span className="font-medium text-[#1c1917]">Cartesian Plane View (-10 ≤ x ≤ 10, -15 ≤ y ≤ 15)</span>
                  <span>Grid Step: 2 units</span>
                </div>

                <div className="relative aspect-[4/3] w-full bg-[#fafaf9] border border-[#e7e5e4] rounded-md overflow-hidden flex items-center justify-center">
                  <svg 
                    viewBox="-100 -75 200 150" 
                    className="w-full h-full"
                  >
                    {/* Grid lines */}
                    {[-80, -60, -40, -20, 20, 40, 60, 80].map((x) => (
                      <line key={`gx-${x}`} x1={x} y1="-75" x2={x} y2="75" stroke="#e7e5e4" strokeWidth="0.75" />
                    ))}
                    {[-60, -40, -20, 20, 40, 60].map((y) => (
                      <line key={`gy-${y}`} x1="-100" y1={y} x2="100" y2={y} stroke="#e7e5e4" strokeWidth="0.75" />
                    ))}

                    {/* Coordinate Axes */}
                    <line x1="-100" y1="0" x2="100" y2="0" stroke="#78716c" strokeWidth="1.2" />
                    <line x1="0" y1="-75" x2="0" y2="75" stroke="#78716c" strokeWidth="1.2" />

                    {/* Axis Labels */}
                    <text x="92" y="-4" fontSize="6" fill="#78716c" fontFamily="monospace">x</text>
                    <text x="4" y="-68" fontSize="6" fill="#78716c" fontFamily="monospace">y</text>
                    <text x="2" y="8" fontSize="5" fill="#a8a29e" fontFamily="monospace">0</text>

                    {/* Parabola Curve plotting (scaled to SVG space: 10 units = 100px on x, 15 units = 75px on y) */}
                    {(() => {
                      const points: string[] = [];
                      for (let svgX = -95; svgX <= 95; svgX += 2) {
                        const mathX = svgX / 10;
                        const mathY = (paramA * mathX * mathX) + (paramB * mathX) + paramC;
                        const svgY = -mathY * 5; // Invert SVG y-axis
                        if (svgY >= -75 && svgY <= 75) {
                          points.push(`${svgX},${svgY}`);
                        }
                      }
                      if (points.length < 2) return null;
                      return (
                        <polyline
                          fill="none"
                          stroke="#0f2d4a"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points={points.join(' ')}
                        />
                      );
                    })()}

                    {/* Vertex point */}
                    {(() => {
                      const svgVX = vertexX * 10;
                      const svgVY = -vertexY * 5;
                      if (svgVX >= -95 && svgVX <= 95 && svgVY >= -70 && svgVY <= 70) {
                        return (
                          <g>
                            <circle cx={svgVX} cy={svgVY} r="3" fill="#b91c1c" />
                            <text 
                              x={svgVX + 4} 
                              y={svgVY - 4} 
                              fontSize="5.5" 
                              fontWeight="bold" 
                              fill="#b91c1c"
                              fontFamily="sans-serif"
                            >
                              Vertex ({vertexX.toFixed(1)}, {vertexY.toFixed(1)})
                            </text>
                          </g>
                        );
                      }
                      return null;
                    })()}

                    {/* Real roots markers */}
                    {hasRealRoots && root1 && root2 && (
                      <g>
                        {(() => {
                          const r1 = parseFloat(root1);
                          const r2 = parseFloat(root2);
                          return (
                            <>
                              {Math.abs(r1) <= 9.5 && (
                                <circle cx={r1 * 10} cy="0" r="2.5" fill="#15803d" />
                              )}
                              {Math.abs(r2) <= 9.5 && (
                                <circle cx={r2 * 10} cy="0" r="2.5" fill="#15803d" />
                              )}
                            </>
                          );
                        })()}
                      </g>
                    )}
                  </svg>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-[#57534e]">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0f2d4a]"></span>
                      <span>Curve f(x)</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#b91c1c]"></span>
                      <span>Vertex</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#15803d]"></span>
                      <span>X-Intercepts</span>
                    </span>
                  </div>
                  <span className="text-[#78716c] text-[11px]">Dynamic SVG rendering</span>
                </div>
              </div>

            </div>
          </section>
        )}

        {/* SCHEDULE & OFFICE HOURS SECTION */}
        {(activeTab === 'all' || activeTab === 'schedule') && (
          <section id="schedule-section" className="py-16 border-b border-[#e7e5e4]">
            <div className="max-w-2xl mb-8">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#78716c] mb-2">
                Availability & Timetable
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917] tracking-tight">
                Weekly Schedule & Office Hours
              </h2>
              <p className="text-sm sm:text-base text-[#57534e] mt-1">
                Office hours are held twice weekly in Office 312. Walk-ins are welcomed, but booking in advance reserves dedicated time.
              </p>
            </div>

            {/* Timetable */}
            <div className="overflow-x-auto bg-white border border-[#e7e5e4] rounded-lg mb-8">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-[#f5f5f4] border-b border-[#e7e5e4] text-[#1c1917] text-xs font-semibold">
                    <th className="py-3 px-5">Day(s)</th>
                    <th className="py-3 px-5">Time Slot</th>
                    <th className="py-3 px-5">Course / Commitment</th>
                    <th className="py-3 px-5">Location</th>
                    <th className="py-3 px-5">Audience & Access</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e7e5e4] text-[#57534e] text-xs sm:text-sm">
                  <tr className="hover:bg-[#fafaf9]">
                    <td className="py-3.5 px-5 font-medium text-[#1c1917]">Mon & Wed</td>
                    <td className="py-3.5 px-5 font-mono tabular-nums">08:30 – 09:50</td>
                    <td className="py-3.5 px-5 font-medium text-[#1c1917]">AP Calculus BC (Section 01)</td>
                    <td className="py-3.5 px-5">Hall 304</td>
                    <td className="py-3.5 px-5 text-[#78716c]">Enrolled Students</td>
                  </tr>

                  <tr className="hover:bg-[#fafaf9]">
                    <td className="py-3.5 px-5 font-medium text-[#1c1917]">Mon & Wed</td>
                    <td className="py-3.5 px-5 font-mono tabular-nums">10:15 – 11:35</td>
                    <td className="py-3.5 px-5 font-medium text-[#1c1917]">Linear Algebra & Vectors</td>
                    <td className="py-3.5 px-5">Hall 304</td>
                    <td className="py-3.5 px-5 text-[#78716c]">Enrolled Students</td>
                  </tr>

                  <tr className="hover:bg-[#fafaf9]">
                    <td className="py-3.5 px-5 font-medium text-[#1c1917]">Tue & Thu</td>
                    <td className="py-3.5 px-5 font-mono tabular-nums">09:00 – 10:20</td>
                    <td className="py-3.5 px-5 font-medium text-[#1c1917]">Probability & Statistics</td>
                    <td className="py-3.5 px-5">Hall 306</td>
                    <td className="py-3.5 px-5 text-[#78716c]">Enrolled Students</td>
                  </tr>

                  <tr className="hover:bg-[#fafaf9]">
                    <td className="py-3.5 px-5 font-medium text-[#1c1917]">Tue & Thu</td>
                    <td className="py-3.5 px-5 font-mono tabular-nums">10:45 – 12:05</td>
                    <td className="py-3.5 px-5 font-medium text-[#1c1917]">Honors Pre-Calculus</td>
                    <td className="py-3.5 px-5">Hall 304</td>
                    <td className="py-3.5 px-5 text-[#78716c]">Enrolled Students</td>
                  </tr>

                  <tr className="bg-[#f0fdf4]/50 hover:bg-[#f0fdf4]">
                    <td className="py-3.5 px-5 font-medium text-[#15803d]">Tue & Thu</td>
                    <td className="py-3.5 px-5 font-mono tabular-nums font-semibold text-[#15803d]">14:00 – 16:00</td>
                    <td className="py-3.5 px-5 font-bold text-[#15803d]">Faculty Office Hours & Math Clinic</td>
                    <td className="py-3.5 px-5 font-medium text-[#1c1917]">Office 312</td>
                    <td className="py-3.5 px-5 text-[#15803d] font-medium">Open to all students & parents</td>
                  </tr>

                  <tr className="hover:bg-[#fafaf9]">
                    <td className="py-3.5 px-5 font-medium text-[#1c1917]">Friday</td>
                    <td className="py-3.5 px-5 font-mono tabular-nums">13:00 – 14:30</td>
                    <td className="py-3.5 px-5 font-medium text-[#1c1917]">Math Olympiad & Circle Seminar</td>
                    <td className="py-3.5 px-5">Hall 304</td>
                    <td className="py-3.5 px-5 text-[#78716c]">Open Club Members</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Office Hours Policy Callout */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#57534e]">
              <div className="bg-white border border-[#e7e5e4] rounded-lg p-4">
                <div className="font-semibold text-sm text-[#1c1917] mb-1">Homework Clarifications</div>
                Bring your attempted scratch paper with you so we can quickly diagnose where your calculation or reasoning drifted.
              </div>

              <div className="bg-white border border-[#e7e5e4] rounded-lg p-4">
                <div className="font-semibold text-sm text-[#1c1917] mb-1">Exam Post-Mortems</div>
                Students who review their graded exams within 5 school days are eligible to submit correction proofs for up to 50% returned points.
              </div>

              <div className="bg-white border border-[#e7e5e4] rounded-lg p-4">
                <div className="font-semibold text-sm text-[#1c1917] mb-1">Parent Conferences</div>
                Parents may schedule virtual or in-person check-ins during Tuesday afternoons via the contact form below.
              </div>
            </div>
          </section>
        )}

        {/* CONTACT & INQUIRIES SECTION */}
        {(activeTab === 'all' || activeTab === 'contact') && (
          <section id="contact-section" className="py-16 border-b border-[#e7e5e4]">
            <div className="max-w-2xl mb-10">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#78716c] mb-2">
                Communications & Appointments
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1c1917] tracking-tight">
                Contact & Office Inquiries
              </h2>
              <p className="text-sm sm:text-base text-[#57534e] mt-1">
                Reach out for course questions, appointment bookings, parent consultations, or Olympiad club queries.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Left Column: Direct Info Card */}
              <div className="lg:col-span-5 space-y-5">
                <div className="bg-white border border-[#e7e5e4] rounded-lg p-6 space-y-5">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#1c1917] pb-3 border-b border-[#e7e5e4]">
                    Direct Teacher Details
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#0f2d4a] shrink-0 mt-1" />
                    <div>
                      <div className="text-xs text-[#78716c]">Institutional Email</div>
                      <a href={`mailto:${profile.email}`} className="text-sm font-semibold text-[#1c1917] hover:text-[#0f2d4a] transition-colors">
                        {profile.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#0f2d4a] shrink-0 mt-1" />
                    <div>
                      <div className="text-xs text-[#78716c]">Classroom & Office</div>
                      <div className="text-sm font-semibold text-[#1c1917]">
                        {profile.office}
                      </div>
                      <div className="text-xs text-[#78716c] mt-0.5">
                        Oakwood Academy Campus, Science & Mathematics Wing
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#0f2d4a] shrink-0 mt-1" />
                    <div>
                      <div className="text-xs text-[#78716c]">Campus Phone</div>
                      <div className="text-sm font-semibold text-[#1c1917]">
                        {profile.phone}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-[#0f2d4a] shrink-0 mt-1" />
                    <div>
                      <div className="text-xs text-[#78716c]">Standard Response Window</div>
                      <div className="text-xs text-[#57534e] mt-0.5 leading-relaxed">
                        I respond to student and parent emails within 24 hours on school days (Monday through Friday, 08:00–16:30).
                      </div>
                    </div>
                  </div>
                </div>

                {/* FAQ snippet */}
                <div className="bg-[#fafaf9] border border-[#e7e5e4] rounded-lg p-5">
                  <div className="font-semibold text-xs text-[#1c1917] mb-2 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-[#0f2d4a]" />
                    <span>Frequently Asked Questions</span>
                  </div>

                  <div className="space-y-3 text-xs text-[#57534e]">
                    <div>
                      <div className="font-medium text-[#1c1917]">What calculator is required?</div>
                      <span>TI-84 Plus CE or TI-Nspire CX CAS is recommended for AP Calculus and Statistics.</span>
                    </div>

                    <div className="pt-2 border-t border-[#e7e5e4]">
                      <div className="font-medium text-[#1c1917]">How do I request a college recommendation letter?</div>
                      <span>Please speak with me at least 4 weeks prior to your earliest application deadline.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Contact & Booking Form */}
              <div className="lg:col-span-7">
                <div className="bg-white border border-[#e7e5e4] rounded-lg p-6 sm:p-8">
                  <h3 className="font-serif text-lg font-bold text-[#1c1917] mb-1">
                    Send a Message or Book an Office Hour
                  </h3>
                  <p className="text-xs text-[#78716c] mb-6">
                    Fill out the form below. You will receive an immediate confirmation of your inquiry.
                  </p>

                  {formSubmitted ? (
                    <div className="bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg p-6 text-center">
                      <CheckCircle className="w-8 h-8 text-[#15803d] mx-auto mb-2" />
                      <div className="font-serif text-lg font-bold text-[#15803d] mb-1">
                        Inquiry Received
                      </div>
                      <p className="text-xs text-[#166534] max-w-md mx-auto mb-4">
                        Thank you, {contactForm.name}. Your message regarding <strong>{contactForm.course}</strong> has been logged. {profile.name} will reply to <strong>{contactForm.email}</strong> shortly.
                      </p>
                      <button 
                        onClick={() => {
                          setFormSubmitted(false);
                          setContactForm({ name: '', email: '', role: 'Student', course: 'AP Calculus BC', date: '', message: '' });
                        }}
                        className="text-xs font-semibold text-[#15803d] underline cursor-pointer"
                      >
                        Send another inquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleContactSubmit} className="space-y-4 text-xs">
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-medium text-[#1c1917] mb-1">Your Full Name *</label>
                          <input 
                            type="text" 
                            required 
                            placeholder="e.g., Alex Johnson"
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            className="w-full px-3 py-2 border border-[#e7e5e4] rounded-md focus:border-[#0f2d4a] focus:ring-1 focus:ring-[#0f2d4a] outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block font-medium text-[#1c1917] mb-1">Email Address *</label>
                          <input 
                            type="email" 
                            required 
                            placeholder="alex@example.com"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            className="w-full px-3 py-2 border border-[#e7e5e4] rounded-md focus:border-[#0f2d4a] focus:ring-1 focus:ring-[#0f2d4a] outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block font-medium text-[#1c1917] mb-1">I am a...</label>
                          <select 
                            value={contactForm.role}
                            onChange={(e) => setContactForm({ ...contactForm, role: e.target.value })}
                            className="w-full px-3 py-2 border border-[#e7e5e4] rounded-md focus:border-[#0f2d4a] focus:ring-1 focus:ring-[#0f2d4a] outline-none transition-colors bg-white"
                          >
                            <option value="Student">Current Student</option>
                            <option value="Parent">Parent / Guardian</option>
                            <option value="Prospective">Prospective Student</option>
                            <option value="Colleague">Faculty Colleague</option>
                          </select>
                        </div>

                        <div>
                          <label className="block font-medium text-[#1c1917] mb-1">Subject / Course</label>
                          <select 
                            value={contactForm.course}
                            onChange={(e) => setContactForm({ ...contactForm, course: e.target.value })}
                            className="w-full px-3 py-2 border border-[#e7e5e4] rounded-md focus:border-[#0f2d4a] focus:ring-1 focus:ring-[#0f2d4a] outline-none transition-colors bg-white"
                          >
                            <option value="AP Calculus BC">AP Calculus BC</option>
                            <option value="Linear Algebra">Linear Algebra & Vectors</option>
                            <option value="Statistics">Probability & Statistics</option>
                            <option value="Pre-Calculus">Honors Pre-Calculus</option>
                            <option value="Math Olympiad">Math Olympiad / Club</option>
                            <option value="General Academic Inquiry">General Academic Inquiry</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block font-medium text-[#1c1917] mb-1">
                          Preferred Appointment Date (Optional)
                        </label>
                        <input 
                          type="date" 
                          value={contactForm.date}
                          onChange={(e) => setContactForm({ ...contactForm, date: e.target.value })}
                          className="w-full px-3 py-2 border border-[#e7e5e4] rounded-md focus:border-[#0f2d4a] focus:ring-1 focus:ring-[#0f2d4a] outline-none transition-colors bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-medium text-[#1c1917] mb-1">Your Message or Question *</label>
                        <textarea 
                          rows={4}
                          required
                          placeholder="Please describe the homework problem, concept, or consultation topic..."
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          className="w-full px-3 py-2 border border-[#e7e5e4] rounded-md focus:border-[#0f2d4a] focus:ring-1 focus:ring-[#0f2d4a] outline-none transition-colors"
                        ></textarea>
                      </div>

                      <button 
                        type="submit"
                        className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0f2d4a] hover:bg-[#164268] rounded-md transition-colors cursor-pointer"
                      >
                        Submit Inquiry
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </section>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#e7e5e4] bg-white py-10 mt-12 text-xs text-[#78716c]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-semibold text-[#1c1917]">{profile.name}</span> · {profile.institution}
            <div className="text-[11px] text-[#a8a29e] mt-0.5">
              Office {profile.office} · Dedicated to excellence in mathematics education
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowExportModal(true)} 
              className="text-[#0f2d4a] hover:underline font-medium cursor-pointer"
            >
              Export Clean Single-File HTML
            </button>
            <span aria-hidden="true" className="text-[#e7e5e4]">|</span>
            <button 
              onClick={() => setShowCustomizer(true)} 
              className="text-[#57534e] hover:underline cursor-pointer"
            >
              Customize Profile
            </button>
          </div>
        </div>
      </footer>

      {/* PHOTO LIGHTBOX MODAL */}
      {lightboxImage && (
        <div 
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white border border-[#e7e5e4] rounded-xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col"
          >
            <div className="relative aspect-video sm:aspect-[16/10] w-full bg-slate-950 overflow-hidden rounded-t-xl">
              <img 
                src={lightboxImage.src} 
                alt={lightboxImage.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setLightboxImage(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-4 flex gap-2">
                <span className="text-xs font-semibold px-2.5 py-1 bg-black/60 backdrop-blur-xs text-amber-300 rounded">
                  {lightboxImage.tag}
                </span>
                <span className="text-xs font-medium px-2.5 py-1 bg-white/20 backdrop-blur-xs text-white rounded">
                  {lightboxImage.location}
                </span>
              </div>
            </div>

            <div className="p-6">
              <h3 className="font-serif text-2xl font-bold text-[#1c1917] mb-2">
                {lightboxImage.title}
              </h3>

              <p className="text-sm text-[#57534e] leading-relaxed mb-4">
                {lightboxImage.description}
              </p>

              <div className="bg-[#fafaf9] border border-[#e7e5e4] rounded-lg p-4 text-xs text-[#44403c] space-y-1.5">
                <div className="font-semibold text-[#0f2d4a] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Curious Fact & Pedagogical Insight:</span>
                </div>
                <p className="italic text-[#57534e] pl-5">{lightboxImage.didYouKnow}</p>
              </div>

              <div className="mt-6 flex justify-end">
                <button 
                  onClick={() => setLightboxImage(null)}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#0f2d4a] hover:bg-[#164268] rounded-md transition-colors cursor-pointer"
                >
                  Close Photograph
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SYLLABUS MODAL */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-[#e7e5e4] rounded-lg max-w-xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl">
            <div className="flex items-start justify-between pb-3 border-b border-[#e7e5e4]">
              <div>
                <div className="text-xs font-semibold text-[#0f2d4a]">
                  {selectedCourse.code} · {selectedCourse.credits}
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1c1917]">
                  {selectedCourse.title}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedCourse(null)}
                className="text-[#78716c] hover:text-[#1c1917] p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-4 text-xs text-[#57534e]">
              <div>
                <div className="font-semibold text-[#1c1917] mb-1">Course Description</div>
                <p className="leading-relaxed">{selectedCourse.description}</p>
              </div>

              <div>
                <div className="font-semibold text-[#1c1917] mb-1">Prerequisites & Target Audience</div>
                <p>{selectedCourse.prerequisites} · {selectedCourse.level}</p>
              </div>

              <div>
                <div className="font-semibold text-[#1c1917] mb-2">Grading Policy & Weighting</div>
                <div className="bg-[#fafaf9] border border-[#e7e5e4] rounded-md overflow-hidden">
                  <table className="w-full text-left">
                    <tbody className="divide-y divide-[#e7e5e4]">
                      {selectedCourse.grading.map((g, i) => (
                        <tr key={i}>
                          <td className="py-2 px-3">{g.item}</td>
                          <td className="py-2 px-3 text-right font-mono font-semibold text-[#1c1917]">{g.weight}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <div className="font-semibold text-[#1c1917] mb-2">Complete Curriculum Units</div>
                <ol className="list-decimal pl-4 space-y-1.5 text-xs text-[#44403c]">
                  {selectedCourse.syllabus.map((topic, i) => (
                    <li key={i}>{topic}</li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="pt-4 border-t border-[#e7e5e4] flex items-center justify-between">
              <span className="text-[11px] text-[#78716c]">Meeting Time: {selectedCourse.period}</span>
              <button 
                onClick={() => setSelectedCourse(null)}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-[#0f2d4a] hover:bg-[#164268] rounded-md transition-colors cursor-pointer"
              >
                Close Syllabus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EXPORT / GET SINGLE HTML FILE MODAL */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="bg-white border border-[#e7e5e4] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl">
            <div className="flex items-start justify-between pb-3 border-b border-[#e7e5e4]">
              <div>
                <div className="text-xs font-semibold text-[#0f2d4a] flex items-center gap-1">
                  <Code className="w-3.5 h-3.5" />
                  <span>Pure Standalone Template</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#1c1917]">
                  Single-File HTML Code (With Embedded CSS)
                </h3>
              </div>
              <button 
                onClick={() => setShowExportModal(false)}
                className="text-[#78716c] hover:text-[#1c1917] p-1 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#57534e] mt-3 leading-relaxed">
              As requested, here is your 100% self-contained single HTML file with embedded CSS styling. It contains all sections for your bio, classes, schedule, and contact info in one clean file with zero external framework dependencies. You can download it directly, double-click to view in any browser, or host it on any static server.
            </p>

            {/* Quick Actions */}
            <div className="my-4 flex flex-wrap gap-2.5">
              <button 
                onClick={copyToClipboard}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#0f2d4a] hover:bg-[#164268] rounded-md transition-colors cursor-pointer shadow-xs"
              >
                {copiedCode ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode ? 'Copied to Clipboard!' : 'Copy Entire HTML'}</span>
              </button>

              <button 
                onClick={downloadHTMLFile}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-[#1c1917] bg-white border border-[#e7e5e4] hover:bg-[#f5f5f4] rounded-md transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#0f2d4a]" />
                <span>Download math-teacher-portfolio.html</span>
              </button>

              <a 
                href="/math-teacher-template.html" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#57534e] hover:text-[#1c1917] hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Clean Static Preview</span>
              </a>
            </div>

            {/* Code Preview Box */}
            <div className="relative">
              <pre className="bg-[#1c1917] text-[#e7e5e4] p-4 rounded-md text-[11px] font-mono overflow-x-auto max-h-72 border border-[#292524] select-all">
                {generateStandaloneHTML()}
              </pre>
            </div>

            <div className="mt-4 pt-3 border-t border-[#e7e5e4] flex justify-end">
              <button 
                onClick={() => setShowExportModal(false)}
                className="px-4 py-1.5 text-xs font-medium text-[#57534e] hover:text-[#1c1917] cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOMIZE DETAILS DRAWER */}
      {showCustomizer && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/30 backdrop-blur-xs">
          <div className="bg-white border-l border-[#e7e5e4] w-full max-w-md h-full overflow-y-auto p-6 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#e7e5e4] mb-4">
                <div>
                  <div className="text-xs font-semibold text-[#0f2d4a] flex items-center gap-1">
                    <Sliders className="w-3.5 h-3.5" />
                    <span>Quick Editor</span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[#1c1917]">
                    Personalize Teacher Profile
                  </h3>
                </div>
                <button 
                  onClick={() => setShowCustomizer(false)}
                  className="text-[#78716c] hover:text-[#1c1917] p-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-[#57534e] mb-4">
                Update your name, school, email, or degrees. The entire website and exported single HTML file will update instantly.
              </p>

              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-medium text-[#1c1917] mb-1">Your Full Name & Degree</label>
                  <input 
                    type="text" 
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-[#e7e5e4] rounded-md outline-none focus:border-[#0f2d4a]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#1c1917] mb-1">Official Academic Title</label>
                  <input 
                    type="text" 
                    value={profile.title}
                    onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-[#e7e5e4] rounded-md outline-none focus:border-[#0f2d4a]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#1c1917] mb-1">School / Department</label>
                  <input 
                    type="text" 
                    value={profile.institution}
                    onChange={(e) => setProfile({ ...profile, institution: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-[#e7e5e4] rounded-md outline-none focus:border-[#0f2d4a]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#1c1917] mb-1">Email Address</label>
                  <input 
                    type="email" 
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-[#e7e5e4] rounded-md outline-none focus:border-[#0f2d4a]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#1c1917] mb-1">Classroom / Office Room</label>
                  <input 
                    type="text" 
                    value={profile.office}
                    onChange={(e) => setProfile({ ...profile, office: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-[#e7e5e4] rounded-md outline-none focus:border-[#0f2d4a]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#1c1917] mb-1">Years Experience / Badge</label>
                  <input 
                    type="text" 
                    value={profile.yearsExp}
                    onChange={(e) => setProfile({ ...profile, yearsExp: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-[#e7e5e4] rounded-md outline-none focus:border-[#0f2d4a]"
                  />
                </div>

                <div>
                  <label className="block font-medium text-[#1c1917] mb-1">Headline Bio Quote</label>
                  <textarea 
                    rows={3}
                    value={profile.bioLead}
                    onChange={(e) => setProfile({ ...profile, bioLead: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-[#e7e5e4] rounded-md outline-none focus:border-[#0f2d4a]"
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#e7e5e4] flex items-center justify-between">
              <button 
                onClick={() => {
                  setProfile({
                    name: 'Prof. Isuru Bandara',
                    title: 'Mathematics Educator & Curriculum Lead',
                    institution: 'Oakwood Academy · Department of Mathematics',
                    email: 'isurumbandara@gmail.com',
                    phone: '+1 (555) 482-9102 (Ext. 408)',
                    office: 'Hall 304 / Office 312',
                    officeHours: 'Tuesdays & Thursdays, 14:00 – 16:00 (or by appointment)',
                    bioLead: 'Demystifying advanced mathematics through visual intuition, rigorous deduction, and genuine curiosity.',
                    yearsExp: '12+ Years Teaching',
                    degree: 'M.Sc. in Applied Mathematics',
                    secondaryCert: 'AP & STEM Certified'
                  });
                }}
                className="text-xs text-[#78716c] hover:underline cursor-pointer"
              >
                Reset Defaults
              </button>

              <button 
                onClick={() => setShowCustomizer(false)}
                className="px-4 py-1.5 text-xs font-semibold text-white bg-[#0f2d4a] hover:bg-[#164268] rounded-md transition-colors cursor-pointer"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

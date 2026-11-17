import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  Mail,
  MapPin,
  Moon,
  Send,
  Sun,
  Type,
} from 'lucide-react';
import {
  FONT_SPECIMENS,
  HERO_IMAGE,
  PROJECTS,
  STUDIO_METRICS,
  TEAM_MEMBERS,
  type FontMood,
  type ProjectCategory,
  type ProjectItem,
  type TeamMember,
} from './data/portfolioData';
import { ResilientImage } from './components/ResilientImage';
import { ProjectModal } from './components/ProjectModal';
import { TeamMemberModal } from './components/TeamMemberModal';

const CATEGORY_TABS: { id: ProjectCategory; label: string }[] = [
  { id: 'all', label: 'All Works' },
  { id: 'web', label: 'Web Systems' },
  { id: 'brand', label: 'Brand & Print' },
  { id: 'editorial', label: 'Editorial' },
];

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const [activeFontMood, setActiveFontMood] = useState<FontMood>('serif');
  const [specimenText, setSpecimenText] = useState(
    'Welcome to My Creative Workspace — Built with Darshan, Meghana, Deeksha & Sinchan'
  );
  const [specimenSize, setSpecimenSize] = useState(32);

  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactTopic, setContactTopic] = useState('Web Architecture');
  const [contactMessage, setContactMessage] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [submittedNote, setSubmittedNote] = useState<{
    name: string;
    topic: string;
    timestamp: string;
  } | null>(null);

  const nameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const filteredProjects =
    activeCategory === 'all'
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeCategory);

  const activeSpecimen =
    FONT_SPECIMENS.find((item) => item.id === activeFontMood) ?? FONT_SPECIMENS[1];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('sachingouda042@gmail.com');
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(false);
    }
  };

  const scrollToContactWithTopic = (topic?: string) => {
    if (topic) {
      setContactTopic(topic);
      setContactMessage(`Hello, I would like to discuss a project similar to "${topic}".`);
    }
    const contactEl = document.getElementById('contact');
    contactEl?.scrollIntoView({ behavior: 'smooth' });
    window.setTimeout(() => nameInputRef.current?.focus(), 350);
  };

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedName = contactName.trim();
    const trimmedEmail = contactEmail.trim();
    const trimmedMessage = contactMessage.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setFormError('Please complete your name, email address, and project message.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setFormError('Please enter a valid email address.');
      return;
    }

    setFormError(null);
    setSubmittedNote({
      name: trimmedName,
      topic: contactTopic,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
    setContactName('');
    setContactEmail('');
    setContactMessage('');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] transition-colors duration-200 dark:bg-[#09090B] dark:text-[#F4F4F5]">
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-[#FAFAFA]/95 backdrop-blur-sm dark:border-zinc-800 dark:bg-[#09090B]/95">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-8 px-6">
          <a
            href="#top"
            className="font-display text-lg font-bold tracking-tight text-zinc-900 whitespace-nowrap shrink-0 dark:text-zinc-50"
          >
            Creative Workspace
          </a>

          <nav
            aria-label="Primary Navigation"
            className="hidden items-center gap-7 text-sm font-medium text-zinc-600 md:flex dark:text-zinc-400"
          >
            <a
              href="#projects"
              className="transition-colors hover:text-zinc-950 hover:underline hover:underline-offset-4 whitespace-nowrap shrink-0 dark:hover:text-white"
            >
              Projects
            </a>
            <a
              href="#team"
              className="transition-colors hover:text-zinc-950 hover:underline hover:underline-offset-4 whitespace-nowrap shrink-0 dark:hover:text-white"
            >
              Team
            </a>
            <a
              href="#typography"
              className="transition-colors hover:text-zinc-950 hover:underline hover:underline-offset-4 whitespace-nowrap shrink-0 dark:hover:text-white"
            >
              Typography
            </a>
            <a
              href="#contact"
              className="transition-colors hover:text-zinc-950 hover:underline hover:underline-offset-4 whitespace-nowrap shrink-0 dark:hover:text-white"
            >
              Contact
            </a>
          </nav>

          <div className="shrink-0">
            <button
              type="button"
              onClick={() => scrollToContactWithTopic()}
              className="rounded-lg bg-[#2563EB] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] whitespace-nowrap shrink-0"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* Split-Screen Hero */}
        <section className="mx-auto max-w-6xl px-6 pt-12 pb-10 lg:pt-16 lg:pb-14">
          <div className="grid items-stretch gap-10 lg:grid-cols-12">
            <div className="flex flex-col justify-between lg:col-span-7">
              <div>
                <p className="font-mono-spec text-xs font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
                  Personal Portfolio · Studio Index · 2026
                </p>

                <h1 className="font-display mt-4 max-w-2xl text-[clamp(2.35rem,4.3vw,3.85rem)] font-extrabold leading-[1.06] tracking-tight text-balance text-zinc-950 dark:text-white">
                  Welcome to My Creative Workspace
                </h1>

                <p
                  className={`${activeSpecimen.cssClass} mt-5 text-xl leading-snug text-zinc-800 sm:text-2xl dark:text-zinc-200 ${
                    activeFontMood === 'serif' ? 'italic' : ''
                  }`}
                >
                  This is a website for Darshan, Meghana, Deeksha, and Sinchan.
                </p>

                <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                  A curated showcase of interactive web systems, architectural brand identities, and
                  editorial publications engineered with clean HTML, modular CSS, and TypeScript.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-lg bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] whitespace-nowrap shrink-0 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                >
                  <span>Explore Projects</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <a
                  href="#typography"
                  className="inline-flex items-center gap-2 rounded-lg border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-800 transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] whitespace-nowrap shrink-0 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-900"
                >
                  <Type className="h-4 w-4" aria-hidden="true" />
                  <span>Try Font Studio</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="h-full min-h-[300px] overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900">
                <ResilientImage
                  src={HERO_IMAGE}
                  alt="Minimalist architectural design studio desk with monitor and sketchbook"
                  title="Creative Workspace Studio"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Full-width 4-column studio metrics strip below split hero */}
          <div className="mt-12 grid grid-cols-2 gap-6 border-t border-b border-zinc-200 py-7 sm:grid-cols-4 dark:border-zinc-800">
            {STUDIO_METRICS.map((metric) => (
              <div key={metric.label}>
                <p className="font-mono-spec text-2xl font-medium tracking-tight text-zinc-950 tabular-nums sm:text-3xl dark:text-white">
                  {metric.value}
                </p>
                <p className="mt-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Subtle Editorial Marquee Divider */}
        <div
          aria-hidden="true"
          className="overflow-hidden border-b border-zinc-200 bg-white py-3 text-xs text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400"
        >
          <div className="animate-marquee font-serif-editorial italic tracking-wide">
            <span className="mx-6">
              Selected Works · Interactive Web · Editorial Typography · Darshan · Meghana · Deeksha · Sinchan
            </span>
            <span className="mx-6">
              Selected Works · Interactive Web · Editorial Typography · Darshan · Meghana · Deeksha · Sinchan
            </span>
            <span className="mx-6">
              Selected Works · Interactive Web · Editorial Typography · Darshan · Meghana · Deeksha · Sinchan
            </span>
            <span className="mx-6">
              Selected Works · Interactive Web · Editorial Typography · Darshan · Meghana · Deeksha · Sinchan
            </span>
          </div>
        </div>

        {/* Selected Projects Bento Grid */}
        <section id="projects" className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono-spec text-xs text-zinc-500 dark:text-zinc-400">
                01. Portfolio Showcase
              </p>
              <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
                Selected Professional Projects
              </h2>
            </div>

            <div
              role="tablist"
              aria-label="Filter projects by category"
              className="flex flex-wrap items-center gap-1 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-900"
            >
              {CATEGORY_TABS.map((tab) => {
                const isActive = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(tab.id)}
                    className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
                      isActive
                        ? 'bg-white text-zinc-950 shadow-xs dark:bg-zinc-800 dark:text-white'
                        : 'text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className={`group flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-transform duration-200 hover:-translate-y-0.5 dark:border-zinc-800 dark:bg-zinc-950 ${
                  project.featured && activeCategory === 'all' ? 'md:col-span-2' : ''
                }`}
              >
                <div>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
                    aria-label={`Open case study for ${project.title}`}
                  >
                    <div
                      className={`overflow-hidden border-b border-zinc-200 dark:border-zinc-800 ${
                        project.featured && activeCategory === 'all'
                          ? 'aspect-[16/9]'
                          : 'aspect-[4/3]'
                      }`}
                    >
                      <ResilientImage
                        src={project.imageUrl}
                        alt={project.title}
                        title={project.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                    </div>
                  </button>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                      <span className="font-mono-spec tabular-nums">{project.code}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono-spec tabular-nums">{project.year}</span>
                    </div>

                    <h3 className="font-display mt-3 text-xl font-bold tracking-tight text-zinc-950 dark:text-white">
                      {project.title}
                    </h3>

                    <p className="mt-2.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {project.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-zinc-100 px-6 py-4 dark:border-zinc-900">
                  <span className="font-serif-editorial text-sm italic text-zinc-600 dark:text-zinc-400">
                    Lead: {project.leadContributor}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563EB] transition-colors hover:text-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] whitespace-nowrap shrink-0"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Interactive Typography & Theme Studio */}
        <section
          id="typography"
          className="border-t border-b border-zinc-200 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950"
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="font-mono-spec text-xs text-zinc-500 dark:text-zinc-400">
                  02. Interactive Type &amp; Surface Controls
                </p>
                <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
                  Explore Different Fonts &amp; Reading Modes
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Switch typefaces below to preview how architectural sans, editorial serif,
                  geometric body, and monospace specimens transform the workspace voice.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsDark((prev) => !prev)}
                className="inline-flex items-center gap-2 self-start rounded-lg border border-zinc-300 bg-[#FAFAFA] px-4 py-2 text-xs font-semibold text-zinc-800 transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] whitespace-nowrap shrink-0 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
              >
                {isDark ? (
                  <>
                    <Sun className="h-4 w-4" aria-hidden="true" />
                    <span>Switch to Light Paper</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4" aria-hidden="true" />
                    <span>Switch to Dark Slate</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-12">
              <div className="space-y-3 lg:col-span-5">
                {FONT_SPECIMENS.map((font) => {
                  const selected = font.id === activeFontMood;
                  return (
                    <button
                      key={font.id}
                      type="button"
                      onClick={() => setActiveFontMood(font.id)}
                      className={`w-full rounded-xl border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] ${
                        selected
                          ? 'border-[#2563EB] bg-blue-50/50 dark:border-[#2563EB] dark:bg-blue-950/20'
                          : 'border-zinc-200 bg-[#FAFAFA] hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className={`${font.cssClass} text-lg font-semibold text-zinc-950 dark:text-white`}>
                          {font.familyName}
                        </span>
                        <span className="font-mono-spec text-xs text-zinc-500 dark:text-zinc-400">
                          {selected ? 'Active' : 'Preview'}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                        {font.classification} · {font.pairingNote}
                      </p>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col justify-between rounded-2xl border border-zinc-200 bg-[#FAFAFA] p-6 sm:p-8 lg:col-span-7 dark:border-zinc-800 dark:bg-zinc-900/50">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200 pb-4 dark:border-zinc-800">
                    <span className="font-mono-spec text-xs text-zinc-500 dark:text-zinc-400">
                      Live Specimen · {activeSpecimen.familyName} · {specimenSize}px
                    </span>
                    <div className="flex items-center gap-3">
                      <label
                        htmlFor="font-size-slider"
                        className="text-xs font-medium text-zinc-600 dark:text-zinc-400"
                      >
                        Scale
                      </label>
                      <input
                        id="font-size-slider"
                        type="range"
                        min={20}
                        max={48}
                        value={specimenSize}
                        onChange={(e) => setSpecimenSize(Number(e.target.value))}
                        className="h-1.5 w-28 cursor-pointer accent-[#2563EB]"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label
                      htmlFor="live-specimen-input"
                      className="block text-xs font-medium text-zinc-500 dark:text-zinc-400"
                    >
                      Type custom text to test typeface rendering
                    </label>
                    <input
                      id="live-specimen-input"
                      type="text"
                      value={specimenText}
                      onChange={(e) => setSpecimenText(e.target.value)}
                      className="mt-2 w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2 text-sm text-zinc-900 focus:border-[#2563EB] focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
                    />
                  </div>

                  <p
                    style={{ fontSize: `${specimenSize}px` }}
                    className={`${activeSpecimen.cssClass} mt-6 leading-[1.2] tracking-tight text-zinc-950 break-words dark:text-white ${
                      activeSpecimen.id === 'serif' ? 'italic' : ''
                    }`}
                  >
                    {specimenText || 'Welcome to My Creative Workspace'}
                  </p>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-zinc-200 pt-5 sm:grid-cols-4 dark:border-zinc-800">
                  {FONT_SPECIMENS.map((item) => (
                    <div key={item.id}>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.label}</p>
                      <p className={`${item.cssClass} mt-1 text-base font-semibold text-zinc-900 dark:text-zinc-100`}>
                        Aa Bb 123
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team & Collaborators Section */}
        <section id="team" className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-2xl">
            <p className="font-mono-spec text-xs text-zinc-500 dark:text-zinc-400">
              03. Studio Collaborators
            </p>
            <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
              Crafted for Darshan, Meghana, Deeksha &amp; Sinchan
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Select any team profile below to inspect core disciplines, featured project work, and
              key deliverables.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM_MEMBERS.map((member) => (
              <button
                key={member.id}
                type="button"
                onClick={() => setSelectedMember(member)}
                className="group flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-6 text-left transition-colors hover:border-zinc-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-600"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-950 font-display text-sm font-bold text-white dark:bg-zinc-100 dark:text-zinc-950">
                      {member.initials}
                    </div>
                    <ArrowUpRight
                      className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-900 dark:group-hover:text-white"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="font-serif-editorial mt-5 text-2xl font-semibold text-zinc-950 dark:text-white">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    {member.role}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {member.bio}
                  </p>
                </div>

                <div className="mt-6 border-t border-zinc-100 pt-4 dark:border-zinc-900">
                  <p className="font-mono-spec text-xs font-medium text-zinc-700 tabular-nums dark:text-zinc-300">
                    {member.highlightMetric}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Contact Information & Interactive Inquiry Form */}
        <section
          id="contact"
          className="border-t border-zinc-200 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950"
        >
          <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="font-mono-spec text-xs text-zinc-500 dark:text-zinc-400">
                04. Contact Information
              </p>
              <h2 className="font-display mt-2 text-3xl font-bold tracking-tight text-zinc-950 dark:text-white">
                Start a Conversation
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Available for web architecture engagements, design systems, and collaborative studio
                commissions. Reach out directly or send a project brief.
              </p>

              <div className="mt-8 space-y-5 border-t border-zinc-200 pt-6 dark:border-zinc-800">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 text-zinc-500" aria-hidden="true" />
                    <div>
                      <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Email</p>
                      <a
                        href="mailto:sachingouda042@gmail.com"
                        className="mt-0.5 block text-sm font-semibold text-zinc-950 hover:underline dark:text-white"
                      >
                        sachingouda042@gmail.com
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] whitespace-nowrap shrink-0 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-900"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-zinc-500" aria-hidden="true" />
                  <div>
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">Studio</p>
                    <p className="mt-0.5 text-sm font-semibold text-zinc-950 dark:text-white">
                      Bengaluru, India · Remote Worldwide
                    </p>
                  </div>
                </div>

                <div className="border-t border-zinc-200 pt-5 text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                  Studio Hours: Monday – Friday · 09:30 – 18:30 IST · Typical response within 1
                  business day.
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-zinc-200 bg-[#FAFAFA] p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900/50">
                {submittedNote ? (
                  <div className="py-6">
                    <p className="font-mono-spec text-xs text-emerald-700 dark:text-emerald-400">
                      Inquiry Received · {submittedNote.timestamp}
                    </p>
                    <h3 className="font-display mt-2 text-2xl font-bold text-zinc-950 dark:text-white">
                      Thank you, {submittedNote.name}.
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                      Your message regarding <span className="font-semibold">{submittedNote.topic}</span>{' '}
                      has been recorded in this workspace session. You can also follow up directly at
                      sachingouda042@gmail.com.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmittedNote(null)}
                      className="mt-6 rounded-lg bg-zinc-950 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} noValidate className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                        >
                          Your Name
                        </label>
                        <input
                          ref={nameInputRef}
                          id="contact-name"
                          type="text"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Full name"
                          className="mt-1.5 w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 focus:border-[#2563EB] focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                        >
                          Email Address
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          placeholder="you@company.com"
                          className="mt-1.5 w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 focus:border-[#2563EB] focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-topic"
                        className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                      >
                        Project Scope
                      </label>
                      <select
                        id="contact-topic"
                        value={contactTopic}
                        onChange={(e) => setContactTopic(e.target.value)}
                        className="mt-1.5 w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 focus:border-[#2563EB] focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
                      >
                        <option value="Web Architecture">Web Architecture &amp; Frontend</option>
                        <option value="Brand & Print">Brand Identity &amp; Design System</option>
                        <option value="Editorial Design">Editorial Monograph &amp; Typography</option>
                        <option value="General Inquiry">General Collaboration</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
                      >
                        Project Brief
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="Share timeline, goals, and key deliverables..."
                        className="mt-1.5 w-full rounded-lg border border-zinc-300 bg-white px-3.5 py-2.5 text-sm text-zinc-900 focus:border-[#2563EB] focus:outline-none dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
                      />
                    </div>

                    {formError ? (
                      <p role="alert" className="text-xs font-medium text-rose-600 dark:text-rose-400">
                        {formError}
                      </p>
                    ) : null}

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-lg bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB] whitespace-nowrap shrink-0"
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                      <span>Send Message</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="border-t border-zinc-200 py-8 dark:border-zinc-800">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 text-xs text-zinc-500 sm:flex-row sm:items-center dark:text-zinc-400">
          <p>
            © 2026 Creative Workspace · Featuring Darshan, Meghana, Deeksha &amp; Sinchan
          </p>
          <div className="flex items-center gap-6">
            <a href="#projects" className="hover:text-zinc-900 dark:hover:text-white">
              Projects
            </a>
            <a href="#team" className="hover:text-zinc-900 dark:hover:text-white">
              Team
            </a>
            <a href="#contact" className="hover:text-zinc-900 dark:hover:text-white">
              Contact
            </a>
            <a href="#top" className="font-medium hover:text-zinc-900 dark:hover:text-white">
              Back to Top
            </a>
          </div>
        </div>
      </footer>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={(title) => scrollToContactWithTopic(title)}
      />
      <TeamMemberModal member={selectedMember} onClose={() => setSelectedMember(null)} />
    </div>
  );
}

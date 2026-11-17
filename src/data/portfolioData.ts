export type ProjectCategory = 'all' | 'web' | 'brand' | 'editorial';

export interface ProjectItem {
  id: string;
  code: string;
  title: string;
  category: Exclude<ProjectCategory, 'all'>;
  categoryLabel: string;
  year: string;
  client: string;
  leadContributor: string;
  summary: string;
  description: string;
  deliverables: string[];
  outcomeMetric: string;
  imageUrl: string;
  featured?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  discipline: string;
  bio: string;
  focusAreas: string[];
  highlightMetric: string;
  featuredProject: string;
}

export type FontMood = 'display' | 'serif' | 'sans' | 'mono';

export interface FontSpecimen {
  id: FontMood;
  label: string;
  familyName: string;
  classification: string;
  cssClass: string;
  sampleLine: string;
  pairingNote: string;
}

export const HERO_IMAGE = '/src/assets/images/hero_creative_workspace_1794938118056.jpg';

export const STUDIO_METRICS = [
  { label: 'Shipped Projects', value: '24+' },
  { label: 'Core Collaborators', value: '04' },
  { label: 'Performance Score', value: '99.8%' },
  { label: 'Design Systems Built', value: '12' },
];

export const FONT_SPECIMENS: FontSpecimen[] = [
  {
    id: 'display',
    label: 'Bricolage Display',
    familyName: 'Bricolage Grotesque',
    classification: 'Architectural Neo-Grotesque',
    cssClass: 'font-display',
    sampleLine: 'Welcome to My Creative Workspace',
    pairingNote: 'Bold optical display face engineered for crisp portfolio headlines.',
  },
  {
    id: 'serif',
    label: 'Playfair Editorial',
    familyName: 'Playfair Display',
    classification: 'High-Contrast Editorial Serif',
    cssClass: 'font-serif-editorial',
    sampleLine: 'Crafted with Darshan, Meghana, Deeksha & Sinchan',
    pairingNote: 'Expressive monograph serif used for collaborator attributions and pull quotes.',
  },
  {
    id: 'sans',
    label: 'Jakarta Geometric',
    familyName: 'Plus Jakarta Sans',
    classification: 'Humanist Geometric Sans',
    cssClass: 'font-sans-body',
    sampleLine: 'Clean interfaces built with precision and clarity.',
    pairingNote: 'Balanced body typeface optimized for multi-paragraph project narratives.',
  },
  {
    id: 'mono',
    label: 'JetBrains Technical',
    familyName: 'JetBrains Mono',
    classification: 'Tabular Monospace',
    cssClass: 'font-mono-spec',
    sampleLine: 'PRJ-01 // 2026 // 60FPS INTERACTIVE GRID',
    pairingNote: 'Strictly reserved for tabular metrics, index codes, and technical specs.',
  },
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'monolith-grid',
    code: '01',
    title: 'Grid Architecture & Design System',
    category: 'web',
    categoryLabel: 'Web Systems',
    year: '2026',
    client: 'Kinetix Digital Studio',
    leadContributor: 'Darshan & Sinchan',
    summary:
      'Modular frontend architecture and accessible component library powering multi-brand editorial websites.',
    description:
      'Engineered a high-contrast Swiss grid web platform with zero-latency route transitions, keyboard-first navigation, and strict WCAG AA contrast tokens across light and dark modes.',
    deliverables: ['Interactive UI Kit', 'TypeScript Architecture', 'Accessibility Audit'],
    outcomeMetric: '42% faster page load across 18 production views',
    imageUrl: '/src/assets/images/project_product_platform_1794938119257.jpg',
    featured: true,
  },
  {
    id: 'atelier-stationery',
    code: '02',
    title: 'Architectural Identity & Tactile Print',
    category: 'brand',
    categoryLabel: 'Brand & Print',
    year: '2026',
    client: 'Atelier North',
    leadContributor: 'Meghana',
    summary:
      'Bespoke visual identity, cotton stationery suite, and minimalist packaging system for an architectural practice.',
    description:
      'Developed an enduring monogram, debossed tactile stationery guidelines, and a restrained monochromatic palette rooted in limestone, matte charcoal, and crisp architectural typography.',
    deliverables: ['Monogram System', 'Print Production Specs', 'Brand Guidelines'],
    outcomeMetric: 'Featured in 3 international design annuals',
    imageUrl: '/src/assets/images/project_brand_identity_1794938117864.jpg',
  },
  {
    id: 'monograph-volume',
    code: '03',
    title: 'Spatial Forms Editorial Monograph',
    category: 'editorial',
    categoryLabel: 'Editorial',
    year: '2025',
    client: 'Modern Form Gallery',
    leadContributor: 'Deeksha',
    summary:
      'A 220-page curated photography monograph and companion digital exhibition index.',
    description:
      'Structured typographic hierarchy pairing Playfair Display section openers with balanced archival photography grids, captioning rules, and an interactive digital exhibition companion.',
    deliverables: ['Book Typography', 'Exhibition Companion', 'Curatorial Index'],
    outcomeMetric: '2,500 first-edition copies sold out in 6 weeks',
    imageUrl: '/src/assets/images/project_editorial_campaign_1794938118541.jpg',
  },
  {
    id: 'kinetic-refraction',
    code: '04',
    title: 'Kinetic Glass Exhibition Interface',
    category: 'web',
    categoryLabel: 'Web Systems',
    year: '2025',
    client: 'Spectrum Pavilion',
    leadContributor: 'Darshan & Meghana',
    summary:
      'Interactive gallery guide and spatial light installation microsite with real-time schedule filtering.',
    description:
      'Built an interactive visitor companion allowing gallery guests to inspect light installation diagrams, filter curator notes, and reserve timed exhibition slots directly from any device.',
    deliverables: ['Interactive Microsite', 'Motion Choreography', 'Mobile Wayfinding'],
    outcomeMetric: '18,400+ interactive visitor sessions logged',
    imageUrl: '/src/assets/images/project_motion_studio_1794938119192.jpg',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'darshan',
    name: 'Darshan',
    initials: 'DA',
    role: 'Lead Frontend Engineer',
    discipline: 'Interactive Web & Systems',
    bio: 'Architects responsive HTML, CSS, and TypeScript interfaces with a focus on sub-200ms interactions and accessible component primitives.',
    focusAreas: ['Frontend Architecture', 'Interaction Motion', 'Performance Tuning'],
    highlightMetric: '14 Web Platforms Shipped',
    featuredProject: 'Grid Architecture & Design System',
  },
  {
    id: 'meghana',
    name: 'Meghana',
    initials: 'ME',
    role: 'Visual & Brand Designer',
    discipline: 'Brand Identity & Print',
    bio: 'Crafts disciplined visual identities, packaging systems, and spatial color palettes anchored in editorial restraint.',
    focusAreas: ['Brand Systems', 'Art Direction', 'Print Production'],
    highlightMetric: '9 Complete Brand Launches',
    featuredProject: 'Architectural Identity & Tactile Print',
  },
  {
    id: 'deeksha',
    name: 'Deeksha',
    initials: 'DE',
    role: 'Editorial & Typography Lead',
    discipline: 'Editorial Design & Content',
    bio: 'Directs multi-font typographic pairings, editorial grid layouts, and long-form storytelling across print and digital monographs.',
    focusAreas: ['Typographic Systems', 'Editorial Grids', 'Visual Storytelling'],
    highlightMetric: '220+ Editorial Spreads Designed',
    featuredProject: 'Spatial Forms Editorial Monograph',
  },
  {
    id: 'sinchan',
    name: 'Sinchan',
    initials: 'SI',
    role: 'Creative Systems Developer',
    discipline: 'UI Engineering & Tooling',
    bio: 'Bridges visual design and production code by building modular CSS token pipelines, theme engines, and interactive prototypes.',
    focusAreas: ['Design Tokens', 'CSS Engineering', 'Prototype Systems'],
    highlightMetric: '99.8% Accessibility Pass Rate',
    featuredProject: 'Grid Architecture & Design System',
  },
];

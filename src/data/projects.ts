export type Project = {
  slug: string;
  title: string;
  categories: string[];
  tools: string[];
  year: string;
  href: string;
  cover: string;
  /** Chemin optionnel vers un .riv joué au survol de la ligne */
  riveHover?: string;
};

export const projects: Project[] = [
  {
    slug: 'dn-interiores',
    title: 'DN Interiores',
    categories: ['Web', 'UI'],
    tools: ['Framer', 'Figma'],
    year: '2024',
    href: 'https://dninteriores.framer.website/',
    cover: '/images/projects/dn-interiores.jpg',
    riveHover: '/rive/floral.riv',
  },
  {
    slug: 'salty-flamingos',
    title: 'The Salty Flamingos',
    categories: ['Branding', 'Interactive design'],
    tools: ['Rive', 'Figma'],
    year: '2025',
    href: '#',
    cover: '/images/projects/salty-flamingos.jpg',
    riveHover: '/rive/dataprotect.riv',
  },
  {
    slug: 'maison-boule',
    title: 'Maison Boulé',
    categories: ['Branding', 'Print'],
    tools: ['Figma', 'Blender'],
    year: '2024',
    href: '#',
    cover: '/images/projects/maison-boule.jpg',
  },
  {
    slug: 'motion-system',
    title: 'Système de motion — étude',
    categories: ['Interactive design'],
    tools: ['Rive'],
    year: '2023',
    href: '#',
    cover: '/images/projects/motion-system.jpg',
    riveHover: '/rive/chocolat_cart3.riv',
  },
  {
    slug: 'print-identity',
    title: 'Identité imprimée',
    categories: ['Print', 'Branding'],
    tools: ['Figma'],
    year: '2023',
    href: '#',
    cover: '/images/projects/print-identity.jpg',
  },
  {
    slug: 'ui-kit',
    title: 'Kit UI produit',
    categories: ['UI', 'Web'],
    tools: ['Figma', 'Framer'],
    year: '2022',
    href: '#',
    cover: '/images/projects/ui-kit.jpg',
  },
];

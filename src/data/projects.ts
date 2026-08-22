export type Project = {
  slug: string;
  title: string;
  categories: string[];
  tools: string[];
  year: string;
  href: string;
  cover: string;
  /** Chemin vers le .riv affiché en plein cadre (fill) sur la carte */
  riveHover?: string;
};

// Chaque entrée correspond à un fichier .riv réellement présent dans public/rive/.
// Ajuste titre / catégories / outils / lien librement, les noms de fichiers
// dans `riveHover` doivent juste rester alignés avec public/rive/.
export const projects: Project[] = [
  {
    slug: 'dataprotect',
    title: 'DataProtect',
    categories: ['Branding', 'Interactive design'],
    tools: ['Rive', 'Figma'],
    year: '2025',
    href: '#',
    cover: '/images/projects/dataprotect.jpg',
    riveHover: '/rive/dataprotect.riv',
  },
  {
    slug: 'chocolat-cart',
    title: 'Chocolat Cart',
    categories: ['Branding', 'Interactive design'],
    tools: ['Rive', 'Figma'],
    year: '2025',
    href: '#',
    cover: '/images/projects/chocolat-cart.jpg',
    riveHover: '/rive/chocolat_cart3.riv',
  },
  {
    slug: 'floral',
    title: 'Floral',
    categories: ['Branding', 'Interactive design'],
    tools: ['Rive', 'Figma'],
    year: '2024',
    href: '#',
    cover: '/images/projects/floral.jpg',
    riveHover: '/rive/floral.riv',
  },
  {
    slug: 'swiss-knife',
    title: 'Swiss Knife',
    categories: ['Interactive design', 'UI'],
    tools: ['Rive', 'Figma'],
    year: '2024',
    href: '#',
    cover: '/images/projects/swiss-knife.jpg',
    riveHover: '/rive/swiss_knife.riv',
  },
];

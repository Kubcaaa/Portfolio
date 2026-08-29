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
  /**
   * Nom EXACT de l'artboard à charger dans le .riv (sensible à la casse).
   * Laisse vide si le fichier n'a qu'un seul artboard — Rive chargera celui
   * par défaut. Utile quand le fichier en contient plusieurs, comme sur ta
   * config Framer (ex: "Twitter post - 1" pour dataprotect.riv).
   */
  riveArtboard?: string;
  /**
   * Nom EXACT de la State Machine à jouer sur cet artboard (sensible à la
   * casse). Laisse vide pour que RiveEmbed détecte et joue automatiquement
   * toutes les State Machines trouvées sur l'artboard chargé.
   */
  riveStateMachine?: string;
  /** Hauteur fixe de la carte en pixels, copiée depuis la config Framer de ce projet */
  riveHeight: number;
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
    // Config reprise telle quelle depuis ton composant RivePlayer sur Framer.
    riveArtboard: 'Twitter post - 1',
    riveStateMachine: 'State Machine 1',
    riveHeight: 544,
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
    // TODO: si ce fichier a plusieurs artboards sur Framer, remplis
    // riveArtboard / riveStateMachine avec les mêmes valeurs exactes.
    riveHeight: 518,
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
    riveHeight: 378,
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
    riveHeight: 544,
  },
];

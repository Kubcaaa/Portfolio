/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14171F', // texte / fond sombre
        paper: '#FFFFFF', // fond principal, blanc
        flare: '#FF4B2B', // accent principal, orange-rouge vif
        signal: '#00C2A8', // accent secondaire, sarcelle
        muted: '#6E6B5C', // texte secondaire
        line: '#D8D2BE', // filets / bordures
      },
      fontFamily: {
        display: ['"Clash Display"', 'sans-serif'],
        body: ['"Switzer"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        widest2: '0.18em',
      },
      screens: {
        xs: '420px',
      },
      borderRadius: {
        // Échelle de radius unique pour tout le site, sur le modèle des
        // pills catégories: 16px pour les contenants principaux (pills,
        // boutons, cartes projet), 8px — la moitié — pour les badges
        // d'icônes imbriqués à l'intérieur. Utiliser rounded-pill /
        // rounded-badge partout plutôt que des valeurs Tailwind génériques
        // (rounded-xl, rounded-2xl...) pour garder cette logique explicite
        // et éviter que de nouveaux composants dérivent avec un radius
        // différent au fil du temps.
        pill: '1rem', // 16px — pills, boutons, cartes/images
        badge: '0.5rem', // 8px — badges d'icônes à l'intérieur des pills
      },
    },
  },
  plugins: [],
};

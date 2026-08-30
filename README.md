# Kubca — Portfolio (Astro + Tailwind)

## Démarrer

```bash
npm install
npm run dev
```

Le site tourne sur `http://localhost:4321`.

## Mise en page

Deux colonnes, comme sur kubca.com / ta config Framer (ratio `0.5fr` / `1fr`) :
- **Colonne gauche (`Intro.astro`)** — `lg:w-1/3`, sticky sur desktop, contient le
  nom, le pitch, les pills d'expertise et le contact.
- **Colonne droite (`ProjectList.astro`)** — `lg:w-2/3`, la liste de projets qui
  défile ; chaque ligne (`ProjectRow.astro`) affiche le Rive/l'image en pleine
  largeur avec les tags outils en dessous.

Sur mobile, les deux colonnes s'empilent (intro en premier, puis la liste).

## Où mettre tes fichiers

- **Fichiers Rive (`.riv`)** → `public/rive/`, référencés dans
  `src/data/projects.ts` via `riveHover`.
- **Images de couverture des projets** (utilisées seulement si `riveHover`
  n'est pas défini) → `public/images/projects/`.
- **Tes projets** → édite `src/data/projects.ts` : titre, catégories, outils,
  année, lien, image, `.riv`, et pour chaque `.riv` :
  - `riveArtboard` / `riveStateMachine` si le fichier contient plusieurs
    artboards ou State Machines (sinon laisse vide, voir plus bas)
  - `riveHeight` : hauteur de secours en pixels, affichée le temps que le
    fichier charge (la vraie proportion prend le relais ensuite, voir plus bas)

## Intégration Rive

Le composant `src/components/RiveEmbed.astro` charge **`@rive-app/webgl2`**
(et non `@rive-app/canvas`, ni `@rive-app/webgl` qui est déprécié depuis la
v2.37.0) côté client et monte chaque `.riv` sur un `<canvas>`.

⚠️ **Vector feathering** : si tes fichiers `.riv` utilisent le vector
feathering (flous/glows sur des formes), seul le renderer WebGL2 de Rive
("Rive Renderer", exposé par `@rive-app/webgl2`) sait l'afficher. Le runtime
Canvas 2D (`@rive-app/canvas`) ne le supporte pas encore — ce n'est pas un
problème de version, c'est une limitation du renderer Canvas lui-même à ce
jour.

⚠️ **Artboard** : si un fichier contient plusieurs artboards (comme sur
Framer), précise le nom exact via `riveArtboard` dans `projects.ts` — sinon
Rive charge l'artboard par défaut du fichier, qui peut ne pas être celui que
tu utilises sur Framer, et une State Machine qui existe pourtant bien peut
sembler "introuvable" simplement parce qu'elle est sur un autre artboard.

⚠️ **State Machine** : par défaut, `RiveEmbed` ne force aucun nom — il
détecte automatiquement toutes les State Machines présentes sur l'artboard
chargé et les active toutes, pour que les Listeners/interactions configurés
dans l'éditeur Rive fonctionnent sans que tu aies à connaître leur nom exact.
Si tu veux cibler une State Machine précise (utile surtout pour `hoverInput`
si un artboard en contient plusieurs), passe son **nom exact** (sensible à la
casse) via `riveStateMachine` dans `projects.ts`.

⚠️ **Ratio natif verrouillé** : comme le petit cadenas "lock aspect ratio" sur
Framer, `RiveEmbed` lit les bornes réelles de l'artboard chargé (`rive.bounds`)
et applique ce ratio largeur/hauteur au conteneur de la carte. Avec
`Fit: Cover`, ça évite qu'une hauteur fixe en pixels finisse par rogner
excessivement le dessin sur les côtés quand la colonne s'élargit. Le
`riveHeight` dans `projects.ts` ne sert plus que de hauteur de secours avant
chargement (pour éviter un saut de mise en page) — la vraie proportion vient
du fichier lui-même, une fois chargé.

**Contexte WebGL** : les navigateurs limitent le nombre de contextes WebGL
actifs simultanément par page (souvent 8 à 16 selon le GPU/navigateur). Comme
la liste de projets peut s'allonger, `RiveEmbed.astro` monte chaque animation
seulement quand sa carte approche du viewport (`IntersectionObserver`) et
appelle `rive.cleanup()` quand elle en sort, pour ne jamais dépasser cette
limite. `useOffscreenRenderer: true` est aussi activé, pour partager un seul
contexte WebGL entre les instances quand c'est possible.

Deux façons de rendre une animation interactive :

1. **Listener natif Rive** : dans l'éditeur Rive, ajoute un Listener sur
   l'Artboard (Pointer Move / Pointer Enter) qui pilote directement la State
   Machine. Le composant n'a rien à faire de plus.
2. **Input booléen au survol** (utilisé pour les aperçus de projet) : crée un
   input booléen (ex. `Hover`) dans ta State Machine, puis passe
   `hoverInput="Hover"` au composant. Il bascule cet input à `true`/`false`
   quand la souris entre/sort de la carte (`data-rive-hover-zone`).

`prefers-reduced-motion` est respecté : si l'utilisateur a demandé de réduire
les animations, les canvases Rive ne sont pas montés.

## Déploiement

Le projet est un site Astro statique standard, compatible Vercel / Netlify /
Cloudflare Pages sans configuration supplémentaire :

```bash
npm run build
```

Le résultat est généré dans `dist/`.

## Structure

```
src/
  components/   → Intro (colonne gauche), ProjectList + ProjectRow (colonne droite),
                  RiveEmbed, ToolPill, CategoryPill
  data/         → projects.ts (contenu des projets)
  layouts/      → Layout.astro (head, polices, import global.css)
  pages/        → index.astro (assemble Intro + ProjectList en 2 colonnes)
  styles/       → global.css (Tailwind + tokens)
public/
  rive/         → tes fichiers .riv
  images/       → tes visuels de projets
```

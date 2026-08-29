# Kubca — Portfolio (Astro + Tailwind)

## Démarrer

```bash
npm install
npm run dev
```

Le site tourne sur `http://localhost:4321`.

## Mise en page

Deux colonnes, comme sur kubca.com actuel :
- **Colonne gauche (`Intro.astro`)** — sticky sur desktop, contient le nom, la marque
  animée, le pitch, la liste d'expertise et le contact.
- **Colonne droite (`ProjectList.astro`)** — la liste de projets qui défile, chaque
  ligne (`ProjectRow.astro`) avec image, aperçu Rive au survol, titre, catégories, outils.

Sur mobile, les deux colonnes s'empilent (intro en premier, puis la liste).

## Où mettre tes fichiers

- **Fichiers Rive (`.riv`)** → `public/rive/`
  - `swiss_knife.riv` : la petite marque décorative à côté du nom (référencée dans
    `src/components/Intro.astro`) — remplace-la par le fichier de ton choix si besoin.
  - `floral.riv`, `dataprotect.riv`, `chocolat_cart3.riv` : aperçus au survol de 3 lignes
    de projets, référencés dans `src/data/projects.ts` via `riveHover`.
- **Images de couverture des projets** → `public/images/projects/`
- **Tes projets** → édite `src/data/projects.ts` (titre, catégories, outils, année, lien,
  image, `.riv` optionnel). Retire ou change `riveHover` librement.

## Intégration Rive

Le composant `src/components/RiveEmbed.astro` charge **`@rive-app/webgl2`** (et non
`@rive-app/canvas`, ni `@rive-app/webgl` qui est déprécié depuis la v2.37.0) côté
client et monte chaque `.riv` sur un `<canvas>`.

⚠️ **Important — vector feathering** : si tes fichiers `.riv` utilisent le vector
feathering (flous/glows sur des formes), seul le renderer WebGL2 de Rive ("Rive
Renderer", exposé par `@rive-app/webgl2`) sait l'afficher. Le runtime Canvas 2D
(`@rive-app/canvas`) ne le supporte pas encore — ce n'est pas un problème de
version, c'est une limitation du renderer Canvas lui-même à ce jour.

⚠️ **State Machine** : par défaut, `RiveEmbed` ne force aucun nom — il détecte
automatiquement toutes les State Machines présentes dans le fichier chargé et
les active toutes, pour que les Listeners/interactions configurés dans
l'éditeur Rive fonctionnent sans que tu aies à connaître leur nom exact. Si tu
veux cibler une State Machine précise (utile surtout pour `hoverInput` si un
fichier en contient plusieurs), passe son **nom exact** (sensible à la casse)
via la prop `stateMachine`.

Contrepartie : les navigateurs limitent le nombre de **contextes WebGL actifs
simultanément** par page (souvent 8 à 16 selon le GPU/navigateur). Comme la liste de
projets peut s'allonger, `RiveEmbed.astro` monte chaque animation seulement quand sa
carte approche du viewport (`IntersectionObserver`) et appelle `rive.cleanup()`
quand elle en sort, pour ne jamais dépasser cette limite.

Deux façons de rendre une animation interactive :

1. **Listener natif Rive** (utilisé pour la marque de la colonne gauche) : dans l'éditeur Rive,
   ajoute un Listener sur ton Artboard (Pointer Move / Pointer Enter) qui pilote directement la
   State Machine. Le composant n'a rien à faire de plus.
2. **Input booléen au survol** (utilisé pour les aperçus de projet) : crée un input booléen
   (ex. `Hover`) dans ta State Machine, puis passe `hoverInput="Hover"` au composant. Le
   composant bascule cet input à `true`/`false` quand la souris entre/sort de la ligne
   (`data-rive-hover-zone`).

Le nom `"State Machine 1"` utilisé dans les composants est le nom par défaut de Rive — remplace-le
par le nom exact de ta State Machine si tu l'as renommée.

`prefers-reduced-motion` est respecté : si l'utilisateur a demandé de réduire les animations, les
canvases Rive ne sont pas montés.

## Déploiement

Le projet est un site Astro statique standard, compatible Vercel / Netlify / Cloudflare Pages
sans configuration supplémentaire :

```bash
npm run build
```

Le résultat est généré dans `dist/`.

## Structure

```
src/
  components/   → Intro (colonne gauche), ProjectList + ProjectRow (colonne droite), RiveEmbed
  data/         → projects.ts (contenu des projets)
  layouts/      → Layout.astro (head, polices, import global.css)
  pages/        → index.astro (assemble Intro + ProjectList en 2 colonnes)
  styles/       → global.css (Tailwind + tokens)
public/
  rive/         → tes fichiers .riv
  images/       → tes visuels de projets
```

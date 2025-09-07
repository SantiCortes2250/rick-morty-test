# 🚀 Frontend Developer Test – Blossom

**Frontend Technical Test (Blossom)** — Example application built with React + TypeScript that consumes the *Rick and Morty* API, showcasing best practices in architecture, state management, accessibility, styling, and testing.

---

## 🔎 Overview
This app allows you to:
- List characters (cards with name, image, and species).
- Mark characters as favorites (starred).
- Filter by status / species / gender / favorites and sort by name.
- Add and delete comments per character.
- View character details (with routing).
- Responsive design: desktop split view (sidebar + detail) and dedicated navigation on mobile.
- Unit testing with **Vitest** + **React Testing Library**.

---

## 🧭 Project structure (root)
```bash


├── node_modules
├── public
├── src
│ ├── tests/ # unit tests (vitest + testing-library)
│ ├── assests/ # icons and images (⚠️ should be renamed to assets)
│ ├── components/ # reusable components (SearchBar, Filters, Card, Comments...)
│ ├── lib/ # utilities / hooks helpers
│ ├── pages/ # pages (Home)
│ ├── queries/ # GraphQL queries
│ ├── store/ # Zustand store (useCharacterStore)
│ ├── App.tsx
│ ├── index.css
│ ├── main.tsx
│ ├── setupTests.ts # test setup (jest-dom)
│ └── vite-env.d.ts
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── tsconfig.*.json
└── vite.config.ts

```

## 🛠 Tech stack
- **Vite** (fast dev server)
- **React 18** + **TypeScript**
- **TailwindCSS** for styling
- **Apollo Client** (GraphQL) → endpoint: `https://rickandmortyapi.com/graphql`
- **react-router-dom** for routing (desktop split + mobile navigation)
- **Zustand** (persisted) for global state (favorites, filters, comments, total, darkMode)
- **Vitest** + **@testing-library/react** for testing
- **ESLint + Prettier** for code quality

---

## 🌐 API usage
- This app fetches data from the Rick and Morty GraphQL API.
- No API key is required.
- EndPonit: `https://rickandmortyapi.com/graphql`
```bash
query {
  characters(page: 1) {
    results {
      id
      name
      status
      species
      gender
      image
    }
  }
}
```
---

## ✨ What to review first (for code reviewers)
1. `src/store/useCharacterStore.ts` — global state logic (favorites, comments, filters, persistence).
2. `src/queries/characters.ts` — main GraphQL query.
3. `src/components/Sidebar.tsx`, `SearchBar.tsx`, `Filters.tsx` — main interactions.
4. `src/components/CharacterItem.tsx` (aka `CharacterCard`) and `CharacterDetail.tsx` — navigation + detail view.
5. `src/__tests__/*` — unit tests examples (SearchBar, Filters, Comments, CharacterCard, CharacterList).

---

## 🚀 Installation (local)

```bash
# clone
git clone https://github.com/SantiCortes2250/rick-morty-test.git
cd rick-morty-test

# install dependencies
npm install
# or yarn
# yarn

# Run de app locally
npm run dev

# Run tests
npm run test

```

## 🌍 Live Demo
`https://rick-morty-testb.netlify.app/`


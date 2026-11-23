# ShopPanel

An admin dashboard for a fictional online shop, built to practise modern React and TypeScript.
Data comes from the public [DummyJSON](https://dummyjson.com) API.

**Live demo:** _coming soon_

## Tech Stack

- **React 19 + TypeScript**
- **Vite** – build tool and dev server
- **React Router** – routing, nested layouts and protected routes
- **TanStack Query** – server state: fetching, caching and background refetching
- **Zustand** – client state for authentication, persisted in `localStorage`
- **Tailwind CSS** – styling with custom theme colors
- **ESLint + Prettier** – code quality and formatting

## Features

- **Authentication** against the DummyJSON auth API, with the session persisted across page reloads
- **Protected routes** that redirect to the login page and back to the originally requested page afterwards
- **Automatic logout** when the token is expired or invalid (HTTP 401)
- **Products table** with data fetched and cached by TanStack Query
- **Pagination, search, category filter and sorting**
- **All table settings stored in the URL**, so they survive page reloads, work with the browser's back button and can be shared as a link
- **No layout jumps while paging** – the previous page stays visible until the next one has loaded
- **Reusable UI components** (`Button`, `Input`, `Select`, `Card`, `PageHeader`) for a consistent look
- **Responsive layout** – the sidebar turns into a top navigation on small screens
- **Accessibility basics** – labelled form fields, semantic landmarks, visible keyboard focus

## Getting Started

```bash
npm install
npm run dev
```

## Demo Login

- Username: `emilys`
- Password: `emilyspass`

## Scripts

| Command                | Description                  |
| ---------------------- | ---------------------------- |
| `npm run dev`          | Start the dev server         |
| `npm run build`        | Type-check and build         |
| `npm run lint`         | Run ESLint                   |
| `npm run format`       | Format all files             |
| `npm run format:check` | Check formatting without fix |

## Project Structure

```
src/
├── app/             # Router setup
├── components/
│   ├── layout/      # App layout, sidebar, header
│   └── ui/          # Reusable base components
├── features/        # One folder per feature
│   ├── auth/        # Login, auth store, protected route
│   ├── products/    # Products table, API calls, types
│   ├── dashboard/
│   └── users/
└── lib/             # Shared helpers (API client, class name helper)
```

The code is organised by feature rather than by file type, so everything that belongs to one
feature – components, API calls and types – lives in one place.

## Known Limitations

- **Search and category filter cannot be combined.** The DummyJSON API offers separate endpoints
  for search and for categories, so selecting one clears the other.
- **The search field does not update on browser back navigation.** The table and filters do, but
  the text in the search input keeps its last value.
- **The token is stored in `localStorage`** for simplicity. In a production app, an `httpOnly`
  cookie set by the server would be the safer choice, because it cannot be read by JavaScript.

## Roadmap

- [ ] Product detail page
- [ ] Create and edit products with form validation (React Hook Form + Zod)
- [ ] Better error handling and retry strategy
- [ ] Multi-language support (DE / EN / FA) with right-to-left layout
- [ ] Unit and end-to-end tests (Vitest, Playwright)
- [ ] Continuous integration with GitHub Actions

## AI Usage

I used AI tools as a tutor and pair programmer. Most of the logic (routing, auth store,
API client, data fetching) I wrote myself and had reviewed by AI. For some features and
for the styling, I compared my code with AI-generated versions or used them directly,
then made sure I understood every line.
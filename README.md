# ShopPanel

An admin dashboard for a fictional online shop, built to practise modern React and TypeScript.
Data comes from the public [DummyJSON](https://dummyjson.com) API.

## Tech Stack

- React 19 + TypeScript
- Vite
- React Router
- Zustand (client state, persisted auth)
- Tailwind CSS
- ESLint + Prettier

## Features

- Login against the DummyJSON auth API
- Auth state persisted in `localStorage`
- Protected routes with redirect back to the originally requested page
- App layout with sidebar navigation

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

## Notes

The token is stored in `localStorage` for simplicity. In a production app,
an `httpOnly` cookie set by the server would be the safer choice.

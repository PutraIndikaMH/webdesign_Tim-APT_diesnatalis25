# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Dashboard navbar behavior

When the user is on the Dashboard page the top navbar (the dashboard's header) now shows a focused set of items:

- Home
- Input Sampah
- Tukar Poin
- Jemput Sampah
- Leaderboard

These buttons navigate to the corresponding routes in the app. To test locally run the dev server and log in (or mock a logged-in user via localStorage key `te-tome-user`) and open `/dashboard`.

Behavior note: when you navigate to these pages from the Dashboard (e.g. via the Dashboard header or Quick Actions), the Dashboard code will pass navigation state so the page headers' back arrow will return to `/dashboard` (instead of `/home`). This applies for:

- Input Sampah (/input-sampah)
- Tukar Poin (/check-poin)
- Jemput Sampah (/jemput-sampah)
- Leaderboard (/daily-poin)

Quick test:

1. Start dev server: `npm run dev`
2. Ensure you are logged in (or set `localStorage.setItem('te-tome-user', JSON.stringify({ name: 'Test' }))` in the browser console).
3. From `/dashboard`, click any of the Dashboard navigation items (header or Quick Actions) to open one of the target pages.
4. Click the back arrow in the page header — it should navigate back to `/dashboard`.

Note: On the Home page, the Layanan cards and the footer "Layanan Kami" links now require login. If a non-logged-in user clicks them, a single toast "Anda harus login terlebih dahulu" will appear (no automatic login modal) — the user can open the Login modal manually using JOIN NOW or the Login button in the navbar.

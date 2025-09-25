# Frontend Developer Assignment - Worker Listing App

## Project Overview
This project is a worker listing frontend application built with Next.js, TypeScript, and Tailwind CSS. The main goal of the assignment was to improve an existing basic implementation with several frontend enhancements, architectural improvements, and best practices.

---

## Summary of Changes Made

### 1. API Integration
- Implemented a Next.js API route (`/api/workers`) serving worker data from `workers.json`.
- Updated the frontend to fetch worker data from this API instead of importing JSON directly.
- Added loading states with skeleton screen placeholders and error handling with user-friendly messages.

### 2. Worker Listing Page (`page.tsx`)
- Migrated data fetch to use React hooks (`useEffect`, `useState`) with asynchronous API calls.
- Implemented filtering by worker service type and price/day with UI controls (dropdown and range slider).
- Implemented pagination displaying 12 workers per page with Prev/Next navigation buttons.
- Used React `useMemo` for efficient memoization of filtered and paginated data to optimize re-renders.
- Enhanced responsiveness and styling of worker cards with Tailwind CSS for better UX across devices.
- Added lazy loading of images for performance optimization.

### 3. Sticky Navigation Bar
- Created a new reusable `Navbar` component that stays fixed at the top while scrolling.
- Updated the app layout to include the `Navbar` component on all pages.

### 4. Code Quality & Bug Fixes
- Fixed duplicate data fetch calls by correcting React hook logic.
- Ensured unique React keys and consistent sorting for worker list.
- Resolved ESLint warnings and consolidated best practices for clean, maintainable code.

### 5. Configuration
- Validated `next.config.ts` for proper image domain configuration to allow external worker images.
- Maintained strict and correct TypeScript configuration in `tsconfig.json`.

---

## How to Run the Project

1. **Install dependencies**:
npm install

2. **Run the development server**:
npm run dev

3. **Open the app**:
Navigate to `http://localhost:3000` in your browser to see the worker listing app in action.

---

## Folder Structure Highlights

- `/src/app/page.tsx` — Main worker listing page with filtering, pagination, and API integration.
- `/src/pages/api/workers.ts` — API route serving worker data.
- `/src/components/Navbar.tsx` — Sticky navigation bar component.
- `/workers.json` — Worker data JSON.
- `/next.config.ts` — Next.js config with image domain whitelist.
- `/tsconfig.json` — TypeScript configuration.

---

## Notes

- All frontend data fetching happens asynchronously from the API route to mimic real-world conditions.
- The UI/UX is fully responsive and includes loading skeletons for better user experience.
- Code follows best practices for React hooks, TypeScript typing, and performance optimizations.
- Pagination and filtering work seamlessly together with consistent state management.

---

For further questions or clarifications, feel free to reach out!

---

*Thank you for reviewing my work.*

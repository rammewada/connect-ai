# Connect AI

Connect AI is a simple full-stack web app combining a Next.js frontend with an Express backend for AI-powered features.

## Project Structure

- `backend/` - Node and Express server
- `frontend/` - Next.js application for the user interface

## Technologies

- Frontend: Next.js, React, Tailwind CSS
- Backend: Express, TypeScript
- AI libraries: `@google/genai`, `@tavily/core`

## Requirements

- Node.js (recommended v20+)
- npm
- AI API keys or credentials for the backend services you want to use

## Setup

### Backend

1. Open a terminal in `backend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables if needed (for example `OPENAI_API_KEY`)
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend

1. Open a terminal in `frontend/`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend:
   ```bash
   npm run dev
   ```

## Build

- Backend build:
  ```bash
  cd backend
  npm run build
  ```
- Frontend build:
  ```bash
  cd frontend
  npm run build
  ```

## Notes

- The frontend is a Next.js app located in `frontend/app`
- The backend server entrypoint is `backend/server.ts`
- Update the frontend page and backend routes to implement your AI interactions

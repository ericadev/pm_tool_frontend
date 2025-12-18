# PM Tool - Frontend

React 18 + TypeScript + Vite frontend for the Project Management Tool. Built with Shadcn/ui components and Tailwind CSS for a modern, responsive user interface.

## Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: React 18+
- **Language**: TypeScript
- **Build Tool**: Vite
- **UI Library**: Shadcn/ui
- **Styling**: Tailwind CSS 3+
- **State Management**: React Query + React Context
- **HTTP Client**: Axios or fetch API
- **Forms**: React Hook Form + Zod validation

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or yarn 1.22.x

## Project Structure

```
src/
├── components/        # Reusable React components
│   ├── common/        # Common components (Button, Dialog, etc.)
│   ├── layout/        # Layout components (Header, Sidebar, etc.)
│   ├── features/      # Feature-specific components
│   └── ui/            # Shadcn/ui components
├── pages/             # Page components (routing)
├── hooks/             # Custom React hooks
├── services/          # API service layer
├── stores/            # Context providers and state
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── styles/            # Global styles
├── App.tsx            # Main App component
└── main.tsx           # Vite entry point
```

## Setup Instructions

> **Note**: This is a basic structure. Follow these steps to initialize:

### 1. Create Vite Project

```bash
cd frontend
npm create vite@latest . -- --template react-ts
npm install
```

### 2. Install UI and Styling Dependencies

```bash
npm install -D @types/react @types/react-dom
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Initialize Shadcn/ui

```bash
npx shadcn-ui@latest init
```

Follow the prompts to configure your project:
- Choose your preferred styling
- CSS Variables for theming

### 4. Install Core Dependencies

```bash
# State management
npm install @tanstack/react-query

# Forms and validation
npm install react-hook-form zod @hookform/resolvers

# HTTP client
npm install axios

# Routing (if using client-side routing)
npm install react-router-dom

# Additional utilities
npm install clsx tailwind-merge date-fns
```

### 5. Environment Configuration

Create a `.env` file in the frontend root:

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=30000

# App Config
VITE_APP_NAME=PM Tool
VITE_APP_VERSION=1.0.0
```

Create a `.env.example` for version control:

```env
VITE_API_URL=http://localhost:3000/api
VITE_API_TIMEOUT=30000
VITE_APP_NAME=PM Tool
VITE_APP_VERSION=1.0.0
```

### 6. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` (or the port shown in terminal)

## Development Workflow

This project follows the feature branch workflow. See [CLAUDE.md](./CLAUDE.md) for detailed git guidelines.

**Key Rules:**
- Never commit directly to `main`
- Use feature branches: `git checkout -b feature/your-feature`
- Write descriptive commit messages
- Keep branches focused and short-lived

## Scripts

```bash
# Development
npm run dev              # Start dev server with hot reload
npm run build            # Build for production
npm run preview          # Preview production build locally

# Code Quality
npm run lint             # Run ESLint
npm run format           # Format with Prettier
npm run type-check       # Check TypeScript types

# Testing
npm run test             # Run tests with Vitest
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
```

## Component Development

### Creating a New Component with Shadcn/ui

```bash
# Add a component from shadcn/ui
npx shadcn-ui@latest add button
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add form
```

Available components: https://ui.shadcn.com/

### Component Template

```typescript
// src/components/features/MyComponent.tsx
import { FC } from 'react'
import { Button } from '@/components/ui/button'

interface MyComponentProps {
  title: string
  onAction: () => void
}

const MyComponent: FC<MyComponentProps> = ({ title, onAction }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <Button onClick={onAction}>Action</Button>
    </div>
  )
}

export default MyComponent
```

## API Integration

### Creating API Services

```typescript
// src/services/api.ts
import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: Number(import.meta.env.VITE_API_TIMEOUT),
})

// Add JWT token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default apiClient
```

### Using React Query

```typescript
// Hook for fetching data
import { useQuery } from '@tanstack/react-query'
import apiClient from '@/services/api'

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data } = await apiClient.get('/projects')
      return data
    },
  })
}
```

## State Management

Use React Context for global state and React Query for server state:

```typescript
// src/stores/AuthContext.tsx
import { createContext, useContext, ReactNode } from 'react'

interface AuthContextType {
  user: any | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Implementation here
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
```

## Styling with Tailwind CSS

Use utility classes for styling:

```tsx
<div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow">
  <h2 className="text-lg font-semibold">Title</h2>
  <p className="text-gray-600">Description</p>
</div>
```

### Dark Mode

Shadcn/ui comes with built-in dark mode support via CSS variables.

## Testing

```bash
# Install testing dependencies (if not already installed)
npm install -D vitest @testing-library/react @testing-library/jest-dom

# Run tests
npm test
```

## Deployment

Deployment instructions and environment configuration will be available once the project reaches the appropriate milestone.

## Contributing

See [CLAUDE.md](./CLAUDE.md) for the complete development workflow and branch strategy.

## Project Roadmap

See [../../TODO.md](../../TODO.md) for the complete 4-milestone roadmap with detailed task breakdown.

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5173 (macOS/Linux)
lsof -ti:5173 | xargs kill -9

# Or specify a different port
npm run dev -- --port 5174
```

### Vite Hot Module Reload Issues

```bash
# Clear cache
rm -rf node_modules/.vite

# Reinstall dependencies
npm install
```

### Shadcn/ui Component Issues

```bash
# Verify installation
npm ls shadcn-ui

# Check for duplicate versions
npm ls
```

## Questions?

- Check the development workflow in [CLAUDE.md](./CLAUDE.md)
- Review the project roadmap in [../../TODO.md](../../TODO.md)
- See recent commits for implementation patterns: `git log --oneline`
- Shadcn/ui docs: https://ui.shadcn.com/

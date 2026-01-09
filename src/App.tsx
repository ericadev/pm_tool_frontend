import { Navigate, Routes, Route } from 'react-router-dom'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import Projects from './pages/Projects.tsx'
import ProjectDetail from './pages/ProjectDetail.tsx'
import ProtectedRoute from './components/layout/ProtectedRoute.tsx'

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Route>
      
      {/* Catch-all redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
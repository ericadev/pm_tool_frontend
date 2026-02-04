import { useProjects } from '@/features/projects/hooks/useProjects'
import { ProjectCard } from '@/features/projects/components/ProjectCard'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { Button } from '@/components/ui/button'

function Projects() {
  const { user } = useAuth()
  const { data: projects = [], isLoading, error } = useProjects()

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="text-gray-600 mt-2">
              {user && `Welcome back, ${user.firstName || user.email}`}
            </p>
          </div>
          <Button>Create Project</Button>
        </div>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500">Loading projects...</div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            Error loading projects. Please try again later.
          </div>
        )}

        {projects.length === 0 && !isLoading && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <p className="text-gray-600">No projects yet. Create one to get started!</p>
          </div>
        )}

        {projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Projects;
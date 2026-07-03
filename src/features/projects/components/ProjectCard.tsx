import { Link } from 'react-router-dom'
import type { Project } from '@/types/index'
import { TaskList } from '@/features/tasks/components/TaskList'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link to={`/projects/${project.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader className="pb-3">
          <div className="flex items-start gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
              style={{ backgroundColor: project.color || '#e5e7eb' }}
            >
              {project.icon || '📋'}
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg">{project.name}</CardTitle>
              {project.description && (
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {project.description}
                </p>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="text-xs text-gray-500 mb-3">Tasks:</div>
          <TaskList projectId={project.id} showDeleteButton={false} />
        </CardContent>
      </Card>
    </Link>
  )
}

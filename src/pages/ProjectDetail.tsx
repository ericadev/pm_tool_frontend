import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Plus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ProjectForm } from '@/features/projects/components/ProjectForm'
import { useCreateProject, useProject } from '@/features/projects/hooks/useProjects'
import { TaskForm } from '@/features/tasks/components/TaskForm'
import { TaskList } from '@/features/tasks/components/TaskList'
import { useCreateTask } from '@/features/tasks/hooks/useTasks'
import { TaskStatus, type TaskPriority } from '@/types/index'

function ProjectDetail() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [error, setError] = useState<string | null>(null)
  const [taskError, setTaskError] = useState<string | null>(null)
  const [isAddingTask, setIsAddingTask] = useState(false)
  const { mutate: createProject, isPending: isCreating } = useCreateProject()
  const { mutateAsync: createTask, isPending: isCreatingTask } = useCreateTask()
  const { data: project, isLoading, error: loadError } = useProject(id || '')

  const isNewProject = id === 'new'

  async function handleCreateProject(data: {
    name: string
    description?: string
    color?: string
    icon?: string
  }) {
    try {
      setError(null)
      createProject(data, {
        onSuccess: () => {
          navigate('/projects')
        },
        onError: (err) => {
          setError(err instanceof Error ? err.message : 'Failed to create project')
        },
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create project')
    }
  }

  async function handleCreateTask(data: {
    title: string
    description?: string
    priority: TaskPriority
    dueDate?: string
  }) {
    if (!project) {
      return
    }

    try {
      setTaskError(null)
      await createTask({
        title: data.title,
        description: data.description || '',
        projectId: project.id,
        status: TaskStatus.TODO,
        priority: data.priority,
        dueDate: data.dueDate || undefined,
      })
      setIsAddingTask(false)
    } catch (err) {
      setTaskError(err instanceof Error ? err.message : 'Failed to add task')
    }
  }

  if (isNewProject) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Create New Project</CardTitle>
              <CardDescription>Set up a new project to organize your tasks</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                  {error}
                </div>
              )}
              <ProjectForm onSubmit={handleCreateProject} isLoading={isCreating} />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-gray-500">Loading project...</div>
      </div>
    )
  }

  if (loadError || !project) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <Card>
            <CardContent className="pt-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 mb-4">
                {loadError instanceof Error ? loadError.message : 'Project not found'}
              </div>
              <Button onClick={() => navigate('/projects')}>Back to Projects</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Button variant="outline" onClick={() => navigate('/projects')} className="mb-6">
          <ArrowLeft className="size-4" />
          Back to Projects
        </Button>
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                style={{ backgroundColor: project.color || '#e5e7eb' }}
              >
                {project.icon || '📋'}
              </div>
              <div>
                <CardTitle className="text-2xl">{project.name}</CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  Created {new Date(project.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            {project.description && (
              <CardDescription className="mt-4">{project.description}</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Project Color</h3>
                <div
                  className="w-12 h-12 rounded-lg"
                  style={{ backgroundColor: project.color || '#e5e7eb' }}
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Project Icon</h3>
                <p className="text-2xl">{project.icon || '📋'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <CardTitle>Tasks</CardTitle>
              <CardDescription className="mt-2">Plan and track work for this project</CardDescription>
            </div>
            <Button
              onClick={() => {
                setTaskError(null)
                setIsAddingTask(true)
              }}
              disabled={isAddingTask}
            >
              <Plus className="size-4" />
              Add Task
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {taskError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                {taskError}
              </div>
            )}

            {isAddingTask && (
              <div className="border border-gray-200 rounded-lg bg-gray-50 p-4">
                <TaskForm
                  onSubmit={handleCreateTask}
                  isLoading={isCreatingTask}
                  onCancel={() => {
                    setTaskError(null)
                    setIsAddingTask(false)
                  }}
                />
              </div>
            )}

            <TaskList projectId={project.id} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ProjectDetail;

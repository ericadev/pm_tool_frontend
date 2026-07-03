import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useDeleteTask, useTasks } from '../hooks/useTasks'
import type { TaskStatus, TaskPriority } from '@/types/index'
import { TaskStatus as TaskStatusEnum } from '@/types/index'

interface TaskListProps {
  projectId: string
  showDeleteButton?: boolean
}

export function TaskList({ projectId, showDeleteButton = true }: TaskListProps) {
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null)
  const { data: tasks = [], isLoading, error } = useTasks(projectId)
  const { mutateAsync: deleteTask } = useDeleteTask()

  if (isLoading) {
    return <div className="text-sm text-gray-500">Loading tasks...</div>
  }

  if (error) {
    return <div className="text-sm text-red-500">Error loading tasks</div>
  }

  if (tasks.length === 0) {
    return <div className="text-sm text-gray-500">No tasks yet</div>
  }

  const getStatusColor = (status: TaskStatus) => {
    switch (status) {
      case TaskStatusEnum.TODO:
        return 'bg-gray-100 text-gray-800'
      case TaskStatusEnum.IN_PROGRESS:
        return 'bg-blue-100 text-blue-800'
      case TaskStatusEnum.IN_REVIEW:
        return 'bg-purple-100 text-purple-800'
      case TaskStatusEnum.DONE:
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'LOW':
        return 'text-gray-500'
      case 'MEDIUM':
        return 'text-yellow-500'
      case 'HIGH':
        return 'text-orange-500'
      case 'URGENT':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  async function handleDeleteTask(taskId: string, taskTitle: string) {
    const confirmed = window.confirm(`Delete "${taskTitle}"?`)

    if (!confirmed) {
      return
    }

    try {
      setDeleteError(null)
      setDeletingTaskId(taskId)
      await deleteTask(taskId)
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Failed to delete task')
    } finally {
      setDeletingTaskId(null)
    }
  }

  return (
    <div className="space-y-2">
      {deleteError && (
        <div className="text-sm text-red-500">{deleteError}</div>
      )}
      {tasks.map((task) => (
        <div key={task.id} className="p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
          <div className="flex items-start justify-between gap-3 mb-1">
            <div className="flex flex-wrap items-start gap-2 min-w-0">
              <h4 className="font-medium text-sm break-words">{task.title}</h4>
              <span className={`text-xs px-2 py-1 rounded ${getStatusColor(task.status)}`}>
                {task.status.replace('_', ' ')}
              </span>
            </div>
            {showDeleteButton && (
              <Button
                type="button"
                variant="destructive"
                size="icon-sm"
                aria-label={`Delete ${task.title}`}
                title={`Delete ${task.title}`}
                disabled={deletingTaskId === task.id}
                onClick={(event) => {
                  event.preventDefault()
                  event.stopPropagation()
                  void handleDeleteTask(task.id, task.title)
                }}
              >
                <Trash2 className="size-4" />
              </Button>
            )}
          </div>
          {task.description && (
            <p className="text-xs text-gray-600 mb-2">{task.description}</p>
          )}
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className={`font-medium ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
            {task.dueDate && (
              <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

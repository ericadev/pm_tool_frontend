import { useTasks } from '../hooks/useTasks'
import type { Task, TaskStatus, TaskPriority } from '@/types/index'
import { TaskStatus as TaskStatusEnum } from '@/types/index'

interface TaskListProps {
  projectId: string
}

export function TaskList({ projectId }: TaskListProps) {
  const { data: tasks = [], isLoading, error } = useTasks(projectId)

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
      case 'low':
        return 'text-gray-500'
      case 'medium':
        return 'text-yellow-500'
      case 'high':
        return 'text-orange-500'
      case 'urgent':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  return (
    <div className="space-y-2">
      {tasks.map((task) => (
        <div key={task.id} className="p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
          <div className="flex items-start justify-between mb-1">
            <h4 className="font-medium text-sm">{task.title}</h4>
            <span className={`text-xs px-2 py-1 rounded ${getStatusColor(task.status)}`}>
              {task.status.replace('_', ' ')}
            </span>
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

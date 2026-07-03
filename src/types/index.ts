export const TaskStatus = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  IN_REVIEW: 'IN_REVIEW',
  DONE: 'DONE',
} as const

export const TaskPriority = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
} as const

export type TaskStatus = typeof TaskStatus[keyof typeof TaskStatus]
export type TaskPriority = typeof TaskPriority[keyof typeof TaskPriority]

export interface Project {
  id: string
  name: string
  description?: string
  color?: string
  icon?: string
  createdAt: string
  updatedAt: string
}

export interface Task {
  id: string
  title: string
  description: string
  projectId: string
  status: TaskStatus
  priority: TaskPriority
  assigneeId?: string
  dueDate?: string
  createdAt: string
  updatedAt: string
}

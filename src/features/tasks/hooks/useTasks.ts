import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { tasksService } from '../services/tasks.service'
import type { Task } from '@/types/index'

const TASKS_QUERY_KEY = ['tasks']

export function useTasks(projectId: string) {
  return useQuery({
    queryKey: [...TASKS_QUERY_KEY, projectId],
    queryFn: () => tasksService.getTasks(projectId),
  })
}

export function useTask(id: string) {
  return useQuery({
    queryKey: [...TASKS_QUERY_KEY, id],
    queryFn: () => tasksService.getTask(id),
  })
}

export function useCreateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) =>
      tasksService.createTask(task),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [...TASKS_QUERY_KEY, data.projectId],
      })
    },
  })
}

export function useUpdateTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, task }: { id: string; task: Partial<Task> }) =>
      tasksService.updateTask(id, task),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [...TASKS_QUERY_KEY, data.projectId],
      })
      queryClient.setQueryData([...TASKS_QUERY_KEY, data.id], data)
    },
  })
}

export function useDeleteTask() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => tasksService.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TASKS_QUERY_KEY })
    },
  })
}

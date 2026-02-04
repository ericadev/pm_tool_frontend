import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { projectsService } from '../services/projects.service'
import type { Project } from '@/types/index'

const PROJECTS_QUERY_KEY = ['projects']

export function useProjects() {
  return useQuery({
    queryKey: PROJECTS_QUERY_KEY,
    queryFn: () => projectsService.getProjects(),
  })
}

export function useProject(id: string) {
  return useQuery({
    queryKey: [...PROJECTS_QUERY_KEY, id],
    queryFn: () => projectsService.getProject(id),
  })
}

export function useCreateProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) =>
      projectsService.createProject(project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY })
    },
  })
}

export function useUpdateProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, project }: { id: string; project: Partial<Project> }) =>
      projectsService.updateProject(id, project),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY })
      queryClient.setQueryData([...PROJECTS_QUERY_KEY, data.id], data)
    },
  })
}

export function useDeleteProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => projectsService.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY })
    },
  })
}

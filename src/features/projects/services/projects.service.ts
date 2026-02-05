import axiosInstance from '@/lib/axios'
import type { Project } from '@/types/index'

export const projectsService = {
  async getProjects(): Promise<Project[]> {
    const response = await axiosInstance.get<Project[]>('projects/')
    return response.data
  },

  async getProject(id: string): Promise<Project> {
    const response = await axiosInstance.get<Project>(`projects/${id}`)
    return response.data
  },

  async createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const response = await axiosInstance.post<Project>('projects/', project)
    return response.data
  },

  async updateProject(id: string, project: Partial<Project>): Promise<Project> {
    const response = await axiosInstance.put<Project>(`projects/${id}`, project)
    return response.data
  },

  async deleteProject(id: string): Promise<void> {
    await axiosInstance.delete(`projects/${id}`)
  },
}

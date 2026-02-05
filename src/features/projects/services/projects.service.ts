import axiosInstance from '@/lib/axios'
import type { Project } from '@/types/index'

const apiUrl = import.meta.env.VITE_API_URL

export const projectsService = {
  async getProjects(): Promise<Project[]> {
    const response = await axiosInstance.get<Project[]>(apiUrl + 'projects/')
    return response.data
  },

  async getProject(id: string): Promise<Project> {
    const response = await axiosInstance.get<Project>(apiUrl + `projects/${id}`)
    return response.data
  },

  async createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    const response = await axiosInstance.post<Project>(apiUrl + 'projects/', project)
    return response.data
  },

  async updateProject(id: string, project: Partial<Project>): Promise<Project> {
    const response = await axiosInstance.put<Project>(apiUrl + `projects/${id}`, project)
    return response.data
  },

  async deleteProject(id: string): Promise<void> {
    await axiosInstance.delete(apiUrl + `projects/${id}`)
  },
}

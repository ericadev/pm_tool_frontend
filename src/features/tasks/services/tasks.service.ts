import axiosInstance from '@/lib/axios'
import type { Task } from '@/types/index'

export const tasksService = {
  async getTasks(projectId: string): Promise<Task[]> {
    const response = await axiosInstance.get<Task[]>('tasks/', {
      params: { projectId },
    })
    return response.data
  },

  async getTask(id: string): Promise<Task> {
    const response = await axiosInstance.get<Task>(`tasks/${id}`)
    return response.data
  },

  async createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    console.log('Creating task:', task) // Debugging log
    const response = await axiosInstance.post<Task>('tasks/', task)
    return response.data
  },

  async updateTask(id: string, task: Partial<Task>): Promise<Task> {
    const response = await axiosInstance.put<Task>(`tasks/${id}`, task)
    return response.data
  },

  async deleteTask(id: string): Promise<void> {
    await axiosInstance.delete(`tasks/${id}`)
  },
}

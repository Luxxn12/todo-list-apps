import type { Task } from "@/lib/types";
import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com/todos";

const convertApiTaskToTask = (apiTask: any): Task => ({
  id: apiTask.id.toString(),
  title: apiTask.title,
  description: "",
  completed: apiTask.completed,
  categoryId: Math.floor(Math.random() * 3 + 1).toString(),
  userId: apiTask.userId,
  createdAt: new Date().toISOString(),
});

export const fetchTasksApi = async (): Promise<Task[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data.slice(0, 10).map(convertApiTaskToTask);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const addTaskApi = async (
  task: Omit<Task, "id" | "createdAt">
): Promise<Task> => {
  try {
    const response = await axios.post(API_URL, {
      title: task.title,
      completed: task.completed,
      userId: 1,
    });

    return {
      ...task,
      id: response.data.id.toString(),
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error adding task:", error);
    throw error;
  }
};

export const updateTaskApi = async (task: Task): Promise<Task> => {
  try {
    await axios.put(`${API_URL}/${task.id}`, {
      id: task.id,
      title: task.title,
      completed: task.completed,
      userId: task.userId || 1,
    });

    return task;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTaskApi = async (id: string): Promise<string> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return id;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

export const toggleTaskCompletionApi = async (
  id: string,
  completed: boolean
): Promise<{ id: string; completed: boolean }> => {
  try {
    await axios.patch(`${API_URL}/${id}`, {
      completed,
    });

    return { id, completed };
  } catch (error) {
    console.error("Error toggling task completion:", error);
    throw error;
  }
};

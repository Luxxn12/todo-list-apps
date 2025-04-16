import type { Task } from "@/lib/types";

export const FETCH_TASKS = "FETCH_TASKS";
export const FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS";
export const FETCH_TASKS_FAILURE = "FETCH_TASKS_FAILURE";

export const ADD_TASK = "ADD_TASK";
export const ADD_TASK_SUCCESS = "ADD_TASK_SUCCESS";
export const ADD_TASK_FAILURE = "ADD_TASK_FAILURE";

export const TOGGLE_TASK_COMPLETION = "TOGGLE_TASK_COMPLETION";
export const TOGGLE_TASK_COMPLETION_SUCCESS = "TOGGLE_TASK_COMPLETION_SUCCESS";
export const TOGGLE_TASK_COMPLETION_FAILURE = "TOGGLE_TASK_COMPLETION_FAILURE";

export const DELETE_TASK = "DELETE_TASK";
export const DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS";
export const DELETE_TASK_FAILURE = "DELETE_TASK_FAILURE";

export const UPDATE_TASK = "UPDATE_TASK";
export const UPDATE_TASK_SUCCESS = "UPDATE_TASK_SUCCESS";
export const UPDATE_TASK_FAILURE = "UPDATE_TASK_FAILURE";

export const MOVE_TASK = "MOVE_TASK";

export const SET_FILTER_STATUS = "SET_FILTER_STATUS";
export const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";
export const SET_SELECTED_CATEGORY = "SET_SELECTED_CATEGORY";
export const SET_ADDING_TASK = "SET_ADDING_TASK";

export const fetchTasks = () => ({
  type: FETCH_TASKS,
});

export const fetchTasksSuccess = (tasks: Task[]) => ({
  type: FETCH_TASKS_SUCCESS,
  payload: tasks,
});

export const fetchTasksFailure = (error: string) => ({
  type: FETCH_TASKS_FAILURE,
  payload: error,
});

export const addTask = (task: Omit<Task, "id" | "createdAt">) => ({
  type: ADD_TASK,
  payload: task,
});

export const addTaskSuccess = (task: Task) => ({
  type: ADD_TASK_SUCCESS,
  payload: task,
});

export const addTaskFailure = (error: string) => ({
  type: ADD_TASK_FAILURE,
  payload: error,
});

export const toggleTaskCompletion = (id: string) => ({
  type: TOGGLE_TASK_COMPLETION,
  payload: id,
});

export const toggleTaskCompletionSuccess = (
  id: string,
  completed: boolean
) => ({
  type: TOGGLE_TASK_COMPLETION_SUCCESS,
  payload: { id, completed },
});

export const toggleTaskCompletionFailure = (error: string, id: string) => ({
  type: TOGGLE_TASK_COMPLETION_FAILURE,
  payload: { error, id },
});

export const deleteTask = (id: string) => ({
  type: DELETE_TASK,
  payload: id,
});

export const deleteTaskSuccess = (id: string) => ({
  type: DELETE_TASK_SUCCESS,
  payload: id,
});

export const deleteTaskFailure = (error: string, id: string) => ({
  type: DELETE_TASK_FAILURE,
  payload: { error, id },
});

export const updateTask = (task: Task) => ({
  type: UPDATE_TASK,
  payload: task,
});

export const updateTaskSuccess = (task: Task) => ({
  type: UPDATE_TASK_SUCCESS,
  payload: task,
});

export const updateTaskFailure = (error: string, id: string) => ({
  type: UPDATE_TASK_FAILURE,
  payload: { error, id },
});

export const moveTask = (dragIndex: number, hoverIndex: number) => ({
  type: MOVE_TASK,
  payload: { dragIndex, hoverIndex },
});

export const setFilterStatus = (status: "all" | "completed" | "active") => ({
  type: SET_FILTER_STATUS,
  payload: status,
});

export const setSearchQuery = (query: string) => ({
  type: SET_SEARCH_QUERY,
  payload: query,
});

export const setSelectedCategory = (categoryId: string | null) => ({
  type: SET_SELECTED_CATEGORY,
  payload: categoryId,
});

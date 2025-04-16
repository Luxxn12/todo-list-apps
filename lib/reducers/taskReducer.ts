import * as actions from "@/lib/actions/taskActions";
import type { TaskState } from "@/lib/types";

const initialState: TaskState = {
  tasks: [],
  filteredTasks: [],
  categories: [
    { id: "1", name: "Pribadi" },
    { id: "2", name: "Pekerjaan" },
    { id: "3", name: "Belanja" },
  ],
  isLoading: false,
  isSubmitting: false,
  error: null,
  filterStatus: "all",
  searchQuery: "",
  selectedCategory: null,
  isAddingTask: false,
  updatingTaskIds: [],
  deletingTaskIds: [],
};

const applyFilters = (state: TaskState) => {
  let result = [...state.tasks];
  if (state.filterStatus === "completed") {
    result = result.filter((task) => task.completed);
  } else if (state.filterStatus === "active") {
    result = result.filter((task) => !task.completed);
  }

  if (state.selectedCategory) {
    result = result.filter(
      (task) => task.categoryId === state.selectedCategory
    );
  }

  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase();
    result = result.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        (task.description && task.description.toLowerCase().includes(query))
    );
  }

  return result;
};

const taskReducer = (state = initialState, action: any): TaskState => {
  switch (action.type) {
    case actions.FETCH_TASKS:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case actions.FETCH_TASKS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tasks: action.payload,
        filteredTasks: applyFilters({ ...state, tasks: action.payload }),
      };
    case actions.FETCH_TASKS_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case actions.ADD_TASK:
      return {
        ...state,
        isSubmitting: true,
      };
    case actions.ADD_TASK_SUCCESS:
      const updatedTasks = [...state.tasks, action.payload];
      return {
        ...state,
        tasks: updatedTasks,
        filteredTasks: applyFilters({ ...state, tasks: updatedTasks }),
        isSubmitting: false,
        isAddingTask: false,
      };
    case actions.ADD_TASK_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        error: action.payload,
      };
    case actions.TOGGLE_TASK_COMPLETION:
      return {
        ...state,
        updatingTaskIds: [...state.updatingTaskIds, action.payload],
      };
    case actions.TOGGLE_TASK_COMPLETION_SUCCESS:
      const tasksAfterToggle = state.tasks.map((task) =>
        task.id === action.payload.id
          ? { ...task, completed: action.payload.completed }
          : task
      );
      return {
        ...state,
        tasks: tasksAfterToggle,
        filteredTasks: applyFilters({ ...state, tasks: tasksAfterToggle }),
        updatingTaskIds: state.updatingTaskIds.filter(
          (id) => id !== action.payload.id
        ),
      };
    case actions.TOGGLE_TASK_COMPLETION_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        updatingTaskIds: state.updatingTaskIds.filter(
          (id) => id !== action.payload.id
        ),
      };
    case actions.DELETE_TASK:
      return {
        ...state,
        deletingTaskIds: [...state.deletingTaskIds, action.payload],
      };
    case actions.DELETE_TASK_SUCCESS:
      const tasksAfterDelete = state.tasks.filter(
        (task) => task.id !== action.payload
      );
      return {
        ...state,
        tasks: tasksAfterDelete,
        filteredTasks: applyFilters({ ...state, tasks: tasksAfterDelete }),
        deletingTaskIds: state.deletingTaskIds.filter(
          (id) => id !== action.payload
        ),
      };
    case actions.DELETE_TASK_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        deletingTaskIds: state.deletingTaskIds.filter(
          (id) => id !== action.payload.id
        ),
      };
    case actions.UPDATE_TASK:
      return {
        ...state,
        updatingTaskIds: [...state.updatingTaskIds, action.payload.id],
      };
    case actions.UPDATE_TASK_SUCCESS:
      const tasksAfterUpdate = state.tasks.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );
      return {
        ...state,
        tasks: tasksAfterUpdate,
        filteredTasks: applyFilters({ ...state, tasks: tasksAfterUpdate }),
        updatingTaskIds: state.updatingTaskIds.filter(
          (id) => id !== action.payload.id
        ),
      };
    case actions.UPDATE_TASK_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        updatingTaskIds: state.updatingTaskIds.filter(
          (id) => id !== action.payload.id
        ),
      };
    case actions.MOVE_TASK:
      const { dragIndex, hoverIndex } = action.payload;
      const draggedTask = state.filteredTasks[dragIndex];

      // Create a new array without mutating the original
      const newFilteredTasks = [...state.filteredTasks];
      newFilteredTasks.splice(dragIndex, 1);
      newFilteredTasks.splice(hoverIndex, 0, draggedTask);

      return {
        ...state,
        filteredTasks: newFilteredTasks,
      };
    case actions.SET_FILTER_STATUS:
      return {
        ...state,
        filterStatus: action.payload,
        filteredTasks: applyFilters({ ...state, filterStatus: action.payload }),
      };
    case actions.SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
        filteredTasks: applyFilters({ ...state, searchQuery: action.payload }),
      };
    case actions.SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload,
        filteredTasks: applyFilters({
          ...state,
          selectedCategory: action.payload,
        }),
      };
    case actions.SET_ADDING_TASK:
      return {
        ...state,
        isAddingTask: action.payload,
      };
    default:
      return state;
  }
};

export default taskReducer;

export interface Task {
    id: string
    title: string
    description?: string
    completed: boolean
    categoryId: string | null
    userId?: number
    createdAt?: string
  }
  
  export interface Category {
    id: string
    name: string
  }
  
  export interface TaskState {
    tasks: Task[]
    filteredTasks: Task[]
    categories: Category[]
    isLoading: boolean
    isSubmitting: boolean
    error: string | null
    filterStatus: "all" | "completed" | "active"
    searchQuery: string
    selectedCategory: string | null
    isAddingTask: boolean
    updatingTaskIds: string[]
    deletingTaskIds: string[]
  }
  
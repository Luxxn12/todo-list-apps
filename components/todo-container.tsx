"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { TouchBackend } from "react-dnd-touch-backend"
import { useMediaQuery } from "@/hooks/use-media-query"
import { fetchTasks, setFilterStatus, setSearchQuery, setSelectedCategory } from "@/lib/actions/taskActions"
import type { RootState } from "@/lib/store"
import TaskList from "@/components/task-list"
import AddTaskForm from "@/components/add-task-form"
import TaskHeader from "@/components/task-header"
import TaskFilter from "@/components/task-filter"
import LoadingSpinner from "@/components/ui/loading-spinner"
import { motion } from "framer-motion"

export default function TodoContainer() {
  const dispatch = useDispatch()
  const { tasks, filteredTasks, categories, isLoading, filterStatus, searchQuery, selectedCategory, isAddingTask } =
    useSelector((state: RootState) => state.tasks)

  const isMobile = useMediaQuery("(max-width: 768px)")
  const dndBackend = isMobile ? TouchBackend : HTML5Backend

  // Fetch tasks on component mount
  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  const handleFilterStatusChange = (status: "all" | "completed" | "active") => {
    dispatch(setFilterStatus(status))
  }

  const handleSearchQueryChange = (query: string) => {
    dispatch(setSearchQuery(query))
  }

  const handleCategoryChange = (categoryId: string | null) => {
    dispatch(setSelectedCategory(categoryId))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100"
    >
      {isAddingTask ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6">
          <div className="flex items-center mb-6">
            <button
              onClick={() => dispatch({ type: "SET_ADDING_TASK", payload: false })}
              className="mr-3 flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              aria-label="Back"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <h1 className="text-xl font-bold text-gray-800">Add New Task</h1>
          </div>
          <AddTaskForm categories={categories} />
        </motion.div>
      ) : (
        <>
          <TaskHeader onAddClick={() => dispatch({ type: "SET_ADDING_TASK", payload: true })} />

          <TaskFilter
            filterStatus={filterStatus}
            setFilterStatus={handleFilterStatusChange}
            searchQuery={searchQuery}
            setSearchQuery={handleSearchQueryChange}
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={handleCategoryChange}
          />

          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <LoadingSpinner />
            </div>
          ) : (
            <DndProvider backend={dndBackend}>
              <TaskList tasks={filteredTasks} />
            </DndProvider>
          )}
        </>
      )}
    </motion.div>
  )
}

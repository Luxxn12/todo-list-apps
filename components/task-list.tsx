"use client";

import TaskItem from "@/components/task-item";
import { moveTask } from "@/lib/actions/taskActions";
import type { Task } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { useDispatch } from "react-redux";

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  const dispatch = useDispatch();

  const handleMove = (dragIndex: number, hoverIndex: number) => {
    dispatch(moveTask(dragIndex, hoverIndex));
  };

  return (
    <div className="divide-y divide-gray-100">
      {tasks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="p-12 text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-blue-500"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
          <p className="text-gray-500 mb-2">No tasks found</p>
          <p className="text-sm text-gray-400">
            Add a new task to get started!
          </p>
        </motion.div>
      ) : (
        <AnimatePresence>
          {tasks.map((task, index) => (
            <TaskItem
              key={task.id}
              task={task}
              index={index}
              onMove={handleMove}
            />
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}

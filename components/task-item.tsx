"use client";

import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  deleteTask,
  toggleTaskCompletion,
  updateTask,
} from "@/lib/actions/taskActions";
import type { RootState } from "@/lib/store";
import type { Task } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import type React from "react";
import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";

interface TaskItemProps {
  task: Task;
  index: number;
  onMove: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

export default function TaskItem({ task, index, onMove }: TaskItemProps) {
  const dispatch = useDispatch();
  const isUpdating = useSelector((state: RootState) =>
    state.tasks.updatingTaskIds.includes(task.id)
  );
  const isDeleting = useSelector((state: RootState) =>
    state.tasks.deletingTaskIds.includes(task.id)
  );

  const ref = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const getCategoryColor = (categoryId: string | null) => {
    if (!categoryId) return "bg-gray-100 text-gray-600";

    switch (categoryId) {
      case "1":
        return "bg-emerald-100 text-emerald-600";
      case "2":
        return "bg-amber-100 text-amber-600";
      case "3":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getCategoryName = (categoryId: string | null) => {
    if (!categoryId) return null;

    switch (categoryId) {
      case "1":
        return "Pribadi";
      case "2":
        return "Pekerjaan";
      case "3":
        return "Belanja";
      default:
        return null;
    }
  };

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { index, id: task.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "TASK",
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      onMove(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  const handleToggleComplete = () => {
    dispatch(toggleTaskCompletion(task.id));
  };

  const handleDelete = () => {
    dispatch(deleteTask(task.id));
  };

  const handleSaveEdit = () => {
    if (editedTitle.trim() && editedTitle !== task.title) {
      dispatch(updateTask({ ...task, title: editedTitle.trim() }));
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      setEditedTitle(task.title);
      setIsEditing(false);
    }
  };

  const categoryColor = getCategoryColor(task.categoryId);
  const categoryName = getCategoryName(task.categoryId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      ref={ref}
      className={cn(
        "relative flex items-center p-5 hover:bg-blue-50 transition-colors",
        isDragging && "opacity-50 bg-blue-50",
        task.completed && "bg-gray-50"
      )}
      style={{ cursor: "move" }}
    >
      {/* Loading overlay */}
      {(isUpdating || isDeleting) && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/40 z-10 backdrop-blur-[1px]">
          <div className="animate-spin rounded-full h-6 w-6 border-2 border-t-transparent border-blue-600"></div>
        </div>
      )}

      <Checkbox
        id={`task-${task.id}`}
        checked={task.completed}
        onCheckedChange={handleToggleComplete}
        className={cn(
          "mr-4 h-5 w-5 rounded-full border-2",
          task.completed
            ? "border-blue-400 bg-blue-400 text-white"
            : "border-gray-300 text-green-500"
        )}
        disabled={isUpdating || isDeleting}
      />

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={handleKeyDown}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            autoFocus
            disabled={isUpdating || isDeleting}
          />
        ) : (
          <>
            <div className="flex items-center gap-2 mb-1">
              <label
                htmlFor={`task-${task.id}`}
                className={cn(
                  "block font-medium truncate",
                  task.completed && "line-through text-gray-400"
                )}
              >
                {task.title}
              </label>

              {categoryName && (
                <span
                  className={cn(
                    "text-xs px-2 py-0.5 rounded-full",
                    categoryColor
                  )}
                >
                  {categoryName}
                </span>
              )}
            </div>

            {task.description && (
              <p
                className={cn(
                  "text-sm text-gray-500 truncate",
                  task.completed && "line-through text-gray-400"
                )}
              >
                {task.description}
              </p>
            )}
          </>
        )}
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild disabled={isUpdating || isDeleting}>
          <button className="p-1.5 rounded-full hover:bg-white hover:shadow-sm transition-all ml-2">
            <MoreVertical className="h-4 w-4 text-gray-500" />
            <span className="sr-only">Task options</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem
            onClick={() => {
              setIsEditing(true);
            }}
            className="flex items-center cursor-pointer"
          >
            <Edit className="mr-2 h-4 w-4" />
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={handleDelete}
            className="text-red-600 focus:text-red-600 flex items-center cursor-pointer"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
}

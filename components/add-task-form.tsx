"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { addTask } from "@/lib/actions/taskActions";
import type { RootState } from "@/lib/store";
import type { Category } from "@/lib/types";
import { motion } from "framer-motion";
import type React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface AddTaskFormProps {
  categories: Category[];
}

export default function AddTaskForm({ categories }: AddTaskFormProps) {
  const dispatch = useDispatch();
  const isSubmitting = useSelector(
    (state: RootState) => state.tasks.isSubmitting
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;
    if (!categoryId) return;

    dispatch(
      addTask({
        title: title.trim(),
        description: description.trim(),
        completed: false,
        categoryId: categoryId || null,
      })
    );
  };

  const handleCancel = () => {
    dispatch({ type: "SET_ADDING_TASK", payload: false });
  };

  const formVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.form
      variants={formVariants}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <motion.div variants={itemVariants}>
        <label
          htmlFor="title"
          className="block text-sm font-medium mb-1.5 text-gray-700"
        >
          Name <span className="text-red-500">*</span>
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task name"
          required
          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <label
          htmlFor="description"
          className="block text-sm font-medium mb-1.5 text-gray-700"
        >
          Description
        </label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description (optional)"
          rows={3}
          className="border-gray-200 focus:border-blue-500 focus:ring-blue-500"
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <label
          htmlFor="category"
          className="block text-sm font-medium mb-1.5 text-gray-700"
        >
          Category <span className="text-red-500">*</span>
        </label>
        <Select value={categoryId} onValueChange={setCategoryId}>
          <SelectTrigger className="border-gray-200 focus:border-blue-500 focus:ring-blue-500">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex justify-end space-x-3 pt-2"
      >
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={isSubmitting}
          className="border-gray-200 hover:bg-gray-50 text-gray-700"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!title.trim() || !categoryId || isSubmitting}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
        >
          {isSubmitting ? (
            <>
              <span className="mr-2">Saving</span>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            </>
          ) : (
            "Done"
          )}
        </Button>
      </motion.div>
    </motion.form>
  );
}

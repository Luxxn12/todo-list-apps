"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Category } from "@/lib/types";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface TaskFilterProps {
  filterStatus: "all" | "completed" | "active";
  setFilterStatus: (status: "all" | "completed" | "active") => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categories: Category[];
  selectedCategory: string | null;
  setSelectedCategory: (categoryId: string | null) => void;
}

export default function TaskFilter({
  filterStatus,
  setFilterStatus,
  searchQuery,
  setSearchQuery,
  categories,
  selectedCategory,
  setSelectedCategory,
}: TaskFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="p-5 border-b border-blue-100 bg-blue-50 space-y-3"
    >
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-500" />
        <Input
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 border-gray-200 bg-white focus:border-blue-500 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <Select
            value={filterStatus}
            onValueChange={(value) =>
              setFilterStatus(value as "all" | "completed" | "active")
            }
          >
            <SelectTrigger className="border-gray-200 bg-white focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Tasks</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <Select
            value={selectedCategory || ""}
            onValueChange={(value) =>
              setSelectedCategory(value === "all" ? null : value)
            }
          >
            <SelectTrigger className="border-gray-200 bg-white focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </motion.div>
  );
}

import { useMemo, useState } from "react";
import TaskFilter from "./components/TaskFilter/TaskFilter";
import { TaskList } from "./components/TaskList/TaskList";
import type { Task, TaskPriority, TaskStatus } from "./types";

export const ListManagement = () => {
  const [tasks, setTask] = useState<Task[]>(taskList);
  const [filters, setFilters] = useState<{
    status?: TaskStatus;
    priority?: TaskPriority;
  }>({});

  const onStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTask((prev) =>
      prev.map((element) =>
        element.id === taskId
          ? {
              ...element,
              status: newStatus,
            }
          : element,
      ),
    );
  };

  const onDelete = (taskId: string) => {
    setTask((prev) => prev.filter((element) => taskId !== element.id));
  };

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (filters.status && task.status !== filters.status) return false;
        if (filters.priority && task.priority !== filters.priority)
          return false;
        return true;
      })
      .sort((a, b) => {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      });
  }, [tasks, filters]);

  return (
    <div className="w-full flex items-center justify-center h-full flex-col">
      <TaskFilter onFilterChange={setFilters} />

      {filteredTasks.length === 0 ? (
        <p className="text-Red400">No tasks found.</p>
      ) : (
        <TaskList
          tasks={filteredTasks}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      )}
    </div>
  );
};

const taskList: Task[] = [
  {
    description: "lorem ipsum",
    dueDate: "2026-03-01",
    id: "1",
    priority: "low",
    status: "completed",
    title: "lorem",
  },
  {
    description: "lorem ipsum",
    dueDate: "2026-04-01",
    id: "2",
    priority: "high",
    status: "in-progress",
    title: "ipsum",
  },
  {
    description: "lorem ipsum",
    dueDate: "2026-06-05",
    id: "3",
    priority: "medium",
    status: "pending",
    title: "lorem ipsum",
  },
];

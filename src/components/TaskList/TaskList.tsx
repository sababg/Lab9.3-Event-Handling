import type { TaskListProps } from "../../types";
import { TaskItem } from "../TaskItem/TaskItem";

export const TaskList = ({
  onDelete,
  onStatusChange,
  tasks,
}: TaskListProps) => {
  return (
    <div className="flex flex-col items-start justify-start w-[80%] gap-4">
      {tasks.map((element) => (
        <div key={element.id} className="w-full">
          <TaskItem
            onDelete={onDelete}
            task={element}
            onStatusChange={onStatusChange}
          />
        </div>
      ))}
    </div>
  );
};

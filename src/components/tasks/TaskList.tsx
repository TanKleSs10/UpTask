import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { Project, TaskProject, TaskStatus } from "@/types/index";
import TaskCard from "./TaskCard";
import { statusDetails } from "@/locales/es";
import DropTask from "./DropTask";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatus } from "@/api/TaskAPI";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

type TaskListProps = {
  tasks: TaskProject[];
  canEdit: boolean;
};

type GroupedTasks = {
  [key: string]: TaskProject[];
};

const initialStatusGroups: GroupedTasks = {
  pending: [],
  onHold: [],
  inProgress: [],
  underReview: [],
  completed: [],
};

export default function TaskList({ tasks, canEdit }: TaskListProps) {
  const groupedTasks = tasks.reduce((acc, task) => {
    let currentGroup = acc[task.status] ? [...acc[task.status]] : [];
    currentGroup = [...currentGroup, task];
    return { ...acc, [task.status]: currentGroup };
  }, initialStatusGroups);
  const params = useParams();
  const projectId = params.projectId!;

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: updateStatus,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] });
      toast.success(data);
    },
  });

  const handleDragEnd = (e: DragEndEvent) => {
    const { over, active } = e;
    if (over && over.id) {
      const taskId = active.id.toString();
      const status = over.id as TaskStatus;
      const data = { projectId, taskId, status };
      mutate(data);
      queryClient.setQueryData(["project", projectId], (prevData: Project) => {
        const updateTasks = prevData.tasks.map((task) => {
          if (task._id === taskId) {
            return { ...task, status };
          }
          return task;
        });
        return { ...prevData, tasks: updateTasks };
      });
    }
  };

  return (
    <>
      <h2 className="text-5xl font-black my-10">Tareas</h2>

      <div className="flex gap-2 overflow-x-scroll 2xl:overflow-auto pb-20">
        <DndContext onDragEnd={handleDragEnd}>
          {Object.entries(groupedTasks).map(([status, tasks]) => (
            <div key={status} className="min-w-[225px] 2xl:min-w-0 2xl:w-1/5">
              <h3
                className={`capitalize text-xl font-light border ${statusDetails[status].color} bg-white p-3 border-t-8`}
              >
                {statusDetails[status].translation}
              </h3>
              <DropTask status={status} />
              <ul className="mt-5 space-y-5">
                {tasks.length === 0 ? (
                  <li className="text-gray-500 text-center pt-3">
                    No Hay tareas
                  </li>
                ) : (
                  tasks.map((task) => (
                    <TaskCard key={task._id} task={task} canEdit={canEdit} />
                  ))
                )}
              </ul>
            </div>
          ))}
        </DndContext>
      </div>
    </>
  );
}

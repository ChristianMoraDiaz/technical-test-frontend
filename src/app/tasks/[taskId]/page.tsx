"use client";
import { completedtask, deleteTask, getTaskById } from "@/api/task";
import Alert from "@/components/alert";
import { Task } from "@/interface/task";
import { emptyTask } from "@/mocks/task";
import { format } from "date-fns";
import { SessionProvider, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactElement, useEffect, useState } from "react";

export default function Page({
  params,
}: {
  params: { taskId: string };
}): ReactElement {
  return (
    <SessionProvider>
      <DetailPage params={params} />
    </SessionProvider>
  );
}

function DetailPage({ params }: { params: { taskId: string } }): ReactElement {
  const [task, setTask] = useState<Task>(emptyTask);
  const [alert, setAlert] = useState<{
    type: "info" | "success" | "error" | "warning";
    msg: string;
    error?: string;
  } | null>(null);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSetAsCompleted = async (taskId: string) => {
    try {
      if (!session?.user?.email) {
        return;
      }

      await completedtask({ taskId, userEmail: session.user.email });

      setAlert({
        type: "success",
        msg: "Task set as completed successfully",
      });

      setTimeout(() => {
        router.push("/tasks");
      }, 800);
    } catch (error: any) {
      let errorMessage =
        error.message || "An error occurred while updating the user.";

      setAlert({
        type: "error",
        msg: errorMessage,
      });
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      if (!session?.user?.email) {
        return;
      }

      await deleteTask({ taskId, userEmail: session.user.email });

      setAlert({
        type: "success",
        msg: "Task deleted successfully",
      });

      setTimeout(() => {
        router.push("/tasks");
      }, 800);
    } catch (error: any) {
      let errorMessage =
        error.message || "An error occurred while deleting the task.";

      setAlert({
        type: "error",
        msg: errorMessage,
      });
    }
  };

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const task = await getTaskById(params.taskId);
        setTask(task);
      } catch (error: any) {
        let errorMessage =
          error.response?.data.message ||
          "An error occurred while creating the task.";

        setAlert({
          type: "error",
          msg: errorMessage,
        });
      }
    };

    fetchTask();
  }, []);

  const formattedDate = task?.creationDate
    ? format(new Date(task.creationDate), "yyyy-MM-dd")
    : "";

  const handleEditClick = () => {
    router.push(`/tasks/edit?taskId=${params.taskId}`);
  };
  return (
    <div className="min-h-screen items-center justify-center ">
      <div className="hero  min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="ml-8 ">
            <div className="pb-10">
              <button className="btn btn-sm btn-accent ">
                <Link href="/tasks">Go back</Link>
              </button>
            </div>

            <h1 className="text-5xl font-bold pb-6">{task.title}</h1>
            <div className=" pb-6">
              <p>Author: {task.author.name}</p>
              <p>Assigned User: {task.assignedUser.name}</p>
              <p>Creation Date: {format(task.creationDate, "yyyy-MM-dd")}</p>
              <p>Completed: {task.completed ? "Yes" : "No"}</p>
              <p>
                Completed Date:{" "}
                {task.completedDate && format(task.completedDate, "yyyy-MM-dd")}
              </p>
            </div>

            <button className="btn btn-primary mr-7" onClick={handleEditClick}>
              Edit Task
            </button>

            <button
              className="btn  btn-primary mr-7"
              onClick={() => handleSetAsCompleted(task.id.toString())}
            >
              Set as completed
            </button>
            <button
              className="btn  btn-error"
              onClick={() => handleDeleteTask(task.id.toString())}
            >
              Delete Task
            </button>
          </div>
        </div>
      </div>
      {alert && (
        <Alert
          type={alert.type}
          msg={alert.msg}
          onClose={() => setAlert(null)}
        />
      )}
    </div>
  );
}

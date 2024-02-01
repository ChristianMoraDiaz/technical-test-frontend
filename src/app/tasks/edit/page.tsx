"use client";
import { getTaskById, updateTask } from "@/api/task";
import Alert from "@/components/alert";
import { Task } from "@/interface/task";
import { emptyTask } from "@/mocks/task";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { ReactElement, Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Page(): ReactElement {
  return (
    <SessionProvider>
      <Suspense fallback={<LoadingSkeleton />}>
        <TaskForm />
      </Suspense>
    </SessionProvider>
  );
}

function TaskForm() {
  const [task, setTask] = useState<Task>(emptyTask);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [alert, setAlert] = useState<{
    type: "info" | "success" | "error" | "warning";
    msg: string;
    error?: string;
  } | null>(null);
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("taskId");

  const onSubmit = handleSubmit(async (data) => {
    if (!session?.user?.email) {
      return;
    }

    if (!taskId) {
      return;
    }

    const updateData = {
      taskId: taskId.toString(),
      userEmail: session.user.email,
      newAssignedUserId: data.assignedUser,
      title: data.title,
      completed: data.completed,
    };
    try {
      await updateTask(updateData);
      setAlert({
        type: "success",
        msg: "Task updated successfully!",
      });

      setTimeout(() => {
        router.push("/tasks");
      }, 1500);
    } catch (error) {
      setAlert({
        type: "error",
        msg: "An error occurred while updating the task.",
      });
    }
  });

  useEffect(() => {
    if (!taskId) {
      return;
    }

    const fetchTask = async () => {
      try {
        const response = await getTaskById(taskId);
        setTask(response);
        setLoading(false);
      } catch (error: any) {
        let errorMessage =
          error.message || "An error occurred while updating the task.";

        setAlert({
          type: "error",
          msg: errorMessage,
        });
      }
    };

    fetchTask();
  }, [taskId]);

  return (
    <>
      {!loading && (
        <form className="card-body" onSubmit={onSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title:</span>
            </label>
            <input
              type="text"
              placeholder="Enter task title"
              className="input input-bordered"
              {...register("title", { required: "Title is required" })}
              defaultValue={task.title}
            />
            {errors.title && (
              <span className="text-red-500 text-xs">{`${errors.title.message}`}</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Assigned User:</span>
            </label>
            <input
              type="number"
              placeholder="Enter user ID"
              className="input input-bordered"
              {...register("assignedUser", {
                required: "Assigned user ID is required",
              })}
              defaultValue={task.assignedUser ? task.assignedUser.id : ""}
            />

            {errors.assignedUser && (
              <span className="text-red-500 text-xs">{`${errors.assignedUser.message}`}</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Completed:</span>
            </label>
            <select
              className="select select-bordered w-full"
              {...register("completed")}
              defaultValue={task.completed ? "true" : "false"}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">
              {task ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      )}
      {alert && (
        <Alert
          type={alert.type}
          msg={alert.msg}
          onClose={() => setAlert(null)}
          time={1500}
        />
      )}
    </>
  );
}

function LoadingSkeleton() {
  return (
    <form className="card-body">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Title:</span>
        </label>
        <div
          className="loading-skeleton"
          style={{ width: "200px", height: "20px" }}
        ></div>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Assigned User:</span>
        </label>
        <div
          className="loading-skeleton"
          style={{ width: "100px", height: "20px" }}
        ></div>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Completed:</span>
        </label>
        <div
          className="loading-skeleton"
          style={{ width: "100px", height: "20px" }}
        ></div>
      </div>
      <div className="form-control mt-6">
        <div
          className="loading-skeleton"
          style={{ width: "100px", height: "40px" }}
        ></div>
      </div>
    </form>
  );
}

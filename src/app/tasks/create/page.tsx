"use client";
import { createTask } from "@/api/task";
import Alert from "@/components/alert";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactElement, useState } from "react";
import { useForm } from "react-hook-form";

export default function Page(): ReactElement {
  return (
    <SessionProvider>
      <TaskForm />
    </SessionProvider>
  );
}

function TaskForm() {
  const [loading, setLoading] = useState(false); // Adjusted initial state
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

  const onSubmit = handleSubmit(async (data) => {
    if (!session?.user?.email) {
      return;
    }

    const createData = {
      authorEmail: session.user.email,
      title: data.title,
      assignedUserId: data.assignedUser,
      completed: data.completed,
    };

    try {
      await createTask(createData);
      setAlert({
        type: "success",
        msg: "Task created successfully!",
      });

      setTimeout(() => {
        router.push("/tasks");
      }, 1500);
    } catch (error) {
      setAlert({
        type: "error",
        msg: "An error occurred while creating the task.",
      });
    }
  });

  return (
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
          defaultValue="false"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      <div className="form-control mt-6">
        <button className="btn btn-primary" disabled={loading}>
          Create Task
        </button>
      </div>
      {alert && (
        <Alert
          type={alert.type}
          msg={alert.msg}
          onClose={() => setAlert(null)}
          time={1500}
        />
      )}
    </form>
  );
}

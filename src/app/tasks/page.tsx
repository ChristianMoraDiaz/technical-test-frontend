"use client";

import { getAllTasks } from "@/api/task";
import { Task } from "@/interface/task";
import { format } from "date-fns";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import Alert from "../../components/alert";

export default function Page(): ReactElement {
  const [alltasks, setAllEntries] = useState<Task[]>([]);
  const [alert, setAlert] = useState<{
    type: "info" | "success" | "error" | "warning";
    msg: string;
    error?: string;
  } | null>(null);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const entries = await getAllTasks();
        setAllEntries(entries);
      } catch (error: any) {
        let errorMessage =
          error.response?.data.message ||
          "An error occurred while fetching the entries.";

        setAlert({
          type: "error",
          msg: errorMessage,
        });
      }
    };

    fetchEntries();
  }, []);

  return (
    <div className="min-h-screen items-center justify-center p-10 ">
      <h1 className="pb-8">Task List</h1>
      <div className="overflow-x-auto flex float-none">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Author</th>
              <th>Assigned</th>
              <th>Completed</th>
              <th>Creation Date</th>
              <th>Completed Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {alltasks.map((task) => (
              <tr key={task.id}>
                <td className="ml-20">{task.id}</td>
                <td>{task.title}</td>
                <td>{task.author.email}</td>
                <td>{task.assignedUser.email}</td>
                <td>{`${task.completed}`}</td>
                <td>{format(new Date(task.creationDate), "yyyy-MM-dd")}</td>
                <td>
                  {task.completedDate
                    ? format(new Date(task?.completedDate), "yyyy-MM-dd")
                    : ""}
                </td>
                <button className="btn btn-xs m-1">
                  <Link href={`/tasks/${task.id}`}>Set as completed</Link>
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {alert && (
        <Alert
          type={alert.type}
          msg={alert.msg}
          onClose={() => setAlert(null)}
          time={1500}
        />
      )}
    </div>
  );
}

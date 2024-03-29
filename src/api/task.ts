import {
  CreateTaskData,
  DeleteTaskData,
  EditTaskData,
  SetCompletedData,
  Task,
} from "@/interface/task";
import axios, { AxiosResponse } from "axios";

export const createTask = async (taskData: CreateTaskData) => {
  try {
    const response: AxiosResponse<Task> = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/api/task`,
      taskData
    );
    return response.data;
  } catch (error: any) {
    throw (
      error.response?.data || {
        message: "An error occurred while creating the task.",
      }
    );
  }
};

export const getAllTasks = async () => {
  try {
    const response: AxiosResponse<Task[]> = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/task`
    );
    return response.data;
  } catch (error: any) {
    throw (
      error.response?.data || {
        message: "An error occurred while fetching tasks.",
      }
    );
  }
};

export const getTaskById = async (taskId: string) => {
  try {
    const response: AxiosResponse<Task> = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/task/${taskId}`
    );
    return response.data;
  } catch (error: any) {
    throw (
      error.response?.data || {
        message: "An error occurred while fetching the task.",
      }
    );
  }
};

export const completedtask = async (data: SetCompletedData) => {
  try {
    const response: AxiosResponse<Task> = await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/api/task/completed/${data.taskId}`,
      {
        userEmail: data.userEmail,
      }
    );
    return response.data;
  } catch (error: any) {
    throw (
      error.response?.data || {
        message: "An error occurred while editing the task.",
      }
    );
  }
};

export const deleteTask = async (data: DeleteTaskData) => {
  try {
    const response: AxiosResponse<Task> = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/api/task/delete/${data.taskId}`,
      {
        data: { userEmail: data.userEmail },
      }
    );
    return response.data;
  } catch (error: any) {
    throw (
      error.response?.data || {
        message: "An error occurred while deleting the task.",
      }
    );
  }
};

export const updateTask = async (data: EditTaskData) => {
  try {
    await axios.put(
      `${process.env.NEXT_PUBLIC_API_URL}/api/task/edit/${data.taskId}`,
      {
        userEmail: data.userEmail,
        newAssignedUserId: data.newAssignedUserId,
        title: data.title,
        completed: data.completed,
      }
    );
  } catch (error: any) {
    throw (
      error.response?.data || {
        message: "An error occurred while editing the task.!!!",
      }
    );
  }
};

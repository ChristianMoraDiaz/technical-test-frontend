import { Task } from "@/interface/task";
import axios, { AxiosResponse } from "axios";

interface EditTaskData {
  taskId: string;
  userEmail: string;
}

export const createTask = async (taskData: {
  weatherId: number;
  visibilityId: number;
  comment: string;
}) => {
  try {
    const response: AxiosResponse<Task> = await axios.post(
      "http://localhost:4000/api/task",
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
      "http://localhost:4000/api/task"
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
      `http://localhost:4000/api/task/${taskId}`
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

export const editTask = async (data: EditTaskData) => {
  try {
    const response: AxiosResponse<Task> = await axios.put(
      `http://localhost:4000/api/task/completed/${data.taskId}`,
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

export const deleteTask = async (data: EditTaskData) => {
  console.log(data)
  try {
    const response: AxiosResponse<Task> = await axios.delete(
      `http://localhost:4000/api/task/delete/${data.taskId}`,
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

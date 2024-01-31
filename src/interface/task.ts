import { User } from "./auth";

export interface Task {
  id: number;
  title: string;
  author: User;
  assignedUser: User;
  completed: boolean;
  creationDate: Date;
  completedDate: Date;
}

export interface SetCompletedData {
  taskId: string;
  userEmail: string;
}

export interface DeleteTaskData {
  taskId: string;
  userEmail: string;
}
export interface EditTaskData {
  taskId: string;
  userEmail: string;
  newAssignedUserId: number;
  title: string;
  completed: boolean;
}

export interface CreateTaskData {
  authorEmail: string;
  title: string;
  assignedUserId: number;
  completed: string;
}

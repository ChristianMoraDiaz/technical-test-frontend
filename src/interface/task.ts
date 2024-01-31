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

export interface Task {
  id: number;
  title: string;
  author: User;
  assignedUser: User;
  completed: boolean;
  creationDate: Date;
  completedDate: Date;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

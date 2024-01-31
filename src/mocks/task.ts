import { Task } from "@/interface/task";

const mockDate = new Date("1996-01-31T12:00:00");

export const emptyTask: Task = {
  id: 0,
  title: "",
  author: { name: "", email: "", id: 0 },
  assignedUser: { name: "", email: "", id: 0 },
  completed: false,
  completedDate: mockDate,
  creationDate: mockDate,
};

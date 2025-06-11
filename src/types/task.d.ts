interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'Todo' | 'In Progress' | 'Done';
   dueDate?: string | Date;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export type { Task };
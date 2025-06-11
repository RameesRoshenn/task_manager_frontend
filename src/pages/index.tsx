import { gql, useQuery } from '@apollo/client';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import { useState } from 'react';
import type { Task } from '@/types/task'; // ✅ Import the Task type

const GET_TASKS = gql`
  query GetTasks($status: String) {
    tasks(status: $status) {
      id
      title
      description
      status
      dueDate
    }
  }
`;

export default function Home() {
  const [statusFilter, setStatusFilter] = useState<string>('');
  const { loading, error, data, refetch } = useQuery(GET_TASKS, {
    variables: { status: statusFilter || undefined },
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Task Manager</h1>

      <TaskForm onTaskAdded={refetch} />

      <div className="mb-6">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Tasks</option>
          <option value="Todo">Todo</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <div className="space-y-4">
        {data?.tasks?.map((task: Task) => (
          <TaskCard key={task.id} task={task} refetch={refetch} />
        ))}
      </div>
    </div>
  );
}

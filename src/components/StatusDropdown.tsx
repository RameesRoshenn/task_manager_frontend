import { gql, useMutation } from '@apollo/client';



const UPDATE_TASK_STATUS = gql`
  mutation UpdateTaskStatus($id: ID!, $status: String!) {
    updateTaskStatus(id: $id, status: $status) {
      id
      status
    }
  }
`;

interface StatusDropdownProps {
  taskId: string;
  currentStatus: string;
  refetch: () => void;
}

export default function StatusDropdown({ taskId, currentStatus, refetch }: StatusDropdownProps) {
  const [updateTaskStatus] = useMutation(UPDATE_TASK_STATUS);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    try {
      await updateTaskStatus({
        variables: {
          id: taskId,
          status: newStatus
        }
      });
      refetch();
    } catch (err) {
      console.error('Error updating task status:', err);
    }
  };

  const statusClasses = {
    'Todo': 'bg-gray-200 text-gray-800',
    'In Progress': 'bg-blue-200 text-blue-800',
    'Done': 'bg-green-200 text-green-800'
  };

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      className={`px-3 py-1 rounded-full text-sm font-medium ${statusClasses[currentStatus as keyof typeof statusClasses]}`}
    >
      {Object.keys(statusClasses).map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}
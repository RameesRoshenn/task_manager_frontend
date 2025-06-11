import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import styles from '@/styles/TaskDetails.module.css';
import { formatDateTime } from '@/utils/date';
import { Task } from '@/types/task';

const GET_TASK = gql`
  query GetTask($id: ID!) {
    task(id: $id) {
      id
      title
      description
      status
      dueDate
      createdAt
      updatedAt
    }
  }
`;

const getStatusClass = (status: string) => {
  const normalizedStatus = status
    .trim()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  const statusClasses = {
    'Todo': styles.statusTodo,
    'In Progress': styles.statusInProgress,
    'Done': styles.statusDone
  };

  return statusClasses[normalizedStatus as keyof typeof statusClasses] || styles.statusTodo;
};

export default function TaskDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { loading, error, data } = useQuery<{ task: Task }>(GET_TASK, {
    variables: { id },
    skip: !id
  });

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error.message}</div>;

  const task = data?.task;
  if (!task) return <div className={styles.notFound}>Task not found</div>;

  const statusClass = getStatusClass(task.status || 'Todo');
  const dueDate = formatDateTime(task.dueDate) || 'Not specified';
  const createdAt = formatDateTime(task.createdAt) || 'Not available';
  const updatedAt = formatDateTime(task.updatedAt) || 'Not available';

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← Back to all tasks
      </Link>
      
      <div className={styles.taskContainer}>
        <div className={styles.taskHeader}>
          <h1 className={styles.taskTitle}>{task.title}</h1>
          <span className={`${styles.statusBadge} ${statusClass}`}>
            {task.status}
          </span>
        </div>
        
        <div className={styles.description}>
          <p>{task.description || 'No description provided'}</p>
        </div>
        
        <div className={styles.detailGrid}>
          <div>
            <p className={styles.detailLabel}>Due Date</p>
            <p className={styles.detailValue}>{dueDate}</p>
          </div>
          <div>
            <p className={styles.detailLabel}>Created</p>
            <p className={styles.detailValue}>{createdAt}</p>
          </div>
          <div>
            <p className={styles.detailLabel}>Last Updated</p>
            <p className={styles.detailValue}>{updatedAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
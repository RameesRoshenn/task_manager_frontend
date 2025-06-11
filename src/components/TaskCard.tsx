import Link from 'next/link';
import StatusDropdown from './StatusDropdown';
import styles from '@/styles/Home.module.css';
import { Task } from '@/types/task';
import { formatDate } from '@/utils/date';

interface TaskCardProps {
  task: Task;
  refetch: () => void;
}

export default function TaskCard({ task, refetch }: TaskCardProps) {
  const dueDateFormatted = formatDate(task.dueDate);

  return (
    <div className={styles.taskCard}>
      <div className={styles.taskHeader}>
        <div>
          <Link href={`/task/${task.id}`} className={styles.taskTitle}>
            {task.title}
          </Link>
          {dueDateFormatted && (
            <p className={styles.dueDate}>
              Due: {dueDateFormatted}
            </p>
          )}
        </div>
        <StatusDropdown taskId={task.id} currentStatus={task.status} refetch={refetch} />
      </div>
    </div>
  );
}
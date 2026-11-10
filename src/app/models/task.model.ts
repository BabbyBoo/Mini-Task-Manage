export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

/** Các lựa chọn của bộ lọc — union type: chỉ được phép 3 giá trị này */
export type TaskFilter = 'all' | 'active' | 'completed';

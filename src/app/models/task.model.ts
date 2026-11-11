import { Validators, type ValidatorFn } from '@angular/forms';

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

/** Các lựa chọn của bộ lọc — union type: chỉ được phép 3 giá trị này */
export type TaskFilter = 'all' | 'active' | 'completed';

/** M2: quy tắc validation định nghĩa MỘT LẦN — form thêm và form sửa cùng dùng */
export const TASK_TITLE_VALIDATORS: ValidatorFn[] = [
  Validators.required,
  Validators.pattern(/\S/), // H2: phải có ít nhất 1 ký tự KHÔNG phải khoảng trắng
  Validators.minLength(3),
];

export const TASK_DESCRIPTION_VALIDATORS: ValidatorFn[] = [
  Validators.maxLength(200),
];

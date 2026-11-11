import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  Task,
  TaskFilter,
  TASK_DESCRIPTION_VALIDATORS,
  TASK_TITLE_VALIDATORS,
} from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  readonly taskService = inject(TaskService);
  private readonly fb = inject(FormBuilder);

  /** Bộ lọc — dữ liệu giao diện nằm ở component */
  readonly filter = signal<TaskFilter>('all');

  /** id của task đang sửa — chỉ cho phép 1 task ở chế độ sửa cùng lúc */
  readonly editingId = signal<string | null>(null);

  readonly filteredTasks = computed(() => {
    const all = this.taskService.tasks();
    if (this.filter() === 'active') return all.filter(t => !t.completed);
    if (this.filter() === 'completed') return all.filter(t => t.completed);
    return all;
  });

  /** Form sửa — giá trị được điền sẵn bằng patchValue khi bấm "Sửa" (M2: dùng chung validators) */
  readonly editForm = this.fb.nonNullable.group({
    title: ['', TASK_TITLE_VALIDATORS],
    description: ['', TASK_DESCRIPTION_VALIDATORS],
  });

  setFilter(value: TaskFilter): void {
    this.filter.set(value);
  }

  startEdit(task: Task): void {
    this.editingId.set(task.id);
    this.editForm.patchValue({ title: task.title, description: task.description });
  }

  cancelEdit(): void {
    this.editingId.set(null);
    this.editForm.reset();
  }

  saveEdit(id: string): void {
    if (this.editForm.invalid) return;
    this.taskService.updateTask(id, this.editForm.getRawValue());
    this.cancelEdit();
  }

  deleteTask(task: Task): void {
    if (confirm(`Xóa công việc "${task.title}"?`)) {
      this.taskService.deleteTask(task.id);
      if (this.editingId() === task.id) this.cancelEdit();
    }
  }
}

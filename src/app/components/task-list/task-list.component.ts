import { Component, computed, inject, signal } from '@angular/core';
import { TaskFilter } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss'
})
export class TaskListComponent {
  readonly taskService = inject(TaskService);

  /** Trạng thái bộ lọc — là dữ liệu GIAO DIỆN nên nằm ở component, không ở service */
  readonly filter = signal<TaskFilter>('all');

  /** Danh sách sau khi lọc — tự tính lại mỗi khi tasks() hoặc filter() đổi */
  readonly filteredTasks = computed(() => {
    const all = this.taskService.tasks();
    if (this.filter() === 'active') return all.filter(t => !t.completed);
    if (this.filter() === 'completed') return all.filter(t => t.completed);
    return all;
  });

  setFilter(value: TaskFilter): void {
    this.filter.set(value);
  }
}

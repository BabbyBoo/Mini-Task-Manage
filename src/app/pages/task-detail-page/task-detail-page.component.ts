import { Component, computed, effect, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-detail-page',
  imports: [DatePipe, RouterLink],
  templateUrl: './task-detail-page.component.html',
  styleUrl: './task-detail-page.component.scss'
})
export class TaskDetailPageComponent {
  /** id được Router "thả" vào từ URL /tasks/:id nhờ withComponentInputBinding */
  readonly id = input.required<string>();

  private readonly taskService = inject(TaskService);
  private readonly router = inject(Router);

  /** Tìm task theo id — tự tính lại nếu tasks hoặc id trên URL đổi */
  readonly task = computed(() =>
    this.taskService.tasks().find(t => t.id === this.id())
  );

  constructor() {
    // Không thấy task (id sai / đã xóa) → điều hướng về danh sách
    effect(() => {
      if (!this.task()) {
        this.router.navigate(['/tasks']);
      }
    });
  }
}

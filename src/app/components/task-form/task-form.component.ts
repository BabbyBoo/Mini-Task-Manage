import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TASK_DESCRIPTION_VALIDATORS, TASK_TITLE_VALIDATORS } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.scss'
})
export class TaskFormComponent {
  private readonly taskService = inject(TaskService);
  private readonly fb = inject(FormBuilder);

  /** Form có 2 control — quy tắc validation dùng chung từ task.model (M2) */
  readonly form = this.fb.nonNullable.group({
    title: ['', TASK_TITLE_VALIDATORS],
    description: ['', TASK_DESCRIPTION_VALIDATORS],
  });

  submit(): void {
    if (this.form.invalid) return; // phòng thủ: Enter trong input cũng kích hoạt submit

    this.taskService.addTask(this.form.getRawValue());
    this.form.reset(); // trả về giá trị ban đầu + reset touched/dirty
  }
}

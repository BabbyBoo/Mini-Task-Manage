import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
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

  /** Form có 2 control: title (bắt buộc, tối thiểu 3 ký tự), description (tối đa 200 ký tự) */
  readonly form = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.maxLength(200)]],
  });

  submit(): void {
    if (this.form.invalid) return; // phòng thủ: Enter trong input cũng kích hoạt submit

    this.taskService.addTask(this.form.getRawValue());
    this.form.reset(); // trả về giá trị ban đầu + reset touched/dirty
  }
}

import { Component } from '@angular/core';
import { TaskFormComponent } from '../../components/task-form/task-form.component';
import { TaskListComponent } from '../../components/task-list/task-list.component';

/**
 * Page = tầng chỉ lo "bố trí" các feature component.
 * Form + List là 2 component độc lập, page ghép chúng lại thành 1 màn hình.
 */
@Component({
  selector: 'app-task-list-page',
  imports: [TaskFormComponent, TaskListComponent],
  templateUrl: './task-list-page.component.html',
  styleUrl: './task-list-page.component.scss'
})
export class TaskListPageComponent {}

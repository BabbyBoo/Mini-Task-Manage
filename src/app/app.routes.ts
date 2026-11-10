import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskListPageComponent } from './pages/task-list-page/task-list-page.component';
import { TaskDetailPageComponent } from './pages/task-detail-page/task-detail-page.component';

export const routes: Routes = [
  // URL rỗng "/" → đẩy sang /tasks (pathMatch 'full' bắt buộc với route rỗng)
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },

  // /tasks → trang chính: form + danh sách
  { path: 'tasks', component: TaskListPageComponent },

  // /tasks/:id → trang chi tiết; :id là tham số trên URL
  { path: 'tasks/:id', component: TaskDetailPageComponent },

  // Mọi URL khác → về danh sách (an toàn cho URL gõ sai)
  { path: '**', redirectTo: 'tasks' },
];

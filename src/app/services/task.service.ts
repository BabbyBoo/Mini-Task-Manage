import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';

const STORAGE_KEY = 'mini-task-manager.tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  /** Nguồn dữ liệu duy nhất của app — component chỉ đọc qua service này */
  readonly tasks = signal<Task[]>([]);

  constructor() {
    this.load();
  }

  /** Thêm công việc mới — sinh id, đặt trạng thái mặc định, ghi xuống LocalStorage */
  addTask(data: Pick<Task, 'title' | 'description'>): void {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: data.title.trim(),
      description: data.description.trim(),
      completed: false,
      createdAt: Date.now(),
    };
    this.tasks.update(list => [...list, newTask]);
    this.save();
  }

  /** Đảo trạng thái hoàn thành của 1 task — cập nhật BẤT BIẾN (mảng/object mới) */
  toggleTask(id: string): void {
    this.tasks.update(list =>
      list.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
    this.save();
  }

  /** Sửa tên + mô tả — spread tạo object MỚI, giữ nguyên id/completed/createdAt */
  updateTask(id: string, changes: Pick<Task, 'title' | 'description'>): void {
    // H2: trim ngay ở tầng dữ liệu — mọi caller đều nhận dữ liệu sạch
    const clean = { title: changes.title.trim(), description: changes.description.trim() };
    this.tasks.update(list =>
      list.map(t => (t.id === id ? { ...t, ...clean } : t))
    );
    this.save();
  }

  /** Xóa task — filter trả về mảng mới không còn phần tử bị xóa */
  deleteTask(id: string): void {
    this.tasks.update(list => list.filter(t => t.id !== id));
    this.save();
  }

  /** H1: kiểm chứng 1 giá trị bất kỳ có đúng hình dạng Task không (type guard) */
  private isTask(value: unknown): value is Task {
    if (value === null || typeof value !== 'object') return false;
    const v = value as Record<string, unknown>;
    return (
      typeof v['id'] === 'string' &&
      typeof v['title'] === 'string' &&
      typeof v['description'] === 'string' &&
      typeof v['completed'] === 'boolean' &&
      typeof v['createdAt'] === 'number'
    );
  }

  /** Đọc dữ liệu từ LocalStorage khi app khởi động */
  private load(): void {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        this.tasks.set([]);
        return;
      }
      const parsed: unknown = JSON.parse(raw);
      // H1: chỉ nhận MẢNG, và chỉ giữ item đúng hình dạng Task — loại bỏ dữ liệu rác
      this.tasks.set(Array.isArray(parsed) ? parsed.filter(item => this.isTask(item)) : []);
    } catch {
      // JSON hỏng cú pháp hoặc LocalStorage bị chặn → bắt đầu với danh sách rỗng
      this.tasks.set([]);
    }
  }

  /** Ghi danh sách hiện tại xuống LocalStorage — gọi sau MỖI lần đổi dữ liệu */
  private save(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks()));
  }
}

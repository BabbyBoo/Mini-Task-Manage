# Mini Task Manager

Ứng dụng quản lý công việc nhỏ xây bằng **Angular 19** — thực hành các khái niệm cốt lõi của Angular trước khi tham gia dự án lớn: standalone components, signals, Reactive Forms, Router và LocalStorage (không cần backend).

> Angular 19 · TypeScript · SCSS · Reactive Forms · Angular Router · LocalStorage

## ✨ Tính năng

- [x] Hiển thị danh sách công việc (control flow `@for` / `@empty` / `@if`)
- [x] Thêm công việc mới — form validate: bắt buộc, tối thiểu 3 ký tự, chặn chuỗi chỉ toàn dấu cách
- [x] Sửa tên & mô tả — edit inline với giá trị điền sẵn, chỉ 1 task ở chế độ sửa cùng lúc
- [x] Đánh dấu hoàn thành / chưa hoàn thành
- [x] Lọc theo trạng thái: Tất cả / Đang làm / Hoàn thành
- [x] Xóa công việc (có xác nhận)
- [x] Lưu dữ liệu bằng LocalStorage — refresh không mất; dữ liệu đọc từ kho được **validate hình dạng** trước khi dùng
- [x] Router 2 trang: `/tasks` và `/tasks/:id` (chi tiết), URL sai tự về danh sách

## 🚀 Chạy dự án

**Yêu cầu:** Node.js ≥ 18.19 (khuyến nghị 20/22), npm ≥ 10.

```bash
# 1. Cài dependency (theo lockfile)
npm ci        # hoặc: npm install

# 2. Chạy dev server → mở http://localhost:4200
npm start

# 3. Build production → thư mục dist/
npm run build
```

## 🗂️ Cấu trúc thư mục

```
src/app/
├── models/
│   └── task.model.ts        # Interface Task, type TaskFilter, validators dùng chung
├── services/
│   └── task.service.ts      # Nguồn dữ liệu DUY NHẤT: signal<Task[]> + đọc/ghi LocalStorage
├── components/              # Feature components — mỗi component một nhiệm vụ
│   ├── task-form/           #   Form thêm mới (Reactive Forms + validation)
│   └── task-list/           #   Danh sách: lọc, toggle, sửa inline, xóa
├── pages/                   # Tầng trang — chỉ lo "bố trí" các component
│   ├── task-list-page/      #   Trang chính = form + danh sách
│   └── task-detail-page/    #   Trang chi tiết, đọc :id từ URL qua input.required()
├── app.component.*          # Shell: menu + <router-outlet />
├── app.config.ts            # Providers: provideRouter + withComponentInputBinding
└── app.routes.ts            # Bản đồ URL → Component (redirect + wildcard)
```

## 🧭 Luồng dữ liệu

```
User thao tác (click/gõ)
   → Component (template binding, signal cục bộ như filter/editingId)
      → TaskService (addTask / toggleTask / updateTask / deleteTask)
         → cập nhật bất biến → signal<Task[]> phát thông báo
            → computed (filteredTasks) + template tự vẽ lại
         → save() ghi LocalStorage
F5 / mở lại trang
   → TaskService.load() đọc kho → validate từng item → state ban đầu
```

Nguyên tắc nổi bật trong code:

- **Cập nhật bất biến** — mọi thay đổi qua `map`/`filter`/spread, không mutation trực tiếp
- **Phân tầng rõ ràng** — dữ liệu dùng chung ở `Service`, trạng thái giao diện ở `Component`, trang chỉ lo bố trí ở `pages/`
- **Type guard** — dữ liệu đọc từ LocalStorage được kiểm chứng từng item trước khi tin tưởng

## 📌 Quy ước Git

- Commit theo [Conventional Commits](https://www.conventionalcommits.org): `feat:`, `fix:`, `docs:`, `chore:`
- Mỗi tính năng / nhóm vá lỗi = 1 commit riêng, thông điệp mô tả đúng phạm vi thay đổi

## 📚 Tài liệu dự án

| File | Nội dung |
|------|----------|
| [`PLAN-3H.md`](./PLAN-3H.md) | Lộ trình xây app trong 3 giờ, chia 8 giai đoạn có kết quả demo được |
| [`ROADMAP.md`](./ROADMAP.md) | Lộ trình học sâu 4 tuần: từng khái niệm Angular 19 + bài tập tự luyện |
| [`PROMPTS.md`](./PROMPTS.md) | Thư viện prompt làm việc với AI khi học code |

## 📝 Ghi chú kỹ thuật

- Dữ liệu chỉ lưu trên **trình duyệt của bạn** (LocalStorage) — không có backend, không gửi đi đâu cả
- Key lưu trữ: `mini-task-manager.tasks` (xóa key trong DevTools → Application để reset dữ liệu)
- Build production nằm ở `dist/mini-task-manager` — deploy được lên bất kỳ static hosting nào (Vercel, Netlify, GitHub Pages)

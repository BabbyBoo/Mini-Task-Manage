# 🗺️ Lộ trình luyện tập: Mini Task Manager (Angular 19)

> **Mục tiêu cuối:** Xây xong app quản lý công việc với Angular 19, hiểu từng dòng code AI viết, và đủ nền tảng để gia nhập dự án lớn.
>
> **Thời lượng gợi ý:** 4 tuần part-time (~1.5–2 giờ/ngày). Nếu full-time thì rút còn ~10 ngày.
>
> **Cách dùng lộ trình này:**
> 1. Làm theo đúng thứ tự giai đoạn — mỗi giai đoạn xây trên nền giai đoạn trước.
> 2. Ở mỗi giai đoạn: đọc "Khái niệm" → ra lệnh cho AI bằng prompt trong `PROMPTS.md` → **tự gõ lại code** (đừng copy-paste) → trả lời được hết "Checklist hiểu code" → làm "Bài tập tự luyện" KHÔNG dùng AI.
> 3. Đừng chuyển giai đoạn mới nếu chưa tick hết checklist. Chậm mà chắc thắng nhanh mà hời hợt.

---

## 📅 Bản đồ tổng quan

| # | Giai đoạn | Tính năng liên quan | Thời gian |
|---|-----------|--------------------|-----------|
| 0 | Chuẩn bị môi trường + nền TypeScript | — | 1–2 ngày |
| 1 | Hiển thị danh sách công việc | Xem danh sách | 2–3 ngày |
| 2 | Thêm công việc mới (Forms) | Thêm mới | 2–3 ngày |
| 3 | Service + LocalStorage | Lưu dữ liệu | 3–4 ngày |
| 4 | Sửa tên & mô tả | Chỉnh sửa | 2–3 ngày |
| 5 | Đánh dấu hoàn thành + Lọc | Toggle + Filter | 2 ngày |
| 6 | Xóa công việc | Xóa | 1 ngày |
| 7 | Router — tách nhiều trang | Điều hướng | 2–3 ngày |
| 8 | Refactor + SCSS chuyên nghiệp | Toàn bộ | 2 ngày |
| 9 | Nâng cao: test, RxJS, chuẩn bị dự án lớn | — | liên tục |

**Nguyên tắc vàng khi làm việc với AI** (chi tiết trong `PROMPTS.md`):
- ✅ Prompt theo từng tính năng nhỏ — không bao giờ bảo "xây cả app".
- ✅ Luôn kèm yêu cầu: *"giải thích từng phần code bạn viết"*.
- ✅ Tự gõ code theo, gặp dòng nào không hiểu thì dừng lại hỏi.
- ✅ Trước khi nhờ AI fix bug, tự đọc lỗi và đoán nguyên nhân trước.
- ✅ Bài tập tự luyện phải làm KHÔNG có AI — đó mới là kiến thức của bạn.

---

## Giai đoạn 0 — Chuẩn bị môi trường + nền TypeScript (1–2 ngày)

### 🎯 Mục tiêu
- Cài xong Angular CLI, tạo được project Angular 19 chạy được.
- Nắm đủ TypeScript để đọc code Angular không bối rối.

### 🧠 Khái niệm cần nắm (TypeScript)
- `interface`, `type`, `type union` (`'all' | 'active' | 'completed'`)
- Kiểu dữ liệu optional: `description?: string`
- Generic cơ bản: `signal<Task[]>`, `Array<Task>`
- Access modifiers: `private`, `public`, `readonly`
- Arrow function, destructuring, spread operator `...` (quan trọng để update state "bất biến")
- Decorator (chỉ cần hiểu: `@Component`, `@Injectable` là "nhãn gắn metadata cho class")

### 🛠 Việc cần làm
```bash
# 1. Tạo project (chọn: SCSS, không SSR, không zoneless cho lần đầu)
npx @angular/cli@19 new mini-task-manage --style=scss --ssr=false

# 2. Chạy thử
cd mini-task-manage
npm start   # mở http://localhost:4200
```
- Mở project bằng VS Code, đi dạo qua các file: `src/main.ts`, `src/app/app.component.ts`, `src/app/app.config.ts`, `angular.json`, `tsconfig.json`.
- Nhờ AI giải thích từng file khởi tạo (prompt P0.2 trong `PROMPTS.md`).

### ✅ Checklist hiểu code
- [ ] `main.ts` làm gì? App được "bootstrap" vào đâu trong `index.html`?
- [ ] `standalone component` là gì? Khác gì component cũ có `NgModule`?
- [ ] `app.config.ts` dùng để đăng ký cái gì?
- [ ] `angular.json` điều khiển điều gì khi `npm start` / `npm run build`?
- [ ] Vì sao ở đây tôi chọn `--ssr=false`? (gợi ý: `localStorage` chỉ tồn tại trên trình duyệt)

### 💪 Bài tập tự luyện (không AI)
1. Viết file `src/app/models/task.model.ts` với interface `Task`: `id: string`, `title: string`, `description: string`, `completed: boolean`, `createdAt: number`.
2. Sửa `app.component.ts` để render tiêu đề "Mini Task Manager" + ngày hôm nay bằng interpolation `{{ }}`.

---

## Giai đoạn 1 — Hiển thị danh sách công việc (2–3 ngày)

### 🎯 Mục tiêu
Render danh sách task từ một mảng hardcode, hiểu lifecycle của component và control flow template mới của Angular 17+.

### 🧠 Khái niệm cần nắm
- Component: `selector`, `templateUrl`, `styleUrls`, imports trong metadata
- Control flow mới: `@for (item of list; track item.id)`, `@empty`, `@if`, `@switch`
- Interpolation `{{ }}`, property binding `[disabled]`, event binding `(click)`
- Signals cơ bản: `signal([])`, đọc giá trị bằng `tasks()`, cập nhật bằng `tasks.set(...)`
- Change detection: Angular re-render khi nào?

### 🛠 Việc cần làm
1. Tạo component `task-list`: `ng generate component components/task-list`
2. Hardcode mảng 3–5 task trong component, render bằng `@for`, mỗi task hiện title + description.
3. Thêm badge trạng thái bằng `@if (task.completed)`.
4. Gắn `<app-task-list />` vào `AppComponent`.
5. Đổi mảng hardcode thành `signal<Task[]>` và thử thêm/xóa phần tử để thấy UI tự cập nhật.

### ✅ Checklist hiểu code
- [ ] `track task.id` trong `@for` để làm gì? Nếu bỏ `track` thì sao?
- [ ] Vì sao gọi `tasks()` chứ không phải `tasks`? Signal khác biến thường ở điểm nào?
- [ ] `@if` và `[hidden]` khác nhau thế nào?
- [ ] Dòng nào báo cho Angular "dữ liệu đã đổi, cần vẽ lại template"?

### 💪 Bài tập tự luyện
1. Hiển thị "Chưa có công việc nào" khi danh sách rỗng (`@empty`).
2. Hiện ngày tạo task dưới dạng `dd/MM/yyyy` — tự tìm hiểu `DatePipe` và cách khai báo trong mảng `imports` của component.
3. Đếm và hiển thị tổng số task.

---

## Giai đoạn 2 — Thêm công việc mới với Forms (2–3 ngày)

### 🎯 Mục tiêu
Làm form thêm task với validation, hiểu hai流派 forms của Angular và khi nào dùng cái nào.

### 🧠 Khái niệm cần nắm
- **Template-driven** (`FormsModule`, `[(ngModel)]`) vs **Reactive** (`ReactiveFormsModule`, `FormControl`, `FormGroup`, `FormBuilder`)
- Với dự án này: **dùng Reactive Forms** — dự án lớn gần như luôn dùng reactive.
- `Validators.required`, `minLength`, `maxLength`; hiển thị lỗi qua `control.invalid && control.touched`
- `FormBuilder.nonNullable` (Angular 14+) — tránh `null` trong form value
- Reset form sau khi submit; `(ngSubmit)` thay vì `(submit)`

### 🛠 Việc cần làm
1. Tạo component `task-form`.
2. Tạo form với 2 field: `title` (required, minLength 3), `description` (optional, maxLength 200).
3. Hiển thị thông báo lỗi đỏ dưới mỗi field khi sai.
4. Nút submit disabled khi form invalid.
5. Khi submit valid: thêm task mới vào mảng signal của `task-list` (tạm thời qua `@Input`/`@Output` hoặc để cả 2 component trong 1 component cha — giai đoạn 3 sẽ dọn lại bằng service).
6. Sinh `id` bằng `crypto.randomUUID()`.

### ✅ Checklist hiểu code
- [ ] `FormGroup` khác `FormControl` thế nào? Form này có mấy control?
- [ ] `touched`, `dirty`, `pristine` khác nhau ra sao? Vì sao chỉ hiện lỗi khi `touched`?
- [ ] `[disabled]="form.invalid"` — ai cập nhật lại disabled sau mỗi lần gõ?
- [ ] Vì sao `FormBuilder.nonNullable.group` thay vì `group` thường?
- [ ] `[(ngSubmit)]` — không, `(ngSubmit)` — khác gì `(submit)` của HTML?

### 💪 Bài tập tự luyện
1. Thêm field "độ ưu tiên" (`low | medium | high`) bằng `<select>` vào form và model `Task`.
2. Giới hạn: không cho thêm task trùng tên (kiểm tra trong hàm submit).
3. Sau khi thêm xong, tự động focus lại ô title — tìm hiểu `viewChild()` signal query của Angular 19.

---

## Giai đoạn 3 — Service + LocalStorage (3–4 ngày) ⭐ giai đoạn quan trọng nhất

### 🎯 Mục tiêu
Tách dữ liệu khỏi component vào một Service duy nhất, lưu bền bằng LocalStorage. Đây là kiến trúc chuẩn mọi dự án Angular đều dùng.

### 🧠 Khái niệm cần nắm
- `@Injectable({ providedIn: 'root' })` — singleton, Dependency Injection
- Vì sao không để state trong component? (2 component cần chung dữ liệu → service là nguồn sự thật)
- Signal trong service: service giữ `tasks = signal<Task[]>([])`, expose method `add/update/remove/toggle`
- `computed()` — derived state (ví dụ: `remainingCount`)
- LocalStorage API: `localStorage.setItem(key, JSON.stringify(arr))` / `JSON.parse(localStorage.getItem(key) ?? '[]')`
- Load khi khởi động: load trong constructor của service, hoặc dùng `provideAppInitializer` (nâng cao, có thể bỏ qua)
- Lưu mỗi khi dữ liệu đổi: gọi `save()` cuối mỗi method (đơn giản, đủ dùng) hoặc `effect()` trong service

### 🛠 Việc cần làm
1. `ng generate service services/task` → `TaskService`.
2. Chuyển toàn bộ logic state từ các component vào service:
   - `tasks = signal<Task[]>([])`
   - `addTask()`, `toggleTask(id)`, `deleteTask(id)`, `updateTask(id, changes)`
3. Service tự load từ LocalStorage khi được tạo, và tự lưu sau mỗi thay đổi.
4. Các component chỉ gọi service — không tự giữ mảng task nữa.
5. F12 → Application → Local Storage → xem key của bạn thay đổi theo thao tác. Refresh trang — dữ liệu còn nguyên.

### ✅ Checklist hiểu code
- [ ] Vì sao gọi service ở 2 component khác nhau vẫn thấy cùng 1 mảng task?
- [ ] Nếu bỏ `providedIn: 'root'` và đăng ký provider trong component thì chuyện gì xảy ra?
- [ ] Vì sao phải `JSON.stringify` trước khi `setItem`? LocalStorage lưu được object trực tiếp không?
- [ ] Điều gì xảy ra nếu JSON trong LocalStorage bị hỏng / key không tồn tại? Code đã xử lý chưa?
- [ ] `computed()` chạy lại khi nào?

### 💪 Bài tập tự luyện
1. Thêm `computed` đếm: tổng task, số còn việc, số đã xong — hiển thị ở đầu danh sách.
2. Bọc `localStorage` trong `try/catch` và trả về `[]` khi parse lỗi.
3. Viết hàm `clearCompleted()` xóa tất cả task đã hoàn thành.

---

## Giai đoạn 4 — Sửa tên & mô tả công việc (2–3 ngày)

### 🎯 Mục tiêu
Làm chức năng edit — nơi học kỹ Reactive Forms với giá trị ban đầu (`patchValue`) và cập nhật state bất biến.

### 🧠 Khái niệm cần nắm
- `setValue()` vs `patchValue()`
- `form.patchValue({ title: task.title, description: task.description })`
- Immutable update: `tasks.update(list => list.map(t => t.id === id ? { ...t, ...changes } : t))`
- Edit inline (click "Sửa" → dòng biến thành form) hoặc edit ở trang riêng (giai đoạn 7 sẽ chuyển sang route)
- `track task.id` giờ mới phát huy tác dụng: khi sửa 1 item, chỉ item đó re-render

### 🛠 Việc cần làm
1. Thêm nút "Sửa" trên mỗi task (`task-item` component).
2. Khi bấm: bật chế độ edit cho đúng task đó — hiện form với giá trị sẵn có (dùng `patchValue`).
3. Lưu: gọi `taskService.updateTask(id, form.getRawValue())` → tắt chế độ edit.
4. Cancel: bỏ thay đổi, không đụng đến dữ liệu.

### ✅ Checklist hiểu code
- [ ] `{ ...t, ...changes }` tạo ra cái gì? Vì sao không sửa `t.title = ...` trực tiếp?
- [ ] `setValue` bắt lỗi khi thiếu field còn `patchValue` thì không — nên dùng cái nào khi nào?
- [ ] `getRawValue()` khác `value` thế nào?
- [ ] Nếu user đang edit mà bấm "Đánh dấu hoàn thành" task khác — state edit có bị lỗi không?

### 💪 Bài tập tự luyện
1. Chỉ cho phép 1 task ở chế độ edit tại một thời điểm (dùng biến `editingId`).
2. Phím Enter = lưu, Escape = hủy (tìm hiểu `(keydown.enter)`, `(keydown.escape)`).
3. Nếu nội dung không đổi thì không ghi vào LocalStorage (so sánh trước khi update).

---

## Giai đoạn 5 — Đánh dấu hoàn thành + Lọc theo trạng thái (2 ngày)

### 🎯 Mục tiêu
Toggle trạng thái và filter — luyện `computed()` và derived state, mô hình UI quen thuộc nhất trong app thực tế.

### 🧠 Khái niệm cần nắm
- Toggle: `tasks.update(list => list.map(t => t.id === id ? { ...t, completed: !t.completed } : t))`
- Filter UI: 3 nút `Tất cả / Đang làm / Hoàn thành` — giữ trạng thái filter trong signal riêng
- **Kết hợp 2 signals bằng `computed()`:**
```ts
filter = signal<'all' | 'active' | 'completed'>('all');
filteredTasks = computed(() => {
  const tasks = this.taskService.tasks();
  switch (this.filter()) {
    case 'active':    return tasks.filter(t => !t.completed);
    case 'completed': return tasks.filter(t => t.completed);
    default:          return tasks;
  }
});
```

### 🛠 Việc cần làm
1. Checkbox trên mỗi task → gọi `taskService.toggleTask(id)`.
2. Style khác biệt cho task hoàn thành (gạch ngang, mờ) — dùng `[class.completed]="task.completed"`.
3. Bộ lọc 3 nút với trạng thái active được highlight.
4. Danh sách hiển thị đọc từ `filteredTasks()`.

### ✅ Checklist hiểu code
- [ ] Vì sao filter dùng `computed` mà không phải method `getFiltered()` gọi trong template?
- [ ] `class.completed` binding hoạt động thế nào? Cách khác để set class có điều kiện?
- [ ] Khi bấm filter, thứ tự task có đổi không? Vì sao?
- [ ] Filter có cần lưu vào LocalStorage không? Nếu muốn lưu thì lưu ở đâu?

### 💪 Bài tập tự luyện
1. Thêm ô tìm kiếm theo tên (thêm 1 signal nữa + logic vào `computed`).
2. Hiện số lượng trên mỗi nút lọc: "Hoàn thành (3)".
3. Thêm filter theo độ ưu tiên (nếu đã làm bài tập giai đoạn 2).

---

## Giai đoạn 6 — Xóa công việc (1 ngày)

### 🎯 Mục tiêu
Chức năng đơn giản nhất — dành để luyện UX an toàn (confirm) và immutable delete.

### 🧠 Khái niệm cần nắm
- `tasks.update(list => list.filter(t => t.id !== id))`
- Confirm: cách rẻ = `window.confirm()`; cách đẹp = modal tự viết (dùng `@if` + signal `taskToDelete`)
- (Bonus) Undo delete: giữ backup 5 giây trong signal, hiện toast "Đã xóa — Hoàn tác"

### 🛠 Việc cần làm
1. Nút "Xóa" → confirm → `taskService.deleteTask(id)`.
2. Nếu làm modal tự viết: quản lý open/close bằng signal, không dùng `*ngIf` cũ mà dùng `@if`.

### ✅ Checklist hiểu code
- [ ] `filter()` trả về mảng mới hay sửa mảng cũ? Điều đó quan trọng thế nào với signal?
- [ ] Modal tự viết — vì sao bấm nút X hay backdrop phải set signal về `null`?
- [ ] `id` sinh bằng `crypto.randomUUID()` — vì sao không dùng chỉ số mảng làm id?

### 💪 Bài tập tự luyện
1. Implement tính năng Undo delete (bài tập khó nhất tính đến lúc này — cứ thử, sai thì nhờ AI giải thích hướng đi, đừng nhờ code nguyên bản).
2. Nút "Xóa tất cả đã hoàn thành" với confirm.

---

## Giai đoạn 7 — Router: tách nhiều trang (2–3 ngày)

### 🎯 Mục tiêu
Biến app 1 trang thành app đa trang chuẩn: danh sách `/tasks`, thêm `/tasks/new`, chi tiết + sửa `/tasks/:id`. Đây là kỹ năng **bắt buộc** trong dự án lớn.

### 🧠 Khái niệm cần nắm
- `provideRouter(routes)` trong `app.config.ts`; `routerLink`, `routerLinkActive`
- Route với parameter: `{ path: 'tasks/:id', component: TaskDetailPage }`
- Đọc param bằng `input.required<string>()` (cách mới của Angular 16+) hoặc `ActivatedRoute.snapshot.paramMap`
- `Router` service để điều hướng bằng code: `router.navigate(['/tasks'])`
- Redirect + wildcard: `{ path: '', redirectTo: 'tasks', pathMatch: 'full' }`, `{ path: '**', redirectTo: 'tasks' }`
- Lazy loading: `loadComponent: () => import(...)` — chuẩn của mọi dự án lớn

### 🛠 Việc cần làm
1. Tạo page components: `pages/task-list-page`, `pages/task-form-page` (thêm mới), `pages/task-detail-page` (xem + sửa).
2. Đăng ký routes trong `app.routes.ts`, có redirect và wildcard.
3. Sửa `/tasks/new` dùng lại form đã viết (tái sử dụng `task-form` component).
4. `/tasks/:id` đọc id từ URL, tìm task trong service; không thấy task thì điều hướng về danh sách.
5. Bật lazy loading cho các page.

### ✅ Checklist hiểu code
- [ ] `<router-outlet />` hoạt động thế nào? Có bao nhiêu router-outlet trong app?
- [ ] Route `/tasks/abc` khi `abc` không tồn tại — app xử lý ra sao?
- [ ] `pathMatch: 'full'` quan trọng thế nào với route rỗng?
- [ ] Lazy loading giúp gì? Làm sao kiểm chứng trên tab Network của DevTools?
- [ ] Bấm F5 ở `/tasks/3` — app có lỗi không? Vì sao?

### 💪 Bài tập tự luyện
1. Highlight menu đang active bằng `routerLinkActive`.
2. Viết guard `CanDeactivateFn`: đang sửa mà chưa lưu thì hỏi "Rời đi mà không lưu?" trước khi chuyển trang.
3. Hiện task trước/sau trong trang chi tiết (link điều hướng).

---

## Giai đoạn 8 — Refactor + SCSS chuyên nghiệp (2 ngày)

### 🎯 Mục tiêu
"Code chạy được" → "code người khác đọc được". Đây là khác biệt giữa thực tập sinh và người đủ sức vào dự án lớn.

### 🧠 Khái niệm cần nắm
- Communication chuẩn giữa component: `input()`, `output()` (Angular 19 khuyến khích thay `@Input()`/`@Output()` decorator)
- Tách component nhỏ có trách nhiệm rõ: `task-item`, `task-form`, `task-filter`, page chỉ lo "bố trí"
- SCSS: biến `$color-primary`, nesting, `@mixin`/`@include`, BEM naming đơn giản (`.task-item__title`)
- Đặt tên có nghĩa, hàm nhỏ, 1 component 1 việc
- Đọc lại toàn bộ code của chính mình, xóa code chết

### 🛠 Việc cần làm
1. Refactor giao tiếp component sang `input()` / `output()` nếu còn dùng decorator.
2. Gom màu/chỗ dùng lại thành biến SCSS, viết mixin cho button + badge dùng chung.
3. Nhờ AI **review** code của bạn (prompt P8.1) — rồi tự sửa theo feedback, hỏi lý do từng góp ý.

### ✅ Checklist hiểu code
- [ ] `input.required<Task>()` khác gì `@Input() task!: Task`?
- [ ] Khi nào tách component con? Tiêu chí của bạn là gì?
- [ ] Vì sao dùng biến SCSS thay vì viết hex color lặp lại?
- [ ] Component nào của bạn còn làm quá nhiều việc? Tách thế nào?

### 💪 Bài tập tự luyện
1. Thêm dark mode: dùng CSS custom properties + signal lưu lựa chọn vào LocalStorage.
2. Responsive: dùng được trên mobile (media query, flexbox/grid).

---

## Giai đoạn 9 — Nâng cao: sẵn sàng dự án lớn (liên tục)

Làm song song/sau khi app hoàn chỉnh. Đây là phần "mòn răng" để không bỡ ngỡ khi vào dự án thật:

1. **RxJS cơ bản** — dự án lớn vẫn full Observable:
   - `Observable`, `subscribe`, `takeUntilDestroyed`, `toSignal`
   - Thử viết 1 service "giả API" trả `Observable` thay vì đọc trực tiếp LocalStorage (delay 500ms để mô phỏng network), rồi chuyển sang `toSignal()`. Đây là bài tập giá trị nhất của giai đoạn này.
2. **Change detection:** `ChangeDetectionStrategy.OnPush` — bật lên cho các component và hiểu vì sao app vẫn chạy đúng nhờ signal.
3. **Unit test:** viết test cho `TaskService` (add/toggle/filter) và 1 component. Luyện tư duy: test trước, code sau với 1 tính năng nhỏ.
4. **Git:** mỗi giai đoạn 1 nhánh + PR tự review; viết commit message rõ ràng.
5. **Deploy:** build production (`npm run build`) và deploy miễn phí lên Vercel/Netlify/Firebase Hosting — đi phỏng vấn có link demo luôn hơn.

### ✅ Checklist "sẵn sàng vào dự án lớn"
- [ ] Giải thích được luồng dữ liệu trong app mình: User action → Component → Service → Signal → Template.
- [ ] Tự viết component mới có form + validation mà không cần AI.
- [ ] Debug được lỗi trắng trang: tự mở Console, đọc stack trace, tìm ra file lỗi.
- [ ] Trả lời được: signal vs Observable? standalone vs NgModule? OnPush là gì? Vì sao dùng immutable update?
- [ ] Đã deploy bản production online.

---

## 📚 Nguồn học chính thống (đọc song song)
- **Angular docs — Learn Angular:** https://angular.dev/tutorials (tuyệt vời, có interactive tutorial)
- **Signals:** https://angular.dev/guide/signals
- **Forms:** https://angular.dev/guide/forms
- **Router:** https://angular.dev/guide/routing
- **TypeScript handbook:** https://www.typescriptlang.org/docs/handbook/intro.html
- **RxJS:** https://rxjs.dev/guide/overview

# ⏱️ PLAN-3H — Mini Task Manager trong 3 giờ (Angular 19)

> **Mục tiêu 180 phút:** Xong app quản lý công việc đầy đủ CRUD + Router + LocalStorage, và đã thực hành **đúng quy trình làm việc thực tế**: branch → commit → merge request → build.
>
> **Cách dùng file này:** Làm tuần tự G1 → G8. Mỗi giai đoạn có *kết quả nhìn thấy được* — không thấy kết quả thì không sang giai đoạn sau. Tick ✅ vào checkbox khi xong.
>
> 📚 File `ROADMAP.md` + `PROMPTS.md` là bản chi tiết 4 tuần — dùng khi có thêm thời gian sau buổi này. Prompt trong file này là bản rút gọn đủ dùng.

---

## 🕐 Đồng hồ 180 phút

| Giờ | Giai đoạn | Kết quả demo được |
|-----|-----------|-------------------|
| 0:00–0:20 | G1 · Onboard: môi trường + dự án chạy được | `localhost:4200` hiện app + commit Git đầu tiên |
| 0:20–0:45 | G2 · Data layer: Model + Service + LocalStorage | Số task hiện trên màn hình, refresh không mất |
| 0:45–1:05 | G3 · Feature: danh sách công việc | Danh sách task render bằng `@for`, rỗng có thông báo |
| 1:05–1:30 | G4 · Feature: thêm mới (Forms) | Thêm task qua form có validate, refresh còn nguyên |
| 1:30–2:10 | G5 · Feature: sửa / xóa / hoàn thành / lọc | CRUD đầy đủ + 3 nút lọc |
| 2:10–2:30 | G6 · Router 2 trang | `/tasks` và `/tasks/:id`, F5 không lỗi |
| 2:30–2:45 | G7 · QA + UI + DevTools | Giao diện gọn, đã test trường hợp rỗng / nhập sai |
| 2:45–3:00 | G8 · Handover: GitLab MR + build + README | Merge Request trên GitLab + bản build production |

**⏳ Quy tắc thời gian trong 3 giờ:**
- Kẹt một vấn đề quá **10 phút** → mới đưa cho AI. Trước đó tự đọc lỗi Console/Terminal và đoán nguyên nhân.
- Mỗi lệnh AI viết → **tự gõ lại tay**, không copy-paste. Gõ đến dòng không hiểu → hỏi ngay.
- Không ôn lý thuyết riêng — học TypeScript/CSS ngay trên code thật (G2 thiết kế để vậy).

---

## G1 · Onboard — môi trường + dự án chạy được ⏱ 20 phút

> Giống hệt ngày đầu vào dự án lớn: cài môi trường, chạy được dự án của người khác, commit đầu tiên.

### 🎁 Kết quả
`http://localhost:4200` hiện trang Angular mặc định; có commit đầu tiên trong repo.

### 🛠 Làm gì
```bash
node -v        # cần ≥ 18.19 (bạn đang có v22 ✓)
npm -v

# Tạo project Angular 19 ngay trong thư mục hiện tại:
npx -y @angular/cli@19 new mini-task-manager --directory . --style=scss --ssr=false --skip-git
# Nếu CLI hỏi thêm "zoneless?" → chọn No (mặc định).

npm start      # mở http://localhost:4200
```
Commit đầu tiên (repo Git đã có sẵn ở thư mục này):
```bash
git add .
git commit -m "chore: scaffold Angular 19 app"
```

### 🤖 Prompt dùng ngay
```
Đây là các file khởi tạo của project Angular 19 (dán main.ts, app.config.ts, app.routes.ts, app.component.ts).
Giải thích theo từng file: vai trò gì, được nạp lúc nào.
Cuối cùng vẽ sơ đồ luồng khởi động: index.html → main.ts → AppComponent.
```

### 🧰 Công cụ giới thiệu: **VS Code + extension**
- Cài extension **Angular Language Service** (autocomplate + báo lỗi template) và **Prettier** (format code).
- Mở terminal ngay trong VS Code (`Ctrl + `) — làm việc dự án lớn gần như không rời IDE.

### ✅ Checklist
- [ ] App chạy tại localhost:4200
- [ ] Trả lời được: `main.ts` bootstrap cái vào đâu?
- [ ] Trả lời được: `app.config.ts` đăng ký cái gì?
- [ ] Commit đầu tiên đã tạo (`git log` thấy)

---

## G2 · Data layer: Model + Service + LocalStorage ⏱ 25 phút

> Trong dự án thật, data layer luôn tách khỏi giao diện — đây là bước "thiết kế" trước khi vẽ UI. **Vừa làm vừa học TypeScript trên chính model này.**

### 🎁 Kết quả
Hiện số task mẫu lên màn hình; sửa code xong refresh trang → dữ liệu đọc từ LocalStorage.

### 🛠 Làm gì
1. Tạo `src/app/models/task.model.ts`:
```ts
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}
```
2. Tạo service: `ng generate service services/task`
3. Trong `TaskService`:
   - `tasks = signal<Task[]>([])`
   - constructor: đọc `localStorage.getItem('mini-task-manager.tasks')`, `JSON.parse` bọc `try/catch` → `tasks.set(...)`
   - method `private save()` ghi `JSON.stringify` sau mỗi lần đổi dữ liệu
4. Tạm hiển thị `{{ taskService.tasks().length }}` ở `AppComponent` để **nhìn thấy** service hoạt động.
5. Test tay: tạm thêm 1 task cứng trong constructor → refresh → F12 → tab **Application → Local Storage** → thấy key.

### 🤖 Prompt dùng ngay
```
Tạo 2 file cho dự án Angular 19 standalone của tôi:
1. src/app/models/task.model.ts — interface Task: id, title, description, completed, createdAt (số mili-giây).
2. src/app/services/task.service.ts — @Injectable providedIn 'root', giữ tasks là signal<Task[]>,
   load từ localStorage key 'mini-task-manager.tasks' khi khởi tạo (bọc try/catch, hỏng thì mảng rỗng),
   có method save() private ghi lại LocalStorage.
YÊU CẦU: sau code, giải thích interface, signal, providedIn 'root' và vì sao phải JSON.stringify.
KHÔNG tạo file khác, KHÔNG cài thư viện.
```

### 🧰 Công cụ giới thiệu: **TypeScript "đủ dùng"** (học trên model vừa viết)
| Khái niệm | Thấy ở đâu trong G2 |
|---|---|
| `interface` | `Task` — hình dạng dữ liệu |
| Optional property `?` | thử thêm `dueDate?: number` |
| Generic | `signal<Task[]>` |
| Union type | `'all' \| 'active' \| 'completed'` (dùng ở G5) |
| Spread `...` | copy object bất biến (dùng ở G5) |

### ✅ Checklist
- [ ] `Task` interface + `TaskService` đã tạo
- [ ] Hiện được số task lên màn hình
- [ ] Thấy key trong DevTools → Application → Local Storage
- [ ] Trả lời được: vì sao `JSON.stringify` trước khi `setItem`?
- [ ] Trả lời được: 2 component cùng inject `TaskService` thì thấy mấy mảng dữ liệu? Vì sao?

---

## G3 · Feature: danh sách công việc ⏱ 20 phút

### 🎁 Kết quả
Trang chủ render danh sách task thật từ service; rỗng thì hiện "Chưa có công việc nào".

### 🛠 Làm gì
1. `ng generate component components/task-list`
2. Template dùng control flow **mới của Angular 17+** (không dùng `*ngFor`/`*ngIf` cũ):
```html
@for (task of taskService.tasks(); track task.id) {
  <li [class.completed]="task.completed">
    {{ task.title }} — {{ task.description }}
  </li>
} @empty {
  <p>Chưa có công việc nào.</p>
}
```
3. Badge trạng thái bằng `@if (task.completed) { <span>✓</span> }`
4. Xóa mảng cứng tạm ở G2 — dữ liệu giờ chỉ sống trong service.

### 🤖 Prompt dùng ngay
```
Tạo TaskListComponent (standalone, Angular 19) hiển thị danh sách từ TaskService tôi đã có:
- @for với track, @empty khi rỗng, @if cho badge hoàn thành, [class.completed] gạch ngang task xong.
Sau code giải thích: track làm gì nếu bỏ nó, và vì sao gọi tasks() có dấu ngoặc.
```

### 🧰 Công cụ giới thiệu: **Chrome DevTools — tab Console**
- `F12` → Console: mọi lỗi template/logic hiện ở đây. Tập thói quen nhìn Console trước khi hỏi AI.
- Thử gõ `1 + '1'` — xem JS tự ép kiểu, lý do TypeScript tồn tại.

### ✅ Checklist
- [ ] Danh sách render được, rỗng có `@empty`
- [ ] Trả lời được: `track` làm gì?
- [ ] Trả lời được: `@if` khác `[hidden]` thế nào?
- [ ] Console không có lỗi đỏ

---

## G4 · Feature: thêm mới (Reactive Forms) ⏱ 25 phút

### 🎁 Kết quả
Form có validate (required, minLength 3) — submit hợp lệ thì task xuất hiện ngay và **refresh không mất**.

### 🛠 Làm gì
1. `ng generate component components/task-form`
2. Dùng `ReactiveFormsModule` + `FormBuilder.nonNullable`:
   - `title`: `Validators.required, Validators.minLength(3)`
   - `description`: `Validators.maxLength(200)`
3. Hiện lỗi tiếng Việt chỉ khi `touched`; nút submit `[disabled]="form.invalid"`.
4. Submit: `taskService.addTask(form.getRawValue())` với `id: crypto.randomUUID()`, `completed: false`, `createdAt: Date.now()` → rồi `form.reset()`.
5. Thêm method `addTask` vào `TaskService` (đừng quên gọi `this.save()`).

### 🤖 Prompt dùng ngay
```
Tạo TaskFormComponent (Angular 19, ReactiveFormsModule, FormBuilder.nonNullable) với title + description như mô tả trên.
Sau code, giải thích: touched/dirty khác gì, [disabled]="form.invalid" cập nhật lại khi nào,
và getRawValue() trả về hình dạng gì.
```

### 🧰 Công cụ giới thiệu: **DevTools — tab Application**
- **Application → Local Storage**: xem dữ liệu đổi theo từng thao tác — cách "debug" LocalStorage không cần console.log.
- Đây cũng là tab bạn sẽ dùng để xoá key khi muốn reset dữ liệu.

### ✅ Checklist
- [ ] Thêm task được, hiển thị ngay trong danh sách
- [ ] Refresh trang → task còn nguyên
- [ ] Nhập 1 ký tự → thấy thông báo lỗi, nút submit bị khóa
- [ ] Trả lời được: ai báo cho Angular vẽ lại UI sau khi `addTask`?

---

## G5 · Feature: sửa / xóa / hoàn thành / lọc ⏱ 40 phút — giai đoạn dài nhất

> Làm **từng chức năng một**, xong cái nào demo cái đó — đúng kiểu "feature-by-feature" của sprint thực tế.

### 🎁 Kết quả
CRUD đầy đủ: toggle ✓, 3 nút lọc (Tất cả/Đang làm/Hoàn thành), sửa inline, xóa có confirm.

### 🛠 Làm gì — theo thứ tự, mỗi mục ~10 phút
1. **Toggle hoàn thành (10p):** checkbox trên mỗi task → `toggleTask(id)`:
```ts
tasks.update(list => list.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
```
2. **Lọc (10p):** `filter = signal<'all' | 'active' | 'completed'>('all')` + `computed()`:
```ts
filteredTasks = computed(() => {
  const all = this.tasks();
  if (this.filter() === 'active') return all.filter(t => !t.completed);
  if (this.filter() === 'completed') return all.filter(t => t.completed);
  return all;
});
```
3. **Sửa inline (10p):** nút Sửa → biến dòng thành form với giá trị sẵn có (`patchValue`) → Lưu gọi `updateTask(id, changes)`; Cancel không đụng dữ liệu. Chỉ cho sửa 1 task cùng lúc (`editingId`).
4. **Xóa (10p):** nút Xóa → `window.confirm('Xóa công việc này?')` → `deleteTask(id)`:
```ts
tasks.update(list => list.filter(t => t.id !== id));
```
   *(Modal tự viết đẹp hơn — nhưng nếu thiếu giờ thì confirm của trình duyệt là đủ, ưu tiên xong tính năng trước.)*

### 🤖 Prompt dùng ngay (mỗi lần 1 tính năng, đừng gộp)
```
Thêm tính năng {{toggle hoàn thành / bộ lọc / sửa inline / xóa}} vào app của tôi (dán file liên quan).
Chỉ sửa các file: {{liệt kê}}. Sau code, giải thích vì sao cập nhật bằng mảng/object MỚI (bất biến)
thay vì sửa trực tiếp, và điều gì xảy ra với UI nhờ vậy.
```

### ✅ Checklist
- [ ] Tick checkbox → gạch ngang, refresh giữ nguyên trạng thái
- [ ] 3 nút lọc hoạt động, nút đang chọn được highlight
- [ ] Sửa xong → tên mới hiện ra; Cancel → không đổi gì
- [ ] Xóa → task biến mất; refresh → vẫn mất
- [ ] Trả lời được: vì sao `computed` chứ không phải method gọi trong template?
- [ ] Trả lời được: `{ ...t, ...changes }` tạo ra cái gì?

---

## G6 · Router: 2 trang ⏱ 20 phút

### 🎁 Kết quả
`/tasks` = danh sách; `/tasks/:id` = chi tiết 1 task; gõ URL thừa → về danh sách; F5 ở trang chi tiết không lỗi.

### 🛠 Làm gì
1. `ng generate component pages/task-detail-page`
2. Trong `app.routes.ts`:
```ts
export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/:id', component: TaskDetailPage },
  { path: '**', redirectTo: 'tasks' },
];
```
3. `app.component.html` chỉ còn menu (`routerLink` + `routerLinkActive`) + `<router-outlet />`.
4. Trang chi tiết đọc id bằng `id = input.required<string>()`, tìm task trong service; **không thấy task** → `router.navigate(['/tasks'])`.

### 🤖 Prompt dùng ngay
```
Cấu hình Angular Router cho app của tôi theo routes ở trên (standalone, provideRouter).
Trang chi tiết đọc id từ URL bằng input.required, không thấy task thì điều hướng về /tasks.
Sau code giải thích từng route, và chuyện gì xảy ra khi F5 tại /tasks/3.
```

### ✅ Checklist
- [ ] Điều hướng được 2 chiều bằng link
- [ ] Menu đang active được highlight (`routerLinkActive`)
- [ ] URL sai → về danh sách
- [ ] Trả lời được: `<router-outlet />` là gì và có mấy cái?

---

## G7 · QA + UI + DevTools ⏱ 15 phút

### 🎁 Kết quả
Giao diện bố trí bằng Flexbox, dùng được trên mobile; đã tự tay test các trường hợp biên.

### 🛠 Làm gì
1. SCSS nhanh: biến màu `$primary`, `.task-list` dùng `display: flex; flex-direction: column; gap: .5rem;`, container `max-width: 640px; margin: auto;`
2. Test tay từng trường hợp (ghi ra 1 dòng kết quả mỗi mục):
   - Danh sách rỗng → có thông báo không?
   - Nhập chỉ dấu cách → form có chặn không? *(nếu chưa: thêm `Validators.pattern('\\S+')` — hướng dẫn AI giải thích)*
   - Task không có description → giao diện có vỡ không?
   - Xóa task đang mở ở trang chi tiết → có lỗi không?
3. DevTools → `Ctrl+Shift+M` (device toolbar) → xem mobile 375px.

### 🤖 Prompt dùng ngay
```
Review code Mini Task Manager của tôi (dán các file). Đừng sửa gì trước.
Chỉ ra lỗi/thiếu theo mức Critical / High / Medium / Low, đặc biệt:
logic sai chỗ giữa Component–Service, trường hợp rỗng, rủi ro khi đọc/ghi LocalStorage.
Tôi đồng ý mục nào mới được sửa mục đó và phải giải thích thay đổi.
```

### 🧰 Công cụ giới thiệu: **quy trình QA thật**
- Dự án lớn: QA sẽ test đúng kiểu này (edge case + responsive). Tự test trước = code của bạn ít bị trả lại trong review.

### ✅ Checklist
- [ ] Giao diện không vỡ ở 375px
- [ ] Đã test đủ 4 trường hợp biên ở trên
- [ ] Đã nhờ AI review ≥ 1 lần và hiểu từng góp ý
- [ ] Console sạch lỗi

---

## G8 · Handover: GitLab MR + build + README ⏱ 15 phút

> Đúng quy trình bàn giao của dự án lớn: nhánh tính năng → merge request → build production → tài liệu chạy dự án.

### 🎁 Kết quả
Merge Request trên GitLab (hoặc GitHub), bản `dist/` build được, README hướng dẫn chạy dự án.

### 🛠 Làm gì
1. Quy trình Git chuẩn (luyện ít nhất 1 lần đủ):
```bash
git checkout -b feature/task-manager     # nhánh tính năng
git add . && git commit -m "feat: task CRUD with filter, router and localStorage"
```
2. Tạo repo trống trên **gitlab.com** (miễn phí) rồi:
```bash
git remote add origin git@gitlab.com:<user>/mini-task-manager.git
git push -u origin main                  # đẩy nhánh chính trước
git push -u origin feature/task-manager  # rồi đẩy nhánh tính năng
```
3. Trên GitLab: **Create merge request** từ `feature/task-manager` → `main`. Dùng chính prompt review ở G7 làm mô tả MR, tự đọc diff một lần trước khi bấm **Merge**.
4. Build production:
```bash
npm run build    # kết quả nằm trong dist/mini-task-manager
```
5. Viết/cập nhật `README.md` (nhờ AI soạn, mình duyệt): yêu cầu môi trường, lệnh cài, lệnh chạy, cấu trúc thư mục, danh sách tính năng.

### 🤖 Prompt dùng ngay
```
Soạn README.md cho dự án Angular 19 của tôi gồm: yêu cầu môi trường, các lệnh cài/chạy/build,
cấu trúc thư mục src/app với mô tả 1 dòng mỗi thư mục, và danh sách tính năng.
Dựa trên code thật tôi dán dưới đây, không bịa chức năng: {{dán cây thư mục + package.json}}
```

### ✅ Checklist
- [ ] Đã làm việc trên nhánh `feature/...` và merge về `main`
- [ ] Repo đã đẩy lên GitLab/GitHub, có Merge Request (kể cả merge xong)
- [ ] `npm run build` thành công, không lỗi
- [ ] README đủ để người khác clone về chạy được

---

## 🧰 Bộ công cụ frontend — cái nào liên quan, liên quan lúc nào?

| Công cụ | Trong 3 giờ này | Trong dự án lớn |
|---|---|---|
| **VS Code** (+ Angular Language Service, Prettier) | G1 — IDE chính, gõ code | IDE chính hằng ngày |
| **npm** | `install`, `start`, `run build` | Cài dependency, chạy script dự án |
| **Angular CLI** | `ng new`, `ng generate component/service` | Sinh code theo convention của dự án |
| **Git** | commit, branch, merge (G1, G8) | Branch/commit mỗi feature, code review qua MR |
| **GitLab** | G8 — repo, Merge Request | Nơi cộng tác chính: MR, issue, CI/CD pipeline tự chạy khi push |
| **Chrome DevTools** | G3–G7 — Console, Application (LocalStorage), responsive | Debug lỗi production, xem network, hiệu năng |
| **Postman** | ❌ **KHÔNG cần cho app này** — vì app chỉ dùng LocalStorage, **không có API để gọi** | Khi dự án có backend: gọi/thử API trước khi viết code gọi nó. Khi đó thêm ngay giai đoạn "mock API bằng JSONPlaceholder" vào app này |
| **Jira/Trello** (khái niệm) | Chính là bảng checkbox trong file này | Đứng việc theo sprint — bạn đang luyện thói quen rồi |

**Vì sao Postman không xuất hiện ở đây:** Postman là công cụ thử HTTP API. App của bạn lưu dữ liệu trong LocalStorage của trình duyệt nên không có gì để "gọi". Khi bạn học tiếp RxJS + HTTP client (`ROADMAP.md` G9) và có backend thật, đó là lúc Postman vào việc.

---

## 📊 Tổng kết buổi học — tick khi xong giai đoạn

- [ ] G1 · Onboard (4/4)
- [ ] G2 · Data layer (5/5)
- [ ] G3 · Danh sách (4/4)
- [ ] G4 · Thêm mới (4/4)
- [ ] G5 · Sửa/xóa/toggle/lọc (6/6)
- [ ] G6 · Router (4/4)
- [ ] G7 · QA + UI (4/4)
- [ ] G8 · GitLab MR + build (4/4)

## 🎯 Tiêu chí "đậu" sau 3 giờ

1. Demo được app đầy đủ 7 tính năng, refresh không mất dữ liệu.
2. Kể lại được luồng: **URL → Router → Component → Service → LocalStorage → Template** mà không nhìn tài liệu.
3. Đã trải qua quy trình thật: branch → commit → Merge Request → build production.
4. Biết khi nào cần Postman (có API) và đã quen GitLab MR.

**Nếu dư giờ:** quay lại `ROADMAP.md` giai đoạn 9 — mock API bằng Observable + Postman, hoặc deploy bản build lên Vercel/Netlify để có link demo.
**Nếu thiếu giờ:** rút G7 xuống 10 phút (bỏ responsive), xóa confirm = `window.confirm` luôn, nhưng **không bỏ G6 (Router) và G8 (Git/GitLab)** — đó là 2 thứ dự án lớn bắt buộc.

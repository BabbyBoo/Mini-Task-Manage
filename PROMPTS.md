# 🤖 Thư viện Prompt — dùng cùng ROADMAP.md

> Cách bạn prompt quyết định mức độ bạn học được. AI viết code hộ bạn nhanh, nhưng **prompt giỏi là prompt khiến AI dạy bạn**, không phải làm thay bạn.
>
> Cấu trúc file: [1] 7 nguyên tắc prompt → [2] Prompt mẫu theo giai đoạn (P0.x … P9.x) → [3] Prompt chẩn đoán thường ngày.

---

## 1. Bảy nguyên tắc prompt để "học" chứ không phải "hời"

1. **Nhỏ từng nhịp.** Mỗi prompt = 1 tính năng hoặc 1 file. Không bao giờ: *"Xây giúp tôi app todo hoàn chỉnh với Angular 19"* — bạn sẽ nhận 1 đống code không ai đọc nổi, kể cả AI.
2. **Luôn yêu cầu giải thích.** Kết mọi prompt bằng: *"Sau code, giải thích ngắn gọn từng phần và vì sao chọn cách đó."*
3. **Giới hạn phạm vi.** Nói rõ được dùng gì / không được dùng gì: *"Chỉ dùng signals và control flow mới (@for, @if), chưa dùng RxJS, chưa dùng thư viện UI."*
4. **Gắn ngữ cảnh thật.** Dán đoạn code + file path bạn đang có, nói rõ Angular version: đây là cách AI trả lời khớp với project của bạn thay vì đoán.
5. **Tự gõ lại code.** Đọc code AI → hiểu từng dòng → gõ lại tay (không copy-paste). Gõ đến dòng nào chưa hiểu thì dừng hỏi.
6. **Hỏi "what-if" trước khi nhờ sửa.** *"Nếu tôi bỏ track trong @for thì sao?"* học nhiều hơn *"Sửa giúp tôi lỗi này"*.
7. **Debug tự trước, AI sau.** Đọc thông báo lỗi, đoán nguyên nhân, viết ra — rồi mới đối chiếu với AI. Sai cũng không sao, đó là lúc não phát triển.

---

## 2. Prompt mẫu theo giai đoạn

> 💡 Các prompt viết dạng "điền vào chỗ trống": phần `{{...}}` là bạn thay bằng context thật. Prompt kiểu này còn dùng lại được khi vào dự án lớn.

### Giai đoạn 0 — Khởi tạo & đọc hiểu cấu trúc

**P0.1 — Tạo project (AI chỉ hướng, bạn gõ lệnh):**
```
Tôi dùng Node {{version}}. Hướng dẫn tôi tạo project Angular 19 bằng CLI với:
- SCSS cho style, KHÔNG dùng SSR, KHÔNG dùng zoneless.
Giải thích ngắn gọn từng option của lệnh `ng new` mà bạn đưa ra, và những câu CLI sẽ hỏi tôi.
```

**P0.2 — Giải thích cấu trúc khởi tạo:**
```
Đây là các file khởi tạo của project Angular 19 của tôi (dán nội dung main.ts, app.config.ts, app.component.ts).
Giải thích theo từng file: file đó đóng vai trò gì, được nạp lúc nào.
Cuối cùng vẽ sơ đồ thứ tự khởi động app từ index.html → main.ts → AppComponent.
```

**P0.3 — Ôn TypeScript theo nhu cầu Angular:**
```
Tôi biết JavaScript cơ bản. Liệt kê các tính năng TypeScript tôi BẮT BUỘC phải biết để đọc code Angular 19,
theo thứ tự ưu tiên, kèm 1 ví dụ ngắn mỗi mục. Không giải thích những gì không dùng đến trong Angular.
```

---

### Giai đoạn 1 — Hiển thị danh sách

**P1.1 — Component đầu tiên:**
```
Tôi đang có: {{dán nội dung app.component.ts}}.

Tạo 1 standalone component tên TaskList trong src/app/components/task-list/ có:
- Mảng 3 task hardcode (title, description, completed).
- Template render bằng control flow mới @for với track, hiển thị title, description và badge "✓" nếu completed.
- Dùng signal để giữ mảng.
YÊU CẦU: chỉ dùng @for/@if/@empty, không dùng *ngFor/*ngIf cũ.
Sau code: giải thích cách Angular biết phải vẽ lại UI khi mảng đổi.
```

**P1.2 — Hỏi ngược để hiểu sâu:**
```
Trong component vừa tạo, giải thích:
1. `track task.id` làm gì, nếu bỏ đi thì Angular làm gì khác khi mảng thay đổi?
2. Vì sao đọc mảng phải viết `tasks()` chứ không phải `tasks`?
3. `signal` khác gì biến thường: điều gì xảy ra với UI nếu tôi đổi thành biến thường?
Trả lời ngắn gọn, kèm ví dụ 3-5 dòng mỗi câu.
```

---

### Giai đoạn 2 — Form thêm mới

**P2.1 — Form reactive + validation:**
```
Tôi có TaskList component ở {{path}} (dán code hiện tại).

Tạo component TaskForm trong src/app/components/task-form/ dùng ReactiveFormsModule:
- 2 field: title (required, minLength 3), description (optional, maxLength 200).
- Dùng FormBuilder.nonNullable.
- Hiện lỗi tiếng Việt dưới field, chỉ hiện khi field đã touched.
- Nút submit disabled khi form invalid; submit hợp lệ thì emit output taskAdded với object mới (id = crypto.randomUUID()), rồi reset form.
Sau code: giải thích FormBuilder.nonNullable khác gì group thường, và luồng sự kiện từ bấm nút đến mảng task đổi.
```

**P2.2 — So sánh hai kiểu form:**
```
Giải thích sự khác nhau giữa template-driven và reactive forms trong Angular 19:
- Cú pháp, chỗ lưu state, chỗ hợp lệ hoá.
- Trong dự án lớn người ta ưu tiên cái nào và vì sao? Khi nào template-driven vẫn hợp lý?
Trả lời dạng bảng so sánh.
```

---

### Giai đoạn 3 — Service + LocalStorage ⭐

**P3.1 — Tách service (prompt quan trọng nhất lộ trình):**
```
Tôi có state task nằm rải rác trong các component {{dán code}}.

Refactor thành TaskService trong src/app/services/task.service.ts:
- @Injectable({ providedIn: 'root' }).
- Giữ duy nhất 1 nguồn dữ liệu: tasks = signal<Task[]>([]).
- Method: addTask, toggleTask, deleteTask, updateTask (cập nhật bất biến).
- Khởi tạo: đọc LocalStorage key 'mini-task-manager.tasks', JSON.parse an toàn (bọc try/catch, lỗi thì []).
- Mỗi method thay đổi dữ liệu phải ghi lại LocalStorage.
Các component chỉ inject service và gọi method — không tự giữ mảng.
Sau code: giải thích vì sao 2 component khác nhau thấy cùng dữ liệu, và vẽ sơ đồ luồng dữ liệu.
```

**P3.2 — Hỏi về DI:**
```
Về TaskService vừa tạo:
1. `providedIn: 'root'` nghĩa là gì? Nếu bỏ nó và khai báo providers trong 1 component thì chuyện gì xảy ra với dữ liệu?
2. Có cách nào tạo 2 instance riêng cho 2 phần app không? (chỉ cần nêu tên kỹ thuật)
```

**P3.3 — Bẫy cần biết trước:**
```
Trong Angular, điều gì xảy ra nếu tôi gọi localStorage trong service khi app chạy server-side (SSR)?
Nêu 2 cách phòng tránh. App của tôi đã tắt SSR — tôi vẫn cần biết vì dự án thật có thể bật.
```

---

### Giai đoạn 4 — Chỉnh sửa

**P4.1 — Edit inline:**
```
Trong TaskItem component {{dán code}}, thêm chức năng sửa title + description:
- Bấm "Sửa" → dòng chuyển thành form reactive với giá trị sẵn có bằng patchValue.
- Lưu: emit output taskUpdated với { id, title, description }; Hủy: bỏ form, không đổi dữ liệu.
- Chỉ 1 task được edit cùng lúc (state editingId ở component cha hoặc service — nêu 2 lựa chọn và khuyên dùng cái nào).
Sau code: giải thích patchValue vs setValue trong ngữ cảnh này.
```

**P4.2 — Immutable update:**
```
Giải thích dòng này hoạt động thế nào, từng bước:
tasks.update(list => list.map(t => t.id === id ? { ...t, ...changes } : t))
- `.map` trả về mảng mới hay sửa mảng cũ? Vì sao điều đó quan trọng với signal?
- Spread `{ ...t, ...changes }` làm gì nếu changes có title?
- Nếu tôi viết t.title = changes.title trực tiếp thì UI có cập nhật không? Vì sao?
```

---

### Giai đoạn 5 — Toggle + Lọc

**P5.1 — Filter bằng computed:**
```
Trong component {{dán code}}, thêm bộ lọc:
- signal filter: 'all' | 'active' | 'completed', mặc định 'all'.
- 3 nút, nút đang chọn được highlight qua [class.active].
- computed filteredTasks kết hợp taskService.tasks() và filter().
Sau code: giải thích computed chạy lại khi nào, và khác gì một method getFiltered() gọi trong template.
```

**P5.2 — Tìm hiểu sâu:**
```
Nếu trong filteredTasks tôi lọc bằng method trong template {{getFiltered()}} thay vì computed,
Angular sẽ tính lại hàm đó khi nào? Điều gì xấu có thể xảy ra? Cho 1 ví dụ cụ thể về kết quả sai hoặc chậm.
```

---

### Giai đoạn 6 — Xóa

**P6.1 — Xóa có confirm:**
```
Thêm chức năng xóa task vào TaskItem:
- Bấm "Xóa" → hiện confirm modal TỰ VIẾT bằng @if + signal (không dùng window.confirm).
- Modal có backdrop, nút Hủy và Xóa; Xóa thì emit output taskRemoved.
Sau code: giải thích quản lý open/close modal bằng signal, và những chỗ cần nhớ reset signal để modal không "kẹt".
```

---

### Giai đoạn 7 — Router

**P7.1 — Đa trang:**
```
App của tôi hiện 1 trang. Chuyển thành đa trang Angular 19:
- /tasks: trang danh sách (component {{...}}).
- /tasks/new: trang thêm mới (tái sử dụng TaskForm).
- /tasks/:id: trang chi tiết + sửa. Đọc id bằng input.required<string>().
- app.routes.ts có redirect '' → /tasks và wildcard '**' → /tasks.
- Các page load lazy bằng loadComponent.
- app.component chỉ còn nav + <router-outlet />.
Sau code: giải thích từng route, và điều gì xảy ra khi vào /tasks/id-không-tồn-tại (hãy xử lý: điều hướng về /tasks).
```

**P7.2 — Hỏi ngược:**
```
1. F5 ngay tại /tasks/3 — app có lỗi không? Vai trò của index.html và <base href> trong chuyện này?
2. Route param và query param khác nhau thế nào? Khi nào nên dùng query param? Cho ví dụ trong app của tôi.
3. loadComponent giúp gì? Làm sao tôi tự kiểm chứng bằng DevTools?
```

---

### Giai đoạn 8 — Review & refactor

**P8.1 — Nhờ AI review code CỦA BẠN (thói quen nên duy trì):**
```
Đây là code app task manager của tôi: {{dán các file chính}}.
Đừng sửa code. Hãy review theo 4 nhóm và chấm điểm 1-10 mỗi nhóm kèm lý do:
1. Cấu trúc/thứ bậc component (ai giữ state, ai render).
2. Cách dùng Angular 19 (signals, control flow, input/output mới).
3. Hiệu năng (thứ gì chạy lại thừa, thiếu track, thiếu OnPush).
4. Khả năng đọc (tên biến, hàm quá dài, lặp code).
Mỗi góp ý: chỉ ra file + dòng, nêu ảnh hưởng thực tế, gợi ý hướng sửa (chưa cần code sửa hoàn chỉnh).
```

**P8.2 — Refactor có chủ đích:**
```
Điểm {{x}} ở nhóm {{...}} trong review trước. Hướng dẫn tôi refactor BƯỚC 1 (chỉ 1 bước nhỏ nhất),
nêu rõ: sửa file nào, mong đợi gì sau bước đó, cách kiểm tra không làm hỏng tính năng khác.
Tôi sẽ tự sửa rồi quay lại cho bạn xem.
```

---

### Giai đoạn 9 — Nâng cao

**P9.1 — Giả API bằng Observable:**
```
Tôi muốn luyện RxJS. Hãy hướng dẫn tôi đổi TaskService thành "giả API":
- Method trả về Observable<T> phát giá trị sau delay 600ms (dùng timer/delay của RxJS) thay vì trả trực tiếp.
- Component tiêu thụ bằng toSignal() hoặc subscribe với takeUntilDestroyed.
Cho tôi code từng bước, và giải thích: Observable vs signal khác nhau về chỗ nào, khi nào dùng cái nào trong dự án thật.
```

**P9.2 — Unit test:**
```
Viết unit test bằng {{Jasmine/Karma mặc định của Angular 19}} cho TaskService của tôi {{dán code}}:
- Case: thêm task → mảng tăng 1 + LocalStorage được ghi.
- Case: toggle → completed đảo trạng thái.
- Case: LocalStorage hỏng (mock trả JSON sai) → app không crash, mảng rỗng.
Giải thích mock localStorage như thế nào và vì sao cần spyOn.
```

---

## 3. Prompt chẩn đoán thường ngày (dùng suốt lộ trình)

**🔧 Khi gặp lỗi:**
```
Tôi gặp lỗi khi {{làm gì}}. Đây là thông tin:
- Thông báo lỗi đầy đủ: {{dán lỗi từ console/terminal}}
- File liên quan: {{dán code}}
- Tôi đã thử: {{những gì bạn đã làm}}
Đừng sửa giùm. Hãy: (1) giải thích lỗi nghĩa là gì, (2) chỉ ra khả năng nguyên nhân theo thứ tự đáng ngờ nhất,
(3) hỏi tôi thêm thông tin nếu cần. Tôi muốn tự sửa theo gợi ý của bạn.
```

**🧭 Khi code AI viết mà bạn không hiểu:**
```
Giải thích đoạn code này như cho người mới, đi từng dòng: {{dán đoạn code}}.
Với mỗi dòng: nó làm gì, tại sao cần nó ở đây, và điều gì hỏng nếu bỏ nó đi.
```

**🔍 Khi muốn tự kiểm tra mức hiểu:**
```
Dựa vào code app của tôi, đặt cho tôi 5 câu hỏi phỏng vấn Angular 19 (kèm đáp án ẩn ở cuối)
về chính những phần code này — câu càng khó càng tốt, theo kiểu người interviewer sẽ hỏi.
```

**🚫 Khi AI làm quá tay:**
```
Bạn vừa thêm {{thư viện / khái niệm X}}. Tôi chưa học đến phần đó.
Hãy viết lại CHỈ dùng những gì tôi đã có: {{liệt kê những thứ đã học}}.
Sau đó giải thích X đó là gì để tôi biết mình sẽ học khi nào.
```

---

## ✅ Lời khuyên cuối

- **Không nhờ AI code khi đang làm "Bài tập tự luyện"** — đó là phần AI không được đụng vào. Sai → tự sửa → nhờ AI gợi ý hướng, không nhờ code.
- Cuối mỗi giai đoạn, dùng prompt 🔍 ở trên để AI "thi" bạn. Trả lời sai → quay lại đọc.
- Lưu lại các prompt hay bạn tự chỉnh vào file này — kĩ năng prompt là kĩ năng dùng suốt sự nghiệp, kể cả trong dự án lớn.

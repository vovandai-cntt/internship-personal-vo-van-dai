# 🧪 TÀI LIỆU KỊCH BẢN KIỂM THỬ (SOFTWARE TEST CASES SPECIFICATION)

**Tên dự án:** Quản Lý Sách Cá Nhân (Personal Book Manager)  
**Sinh viên thực hiện:** Võ Văn Đại  
**Đơn vị thực tập:** Kyanon Digital - Nhóm 2  
**Môi trường kiểm thử:** Localhost (`http://localhost:3000`), Vercel Production  
**Phiên bản:** 1.0.0  

---

## 1. Quy Ước Mức Độ Ưu Tiên & Trạng Thái

* **Mức độ ưu tiên (Priority):**
  * `P1 (Cao nhất)`: Chức năng cốt lõi (Xác thực, Thêm/Sửa/Xóa sách, Phân quyền).
  * `P2 (Trung bình)`: Bộ lọc, Tìm kiếm sách, Thống kê Dashboard.
  * `P3 (Thấp)`: Giao diện UI/UX, Skeleton Loading, Empty State.
* **Trạng thái (Status):** `Passed`, `Failed`, `Pending`.

---

## 2. Danh Sách Kịch Bản Kiểm Thử

### 2.1. Authentication (Xác Thực Người Dùng)

| Mã TC | Tên kịch bản | Độ ưu tiên | Các bước thực hiện | Kết quả mong đợi | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `AUTH_01` | Đăng ký tài khoản mới | P1 | 1. Truy cập `/auth/register`<br>2. Nhập Email & Mật khẩu hợp lệ<br>3. Bấm "Đăng ký" | Tạo tài khoản thành công, tự động chuyển hướng đến trang Đăng nhập. | Passed |
| `AUTH_02` | Đăng ký với Email đã tồn tại | P1 | 1. Nhập Email đã có trong hệ thống<br>2. Bấm "Đăng ký" | Hiển thị thông báo lỗi "Email đã được sử dụng". | Passed |
| `AUTH_03` | Đăng nhập hệ thống | P1 | 1. Truy cập `/auth/login`<br>2. Nhập đúng Email & Password<br>3. Bấm "Đăng nhập" | Đăng nhập thành công, lưu Session Cookie và vào Dashboard. | Passed |
| `AUTH_04` | Đăng xuất | P2 | Bấm nút "Đăng xuất" trên Navigation Bar | Xóa Cookie Session, chuyển hướng về lại trang Login. | Passed |

---

### 2.2. Authorization (Phân Quyền Truy Cập)

| Mã TC | Tên kịch bản | Độ ưu tiên | Các bước thực hiện | Kết quả mong đợi | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `AUTHZ_01` | Chặn người dùng chưa đăng nhập | P1 | Truy cập trực tiếp URL `/books` khi chưa login | Hệ thống tự động chuyển hướng về trang `/auth/login`. | Passed |
| `AUTHZ_02` | Quản lý dữ liệu riêng tư (Role USER) | P1 | Đăng nhập tài khoản USER và kiểm tra danh sách sách | Chỉ xem và thao tác được trên các cuốn sách do chính mình tạo. | Passed |
| `AUTHZ_03` | Chặn USER vào trang Admin | P1 | Đăng nhập tài khoản USER, truy cập URL `/admin` | Từ chối truy cập (403 Forbidden hoặc điều hướng về trang chủ). | Passed |

---

### 2.3. Quản Lý Sách (CRUD Book)

| Mã TC | Tên kịch bản | Độ ưu tiên | Các bước thực hiện | Kết quả mong đợi | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `BOOK_01` | Thêm sách mới | P1 | 1. Bấm "Thêm sách"<br>2. Nhập Tiêu đề, Tác giả, ISBN, chọn Danh mục<br>3. Bấm "Lưu" | Thêm sách thành công, sách mới hiển thị ngay trên danh sách. | Passed |
| `BOOK_02` | Validation form thêm sách | P2 | Bỏ trống Tiêu đề/Tác giả và bấm "Lưu" | Hiển thị thông báo lỗi ngay tại trường thông tin thiếu. | Passed |
| `BOOK_03` | Cập nhật thông tin sách | P1 | 1. Chọn sách $\rightarrow$ Bấm "Sửa"<br>2. Thay đổi trạng thái sang `BORROWED`<br>3. Bấm "Cập nhật" | Thông tin sách được lưu lại và giao diện cập nhật ngay lập tức. | Passed |
| `BOOK_04` | Xóa sách khỏi thư viện | P1 | 1. Bấm nút "Xóa" tại cuốn sách<br>2. Bấm "Xác nhận" trên Pop-up | Sách bị xóa khỏi Database, hiển thị thông báo xóa thành công. | Passed |

---

### 2.4. Tìm Kiếm & Bộ Lọc (Search & Filter)

| Mã TC | Tên kịch bản | Độ ưu tiên | Các bước thực hiện | Kết quả mong đợi | Trạng thái |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `SRCH_01` | Tìm kiếm theo Tên/Tác giả | P2 | Nhập từ khóa tên sách vào ô Search | Danh sách tự động lọc ra các cuốn sách khớp với từ khóa. | Passed |
| `FLTR_01` | Lọc theo Trạng thái | P2 | Chọn bộ lọc Trạng thái: `AVAILABLE` | Chỉ hiển thị các cuốn sách đang có sẵn trong kho. | Passed |
| `FLTR_02` | Tìm kiếm không có kết quả | P3 | Nhập từ khóa ngẫu nhiên không tồn tại | Hiển thị giao diện Empty State "Không tìm thấy cuốn sách nào". | Passed |
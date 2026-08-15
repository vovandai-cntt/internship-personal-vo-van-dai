# Yêu Cầu Dự Án: Quản Lý Sách (Personal Book Manager)

## 1. Giới thiệu tổng quan
Ứng dụng web giúp người dùng cá nhân quản lý, theo dõi và tìm kiếm danh mục sách cá nhân một cách trực quan. Dự án hướng tới sự tối giản, giúp việc sắp xếp, phân loại và theo dõi trạng thái mượn/trả sách trở nên nhanh chóng và hiệu quả.

## 2. Đối tượng sử dụng
- Cá nhân người dùng (Sinh viên, người yêu sách, độc giả muốn quản lý tủ sách/thư viện cá nhân).

## 3. Phạm vi chức năng (MVP)
### 3.1. Chức năng cốt lõi (CRUD & Tra cứu)
- **Thêm sách mới:** Người dùng có thể tạo bản ghi sách mới với các thông tin: Tên sách, Tác giả, Mã ISBN, Danh mục và Trạng thái ban đầu.
- **Xem danh sách & Báo cáo:** 
  - Hiển thị toàn bộ danh sách sách dưới dạng bảng trực quan kèm thẻ trạng thái (Sẵn có, Đang mượn, Hết sách).
  - Thống kê tổng quan qua các thẻ Dashboard: Tổng số sách, Sách sẵn có, Sách đang mượn, Số lượng danh mục.
- **Cập nhật thông tin:** Cho phép chỉnh sửa chi tiết thông tin cuốn sách hoặc thay đổi nhanh trạng thái mượn/trả.
- **Xóa sách:** Loại bỏ các cuốn sách khỏi thư viện cá nhân (có hộp thoại xác nhận).
- **Tìm kiếm & Bộ lọc:**
  - Tìm kiếm tức thời (Real-time) theo Tên sách, Tác giả hoặc mã ISBN.
  - Lọc danh sách theo Danh mục/Thể loại hoặc Trạng thái sách.

### 3.2. Yêu cầu giao diện & Trải nghiệm (UI/UX)
- Giao diện phản hồi nhanh (Responsive) hoạt động mượt mà trên cả máy tính và điện thoại.
- Có thông báo lỗi (Validation) khi bỏ trống các trường dữ liệu bắt buộc lúc thêm/sửa.
- Hiển thị trạng thái trống (Empty state) khi chưa có cuốn sách nào trong thư viện hoặc không tìm thấy kết quả phù hợp.

## 4. Yêu cầu kỹ thuật
- **Frontend:** Next.js App Router, React, TypeScript, Tailwind CSS, Lucide React (Icons).
- **Backend:** Xử lý logic dữ liệu qua Server Actions / Route Handlers của Next.js (sẽ cập nhật).
- **Database:** PostgreSQL kết nối qua Prisma ORM (sẽ cập nhật).
- **Triển khai:** Vercel & GitHub.
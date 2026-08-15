This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Personal Book Manager (Quản Lý Sách Cá Nhân)

Ứng dụng quản lý danh mục sách cá nhân được xây dựng trong chương trình thực tập Web Full-stack.  
Hệ thống cho phép người dùng đăng ký, đăng nhập và quản lý thư viện sách cá nhân. Mỗi người dùng chỉ có thể xem và quản lý danh mục sách của mình. Quản trị viên có quyền xem toàn bộ kho sách và danh sách tài khoản trong hệ thống.

---

## 1. Công nghệ sử dụng

### Frontend
- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Lucide React (Icons)

### Backend
- Next.js Server Actions / Route Handlers
- Prisma ORM

### Database
- PostgreSQL
- Neon PostgreSQL

### Authentication
- bcryptjs
- jose
- JWT Session
- HTTP Cookie

### Deploy
- Vercel

---

## 2. Chức năng chính

### Authentication
- Đăng ký tài khoản
- Đăng nhập
- Đăng xuất
- Mã hóa mật khẩu bằng bcrypt
- Quản lý Session bằng JWT
- Validation thông tin đăng nhập / đăng ký

### Phân quyền (Authorization)
Hệ thống hỗ trợ 2 vai trò:
- **USER:**
  - Xem danh mục sách của mình
  - Thêm sách mới vào thư viện cá nhân
  - Sửa thông tin sách của mình
  - Xóa sách khỏi hệ thống
  - Không thể sửa/xóa sách của người khác
- **ADMIN:**
  - Xem và quản lý toàn bộ kho sách trong hệ thống
  - Xem danh sách người dùng
  - Xem thống kê số lượng sách & tài khoản

---

## 3. Quản lý sách (Book Management)

Người dùng có thể:
- Xem danh sách sách dạng bảng / thẻ
- Thêm sách mới (Tên sách, Tác giả, ISBN, Danh mục, Trạng thái)
- Cập nhật thông tin chi tiết và chuyển đổi trạng thái sách
- Xóa sách (Có xác nhận trước khi xóa)
- Tìm kiếm tức thời theo Tiêu đề, Tác giả hoặc Mã ISBN
- Lọc danh sách theo Danh mục / Thể loại
- Lọc danh sách theo Trạng thái sách

Các trạng thái sách:
- `AVAILABLE` - Sẵn có
- `BORROWED` - Đang mượn
- `UNAVAILABLE` - Hết sách / Không khả dụng

---

## 4. Validation (Kiểm tra dữ liệu)

Hệ thống thiết lập các quy tắc kiểm tra dữ liệu nghiêm ngặt:
- Không để trống các trường: Tiêu đề sách, Tác giả
- Mã ISBN nhập vào phải đúng định dạng
- Email đăng ký không được trùng lặp
- Mật khẩu tối thiểu 6 ký tự
- Kiểm tra chính xác email/mật khẩu khi đăng nhập
- Kiểm tra quyền truy cập, sửa/xóa sách phía Server (Server-side validation)

---

## 5. UI / UX

- **Responsive:** Hoạt động mượt mà trên Desktop / Tablet / Mobile
- **Dashboard:** Thống kê tổng số sách, sách sẵn có, đang mượn và danh mục
- **Trạng thái giao diện:** Support Loading State, Empty State, Error State và Skeleton Loading
- **Thông báo:** Hiển thị Notification/Toast khi Thêm, Sửa, Xóa thành công
- **Xác nhận:** Modal hỏi lại người dùng trước khi thực hiện xóa sách

---

## 6. Database Schema

Dự án sử dụng PostgreSQL và Prisma ORM.

### Bảng / Model chính:
- `User`
- `Category`
- `Book`
- `BorrowRecord`

### Quan hệ (Relationships):

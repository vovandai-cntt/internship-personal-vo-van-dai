# ERD (Entity Relationship Diagram) - Quản Lý Sách

## 1. Mô tả sơ đồ các Thực thể (Entities)

Dự án Quản lý sách cá nhân tập trung quản lý thực thể chính là **Book** (Sách) cùng với các danh mục phân loại và lịch sử mượn trả liên quan.

```mermaid
erDiagram
    BOOK {
        string id PK "Mã định danh cuốn sách"
        string title "Tên sách"
        string author "Tác giả"
        string isbn "Mã số tiêu chuẩn quốc tế ISBN"
        string category_id FK "Mã danh mục"
        string status "Trạng thái (available | borrowed | unavailable)"
        datetime created_at "Thời gian tạo"
        datetime updated_at "Thời gian cập nhật gần nhất"
    }

    CATEGORY {
        string id PK "Mã định danh danh mục"
        string name "Tên danh mục (ví dụ: Công nghệ, Thiết kế)"
        string description "Mô tả chi tiết"
    }

    BORROW_RECORD {
        string id PK "Mã lịch sử mượn"
        string book_id FK "Mã sách được mượn"
        string borrower_name "Tên người mượn"
        datetime borrow_date "Ngày mượn"
        datetime return_date "Ngày trả dự kiến/thực tế"
        string status "Trạng thái mượn (borrowing | returned)"
    }

    CATEGORY ||--o{ BOOK : "chứa các"
    BOOK ||--o{ BORROW_RECORD : "có các lượt"
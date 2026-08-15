"use client";

import React, { useState } from "react";
import { 
  BookOpen, 
  Plus, 
  Search, 
  BookMarked, 
  Users, 
  Layers, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  X 
} from "lucide-react";

// Kiểu dữ liệu Sách
interface Book {
  id: number;
  title: string;
  author: string;
  category: string;
  isbn: string;
  status: "AVAILABLE" | "BORROWED" | "OUT_OF_STOCK";
}

// Dữ liệu mẫu sơ bộ
const initialBooks: Book[] = [
  { id: 1, title: "Lập trình Web với Next.js 14", author: "Nguyễn Văn A", category: "Công nghệ", isbn: "978-604-0-12345-1", status: "AVAILABLE" },
  { id: 2, title: "Thiết kế hệ thống Microservices", author: "Trần Thị B", category: "Công nghệ", isbn: "978-604-0-67890-2", status: "BORROWED" },
  { id: 3, title: "Giải thuật & Cấu trúc dữ liệu", author: "Lê Văn C", category: "Khoa học máy tính", isbn: "978-604-0-11223-3", status: "AVAILABLE" },
  { id: 4, title: "Tự học Tailwind CSS cấp tốc", author: "Phạm Minh D", category: "Thiết kế", isbn: "978-604-0-44556-4", status: "OUT_OF_STOCK" },
];

export default function Home() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form state thêm sách
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newCategory, setNewCategory] = useState("Công nghệ");
  const [newIsbn, setNewIsbn] = useState("");

  // Tìm kiếm & Lọc
  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          book.isbn.includes(searchTerm);
    const matchesCategory = selectedCategory === "ALL" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Xử lý Thêm sách
  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newAuthor || !newIsbn) return;

    const newBook: Book = {
      id: Date.now(),
      title: newTitle,
      author: newAuthor,
      category: newCategory,
      isbn: newIsbn,
      status: "AVAILABLE",
    };

    setBooks([newBook, ...books]);
    setIsModalOpen(false);

    // Reset form
    setNewTitle("");
    setNewAuthor("");
    setNewIsbn("");
  };

  // Xử lý Xóa sách
  const handleDeleteBook = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa cuốn sách này?")) {
      setBooks(books.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">
      {/* Header Top Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 text-white rounded-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-none text-slate-900">BookManager</h1>
              <p className="text-xs text-slate-500 mt-1">Hệ thống Quản lý Thư viện Sách</p>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            Thêm Sách Mới
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <BookMarked className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Tổng Số Sách</p>
              <p className="text-2xl font-bold text-slate-900">{books.length}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Sẵn Có</p>
              <p className="text-2xl font-bold text-slate-900">
                {books.filter((b) => b.status === "AVAILABLE").length}
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-lg">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Đang Mượn</p>
              <p className="text-2xl font-bold text-slate-900">
                {books.filter((b) => b.status === "BORROWED").length}
              </p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">Danh Mục</p>
              <p className="text-2xl font-bold text-slate-900">3</p>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên sách, tác giả, ISBN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-sm text-slate-500 font-medium whitespace-nowrap">Danh mục:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full md:w-auto px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="ALL">Tất cả danh mục</option>
              <option value="Công nghệ">Công nghệ</option>
              <option value="Khoa học máy tính">Khoa học máy tính</option>
              <option value="Thiết kế">Thiết kế</option>
            </select>
          </div>
        </div>

        {/* Books Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Tên Sách</th>
                  <th className="py-3 px-4">Tác Giả</th>
                  <th className="py-3 px-4">Mã ISBN</th>
                  <th className="py-3 px-4">Danh Mục</th>
                  <th className="py-3 px-4">Trạng Thái</th>
                  <th className="py-3 px-4 text-right">Thao Tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <tr key={book.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-4 font-semibold text-slate-900">{book.title}</td>
                      <td className="py-3 px-4 text-slate-600">{book.author}</td>
                      <td className="py-3 px-4 font-mono text-xs text-slate-500">{book.isbn}</td>
                      <td className="py-3 px-4">
                        <span className="inline-block bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md text-xs font-medium">
                          {book.category}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {book.status === "AVAILABLE" && (
                          <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full text-xs font-medium border border-emerald-200">
                            <CheckCircle2 className="w-3 h-3" /> Sẵn có
                          </span>
                        )}
                        {book.status === "BORROWED" && (
                          <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full text-xs font-medium border border-amber-200">
                            <Clock className="w-3 h-3" /> Đang mượn
                          </span>
                        )}
                        {book.status === "OUT_OF_STOCK" && (
                          <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 px-2.5 py-1 rounded-full text-xs font-medium border border-rose-200">
                            <AlertCircle className="w-3 h-3" /> Hết sách
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500 hover:text-blue-600 transition" title="Chỉnh sửa">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteBook(book.id)}
                            className="p-1.5 hover:bg-rose-50 rounded-md text-slate-500 hover:text-rose-600 transition" 
                            title="Xóa sách"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      Không tìm thấy cuốn sách nào phù hợp.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal Thêm Sách Mới */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl border border-slate-200 max-w-md w-full overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-lg">Thêm Sách Mới</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddBook} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Tên Sách</label>
                <input
                  type="text"
                  required
                  placeholder="Nhập tên sách..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Tác Giả</label>
                <input
                  type="text"
                  required
                  placeholder="Nhập tên tác giả..."
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Mã ISBN</label>
                  <input
                    type="text"
                    required
                    placeholder="978-..."
                    value={newIsbn}
                    onChange={(e) => setNewIsbn(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase mb-1">Danh Mục</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  >
                    <option value="Công nghệ">Công nghệ</option>
                    <option value="Khoa học máy tính">Khoa học máy tính</option>
                    <option value="Thiết kế">Thiết kế</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition shadow-sm"
                >
                  Thêm Sách
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
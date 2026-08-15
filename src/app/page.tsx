"use client";

import { FormEvent, useMemo, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  CircleAlert,
  Clock3,
  Layers3,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";

type BookStatus = "available" | "borrowed" | "unavailable";

type Book = {
  id: number;
  title: string;
  author: string;
  isbn: string;
  category: string;
  status: BookStatus;
};

type BookForm = Omit<Book, "id">;

const emptyBook: BookForm = {
  title: "",
  author: "",
  isbn: "",
  category: "Công nghệ",
  status: "available",
};

const initialBooks: Book[] = [
  { id: 1, title: "Lập trình Web với Next.js 14", author: "Nguyễn Văn An", isbn: "978-604-0-12345-1", category: "Công nghệ", status: "available" },
  { id: 2, title: "Thiết kế hệ thống Microservices", author: "Trần Thị Bích", isbn: "978-604-0-67890-2", category: "Công nghệ", status: "borrowed" },
  { id: 3, title: "Giải thuật & Cấu trúc dữ liệu", author: "Lê Minh Châu", isbn: "978-604-0-11223-3", category: "Khoa học máy tính", status: "available" },
  { id: 4, title: "Tự học Tailwind CSS cấp tốc", author: "Phạm Minh Đức", isbn: "978-604-0-44556-4", category: "Thiết kế", status: "unavailable" },
  { id: 5, title: "Clean Code", author: "Robert C. Martin", isbn: "978-0132350884", category: "Kỹ năng", status: "available" },
];

const statusStyles: Record<BookStatus, { label: string; className: string }> = {
  available: { label: "Sẵn có", className: "border-emerald-100 bg-emerald-50 text-emerald-700" },
  borrowed: { label: "Đang mượn", className: "border-amber-100 bg-amber-50 text-amber-700" },
  unavailable: { label: "Hết sách", className: "border-rose-100 bg-rose-50 text-rose-700" },
};

const inputClassName = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50";

export default function Home() {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [form, setForm] = useState<BookForm>(emptyBook);
  const [formError, setFormError] = useState("");

  const categories = useMemo(
    () => Array.from(new Set(books.map((book) => book.category))).sort(),
    [books],
  );

  const filteredBooks = useMemo(() => {
    const keyword = search.trim().toLocaleLowerCase("vi");

    return books.filter((book) => {
      const matchesKeyword = !keyword || [book.title, book.author, book.isbn].some((value) => value.toLocaleLowerCase("vi").includes(keyword));
      const matchesCategory = category === "all" || book.category === category;
      return matchesKeyword && matchesCategory;
    });
  }, [books, category, search]);

  const availableBooks = books.filter((book) => book.status === "available").length;
  const borrowedBooks = books.filter((book) => book.status === "borrowed").length;

  function openCreateModal() {
    setEditingBook(null);
    setForm(emptyBook);
    setFormError("");
    setIsModalOpen(true);
  }

  function openEditModal(book: Book) {
    setEditingBook(book);
    setForm({ title: book.title, author: book.author, isbn: book.isbn, category: book.category, status: book.status });
    setFormError("");
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingBook(null);
    setFormError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextBook = {
      title: form.title.trim(),
      author: form.author.trim(),
      isbn: form.isbn.trim(),
      category: form.category.trim(),
      status: form.status,
    };

    if (!nextBook.title || !nextBook.author || !nextBook.isbn || !nextBook.category) {
      setFormError("Vui lòng điền đầy đủ các trường bắt buộc.");
      return;
    }

    const hasDuplicateIsbn = books.some(
      (book) => book.isbn.toLocaleLowerCase() === nextBook.isbn.toLocaleLowerCase() && book.id !== editingBook?.id,
    );
    if (hasDuplicateIsbn) {
      setFormError("Mã ISBN này đã tồn tại trong thư viện.");
      return;
    }

    if (editingBook) {
      setBooks((currentBooks) => currentBooks.map((book) => (book.id === editingBook.id ? { ...book, ...nextBook } : book)));
    } else {
      setBooks((currentBooks) => [{ id: Date.now(), ...nextBook }, ...currentBooks]);
    }
    closeModal();
  }

  function handleDelete(id: number) {
    const book = books.find((item) => item.id === id);
    if (!book || !window.confirm(`Xóa sách “${book.title}” khỏi danh sách?`)) return;
    setBooks((currentBooks) => currentBooks.filter((item) => item.id !== id));
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200">
              <BookOpen className="size-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-lg font-bold tracking-tight text-slate-900">BookManager</p>
              <p className="hidden text-xs text-slate-500 sm:block">Quản lý thư viện đơn giản và hiệu quả</p>
            </div>
          </div>
          <button type="button" onClick={openCreateModal} className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100 sm:px-4">
            <Plus className="size-4" aria-hidden="true" />
            <span className="hidden sm:inline">Thêm sách mới</span><span className="sm:hidden">Thêm sách</span>
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="mb-1 text-sm font-semibold text-indigo-600">TỔNG QUAN THƯ VIỆN</p>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Quản lý sách</h1>
            <p className="mt-1 text-sm text-slate-500">Theo dõi và cập nhật danh mục sách của bạn.</p>
          </div>
          <p className="text-sm text-slate-500">Hiển thị <span className="font-semibold text-slate-700">{filteredBooks.length}</span> trên {books.length} sách</p>
        </section>

        <section className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Thống kê thư viện">
          <StatCard label="Tổng sách" value={books.length} icon={<BookOpen className="size-5" />} tone="indigo" />
          <StatCard label="Sẵn có" value={availableBooks} icon={<CheckCircle2 className="size-5" />} tone="emerald" />
          <StatCard label="Đang mượn" value={borrowedBooks} icon={<Clock3 className="size-5" />} tone="amber" />
          <StatCard label="Danh mục" value={categories.length} icon={<Layers3 className="size-5" />} tone="violet" />
        </section>

        <section className="mb-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <label className="relative block w-full md:max-w-xl">
              <span className="sr-only">Tìm kiếm sách</span>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} type="search" placeholder="Tìm theo tên sách, tác giả hoặc ISBN..." className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-50" />
            </label>
            <label className="flex shrink-0 items-center gap-2 text-sm font-medium text-slate-600">
              <span>Danh mục</span>
              <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50">
                <option value="all">Tất cả danh mục</option>
                {categories.map((item) => <option key={item} value={item}>{item}</option>)}
              </select>
            </label>
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[840px] text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wider text-slate-500">
                <tr><th className="px-6 py-4">Tên sách</th><th className="px-5 py-4">Tác giả</th><th className="px-5 py-4">ISBN</th><th className="px-5 py-4">Danh mục</th><th className="px-5 py-4">Trạng thái</th><th className="px-6 py-4 text-right">Thao tác</th></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredBooks.map((book) => (
                  <tr key={book.id} className="transition hover:bg-slate-50/80">
                    <td className="px-6 py-4"><p className="font-semibold text-slate-800">{book.title}</p></td>
                    <td className="whitespace-nowrap px-5 py-4 text-slate-600">{book.author}</td>
                    <td className="whitespace-nowrap px-5 py-4 font-mono text-xs text-slate-500">{book.isbn}</td>
                    <td className="whitespace-nowrap px-5 py-4"><span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">{book.category}</span></td>
                    <td className="whitespace-nowrap px-5 py-4"><span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[book.status].className}`}>{statusStyles[book.status].label}</span></td>
                    <td className="px-6 py-4"><div className="flex justify-end gap-1.5">
                      <button type="button" onClick={() => openEditModal(book)} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-50"><Pencil className="size-3.5" aria-hidden="true" /> Sửa</button>
                      <button type="button" onClick={() => handleDelete(book.id)} className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-slate-600 transition hover:bg-rose-50 hover:text-rose-700 focus:outline-none focus:ring-4 focus:ring-rose-50"><Trash2 className="size-3.5" aria-hidden="true" /> Xóa</button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredBooks.length === 0 && <div className="flex flex-col items-center px-6 py-16 text-center"><div className="mb-3 grid size-11 place-items-center rounded-full bg-slate-100 text-slate-400"><Search className="size-5" aria-hidden="true" /></div><p className="font-semibold text-slate-700">Không tìm thấy sách phù hợp</p><p className="mt-1 text-sm text-slate-500">Thử thay đổi từ khóa hoặc bộ lọc danh mục.</p></div>}
        </section>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm" role="presentation" onMouseDown={closeModal}>
          <section role="dialog" aria-modal="true" aria-labelledby="book-modal-title" className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl" onMouseDown={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div><p className="text-xs font-bold uppercase tracking-widest text-indigo-600">BookManager</p><h2 id="book-modal-title" className="mt-1 text-xl font-bold text-slate-900">{editingBook ? "Chỉnh sửa sách" : "Thêm sách mới"}</h2></div>
              <button type="button" onClick={closeModal} className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus:outline-none focus:ring-4 focus:ring-slate-100" aria-label="Đóng biểu mẫu"><X className="size-5" aria-hidden="true" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
              <FormField label="Tên sách" required><input required autoFocus value={form.title} onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))} placeholder="Ví dụ: Đắc nhân tâm" className={inputClassName} /></FormField>
              <FormField label="Tác giả" required><input required value={form.author} onChange={(event) => setForm((current) => ({ ...current, author: event.target.value }))} placeholder="Nhập tên tác giả" className={inputClassName} /></FormField>
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="ISBN" required><input required value={form.isbn} onChange={(event) => setForm((current) => ({ ...current, isbn: event.target.value }))} placeholder="978-..." className={inputClassName} /></FormField>
                <FormField label="Danh mục" required><input required list="book-categories" value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} placeholder="Chọn hoặc nhập danh mục" className={inputClassName} /><datalist id="book-categories">{categories.map((item) => <option key={item} value={item} />)}</datalist></FormField>
              </div>
              <FormField label="Trạng thái"><select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as BookStatus }))} className={inputClassName}><option value="available">Sẵn có</option><option value="borrowed">Đang mượn</option><option value="unavailable">Hết sách</option></select></FormField>
              {formError && <p className="flex items-center gap-2 rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700"><CircleAlert className="size-4 shrink-0" aria-hidden="true" />{formError}</p>}
              <div className="flex justify-end gap-3 border-t border-slate-100 pt-5"><button type="button" onClick={closeModal} className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100">Hủy</button><button type="submit" className="rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100">{editingBook ? "Lưu thay đổi" : "Thêm sách"}</button></div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}

function StatCard({ label, value, icon, tone }: { label: string; value: number; icon: React.ReactNode; tone: "indigo" | "emerald" | "amber" | "violet" }) {
  const tones = { indigo: "bg-indigo-50 text-indigo-600", emerald: "bg-emerald-50 text-emerald-600", amber: "bg-amber-50 text-amber-600", violet: "bg-violet-50 text-violet-600" };
  return <article className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className={`grid size-11 place-items-center rounded-xl ${tones[tone]}`}>{icon}</div><div><p className="text-sm font-medium text-slate-500">{label}</p><p className="mt-0.5 text-2xl font-bold tracking-tight text-slate-900">{value}</p></div></article>;
}

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1.5 block text-sm font-semibold text-slate-700">{label} {required && <span className="text-rose-500">*</span>}</span>{children}</label>;
}

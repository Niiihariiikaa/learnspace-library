
export type UserRole = 'student' | 'faculty' | 'admin' | 'guest';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profilePicture?: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  category: string;
  description: string;
  coverImage: string;
  available: boolean;
  isEbook?: boolean;
  totalCopies: number;
  availableCopies: number;
  publicationYear: number;
  publisher: string;
  language: string;
  pageCount?: number;
  location?: string;
}

export interface BorrowedBook {
  id: string;
  bookId: string;
  userId: string;
  borrowDate: Date;
  dueDate: Date;
  returnDate?: Date;
  renewalCount: number;
  status: 'borrowed' | 'returned' | 'overdue';
  fine?: number;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  type: 'due_date' | 'new_arrival' | 'request_response' | 'system';
  read: boolean;
  createdAt: Date;
}

export interface BookRequest {
  id: string;
  userId: string;
  title: string;
  author?: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  responseDate?: Date;
}

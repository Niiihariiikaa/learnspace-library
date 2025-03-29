
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Book, BorrowedBook, Notification, BookRequest } from '@/types';
import { useAuth } from './AuthContext';

// Sample data
import { books, borrowedBooks, notifications, bookRequests } from '@/data/mockData';

interface LibraryDataContextType {
  books: Book[];
  userBorrowedBooks: BorrowedBook[];
  notifications: Notification[];
  userBookRequests: BookRequest[];
  borrowBook: (bookId: string) => void;
  returnBook: (borrowId: string) => void;
  requestBook: (title: string, author: string, reason: string) => void;
  searchBooks: (query: string, filters?: Record<string, string>) => Book[];
  getBookById: (id: string) => Book | undefined;
  getBorrowedBookById: (id: string) => BorrowedBook | undefined;
  markNotificationAsRead: (id: string) => void;
  addBook: (book: Omit<Book, 'id'>) => void;
  editBook: (id: string, updates: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  renewBook: (borrowId: string) => void;
  approveBookRequest: (requestId: string) => void;
  rejectBookRequest: (requestId: string) => void;
}

const LibraryDataContext = createContext<LibraryDataContextType | undefined>(undefined);

export const LibraryDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [booksData, setBooksData] = useState<Book[]>(books);
  const [borrowedBooksData, setBorrowedBooksData] = useState<BorrowedBook[]>(borrowedBooks);
  const [notificationsData, setNotificationsData] = useState<Notification[]>(notifications);
  const [bookRequestsData, setBookRequestsData] = useState<BookRequest[]>(bookRequests);

  // Get user-specific data
  const userBorrowedBooks = user 
    ? borrowedBooksData.filter(book => book.userId === user.id)
    : [];
    
  const userNotifications = user
    ? notificationsData.filter(note => note.userId === user.id)
    : [];
    
  const userBookRequests = user
    ? bookRequestsData.filter(req => req.userId === user.id)
    : [];

  // Borrow a book
  const borrowBook = (bookId: string) => {
    if (!user) return;
    
    // Check if book is available
    const book = booksData.find(b => b.id === bookId);
    if (!book || book.availableCopies <= 0) return;
    
    // Create borrow record
    const now = new Date();
    const dueDate = new Date();
    dueDate.setDate(now.getDate() + (user.role === 'faculty' ? 30 : 14)); // Faculty get longer loan periods
    
    const newBorrow: BorrowedBook = {
      id: `borrow-${Date.now()}`,
      bookId,
      userId: user.id,
      borrowDate: now,
      dueDate,
      renewalCount: 0,
      status: 'borrowed'
    };
    
    // Update books and borrowed books
    setBorrowedBooksData([...borrowedBooksData, newBorrow]);
    setBooksData(booksData.map(b => {
      if (b.id === bookId) {
        return {
          ...b,
          availableCopies: b.availableCopies - 1,
          available: b.availableCopies - 1 > 0
        };
      }
      return b;
    }));
    
    // Create notification
    const newNotification: Notification = {
      id: `notif-${Date.now()}`,
      userId: user.id,
      message: `You have borrowed "${book?.title}". Due date: ${dueDate.toLocaleDateString()}`,
      type: 'system',
      read: false,
      createdAt: new Date()
    };
    
    setNotificationsData([...notificationsData, newNotification]);
  };

  // Return a book
  const returnBook = (borrowId: string) => {
    const borrowRecord = borrowedBooksData.find(b => b.id === borrowId);
    if (!borrowRecord) return;
    
    // Update borrow record
    const updatedBorrowedBooks = borrowedBooksData.map(b => {
      if (b.id === borrowId) {
        return {
          ...b,
          returnDate: new Date(),
          status: 'returned',
          // Calculate fine if overdue (in a real app, this would be more sophisticated)
          fine: new Date() > b.dueDate ? 5 : 0 // $5 fine if overdue
        };
      }
      return b;
    });
    
    // Update book availability
    const updatedBooks = booksData.map(b => {
      if (b.id === borrowRecord.bookId) {
        const newAvailableCopies = b.availableCopies + 1;
        return {
          ...b,
          availableCopies: newAvailableCopies,
          available: newAvailableCopies > 0
        };
      }
      return b;
    });
    
    setBorrowedBooksData(updatedBorrowedBooks);
    setBooksData(updatedBooks);
    
    // Create notification
    if (user) {
      const book = booksData.find(b => b.id === borrowRecord.bookId);
      const newNotification: Notification = {
        id: `notif-${Date.now()}`,
        userId: user.id,
        message: `You have returned "${book?.title}".`,
        type: 'system',
        read: false,
        createdAt: new Date()
      };
      
      setNotificationsData([...notificationsData, newNotification]);
    }
  };

  // Renew a book
  const renewBook = (borrowId: string) => {
    if (!user) return;
    
    const borrowRecord = borrowedBooksData.find(b => b.id === borrowId);
    if (!borrowRecord || borrowRecord.status !== 'borrowed' || borrowRecord.renewalCount >= 2) return;
    
    // Update due date (extend by 7 days for students, 14 for faculty)
    const updatedBorrowedBooks = borrowedBooksData.map(b => {
      if (b.id === borrowId) {
        const newDueDate = new Date(b.dueDate);
        newDueDate.setDate(newDueDate.getDate() + (user.role === 'faculty' ? 14 : 7));
        
        return {
          ...b,
          dueDate: newDueDate,
          renewalCount: b.renewalCount + 1
        };
      }
      return b;
    });
    
    setBorrowedBooksData(updatedBorrowedBooks);
    
    // Create notification
    const book = booksData.find(b => b.id === borrowRecord?.bookId);
    const newNotification: Notification = {
      id: `notif-${Date.now()}`,
      userId: user.id,
      message: `You have renewed "${book?.title}". New due date: ${borrowRecord && new Date(borrowRecord.dueDate).toLocaleDateString()}`,
      type: 'system',
      read: false,
      createdAt: new Date()
    };
    
    setNotificationsData([...notificationsData, newNotification]);
  };

  // Request a new book
  const requestBook = (title: string, author: string, reason: string) => {
    if (!user) return;
    
    const newRequest: BookRequest = {
      id: `request-${Date.now()}`,
      userId: user.id,
      title,
      author,
      reason,
      status: 'pending',
      createdAt: new Date()
    };
    
    setBookRequestsData([...bookRequestsData, newRequest]);
    
    // Create notification for user
    const userNotification: Notification = {
      id: `notif-${Date.now()}-user`,
      userId: user.id,
      message: `Your request for "${title}" has been submitted.`,
      type: 'system',
      read: false,
      createdAt: new Date()
    };
    
    // Create notification for admin
    const adminNotification: Notification = {
      id: `notif-${Date.now()}-admin`,
      userId: '3', // Admin ID from mock data
      message: `New book request: "${title}" by ${user.name}.`,
      type: 'system',
      read: false,
      createdAt: new Date()
    };
    
    setNotificationsData([...notificationsData, userNotification, adminNotification]);
  };

  // Approve a book request (admin only)
  const approveBookRequest = (requestId: string) => {
    if (!user || user.role !== 'admin') return;
    
    const request = bookRequestsData.find(r => r.id === requestId);
    if (!request) return;
    
    // Update request status
    const updatedRequests = bookRequestsData.map(r => {
      if (r.id === requestId) {
        return {
          ...r,
          status: 'approved',
          responseDate: new Date()
        };
      }
      return r;
    });
    
    setBookRequestsData(updatedRequests);
    
    // Create notification for requester
    const newNotification: Notification = {
      id: `notif-${Date.now()}`,
      userId: request.userId,
      message: `Your request for "${request.title}" has been approved.`,
      type: 'request_response',
      read: false,
      createdAt: new Date()
    };
    
    setNotificationsData([...notificationsData, newNotification]);
  };

  // Reject a book request (admin only)
  const rejectBookRequest = (requestId: string) => {
    if (!user || user.role !== 'admin') return;
    
    const request = bookRequestsData.find(r => r.id === requestId);
    if (!request) return;
    
    // Update request status
    const updatedRequests = bookRequestsData.map(r => {
      if (r.id === requestId) {
        return {
          ...r,
          status: 'rejected',
          responseDate: new Date()
        };
      }
      return r;
    });
    
    setBookRequestsData(updatedRequests);
    
    // Create notification for requester
    const newNotification: Notification = {
      id: `notif-${Date.now()}`,
      userId: request.userId,
      message: `Your request for "${request.title}" has been rejected.`,
      type: 'request_response',
      read: false,
      createdAt: new Date()
    };
    
    setNotificationsData([...notificationsData, newNotification]);
  };

  // Mark notification as read
  const markNotificationAsRead = (id: string) => {
    setNotificationsData(notificationsData.map(n => {
      if (n.id === id) {
        return { ...n, read: true };
      }
      return n;
    }));
  };

  // Search books
  const searchBooks = (query: string, filters?: Record<string, string>) => {
    if (!query && !filters) return booksData;
    
    return booksData.filter(book => {
      // Check if book matches search query
      const matchesQuery = !query || 
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase()) ||
        book.description.toLowerCase().includes(query.toLowerCase()) ||
        book.isbn.includes(query);
      
      // Check if book matches all filters
      const matchesFilters = !filters || Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        
        switch (key) {
          case 'category':
            return book.category === value;
          case 'available':
            return value === 'true' ? book.available : true;
          case 'isEbook':
            return value === 'true' ? book.isEbook : true;
          default:
            return true;
        }
      });
      
      return matchesQuery && matchesFilters;
    });
  };

  // Get book by ID
  const getBookById = (id: string) => {
    return booksData.find(book => book.id === id);
  };

  // Get borrowed book by ID
  const getBorrowedBookById = (id: string) => {
    return borrowedBooksData.find(book => book.id === id);
  };

  // Add new book (admin only)
  const addBook = (bookData: Omit<Book, 'id'>) => {
    if (!user || user.role !== 'admin') return;
    
    const newBook: Book = {
      ...bookData,
      id: `book-${Date.now()}`
    };
    
    setBooksData([...booksData, newBook]);
    
    // Create notification for all users
    const newNotification: Notification = {
      id: `notif-${Date.now()}`,
      userId: 'all', // Special ID for notifications to all users
      message: `New book added: "${newBook.title}" by ${newBook.author}.`,
      type: 'new_arrival',
      read: false,
      createdAt: new Date()
    };
    
    setNotificationsData([...notificationsData, newNotification]);
  };

  // Edit book (admin only)
  const editBook = (id: string, updates: Partial<Book>) => {
    if (!user || user.role !== 'admin') return;
    
    setBooksData(booksData.map(book => {
      if (book.id === id) {
        return { ...book, ...updates };
      }
      return book;
    }));
  };

  // Delete book (admin only)
  const deleteBook = (id: string) => {
    if (!user || user.role !== 'admin') return;
    
    setBooksData(booksData.filter(book => book.id !== id));
    
    // Also remove any borrow records for this book
    setBorrowedBooksData(borrowedBooksData.filter(borrow => borrow.bookId !== id));
  };

  return (
    <LibraryDataContext.Provider value={{
      books: booksData,
      userBorrowedBooks,
      notifications: userNotifications,
      userBookRequests,
      borrowBook,
      returnBook,
      requestBook,
      searchBooks,
      getBookById,
      getBorrowedBookById,
      markNotificationAsRead,
      addBook,
      editBook,
      deleteBook,
      renewBook,
      approveBookRequest,
      rejectBookRequest
    }}>
      {children}
    </LibraryDataContext.Provider>
  );
};

export const useLibraryData = () => {
  const context = useContext(LibraryDataContext);
  if (context === undefined) {
    throw new Error('useLibraryData must be used within a LibraryDataProvider');
  }
  return context;
};


import { Book, BorrowedBook, Notification, BookRequest } from '@/types';

export const books: Book[] = [
  {
    id: '1',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    isbn: '9780061120084',
    category: 'Fiction',
    description: 'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it.',
    coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop',
    available: true,
    isEbook: true,
    totalCopies: 5,
    availableCopies: 3,
    publicationYear: 1960,
    publisher: 'HarperCollins',
    language: 'English',
    pageCount: 336,
    location: 'Fiction Section - Shelf A'
  },
  {
    id: '2',
    title: 'Principles of Physics',
    author: 'David Halliday, Robert Resnick, Jearl Walker',
    isbn: '9780470524633',
    category: 'Academic',
    description: 'A comprehensive text that covers fundamental concepts of physics.',
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=687&auto=format&fit=crop',
    available: true,
    isEbook: false,
    totalCopies: 10,
    availableCopies: 7,
    publicationYear: 2014,
    publisher: 'Wiley',
    language: 'English',
    pageCount: 1248,
    location: 'Academic Section - Shelf C'
  },
  {
    id: '3',
    title: 'Introduction to Algorithms',
    author: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein',
    isbn: '9780262033848',
    category: 'Academic',
    description: 'A comprehensive introduction to the modern study of computer algorithms.',
    coverImage: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1470&auto=format&fit=crop',
    available: true,
    isEbook: true,
    totalCopies: 8,
    availableCopies: 3,
    publicationYear: 2009,
    publisher: 'MIT Press',
    language: 'English',
    pageCount: 1312,
    location: 'Computer Science Section - Shelf B'
  },
  {
    id: '4',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    isbn: '9780743273565',
    category: 'Fiction',
    description: 'The story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
    coverImage: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=688&auto=format&fit=crop',
    available: true,
    isEbook: false,
    totalCopies: 6,
    availableCopies: 4,
    publicationYear: 1925,
    publisher: 'Scribner',
    language: 'English',
    pageCount: 180,
    location: 'Fiction Section - Shelf A'
  },
  {
    id: '5',
    title: 'Journal of Neuroscience',
    author: 'Society for Neuroscience',
    isbn: '0270-6474',
    category: 'Journals',
    description: 'A peer-reviewed academic journal covering neuroscience.',
    coverImage: 'https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=687&auto=format&fit=crop',
    available: true,
    isEbook: true,
    totalCopies: 3,
    availableCopies: 2,
    publicationYear: 2023,
    publisher: 'Society for Neuroscience',
    language: 'English',
    pageCount: 200,
    location: 'Journal Section - Shelf D'
  },
  {
    id: '6',
    title: 'The Origin of Species',
    author: 'Charles Darwin',
    isbn: '9780451529060',
    category: 'Non-Fiction',
    description: 'Darwin\'s theory of evolution and natural selection.',
    coverImage: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1476&auto=format&fit=crop',
    available: true,
    isEbook: true,
    totalCopies: 4,
    availableCopies: 2,
    publicationYear: 1859,
    publisher: 'Signet Classics',
    language: 'English',
    pageCount: 576,
    location: 'Non-Fiction Section - Shelf E'
  },
  {
    id: '7',
    title: 'Brief History of Time',
    author: 'Stephen Hawking',
    isbn: '9780553380163',
    category: 'Non-Fiction',
    description: 'Hawking attempts to explain a range of subjects in cosmology.',
    coverImage: 'https://images.unsplash.com/photo-1537495329792-41ae41ad3bf0?q=80&w=687&auto=format&fit=crop',
    available: true,
    isEbook: false,
    totalCopies: 5,
    availableCopies: 3,
    publicationYear: 1988,
    publisher: 'Bantam',
    language: 'English',
    pageCount: 212,
    location: 'Non-Fiction Section - Shelf E'
  },
  {
    id: '8',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    isbn: '9780141439518',
    category: 'Fiction',
    description: 'The romantic clash between the opinionated Elizabeth and her proud beau, Mr. Darcy.',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=687&auto=format&fit=crop',
    available: true,
    isEbook: true,
    totalCopies: 7,
    availableCopies: 5,
    publicationYear: 1813,
    publisher: 'Penguin Classics',
    language: 'English',
    pageCount: 480,
    location: 'Fiction Section - Shelf A'
  }
];

// Sample borrowed books
export const borrowedBooks: BorrowedBook[] = [
  {
    id: 'borrow-1',
    bookId: '1',
    userId: '1',
    borrowDate: new Date('2023-06-01'),
    dueDate: new Date('2023-06-15'),
    renewalCount: 0,
    status: 'borrowed'
  },
  {
    id: 'borrow-2',
    bookId: '3',
    userId: '1',
    borrowDate: new Date('2023-05-20'),
    dueDate: new Date('2023-06-03'),
    renewalCount: 1,
    status: 'borrowed'
  },
  {
    id: 'borrow-3',
    bookId: '5',
    userId: '2',
    borrowDate: new Date('2023-05-15'),
    dueDate: new Date('2023-06-15'),
    renewalCount: 0,
    status: 'borrowed'
  },
  {
    id: 'borrow-4',
    bookId: '7',
    userId: '2',
    borrowDate: new Date('2023-04-10'),
    dueDate: new Date('2023-05-10'),
    returnDate: new Date('2023-05-08'),
    renewalCount: 0,
    status: 'returned'
  }
];

// Sample notifications
export const notifications: Notification[] = [
  {
    id: 'notif-1',
    userId: '1',
    message: 'Your book "To Kill a Mockingbird" is due in 3 days.',
    type: 'due_date',
    read: false,
    createdAt: new Date('2023-06-12')
  },
  {
    id: 'notif-2',
    userId: '1',
    message: 'New arrival: "The Catcher in the Rye" is now available.',
    type: 'new_arrival',
    read: true,
    createdAt: new Date('2023-06-01')
  },
  {
    id: 'notif-3',
    userId: '2',
    message: 'Your book "Journal of Neuroscience" is due in 5 days.',
    type: 'due_date',
    read: false,
    createdAt: new Date('2023-06-10')
  },
  {
    id: 'notif-4',
    userId: '2',
    message: 'Your request for "Quantum Physics" has been approved.',
    type: 'request_response',
    read: true,
    createdAt: new Date('2023-05-25')
  },
  {
    id: 'notif-5',
    userId: '3',
    message: 'Student John Doe has requested a new book: "Machine Learning Basics".',
    type: 'system',
    read: false,
    createdAt: new Date('2023-06-05')
  }
];

// Sample book requests
export const bookRequests: BookRequest[] = [
  {
    id: 'request-1',
    userId: '1',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    reason: 'Required for literature class.',
    status: 'pending',
    createdAt: new Date('2023-06-10')
  },
  {
    id: 'request-2',
    userId: '2',
    title: 'Quantum Physics',
    author: 'Stephen Hawking',
    reason: 'Research project on quantum mechanics.',
    status: 'approved',
    createdAt: new Date('2023-05-20'),
    responseDate: new Date('2023-05-25')
  },
  {
    id: 'request-3',
    userId: '2',
    title: 'Advanced Organic Chemistry',
    author: 'Francis A. Carey',
    reason: 'Required for teaching undergraduate students.',
    status: 'rejected',
    createdAt: new Date('2023-05-01'),
    responseDate: new Date('2023-05-05')
  }
];

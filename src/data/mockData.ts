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
    id: '9',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    isbn: '9780062315007',
    category: 'Fiction',
    description: 'A magical story about following your dreams and listening to your heart.',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=687&auto=format&fit=crop',
    available: true,
    isEbook: true,
    totalCopies: 8,
    availableCopies: 8,
    publicationYear: 1988,
    publisher: 'HarperOne',
    language: 'English',
    pageCount: 208,
    location: 'Fiction Section - Shelf B'
  },
  {
    id: '10',
    title: 'Introduction to Machine Learning',
    author: 'Ethem Alpaydin',
    isbn: '9780262028189',
    category: 'Academic',
    description: 'A concise overview of the field of machine learning, ideal for students and professionals.',
    coverImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1373&auto=format&fit=crop',
    available: true,
    isEbook: true,
    totalCopies: 6,
    availableCopies: 4,
    publicationYear: 2014,
    publisher: 'MIT Press',
    language: 'English',
    pageCount: 640,
    location: 'Computer Science Section - Shelf C'
  },
  {
    id: '11',
    title: 'Journal of Biotechnology',
    author: 'Various Authors',
    isbn: '0168-1656',
    category: 'Journals',
    description: 'A peer-reviewed scientific journal covering biotechnology research and applications.',
    coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1470&auto=format&fit=crop',
    available: true,
    isEbook: true,
    totalCopies: 3,
    availableCopies: 3,
    publicationYear: 2022,
    publisher: 'Elsevier',
    language: 'English',
    pageCount: 180,
    location: 'Journal Section - Shelf D'
  },
  {
    id: '12',
    title: 'Sapiens: A Brief History of Humankind',
    author: 'Yuval Noah Harari',
    isbn: '9780062316097',
    category: 'Non-Fiction',
    description: 'A groundbreaking narrative of humanity\'s creation and evolution.',
    coverImage: 'https://images.unsplash.com/photo-1535398089889-dd807df1dfaa?q=80&w=1374&auto=format&fit=crop',
    available: true,
    isEbook: false,
    totalCopies: 7,
    availableCopies: 5,
    publicationYear: 2015,
    publisher: 'Harper',
    language: 'English',
    pageCount: 464,
    location: 'Non-Fiction Section - Shelf F'
  },
  {
    id: '13',
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    isbn: '9780618640157',
    category: 'Fiction',
    description: 'An epic high-fantasy novel that follows the quest to destroy the One Ring.',
    coverImage: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?q=80&w=1374&auto=format&fit=crop',
    available: true,
    isEbook: true,
    totalCopies: 10,
    availableCopies: 6,
    publicationYear: 1954,
    publisher: 'Mariner Books',
    language: 'English',
    pageCount: 1178,
    location: 'Fiction Section - Shelf A'
  },
  {
    id: '14',
    title: 'Organic Chemistry',
    author: 'David R. Klein',
    isbn: '9781118452288',
    category: 'Academic',
    description: 'A student-friendly approach to understanding the principles of organic chemistry.',
    coverImage: 'https://images.unsplash.com/photo-1532634922-8fe0b757fb13?q=80&w=1472&auto=format&fit=crop',
    available: true,
    isEbook: false,
    totalCopies: 8,
    availableCopies: 3,
    publicationYear: 2013,
    publisher: 'Wiley',
    language: 'English',
    pageCount: 1360,
    location: 'Chemistry Section - Shelf D'
  },
  {
    id: '15',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    isbn: '9780374533557',
    category: 'Non-Fiction',
    description: 'A groundbreaking tour of the mind and explains the two systems that drive the way we think.',
    coverImage: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?q=80&w=1470&auto=format&fit=crop',
    available: true,
    isEbook: true,
    totalCopies: 6,
    availableCopies: 4,
    publicationYear: 2013,
    publisher: 'Farrar, Straus and Giroux',
    language: 'English',
    pageCount: 499,
    location: 'Psychology Section - Shelf E'
  },
  {
    id: '16',
    title: 'Harry Potter and the Philosopher\'s Stone',
    author: 'J.K. Rowling',
    isbn: '9781408855652',
    category: 'Fiction',
    description: 'The first novel in the Harry Potter series, following a young wizard\'s journey at Hogwarts School.',
    coverImage: 'https://images.unsplash.com/photo-1600189261867-30e5ffe7b8da?q=80&w=1374&auto=format&fit=crop',
    available: true,
    isEbook: false,
    totalCopies: 15,
    availableCopies: 9,
    publicationYear: 1997,
    publisher: 'Bloomsbury',
    language: 'English',
    pageCount: 332,
    location: 'Fiction Section - Shelf C'
  }
];

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

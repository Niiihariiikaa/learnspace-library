
import React, { useState } from 'react';
import { useLibraryData } from '@/contexts/LibraryDataContext';
import { useToast } from "@/components/ui/use-toast";
import { Link } from 'react-router-dom';
import { BookPagination } from '@/components';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Book as BookIcon, UserCheck, BookOpen, CheckCircle, X, Edit, Trash, Plus, Users, Library, AlertTriangle } from 'lucide-react';
import { useForm } from "react-hook-form";
import { Book } from '@/types';

interface BookFormProps {
  onSubmit: (data: any) => void;
  defaultValues?: Partial<Book>;
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit, defaultValues = {} }) => {
  const form = useForm({
    defaultValues: {
      title: defaultValues.title || '',
      author: defaultValues.author || '',
      isbn: defaultValues.isbn || '',
      category: defaultValues.category || 'Fiction',
      description: defaultValues.description || '',
      coverImage: defaultValues.coverImage || 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop',
      isEbook: defaultValues.isEbook || false,
      totalCopies: defaultValues.totalCopies || 1,
      availableCopies: defaultValues.availableCopies || 1,
      publicationYear: defaultValues.publicationYear || new Date().getFullYear(),
      publisher: defaultValues.publisher || '',
      language: defaultValues.language || 'English',
      pageCount: defaultValues.pageCount || 100,
      location: defaultValues.location || '',
    }
  });
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title*</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author*</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISBN*</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category*</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Fiction">Fiction</SelectItem>
                    <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                    <SelectItem value="Academic">Academic</SelectItem>
                    <SelectItem value="Journals">Journals</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="publisher"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publisher</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="publicationYear"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publication Year</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Language</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="pageCount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Page Count</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="totalCopies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Copies*</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="availableCopies"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Available Copies*</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shelf Location</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  E.g., "Fiction Section - Shelf A"
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Image URL</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description*</FormLabel>
              <FormControl>
                <Textarea rows={4} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="isEbook"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Available as E-Book</FormLabel>
                <FormDescription>
                  Users will be able to download this book
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <DialogFooter>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

const AdminDashboard = () => {
  const { books, userBorrowedBooks, bookRequests, addBook, editBook, deleteBook, approveBookRequest, rejectBookRequest } = useLibraryData();
  const { toast } = useToast();
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  
  // Pagination state
  const [currentBookPage, setCurrentBookPage] = useState(1);
  const [currentBorrowedPage, setCurrentBorrowedPage] = useState(1);
  const [currentRequestPage, setCurrentRequestPage] = useState(1);
  const itemsPerPage = 8;
  
  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Handle add book form submission
  const handleAddBook = (data: any) => {
    const available = data.availableCopies > 0;
    
    // Create new book object
    const newBook = {
      ...data,
      available,
    };
    
    addBook(newBook);
    setIsAddBookOpen(false);
    
    toast({
      title: "Book Added",
      description: `"${data.title}" has been added to the library catalog.`,
    });
  };
  
  // Handle edit book form submission
  const handleEditBook = (data: any) => {
    if (!editingBook) return;
    
    const available = data.availableCopies > 0;
    
    // Update book object
    const updatedBook = {
      ...data,
      available,
    };
    
    editBook(editingBook.id, updatedBook);
    setEditingBook(null);
    
    toast({
      title: "Book Updated",
      description: `"${data.title}" has been updated.`,
    });
  };
  
  // Handle delete book
  const handleDeleteBook = (bookId: string) => {
    deleteBook(bookId);
    
    toast({
      title: "Book Deleted",
      description: "The book has been removed from the library catalog.",
    });
  };
  
  // Handle approve book request
  const handleApproveRequest = (requestId: string) => {
    approveBookRequest(requestId);
    
    toast({
      title: "Request Approved",
      description: "The book request has been approved.",
    });
  };
  
  // Handle reject book request
  const handleRejectRequest = (requestId: string) => {
    rejectBookRequest(requestId);
    
    toast({
      title: "Request Rejected",
      description: "The book request has been rejected.",
    });
  };
  
  // Calculate stats
  const totalBooks = books.length;
  const activeBorrowedBooks = userBorrowedBooks.filter(b => b.status === 'borrowed' || b.status === 'overdue');
  const totalBorrowedBooks = activeBorrowedBooks.length;
  const totalBookRequests = bookRequests.filter(r => r.status === 'pending').length;
  const overdueBooks = userBorrowedBooks.filter(b => {
    const dueDate = new Date(b.dueDate);
    const today = new Date();
    return dueDate < today && b.status === 'borrowed';
  });
  const totalOverdueBooks = overdueBooks.length;
  
  // Get paginated data
  const paginateData = (data: any[], page: number) => {
    const startIndex = (page - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };
  
  const paginatedBooks = paginateData(books, currentBookPage);
  const paginatedBorrowedBooks = paginateData(activeBorrowedBooks, currentBorrowedPage);
  const paginatedRequests = paginateData(bookRequests, currentRequestPage);
  
  // Total pages calculation
  const bookTotalPages = Math.ceil(books.length / itemsPerPage);
  const borrowedTotalPages = Math.ceil(activeBorrowedBooks.length / itemsPerPage);
  const requestsTotalPages = Math.ceil(bookRequests.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-library-primary">Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage library catalog, users, and track borrowed books.
          </p>
        </div>
        
        {/* Dashboard summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center">
                <Library className="mr-2 h-5 w-5 text-library-primary" />
                Total Books
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-library-primary">{totalBooks}</p>
              <p className="text-sm text-gray-500">In catalog</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center">
                <BookOpen className="mr-2 h-5 w-5 text-library-accent" />
                Books Borrowed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-library-accent">{totalBorrowedBooks}</p>
              <p className="text-sm text-gray-500">Currently on loan</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center">
                <Users className="mr-2 h-5 w-5 text-library-secondary" />
                Book Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-library-secondary">{totalBookRequests}</p>
              <p className="text-sm text-gray-500">Pending approval</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                Overdue Books
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-500">{totalOverdueBooks}</p>
              <p className="text-sm text-gray-500">Past due date</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Overdue books alert */}
        {totalOverdueBooks > 0 && (
          <Card className="bg-red-50 border-red-200 mb-6">
            <CardContent className="p-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-700">Attention Required: {totalOverdueBooks} Overdue Books</h3>
                  <p className="text-red-600 text-sm mt-1">
                    There are currently {totalOverdueBooks} books past their due date. Consider sending reminders to borrowers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Add book button */}
        <div className="mb-6 flex justify-end">
          <Dialog open={isAddBookOpen} onOpenChange={setIsAddBookOpen}>
            <DialogTrigger asChild>
              <Button className="bg-library-primary hover:bg-library-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Add New Book
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Add New Book</DialogTitle>
                <DialogDescription>
                  Fill in the details to add a new book to the library catalog.
                </DialogDescription>
              </DialogHeader>
              <BookForm onSubmit={handleAddBook} />
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Main tabs */}
        <Tabs defaultValue="manage-books" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="manage-books" className="text-sm sm:text-base">
              <BookIcon className="h-4 w-4 mr-2 hidden sm:inline" /> Manage Books
            </TabsTrigger>
            <TabsTrigger value="borrowed-books" className="text-sm sm:text-base">
              <BookOpen className="h-4 w-4 mr-2 hidden sm:inline" /> Borrowed Books
            </TabsTrigger>
            <TabsTrigger value="book-requests" className="text-sm sm:text-base">
              <UserCheck className="h-4 w-4 mr-2 hidden sm:inline" /> Book Requests
            </TabsTrigger>
          </TabsList>
          
          {/* Manage Books Tab */}
          <TabsContent value="manage-books">
            <Card>
              <CardHeader>
                <CardTitle>Book Catalog</CardTitle>
                <CardDescription>
                  Manage the library's book collection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead className="hidden md:table-cell">Category</TableHead>
                        <TableHead className="hidden md:table-cell">Status</TableHead>
                        <TableHead className="hidden md:table-cell">Copies</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedBooks.map(book => (
                        <TableRow key={book.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium">
                            <Link to={`/books/${book.id}`} className="hover:underline">
                              {book.title}
                            </Link>
                          </TableCell>
                          <TableCell>{book.author}</TableCell>
                          <TableCell className="hidden md:table-cell">{book.category}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            {book.available ? (
                              <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                                Available
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                                Checked Out
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {book.availableCopies}/{book.totalCopies}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setEditingBook(book)}
                                  >
                                    <Edit className="h-4 w-4" />
                                    <span className="sr-only">Edit</span>
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-3xl">
                                  <DialogHeader>
                                    <DialogTitle>Edit Book</DialogTitle>
                                    <DialogDescription>
                                      Update the details for "{book.title}"
                                    </DialogDescription>
                                  </DialogHeader>
                                  <BookForm onSubmit={handleEditBook} defaultValues={book} />
                                </DialogContent>
                              </Dialog>
                              
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="ghost" size="sm" className="text-red-500">
                                    <Trash className="h-4 w-4" />
                                    <span className="sr-only">Delete</span>
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Delete Book</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete "{book.title}"? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => handleDeleteBook(book.id)}
                                      className="bg-red-500 hover:bg-red-600"
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {/* Pagination for books */}
                {bookTotalPages > 1 && (
                  <div className="mt-4">
                    <BookPagination
                      currentPage={currentBookPage}
                      totalPages={bookTotalPages}
                      onPageChange={setCurrentBookPage}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Borrowed Books Tab */}
          <TabsContent value="borrowed-books">
            <Card>
              <CardHeader>
                <CardTitle>Borrowed Books</CardTitle>
                <CardDescription>
                  Track all currently borrowed books
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Book</TableHead>
                        <TableHead>Borrower</TableHead>
                        <TableHead className="hidden md:table-cell">Borrow Date</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Renewals</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedBorrowedBooks.map(borrow => {
                        const book = books.find(b => b.id === borrow.bookId);
                        
                        if (!book) return null;
                        
                        const dueDate = new Date(borrow.dueDate);
                        const today = new Date();
                        const isOverdue = dueDate < today;
                        
                        return (
                          <TableRow key={borrow.id} className={isOverdue ? "bg-red-50 hover:bg-red-100" : "hover:bg-gray-50"}>
                            <TableCell className="font-medium">
                              <Link to={`/books/${book.id}`} className="hover:underline">
                                {book.title}
                              </Link>
                            </TableCell>
                            <TableCell>User ID: {borrow.userId}</TableCell>
                            <TableCell className="hidden md:table-cell">{formatDate(borrow.borrowDate)}</TableCell>
                            <TableCell>{formatDate(borrow.dueDate)}</TableCell>
                            <TableCell>
                              {isOverdue ? (
                                <Badge variant="destructive">
                                  Overdue
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                                  Active
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">{borrow.renewalCount}/2</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
                
                {/* Pagination for borrowed books */}
                {borrowedTotalPages > 1 && (
                  <div className="mt-4">
                    <BookPagination
                      currentPage={currentBorrowedPage}
                      totalPages={borrowedTotalPages}
                      onPageChange={setCurrentBorrowedPage}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Book Requests Tab */}
          <TabsContent value="book-requests">
            <Card>
              <CardHeader>
                <CardTitle>Book Requests</CardTitle>
                <CardDescription>
                  Manage requests for new books
                </CardDescription>
              </CardHeader>
              <CardContent>
                {paginatedRequests.length > 0 ? (
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Author</TableHead>
                          <TableHead className="hidden md:table-cell">Requested By</TableHead>
                          <TableHead className="hidden md:table-cell">Request Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paginatedRequests.map(request => (
                          <TableRow key={request.id} className="hover:bg-gray-50">
                            <TableCell className="font-medium">{request.title}</TableCell>
                            <TableCell>{request.author || 'Not specified'}</TableCell>
                            <TableCell className="hidden md:table-cell">User ID: {request.userId}</TableCell>
                            <TableCell className="hidden md:table-cell">{formatDate(request.createdAt)}</TableCell>
                            <TableCell>
                              {request.status === 'pending' ? (
                                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                                  Pending
                                </Badge>
                              ) : request.status === 'approved' ? (
                                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                                  Approved
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                                  Rejected
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="text-right">
                              {request.status === 'pending' && (
                                <div className="flex justify-end space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-green-500"
                                    onClick={() => handleApproveRequest(request.id)}
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                    <span className="sr-only">Approve</span>
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="text-red-500"
                                    onClick={() => handleRejectRequest(request.id)}
                                  >
                                    <X className="h-4 w-4" />
                                    <span className="sr-only">Reject</span>
                                  </Button>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No book requests</h3>
                    <p className="text-gray-500">There are no book requests to display.</p>
                  </div>
                )}
                
                {/* Pagination for requests */}
                {requestsTotalPages > 1 && (
                  <div className="mt-4">
                    <BookPagination
                      currentPage={currentRequestPage}
                      totalPages={requestsTotalPages}
                      onPageChange={setCurrentRequestPage}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;

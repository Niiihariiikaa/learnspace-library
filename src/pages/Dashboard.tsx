
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLibraryData } from '@/contexts/LibraryDataContext';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
import { useToast } from "@/components/ui/use-toast";
import { Book, CheckCircle, Clock, Calendar, BookOpen, AlertTriangle, Download } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { userBorrowedBooks, books, returnBook, renewBook, notifications, markNotificationAsRead } = useLibraryData();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('borrowed');
  
  if (!user) {
    return null; // This should be handled by the ProtectedRoute component
  }
  
  // Sort borrowed books by status and due date
  const sortedBorrowedBooks = [...userBorrowedBooks].sort((a, b) => {
    // First, sort by status (overdue first, then borrowed, then returned)
    if (a.status === 'overdue' && b.status !== 'overdue') return -1;
    if (a.status !== 'overdue' && b.status === 'overdue') return 1;
    if (a.status === 'borrowed' && b.status === 'returned') return -1;
    if (a.status === 'returned' && b.status === 'borrowed') return 1;
    
    // Then, sort by due date (soonest first)
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });
  
  // Filter books by status
  const activeBorrows = sortedBorrowedBooks.filter(b => b.status === 'borrowed' || b.status === 'overdue');
  const returnedBooks = sortedBorrowedBooks.filter(b => b.status === 'returned');
  
  // Calculate total fines
  const totalFines = sortedBorrowedBooks.reduce((sum, book) => sum + (book.fine || 0), 0);
  
  // Format date
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  // Calculate days remaining or overdue
  const getDaysStatus = (dueDate: Date) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) {
      return { days: Math.abs(diffDays), isOverdue: true };
    }
    
    return { days: diffDays, isOverdue: false };
  };
  
  const handleReturn = (borrowId: string) => {
    returnBook(borrowId);
    toast({
      title: "Book Returned",
      description: "The book has been successfully returned.",
    });
  };
  
  const handleRenew = (borrowId: string) => {
    renewBook(borrowId);
    toast({
      title: "Book Renewed",
      description: "The book loan period has been extended.",
    });
  };
  
  const handleMarkAllRead = () => {
    notifications.forEach(notification => {
      if (!notification.read) {
        markNotificationAsRead(notification.id);
      }
    });
    toast({
      title: "Notifications Cleared",
      description: "All notifications have been marked as read.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-library-primary">Your Dashboard</h1>
          <p className="text-gray-600">
            Manage your borrowed books, reservations, and account.
          </p>
        </div>
        
        {/* Dashboard summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center">
                <Book className="mr-2 h-5 w-5 text-library-primary" />
                Current Loans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-library-primary">{activeBorrows.length}</p>
              <p className="text-sm text-gray-500">Active books</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center">
                <Clock className="mr-2 h-5 w-5 text-library-primary" />
                Due Soon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-library-primary">
                {activeBorrows.filter(b => {
                  const { days, isOverdue } = getDaysStatus(b.dueDate);
                  return !isOverdue && days <= 3;
                }).length}
              </p>
              <p className="text-sm text-gray-500">Books due within 3 days</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                {totalFines > 0 ? 'Current Fines' : 'No Fines'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-500">
                {totalFines > 0 ? `$${totalFines.toFixed(2)}` : '$0.00'}
              </p>
              <p className="text-sm text-gray-500">
                {totalFines > 0 ? 'Outstanding balance' : 'No outstanding fines'}
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Main tabs */}
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="borrowed">Borrowed Books</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          {/* Borrowed Books Tab */}
          <TabsContent value="borrowed">
            <Card>
              <CardHeader>
                <CardTitle>Your Borrowed Books</CardTitle>
                <CardDescription>
                  {activeBorrows.length > 0
                    ? `You currently have ${activeBorrows.length} book${activeBorrows.length > 1 ? 's' : ''} on loan.`
                    : 'You do not have any books currently on loan.'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {activeBorrows.length > 0 ? (
                  <div className="space-y-4">
                    {activeBorrows.map(borrow => {
                      const book = books.find(b => b.id === borrow.bookId);
                      const { days, isOverdue } = getDaysStatus(borrow.dueDate);
                      
                      if (!book) return null;
                      
                      return (
                        <div key={borrow.id} className="border rounded-lg p-4">
                          <div className="flex flex-col md:flex-row md:items-center gap-4">
                            {/* Book cover and info */}
                            <div className="flex flex-1 items-center gap-4">
                              <div className="h-16 w-12 flex-shrink-0 overflow-hidden rounded">
                                <img
                                  src={book.coverImage}
                                  alt={book.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              
                              <div className="flex-1">
                                <Link 
                                  to={`/books/${book.id}`} 
                                  className="font-semibold text-library-primary hover:underline"
                                >
                                  {book.title}
                                </Link>
                                <p className="text-sm text-gray-600">by {book.author}</p>
                                
                                <div className="flex items-center mt-1">
                                  <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                                  <span className="text-xs text-gray-500">
                                    Due: {formatDate(borrow.dueDate)}
                                  </span>
                                  
                                  {isOverdue ? (
                                    <Badge variant="destructive" className="ml-2">
                                      {days} {days === 1 ? 'day' : 'days'} overdue
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                                      {days} {days === 1 ? 'day' : 'days'} remaining
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {/* Actions */}
                            <div className="flex items-center justify-end space-x-2">
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="outline">Return</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Return Book</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to return "{book.title}"?
                                      {isOverdue && (
                                        <p className="mt-2 text-red-500">
                                          This book is {days} {days === 1 ? 'day' : 'days'} overdue. A fine of ${(days * 0.5).toFixed(2)} will be applied.
                                        </p>
                                      )}
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleReturn(borrow.id)}>
                                      Confirm Return
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                              
                              <Button
                                disabled={borrow.renewalCount >= 2}
                                onClick={() => handleRenew(borrow.id)}
                                variant="secondary"
                              >
                                Renew ({borrow.renewalCount}/2)
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No books borrowed</h3>
                    <p className="text-gray-500 mb-4">You haven't borrowed any books yet.</p>
                    <Button asChild>
                      <Link to="/books">Browse Books</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Borrowing History</CardTitle>
                <CardDescription>
                  Books you've returned in the past
                </CardDescription>
              </CardHeader>
              <CardContent>
                {returnedBooks.length > 0 ? (
                  <div className="space-y-4">
                    {returnedBooks.map(borrow => {
                      const book = books.find(b => b.id === borrow.bookId);
                      
                      if (!book) return null;
                      
                      return (
                        <div key={borrow.id} className="border rounded-lg p-4">
                          <div className="flex flex-col md:flex-row md:items-center gap-4">
                            {/* Book cover and info */}
                            <div className="flex flex-1 items-center gap-4">
                              <div className="h-16 w-12 flex-shrink-0 overflow-hidden rounded">
                                <img
                                  src={book.coverImage}
                                  alt={book.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              
                              <div className="flex-1">
                                <Link 
                                  to={`/books/${book.id}`} 
                                  className="font-semibold text-library-primary hover:underline"
                                >
                                  {book.title}
                                </Link>
                                <p className="text-sm text-gray-600">by {book.author}</p>
                                
                                <div className="flex flex-wrap items-center mt-1 gap-2">
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 text-gray-500 mr-1" />
                                    <span className="text-xs text-gray-500">
                                      Borrowed: {formatDate(borrow.borrowDate)}
                                    </span>
                                  </div>
                                  
                                  <div className="flex items-center">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                                    <span className="text-xs text-gray-500">
                                      Returned: {borrow.returnDate ? formatDate(borrow.returnDate) : 'N/A'}
                                    </span>
                                  </div>
                                  
                                  {borrow.fine ? (
                                    <Badge variant="destructive">
                                      Fine: ${borrow.fine.toFixed(2)}
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                      Returned on time
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {/* Actions */}
                            <div className="flex items-center space-x-2">
                              <Button asChild variant="outline">
                                <Link to={`/books/${book.id}`}>
                                  View Book
                                </Link>
                              </Button>
                              
                              {book.isEbook && (
                                <Button variant="secondary">
                                  <Download className="h-4 w-4 mr-1" />
                                  Download
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No borrowing history</h3>
                    <p className="text-gray-500 mb-4">You haven't returned any books yet.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Updates about your books and account
                  </CardDescription>
                </div>
                
                {notifications.length > 0 && (
                  <Button variant="outline" size="sm" onClick={handleMarkAllRead}>
                    Mark All Read
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                {notifications.length > 0 ? (
                  <div className="space-y-4">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`border rounded-lg p-4 ${!notification.read ? 'bg-blue-50 border-blue-200' : ''}`}
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="text-gray-800">{notification.message}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatDate(notification.createdAt)}
                            </p>
                          </div>
                          
                          {!notification.read && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-xs"
                              onClick={() => markNotificationAsRead(notification.id)}
                            >
                              Mark Read
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No notifications</h3>
                    <p className="text-gray-500">You don't have any notifications at the moment.</p>
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

export default Dashboard;

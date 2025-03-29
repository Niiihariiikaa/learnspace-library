
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useLibraryData } from '@/contexts/LibraryDataContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/components/ui/use-toast";
import { BookOpen, Download, ArrowLeft, Calendar, Globe, Bookmark } from 'lucide-react';

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getBookById, borrowBook } = useLibraryData();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const book = getBookById(id || '');
  
  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Book not found</h1>
        <p className="text-gray-600 mb-6">The book you're looking for could not be found.</p>
        <Button asChild variant="outline">
          <Link to="/books" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Books
          </Link>
        </Button>
      </div>
    );
  }
  
  const handleBorrow = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to borrow books.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    borrowBook(book.id);
    toast({
      title: "Book Borrowed",
      description: `You have successfully borrowed "${book.title}".`,
    });
  };
  
  const handleDownload = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please log in to download e-books.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    toast({
      title: "E-Book Downloaded",
      description: `"${book.title}" has been downloaded successfully.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-6">
          <Button asChild variant="ghost" className="pl-0">
            <Link to="/books" className="flex items-center text-library-primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Books
            </Link>
          </Button>
        </div>
        
        {/* Book details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Book cover */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src={book.coverImage}
                alt={`Cover of ${book.title}`}
                className="w-full h-auto object-cover"
              />
              
              <div className="p-4">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">
                    {book.category}
                  </Badge>
                  {book.isEbook && (
                    <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                      E-Book
                    </Badge>
                  )}
                  {book.available ? (
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                      Available
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                      Checked Out
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Published: {book.publicationYear}</span>
                  </div>
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-2" />
                    <span>Language: {book.language}</span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2" />
                    <span>{book.pageCount} pages</span>
                  </div>
                  <div className="flex items-center">
                    <Bookmark className="h-4 w-4 mr-2" />
                    <span>ISBN: {book.isbn}</span>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="mt-6 space-y-3">
                  {book.isEbook ? (
                    <Button 
                      onClick={handleDownload}
                      className="w-full bg-library-accent text-white hover:bg-library-accent/90"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download E-Book
                    </Button>
                  ) : (
                    <Button
                      onClick={handleBorrow}
                      disabled={!book.available}
                      className="w-full bg-library-primary text-white hover:bg-library-primary/90"
                    >
                      Borrow Book
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Book info */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl text-library-primary">{book.title}</CardTitle>
                <CardDescription className="text-lg">by {book.author}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="overview">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="availability">Availability</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="pt-4">
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-700 mb-6 whitespace-pre-line">
                      {book.description}
                    </p>
                    
                    <Separator className="my-6" />
                    
                    <h3 className="text-lg font-semibold mb-2">About the Author</h3>
                    <p className="text-gray-700 mb-6">
                      {book.author} is the author of "{book.title}", published by {book.publisher} in {book.publicationYear}.
                    </p>
                  </TabsContent>
                  
                  <TabsContent value="details" className="pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Title</h3>
                        <p className="text-gray-900">{book.title}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Author</h3>
                        <p className="text-gray-900">{book.author}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Publisher</h3>
                        <p className="text-gray-900">{book.publisher}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Publication Year</h3>
                        <p className="text-gray-900">{book.publicationYear}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Language</h3>
                        <p className="text-gray-900">{book.language}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">ISBN</h3>
                        <p className="text-gray-900">{book.isbn}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Pages</h3>
                        <p className="text-gray-900">{book.pageCount}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Format</h3>
                        <p className="text-gray-900">{book.isEbook ? 'E-Book' : 'Physical Book'}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Category</h3>
                        <p className="text-gray-900">{book.category}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Location</h3>
                        <p className="text-gray-900">{book.location || 'N/A'}</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="availability" className="pt-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Current Status</h3>
                        <p className="text-gray-700 mb-2">
                          {book.available
                            ? `This book is currently available for borrowing.`
                            : `This book is currently checked out.`}
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Copies</h3>
                        <p className="text-gray-700 mb-2">
                          {book.availableCopies} of {book.totalCopies} copies available
                        </p>
                        
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                          <div 
                            className="bg-library-primary h-2.5 rounded-full" 
                            style={{ width: `${(book.availableCopies / book.totalCopies) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      {book.isEbook && (
                        <div>
                          <h3 className="text-lg font-semibold mb-2">E-Book Access</h3>
                          <p className="text-gray-700 mb-2">
                            This book is available as an e-book and can be downloaded by authenticated users.
                          </p>
                        </div>
                      )}
                      
                      {/* Borrowing rules */}
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Borrowing Rules</h3>
                        <ul className="list-disc pl-5 text-gray-700 space-y-1">
                          <li>Students can borrow for up to 14 days</li>
                          <li>Faculty can borrow for up to 30 days</li>
                          <li>Books can be renewed up to 2 times</li>
                          <li>Late returns incur a fine of $0.50 per day</li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              
              <CardFooter className="flex justify-between">
                <Button asChild variant="outline">
                  <Link to="/books" className="flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Books
                  </Link>
                </Button>
                
                {book.isEbook ? (
                  <Button
                    onClick={handleDownload}
                    className="bg-library-accent text-white hover:bg-library-accent/90"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                ) : (
                  book.available && (
                    <Button
                      onClick={handleBorrow}
                      className="bg-library-primary text-white hover:bg-library-primary/90"
                    >
                      Borrow
                    </Button>
                  )
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

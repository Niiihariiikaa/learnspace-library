
import React from 'react';
import { Book } from '@/types';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Download, BookOpen } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLibraryData } from '@/contexts/LibraryDataContext';

interface BookCardProps {
  book: Book;
  showActions?: boolean;
}

const BookCard: React.FC<BookCardProps> = ({ book, showActions = true }) => {
  const { user } = useAuth();
  const { borrowBook } = useLibraryData();
  
  const handleBorrow = () => {
    borrowBook(book.id);
  };
  
  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
      {/* Book cover image */}
      <div className="h-48 overflow-hidden">
        <img 
          src={book.coverImage} 
          alt={`Cover of ${book.title}`} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      {/* Book details */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-library-primary line-clamp-1">{book.title}</h3>
          
          {book.isEbook && (
            <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
              E-Book
            </Badge>
          )}
        </div>
        
        <p className="text-sm text-gray-600 mb-2">By {book.author}</p>
        
        <div className="flex items-center mb-3">
          <Badge variant="secondary" className="mr-2">
            {book.category}
          </Badge>
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
        
        <p className="text-xs text-gray-500 mb-4">
          {book.availableCopies} of {book.totalCopies} copies available
        </p>
        
        {/* Description preview */}
        <p className="text-sm text-gray-700 mb-4 line-clamp-2">
          {book.description}
        </p>
        
        {/* Actions */}
        {showActions && (
          <div className="flex items-center justify-between mt-2">
            <Button
              variant="outline" 
              asChild 
              className="text-library-primary border-library-primary hover:bg-library-primary hover:text-white"
            >
              <Link to={`/books/${book.id}`}>
                <BookOpen className="h-4 w-4 mr-1" />
                Details
              </Link>
            </Button>
            
            {user && (
              <>
                {book.isEbook ? (
                  <Button variant="secondary" className="bg-library-accent text-white hover:bg-library-accent/90">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                ) : (
                  book.available && (
                    <Button 
                      onClick={handleBorrow}
                      disabled={!book.available}
                      className="bg-library-primary text-white hover:bg-library-primary/90"
                    >
                      Borrow
                    </Button>
                  )
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCard;

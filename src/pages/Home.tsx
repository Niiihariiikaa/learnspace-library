
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLibraryData } from '@/contexts/LibraryDataContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import BookCard from '@/components/BookCard';
import { Search, BookOpen, Users, Bookmark, Download, Book, ArrowRight } from 'lucide-react';

const Home = () => {
  const { books } = useLibraryData();
  const { isAuthenticated } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/books?search=${encodeURIComponent(searchQuery)}`);
  };
  
  // Get featured books (random selection of 4 books)
  const featuredBooks = React.useMemo(() => {
    const shuffled = [...books].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 4);
  }, [books]);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero section */}
      <section className="bg-library-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to LearnSpace Library
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8">
              Your gateway to knowledge. Browse thousands of books, journals, and academic resources.
            </p>
            
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex mb-8">
              <Input
                type="text"
                placeholder="Search by title, author, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-r-none border-r-0 bg-white text-library-dark focus-visible:ring-library-accent"
              />
              <Button 
                type="submit"
                className="rounded-l-none bg-library-accent hover:bg-library-accent/90"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </form>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="secondary">
                <Link to="/books">Browse All Books</Link>
              </Button>
              
              {!isAuthenticated && (
                <Button asChild className="bg-library-accent hover:bg-library-accent/90">
                  <Link to="/signup">Create Account</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* Features section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-library-primary mb-12">
            Library Features
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-lg bg-gray-50 shadow-sm">
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 text-library-primary rounded-full flex items-center justify-center">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Extensive Collection</h3>
              <p className="text-gray-600">
                Access thousands of books across various genres and academic fields.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-gray-50 shadow-sm">
              <div className="w-12 h-12 mx-auto mb-4 bg-green-100 text-library-primary rounded-full flex items-center justify-center">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Role-Based Access</h3>
              <p className="text-gray-600">
                Special features for students, faculty, and administrators.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-gray-50 shadow-sm">
              <div className="w-12 h-12 mx-auto mb-4 bg-yellow-100 text-library-primary rounded-full flex items-center justify-center">
                <Bookmark className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Easy Borrowing</h3>
              <p className="text-gray-600">
                Borrow and return books with just a few clicks.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-gray-50 shadow-sm">
              <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 text-library-primary rounded-full flex items-center justify-center">
                <Download className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Digital Resources</h3>
              <p className="text-gray-600">
                Download e-books and academic papers instantly.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured books section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-library-primary">
              Featured Books
            </h2>
            <Button asChild variant="outline" className="text-library-primary border-library-primary">
              <Link to="/books" className="flex items-center">
                <span>View All</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-library-primary mb-12">
            Browse by Category
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/books?category=Fiction" className="group">
              <div className="p-6 bg-library-primary bg-opacity-10 rounded-lg text-center hover:bg-opacity-20 transition-all">
                <Book className="h-12 w-12 mx-auto mb-4 text-library-primary" />
                <h3 className="text-xl font-semibold text-library-primary group-hover:underline">Fiction</h3>
                <p className="text-gray-600 mt-2">
                  Novels, short stories, and literary works
                </p>
              </div>
            </Link>
            
            <Link to="/books?category=Non-Fiction" className="group">
              <div className="p-6 bg-library-secondary bg-opacity-10 rounded-lg text-center hover:bg-opacity-20 transition-all">
                <Book className="h-12 w-12 mx-auto mb-4 text-library-secondary" />
                <h3 className="text-xl font-semibold text-library-secondary group-hover:underline">Non-Fiction</h3>
                <p className="text-gray-600 mt-2">
                  Biographies, history, and factual literature
                </p>
              </div>
            </Link>
            
            <Link to="/books?category=Academic" className="group">
              <div className="p-6 bg-library-accent bg-opacity-10 rounded-lg text-center hover:bg-opacity-20 transition-all">
                <Book className="h-12 w-12 mx-auto mb-4 text-library-accent" />
                <h3 className="text-xl font-semibold text-library-accent group-hover:underline">Academic</h3>
                <p className="text-gray-600 mt-2">
                  Textbooks and scholarly resources
                </p>
              </div>
            </Link>
            
            <Link to="/books?category=Journals" className="group">
              <div className="p-6 bg-library-green bg-opacity-10 rounded-lg text-center hover:bg-opacity-20 transition-all">
                <Book className="h-12 w-12 mx-auto mb-4 text-library-green" />
                <h3 className="text-xl font-semibold text-library-green group-hover:underline">Journals</h3>
                <p className="text-gray-600 mt-2">
                  Academic journals and periodicals
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* CTA section */}
      {!isAuthenticated && (
        <section className="py-16 bg-library-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to start borrowing?
            </h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">
              Create your account now to borrow books, access e-resources, and more.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-library-primary">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild className="bg-library-accent hover:bg-library-accent/90">
                <Link to="/signup">Create Account</Link>
              </Button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;

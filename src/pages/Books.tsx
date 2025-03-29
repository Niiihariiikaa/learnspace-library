
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLibraryData } from '@/contexts/LibraryDataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { BookCard } from '@/components';
import { Book } from '@/types';
import { Search, Filter, X } from 'lucide-react';

const Books = () => {
  const { searchBooks } = useLibraryData();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Get search parameters
  const initialQuery = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialAvailable = searchParams.get('available') || '';
  const initialEbook = searchParams.get('isEbook') || '';
  
  // State
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [availableOnly, setAvailableOnly] = useState(initialAvailable === 'true');
  const [ebooksOnly, setEbooksOnly] = useState(initialEbook === 'true');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  
  // Search for books whenever search parameters change
  useEffect(() => {
    const filters: Record<string, string> = {};
    
    if (category) {
      filters.category = category;
    }
    
    if (availableOnly) {
      filters.available = 'true';
    }
    
    if (ebooksOnly) {
      filters.isEbook = 'true';
    }
    
    const results = searchBooks(initialQuery, filters);
    setFilteredBooks(results);
  }, [searchBooks, initialQuery, category, availableOnly, ebooksOnly]);
  
  // Update URL when search parameters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (initialQuery) {
      params.set('search', initialQuery);
    }
    
    if (category) {
      params.set('category', category);
    }
    
    if (availableOnly) {
      params.set('available', 'true');
    }
    
    if (ebooksOnly) {
      params.set('isEbook', 'true');
    }
    
    setSearchParams(params);
  }, [initialQuery, category, availableOnly, ebooksOnly, setSearchParams]);
  
  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchParams.set('search', searchQuery);
    setSearchParams(searchParams);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setCategory('');
    setAvailableOnly(false);
    setEbooksOnly(false);
    setSearchQuery('');
    setSearchParams({});
  };
  
  // Toggle filters panel on mobile
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-library-primary mb-2">Book Catalog</h1>
          <p className="text-gray-600">
            Browse our collection of books, journals, and academic resources
          </p>
        </div>
        
        {/* Search and filter row */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <form onSubmit={handleSearch} className="flex-1">
            <div className="flex">
              <Input
                type="text"
                placeholder="Search by title, author, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-r-none"
              />
              <Button 
                type="submit"
                className="rounded-l-none bg-library-primary hover:bg-library-primary/90"
              >
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </form>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="md:hidden flex items-center"
              onClick={toggleFilters}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            
            <Button
              variant="ghost"
              className="flex items-center"
              onClick={clearFilters}
              disabled={!category && !availableOnly && !ebooksOnly && !initialQuery}
            >
              <X className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters sidebar */}
          <Card className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Refine your search results</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Category filter */}
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    <SelectItem value="Fiction">Fiction</SelectItem>
                    <SelectItem value="Non-Fiction">Non-Fiction</SelectItem>
                    <SelectItem value="Academic">Academic</SelectItem>
                    <SelectItem value="Journals">Journals</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Availability filter */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="available" 
                    checked={availableOnly}
                    onCheckedChange={(checked) => setAvailableOnly(checked as boolean)}
                  />
                  <Label htmlFor="available">Available books only</Label>
                </div>
              </div>
              
              {/* E-book filter */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="ebook" 
                    checked={ebooksOnly}
                    onCheckedChange={(checked) => setEbooksOnly(checked as boolean)}
                  />
                  <Label htmlFor="ebook">E-books only</Label>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Book results */}
          <div className="lg:col-span-3">
            {/* Results count */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {filteredBooks.length} {filteredBooks.length === 1 ? 'result' : 'results'} found
              </p>
            </div>
            
            {/* Results grid */}
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBooks.map(book => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No books found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;

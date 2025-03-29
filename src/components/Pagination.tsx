
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface BookPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const BookPagination: React.FC<BookPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const pageNumbers = [];
  
  // Generate page numbers
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  return (
    <Pagination className="mt-6">
      <PaginationContent>
        {/* Previous button */}
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => onPageChange(currentPage - 1)} 
              className="cursor-pointer"
            />
          </PaginationItem>
        )}
        
        {/* Page numbers */}
        {pageNumbers.map(number => {
          // Show 5 pages max - first, last, current and 1 on each side of current if possible
          const showPage = 
            number === 1 || 
            number === totalPages || 
            (number >= currentPage - 1 && number <= currentPage + 1);
            
          if (!showPage) {
            if (number === 2 || number === totalPages - 1) {
              return (
                <PaginationItem key={`ellipsis-${number}`}>
                  <span className="px-2 py-1">...</span>
                </PaginationItem>
              );
            }
            return null;
          }
          
          return (
            <PaginationItem key={number}>
              <PaginationLink 
                isActive={number === currentPage}
                onClick={() => onPageChange(number)}
                className="cursor-pointer"
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        
        {/* Next button */}
        {currentPage < totalPages && (
          <PaginationItem>
            <PaginationNext 
              onClick={() => onPageChange(currentPage + 1)} 
              className="cursor-pointer"
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default BookPagination;
